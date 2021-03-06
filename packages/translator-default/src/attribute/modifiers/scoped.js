import { types as t } from "@marko/babel-types";

export default function(tag, _, value) {
  const { hub } = tag;
  value.replaceWith(
    t.callExpression(
      t.memberExpression(hub._componentDefIdentifier, t.identifier("elId")),
      [value.node]
    )
  );
}
