import { x as _marko_escapeXml } from "marko/src/runtime/html/helpers";
import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/runtime/components/helpers";
import { t as _t } from "marko/src/runtime/html";

const _marko_componentType = "hXm4QTQF",
      _marko_template = _t(__filename),
      _marko_component = null;

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  out.w(`Hello ${_marko_escapeXml(input.name)}! `);

  if (input.colors.length) {
    out.w("<ul>");

    for (const color of input.colors) {
      out.w(`<li>${_marko_escapeXml(color)}</li>`);
    }

    out.w("</ul>");
  } else {
    out.w("<div>No colors!</div>");
  }
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);
_marko_template.Component = _marko_defineComponent(_marko_component, _marko_template._);
_marko_template.meta = {
  id: _marko_componentType
};
export default _marko_template;