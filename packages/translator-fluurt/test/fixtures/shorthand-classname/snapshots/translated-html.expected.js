export default (input => {
  _write("<div class=\"shorthand\">");

  _write("</div>");

  _write("<div class=\"shorthand1 shorthand2\">");

  _write("</div>");

  _write("<div class=\"shorthand1 shorthand2 inline\">");

  _write("</div>");

  _write(`<div${_attr("class", _classAttr(["shorthand1 shorthand2", dynamic1]))}>`);

  _write("</div>");

  _write(`<div${_attr("class", _classAttr([dynamic1, "inline"]))}>`);

  _write("</div>");

  _write(`<div${_attr("class", _classAttr([dynamic1, "shorthand2", "inline"]))}>`);

  _write("</div>");

  _write(`<div${_attr("class", _classAttr([dynamic1, "shorthand2", dynamic2]))}>`);

  _write("</div>");

  _write(`<div${_attr("class", _classAttr([dynamic2, dynamic3, dynamic1, "shorthand2"]))}>`);

  _write("</div>");

  _write(`<div${_attr("class", _classAttr([dynamic1, dynamic2, "shorthand"]))}>`);

  _write("</div>");

  _write(`<div${_attr("class", _classAttr(["partially-" + dynamic1, "shorthand2", dynamic2]))}>`);

  _write("</div>");
});
import { write as _write, attr as _attr } from "fluurt/html";
import { classAttr as _classAttr } from "fluurt";