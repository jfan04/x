import fs from "fs";
import { resolve, join, relative } from "path";

let linksCreated = false;
const PROJECT_ROOT = process.cwd();
const PLUGIN_ROOT = resolve(__dirname, "../../");
const LINKS = [
  ".marko_component_type-stateful",
  ".marko_component_type-stateless"
];

// TODO: deps/virtuals

export default function(path, isStateless) {
  createLinks();
  const { hub } = path;
  const {
    _imports,
    meta: { tags },
    filename
  } = hub;
  const dirname = join(filename, "..");
  const dependenciesOnly =
    (hub.isSplit || hub.isImplicit) && isParentStateless(filename);
  const tagImports = tags.map(entry => {
    const importDeclaration = _imports[entry];
    const aliasRoot = join(PLUGIN_ROOT, LINKS[isStateless ? 1 : 0]);
    const aliasPath = join(dirname, entry).replace(PROJECT_ROOT, aliasRoot);
    if (!aliasPath.includes(aliasRoot)) {
      return;
    }
    const relativeAliasPath = relative(dirname, aliasPath);
    importDeclaration.source.value = relativeAliasPath;
    return importDeclaration;
  });

  if (dependenciesOnly) {
    return tagImports;
  }
}

function createLinks() {
  if (linksCreated) {
    return;
  }

  linksCreated = true;

  LINKS.map(link => join(PLUGIN_ROOT, link))
    .filter(file => !fs.existsSync(file))
    .forEach(link => fs.symlinkSync(PROJECT_ROOT, link));
}

function isParentStateless(filename) {
  const match = /\/\.marko_component_type=(stateful|stateless)\//g.exec(
    filename
  );
  if (!match) return true;
  return match[1] === "stateless";
}
