import { createParser } from "htmljs-parser";
import parseAttributes from "./util/parse-attributes";
import parseArguments from "./util/parse-arguments";
import parseParams from "./util/parse-params";
import parseIDShorthand from "./util/parse-id-shorthand";
import parseClassnameShorthand from "./util/parse-classname-shorthand";
import { getLocRange } from "./util/get-loc";
import { types as t } from "@marko/babel-types";

const EMPTY_OBJECT = {};
const EMPTY_ARRAY = [];
const htmlTrimStart = t => t.replace(/^[\n\r]\s*/, "");
const htmlTrimEnd = t => t.replace(/[\n\r]\s*$/, "");
const htmlTrim = t => htmlTrimStart(htmlTrimEnd(t));
const isNestedTag = node =>
  t.isStringLiteral(node.name) && node.name.value[0] === "@";

export function parse(fileNodePath) {
  const { hub } = fileNodePath;
  const { filename, htmlParseOptions = {} } = hub;
  const { preserveWhitespace } = htmlParseOptions;
  const code = hub.getCode();
  const getTagBody = () =>
    currentTag.get(currentTag.isFile() ? "program" : "body");
  const pushTagBody = node => getTagBody().pushContainer("body", node);
  let currentTag = fileNodePath;
  let preservingWhitespaceUntil = preserveWhitespace;
  let wasSelfClosing = false;
  let wasConcise = false;
  let onNext;

  createParser(
    {
      onDocumentType({ value, pos, endPos }) {
        const node = hub.createNode("markoDocumentType", pos, endPos, value);
        pushTagBody(node);
        /* istanbul ignore next */
        onNext = onNext && onNext(node);
      },

      onDeclaration({ value, pos, endPos }) {
        const node = hub.createNode("markoDeclaration", pos, endPos, value);
        pushTagBody(node);
        /* istanbul ignore next */
        onNext = onNext && onNext(node);
      },

      onComment({ value, pos, endPos }) {
        const node = hub.createNode("markoComment", pos, endPos, value);
        pushTagBody(node);
        onNext = onNext && onNext(node);
      },

      onCDATA({ value, pos, endPos }) {
        const node = hub.createNode("markoCDATA", pos, endPos, value);
        pushTagBody(node);
        onNext = onNext && onNext(node);
      },

      onText({ value }, { pos }) {
        const shouldTrim = !preservingWhitespaceUntil;
        const { body } = getTagBody().node;

        if (shouldTrim) {
          if (htmlTrim(value) === "") {
            return;
          }

          // Find previous non-scriptlet/@tag.
          let prev;
          let prevIndex = body.length;
          while (prevIndex > 0) {
            prev = body[--prevIndex];

            if (
              t.isMarkoComment(prev) ||
              t.isMarkoScriptlet(prev) ||
              isNestedTag(prev)
            ) {
              prev = undefined;
            } else {
              break;
            }
          }

          if (!prev) {
            const originalValue = value;
            value = htmlTrimStart(value);
            pos += originalValue.indexOf(value);
          } else if (
            t.isMarkoText(prev) &&
            /\s/.test(prev.value[prev.value.length - 1])
          ) {
            const originalValue = value;
            value = value.replace(/^\s+/, "");
            pos += originalValue.indexOf(value);
          }
        }

        const endPos = pos + value.length;
        const node = hub.createNode("markoText", pos, endPos, value);
        const prevBody = getTagBody().node.body;
        pushTagBody(node);
        onNext && onNext(node);
        onNext =
          shouldTrim &&
          (next => {
            if (!next || prevBody.indexOf(next) === -1) {
              node.value = htmlTrimEnd(node.value);
            }

            node.value = node.value.replace(/\s+/g, " ");
          });
      },

      onPlaceholder({ escape, value, withinBody, pos, endPos }) {
        if (withinBody) {
          const node = hub.createNode(
            "markoPlaceholder",
            pos,
            endPos,
            hub.parseExpression(
              value,
              pos + (escape ? 2 /* ${ */ : 3) /* $!{ */
            ),
            escape
          );

          pushTagBody(node);
          onNext = onNext && onNext(node);
        }
      },

      onScriptlet({ value, line, block, pos, endPos }) {
        if (!line && !block) {
          throw hub.buildError(
            { start: pos, end: endPos },
            "<% scriptlets %> are no longer supported."
          );
        }

        // Scriptlets are ignored as content and don't call `onNext`.
        pushTagBody(
          hub.createNode(
            "markoScriptlet",
            pos,
            endPos,
            hub.parse(value, pos).body
          )
        );
      },

      onOpenTagName(event) {
        const { tagName, pos, endPos } = event;
        const [, tagNameExpression] =
          /^\$\{([\s\S]+)\}/.exec(tagName) || EMPTY_ARRAY;
        const tagDef = !tagNameExpression && hub.lookup.getTag(tagName);
        const tagNameStartPos = pos + (event.concise ? 0 : 1); // Account for leading `<`.
        const node = hub.createNode(
          "markoTag",
          pos,
          endPos,
          tagNameExpression
            ? hub.parseExpression(
                tagNameExpression,
                tagNameStartPos + 2 /* ${ */
              )
            : hub.createNode(
                "stringLiteral",
                tagNameStartPos,
                tagNameStartPos + tagName.length,
                tagName
              ),
          [],
          t.markoTagBody()
        );

        if (tagDef) {
          node.tagDef = tagDef;

          const { parseOptions } = tagDef;
          if (parseOptions) {
            event.setParseOptions(parseOptions);

            if (parseOptions.rootOnly && !currentTag.isFile()) {
              throw hub.buildError(
                { start: pos, end: endPos },
                `"${tagName}" tags must be at the root of your Marko template.`
              );
            }
          }
        }

        [currentTag] = pushTagBody(node);

        // @tags are not treated as content and do not call next.
        if (!isNestedTag(node)) {
          onNext = onNext && onNext(node);
        }
      },

      onOpenTag(event, parser) {
        const { pos, endPos, tagNameEndPos } = event;
        const { tagDef } = currentTag.node;
        const parseOptions = (tagDef && tagDef.parseOptions) || EMPTY_OBJECT;
        wasSelfClosing = event.selfClosed;
        wasConcise = event.concise;

        if (parseOptions.state === "parsed-text") {
          parser.enterParsedTextContentState();
        } else if (parseOptions.state === "static-text") {
          parser.enterStaticTextContentState();
        }

        if (parseOptions.rawOpenTag) {
          currentTag.set(
            "rawValue",
            parser.substring(pos, endPos).replace(/^<|\/>$|>$/g, "")
          );
        }

        if (!parseOptions.ignoreAttributes) {
          currentTag.set("params", parseParams(hub, event.params));
          currentTag.set("arguments", parseArguments(hub, event.argument));
          currentTag.set(
            "attributes",
            parseClassnameShorthand(
              hub,
              event.shorthandClassNames,
              parseIDShorthand(
                hub,
                event.shorthandId,
                parseAttributes(hub, event.attributes, tagNameEndPos)
              )
            )
          );
        }

        if (!preservingWhitespaceUntil && parseOptions.preserveWhitespace) {
          preservingWhitespaceUntil = currentTag;
        }
      },

      onCloseTag(event, parser) {
        let { pos, endPos } = event;
        const tag = currentTag;
        const { node } = tag;
        const { tagDef } = node;

        if (preservingWhitespaceUntil === currentTag) {
          preservingWhitespaceUntil = undefined;
        }

        if (!pos) {
          pos = parser.pos;
        }

        if (!endPos) {
          endPos = pos;

          if (wasSelfClosing && !wasConcise) {
            endPos += 2; // account for "/>"
          }
        }

        Object.assign(node, getLocRange(code, node.start, endPos));

        if (
          !wasSelfClosing &&
          !currentTag.get("name").isStringLiteral() &&
          code.slice(pos, endPos) !== "</>"
        ) {
          throw hub.buildError(
            { start: pos, end: endPos },
            `Invalid ending for dynamic tag, expected "</>".`
          );
        }

        if (tagDef && tagDef.nodeFactoryPath) {
          const module = require(tagDef.nodeFactoryPath);
          /* istanbul ignore next */
          const { default: fn = module } = module;
          fn(tag);
        }

        currentTag = currentTag.parentPath.parentPath;
      },

      onfinish() {
        onNext = onNext && onNext();
      },

      onError({ message, pos, endPos }) {
        if (message.includes("EOF")) endPos = pos;
        throw hub.buildError({ start: pos, end: endPos }, message);
      }
    },
    {
      isOpenTagOnly(name) {
        const { parseOptions = EMPTY_OBJECT } =
          hub.lookup.getTag(name) || EMPTY_OBJECT;
        return parseOptions.openTagOnly;
      },
      ignoreNonstandardStringPlaceholders: true,
      ...htmlParseOptions
    }
  ).parse(code, filename);
}
