import { r as _marko_renderer, c as _marko_defineComponent, rc as _marko_registerComponent } from "marko/src/runtime/components/helpers";
import { t as _t } from "marko/src/runtime/vdom";

const _marko_template = _t(__filename),
      _marko_componentType = _marko_registerComponent("f5PlznI-", () => _marko_template),
      _marko_component = {};

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  out.be("div", null, "6", component, null, 0);
  out.be("div", null, "1", component, null, 0);
  out.t("Hello ");
  out.be("div", null, "0", component, null, 0);
  out.t(" ");
  out.ee();
  out.t(" World");
  out.ee();
  out.be("div", null, "2", component, null, 0);
  out.t(" Hello");
  out.ee();
  out.be("pre", null, "3", component, null, 0);
  out.t("\n    This should  \n      be preserved\n  ");
  out.ee();
  out.be("div", null, "5", component, null, 0);
  out.be("div", null, "4", component, null, 0);
  out.t("Hello ");
  out.ee();
  out.ee();
  out.ee();
  out.be("div", null, "7", component, null, 0);
  scriptletA();
  scriptletB();
  out.t("Hello ");
  scriptletC();
  out.t(" World");
  scriptletD();
  out.ee();
  out.t(" Hello World! ");
  out.t(a);
  out.t(b);
  out.be("div", null, "8", component, 0, 0);
  out.ee();
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);
_marko_template.Component = _marko_defineComponent(_marko_component, _marko_template._);
_marko_template.meta = {
  id: _marko_componentType
};
export default _marko_template;