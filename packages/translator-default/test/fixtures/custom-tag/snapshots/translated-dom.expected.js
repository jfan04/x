const _marko_template = _t2(__filename);

export default _marko_template;
import _testHello from "./tags/test-hello/renderer.js";
import { t as _t } from "marko/src/runtime/dom/helpers";

const _testHello_tag = _t(_testHello);

import { r as _marko_renderer, c as _marko_defineComponent, rc as _marko_registerComponent } from "marko/src/runtime/components/helpers";
import { t as _t2 } from "marko/src/runtime/dom";

const _marko_componentType = _marko_registerComponent("UM93_BkK", () => _marko_template),
      _marko_component = {};

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  _testHello_tag({
    "name": "World"
  }, out, _component, "0");
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);
_marko_template.Component = _marko_defineComponent(_marko_component, _marko_template._);
_marko_template.meta = {
  id: _marko_componentType,
  tags: ["./tags/test-hello/renderer.js"]
};