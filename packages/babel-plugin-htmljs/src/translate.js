import { relative } from "path";
import * as moduleImports from "@babel/helper-module-imports";
import * as t from "./definitions";
import write from "./util/html-out-write";
import withPreviousLocation from "./util/with-previous-location";
import { visitor as optimizingVisitor } from "./optimize";
import { replaceInRenderBody, toStatement } from "./taglib/core/util";

export const visitor = {
  Program: {
    enter(path) {
      const { hub } = path;
      const {
        file: {
          ast: { lookup, parse, parseExpression }
        }
      } = hub;

      Object.assign(hub, {
        lookup,
        parse,
        parseExpression,
        renderBody: []
      });
    },
    exit(path) {
      const { node, hub } = path;
      node.body.push(
        t.functionDeclaration(
          t.identifier("render"),
          [t.identifier("out")],
          Object.assign(t.blockStatement([]), { body: hub.renderBody })
        )
      );

      path.traverse(optimizingVisitor);
    }
  },
  HTMLElement: {
    exit(path) {
      const { hub, node } = path;
      const { startTag, children } = node;
      const { name } = startTag;
      const {
        lookup,
        file: {
          opts: { filename }
        }
      } = hub;
      let tagDef;
      let transformers;

      if (t.isStringLiteral(name)) {
        tagDef = lookup.getTag(name.value);
      } else {
        replaceInRenderBody(
          path,
          t.callExpression(
            moduleImports.addNamed(
              path,
              "dynamicTag",
              "@marko/runtime/helpers"
            ),
            [name, getAttrs(path), t.identifier("out")]
          )
        );
        return;
      }

      if (tagDef) {
        transformers = tagDef.transformers;
      } else {
        transformers = lookup.getTag("*").transformers;
      }

      Object.values(transformers).forEach(transformer => {
        const module = require(transformer.path);
        const { default: fn = module } = module;
        fn(path);
      });

      if (tagDef && tagDef.taglibId !== "marko-core") {
        const relativePath = relative(filename, tagDef.template);
        const identifier = moduleImports.addDefault(path, relativePath, {
          nameHint: tagDef.name
        });

        replaceInRenderBody(
          path,
          t.callExpression(identifier, [getAttrs(path), t.identifier("out")])
        );
      }
    }
  },
  HTMLText(path) {
    const { node, hub } = path;
    const replacement = withPreviousLocation(
      write`${t.stringLiteral(node.value)}`,
      node
    );

    if (t.isProgram(path.parent)) {
      if (node.value.trim()) hub.renderBody.push(replacement);
      path.remove();
    } else {
      path.replaceWith(replacement);
    }
  },
  HTMLPlaceholder(path) {
    // TODO Safe/Unsafe helper
    const { node, hub } = path;
    let { escape, value } = node;

    if (escape) {
      value = t.callExpression(
        moduleImports.addNamed(path, "escape", "@marko/runtime/helpers"),
        [value]
      );
    }

    const replacement = withPreviousLocation(write`${value}`, node);
    if (t.isProgram(path.parent)) {
      path.remove();
      hub.renderBody.push(replacement);
    } else {
      path.replaceWith(replacement);
    }
  },
  HTMLScriptlet(path) {
    const {
      node: { body },
      hub
    } = path;

    if (t.isProgram(path.parent)) {
      path.remove();
      hub.renderBody.push(...body);
    } else {
      path.replaceWithMultiple(body);
    }
  },
  HTMLComment(path) {
    path.remove();
  }
};

function getAttrs(path) {
  const attrs = path.get("startTag").get("attributes");
  const children = path.get("children");
  const attrsLen = attrs.length;
  const childLen = children.length;

  if (!attrsLen && !childLen) {
    return t.nullLiteral();
  }

  const properties = new Array(attrsLen);

  for (let i = 0; i < attrsLen; i++) {
    const { name, value } = attrs[i].node;
    properties[i] = name
      ? t.objectProperty(t.stringLiteral(name), value)
      : t.spreadElement(value);
  }

  if (childLen) {
    properties.push(
      t.objectProperty(
        t.stringLiteral("renderBody"),
        t.arrowFunctionExpression(
          [t.identifier("out")],
          t.blockStatement(children.map(({ node }) => toStatement(node)))
        )
      )
    );
  }

  return t.objectExpression(properties);
}
