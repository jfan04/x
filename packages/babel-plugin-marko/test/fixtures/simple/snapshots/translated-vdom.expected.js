import { r as _marko_renderer, c as _marko_defineComponent, rc as _marko_registerComponent } from "marko/src/runtime/components/helpers";
import { t as _t } from "marko/src/runtime/vdom";

const _marko_template = _t(__filename),
      _marko_componentType = _marko_registerComponent("hXm4QTQF", () => _marko_template),
      _marko_component = {};

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  out.t("Hello ");
  out.t(input.name);
  out.t("! ");

  if (input.colors.length) {
    out.be("ul", null, "1", component, null, 0);

    for (const color of input.colors) {
      out.be("li", null, "3", component, null, 0);
      out.t(color);
      out.ee();
    }

    out.ee();
  } else {
    out.be("div", null, "5", component, null, 0);
    out.t("No colors!");
    out.ee();
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