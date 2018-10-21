import { Hub } from "./hub";
import { parse } from "./parser";
import { visitor as transform } from "./plugins/transform";
import { visitor as translate } from "./plugins/translate";
import { visitor as finalize } from "./plugins/finalize";
import createDependencyImports from "./util/create-dependency-imports";

export default (api, options) => {
  const isProduction = api.env("production");
  return {
    parserOverride(code, jsParseOptions) {
      const filename = jsParseOptions.sourceFileName;
      const hub = new Hub(filename, code, {
        ...options,
        jsParseOptions,
        isProduction
      });
      const ast = parse(hub);
      const nodePath = hub.createNodePath();
      nodePath.traverse(transform);
      nodePath.traverse(translate);

      if (options.dependenciesOnly) {
        const imports = createDependencyImports(nodePath);
        if (imports) {
          ast.program.body = imports;
          return ast;
        }
      }

      nodePath.traverse(finalize);
      return ast;
    }
  };
};
