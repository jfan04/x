export default (input => {
  out.w("<div>");
  out.w("<div>");
  out.w("Hello ");
  out.w("<div>");
  out.w(" ");
  out.w("</div>");
  out.w(" World");
  out.w("</div>");
  out.w("<div>");
  out.w(" Hello");
  out.w("</div>");
  out.w("<pre>");
  out.w("\n    This should  \n      be preserved\n  ");
  out.w("</pre>");
  out.w("<div>");
  out.w("<div>");
  out.w("Hello ");
  out.w("</div>");
  out.w("</div>");
  out.w("</div>");
  out.w("<div>");
  out.w("Hello ");
  out.w("World ");
  out.w("</div>");
  out.w(" Hello World! ");
  out.w(_marko_escapeXml(a));
  out.w(_marko_escapeXml(b));
  out.w("<div>");
  out.w("</div>");
});
import { x as _marko_escapeXml } from "marko/src/runtime/html/helpers";