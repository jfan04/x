import * as t from "../../../../definitions";

const hasMonkeyPatch = new WeakSet();

/**
 * Does nothing in html mode.
 */
export default function(path, attr) {
  const { node, hub } = path;
  const { properties } = node;
  let prop = properties.find(({ key: { name } }) => name === "noupdate");

  if (!prop) {
    prop = t.objectProperty(t.identifier("noupdate"), t.arrayExpression([]));
    properties.push(prop);

    if (hub.options.output === "vdom" && !hasMonkeyPatch.has(hub)) {
      hasMonkeyPatch.add(hub);
      hub.importDefault(path, "marko/src/runtime/vdom/preserve-attrs");
    }
  }

  prop.value.elements.push(t.stringLiteral(attr.node.name));
}
