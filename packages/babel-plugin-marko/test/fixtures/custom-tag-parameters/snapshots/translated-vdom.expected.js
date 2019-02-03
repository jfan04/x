import _customTag from "./components/custom-tag.marko";
import { t as _t } from "marko/src/runtime/vdom/helpers";

const _customTag_tag = _t(_customTag);

import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import { t as _t2 } from "marko/src/runtime/vdom";

const _marko_template = _t2(__filename),
      _marko_componentType = "ZPxK-KiM";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
  _customTag_tag({
    "renderBody": (out, a, b, {
      c
    }) => {
      out.be("div", {}, "1", component, 0, 0);
      out.t(a);
      out.t(" ");
      out.t(b);
      out.t(" ");
      out.t(c);
      out.ee();
    }
  }, out, "0")
}, {
  ___type: _marko_componentType,
  ___implicit: true
})
_marko_template.Component = _marko_defineComponent(null, _marko_template._)
_marko_template.meta = {
  id: _marko_componentType,
  tags: ["./components/custom-tag.marko"]
}
export default _marko_template;