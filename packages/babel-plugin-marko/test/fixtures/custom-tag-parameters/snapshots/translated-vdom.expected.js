import _customTag from "./components/custom-tag.marko";
import { t as _t } from "marko/src/runtime/vdom/helpers";

const _customTag_tag = _t(_customTag);

import { r as _marko_renderer, c as _marko_defineComponent, rc as _marko_registerComponent } from "marko/src/runtime/components/helpers";
import { t as _t2 } from "marko/src/runtime/vdom";

const _marko_template = _t2(__filename),
      _marko_componentType = _marko_registerComponent("ZPxK-KiM", () => _marko_template),
      _marko_component = {};

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  _customTag_tag({
    "renderBody": (out, a, b, {
      c
    }) => {
      out.be("div", null, "0", component, null, 0);
      out.t(a);
      out.t(" ");
      out.t(b);
      out.t(" ");
      out.t(c);
      out.ee();
    }
  }, out, "1");
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);
_marko_template.Component = _marko_defineComponent(_marko_component, _marko_template._);
_marko_template.meta = {
  id: _marko_componentType,
  tags: ["./components/custom-tag.marko"]
};
export default _marko_template;