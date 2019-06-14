import * as t from "../../definitions";
import normalizeTemplateLiteral from "../../util/normalize-template-string";

export function exit(path) {
  const namePath = path.get("name");
  const attributes = path.get("attributes");
  const { body } = path.node;
  const keyAttr = attributes.find(attr => attr.node.name === "key");

  if (!keyAttr) {
    throw namePath.buildCodeFrameError(
      '"fragment" tag must have a "key" or default attribute.'
    );
  }

  if (attributes.length > 1) {
    throw attributes[attributes[0] === keyAttr ? 1 : 0].buildCodeFrameError(
      '"fragment" tag can only have a "key" or default attribute.'
    );
  }

  if (!body.length) {
    throw namePath.buildCodeFrameError('"fragment" tag must have children.');
  }

  const keyValue = normalizeTemplateLiteral(
    ["@", ""],
    [keyAttr.get("value").node]
  );

  body
    .filter(child => t.isMarkoTag(child))
    .forEach(child => (child.key = keyValue));

  path.replaceWithMultiple(body);
}
