import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import { t as _t } from "marko/src/runtime/vdom";

const _hello2 = _t(_hello);

import _hello from "./hello.marko";

const _marko_template = _t(__filename),
      _marko_componentType = "OYtT0PES";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
  _hello2({
    "name": "Frank"
  }, out, "0")
}, {
  ___type: _marko_componentType,
  ___implicit: true
})
_marko_template.Component = _marko_defineComponent(null, _marko_template._)
_marko_template.meta = {
  id: _marko_componentType,
  tags: ["./hello.marko"]
}
export default _marko_template;