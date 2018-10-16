import { t as _t } from "marko/src/html";
import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import _testHello from "./tags/test-hello/renderer.js";

const _marko_template = _t(__filename),
      _marko_componentType = "/babel-preset-marko$1.0.0/test/fixtures-html/custom-tag/template.marko";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
  _testHello({
    "name": "World"
  }, out, "0")
}, {
  ___type: _marko_componentType
})
_marko_template.Component = _marko_defineComponent(null, _marko_template._)
_marko_template.meta = {
  id: "/babel-preset-marko$1.0.0/test/fixtures-html/custom-tag/template.marko",
  tags: ["./tags/test-hello/renderer.js"]
}
export default _marko_template;