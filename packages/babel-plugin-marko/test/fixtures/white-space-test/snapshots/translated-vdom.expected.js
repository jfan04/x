import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import { t as _t } from "marko/src/runtime/vdom";

const _marko_template = _t(__filename),
      _marko_componentType = "f5PlznI-";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
  out.be("div", {}, "0", component, 0, 0)
  out.be("div", {}, "1", component, 0, 0)
  out.t("Hello ")
  out.be("div", {}, "2", component, 0, 0)
  out.t(" ")
  out.ee()
  out.t(" World")
  out.ee()
  out.be("div", {}, "3", component, 0, 0)
  out.t(" Hello")
  out.ee()
  out.be("pre", {}, "4", component, 0, 0)
  out.t("\n    This should  \n      be preserved\n  ")
  out.ee()
  out.be("div", {}, "5", component, 0, 0)
  out.be("div", {}, "6", component, 0, 0)
  out.t("Hello ")
  out.ee()
  out.ee()
  out.ee()
  out.be("div", {}, "7", component, 0, 0)
  scriptletA();
  scriptletB();
  out.t("Hello ")
  scriptletC();
  out.t(" World")
  scriptletD();
  out.ee()
}, {
  ___type: _marko_componentType,
  ___implicit: true
})
_marko_template.Component = _marko_defineComponent(null, _marko_template._)
_marko_template.meta = {
  id: _marko_componentType
}
export default _marko_template;