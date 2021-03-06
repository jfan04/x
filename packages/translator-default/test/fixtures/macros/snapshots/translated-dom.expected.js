const _marko_template = _t(__filename);

export default _marko_template;
import { d as _marko_dynamicTag } from "marko/src/runtime/dom/helpers";
import { r as _marko_renderer, c as _marko_defineComponent, rc as _marko_registerComponent } from "marko/src/runtime/components/helpers";
import { t as _t } from "marko/src/runtime/dom";

const _marko_componentType = _marko_registerComponent("hLnr707b", () => _marko_template),
      _marko_component = {};

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  function _renderTree(out, node) {
    out.t("Name: ");
    out.t(node.name);
    out.t(" Children: ");

    if (node.children) {
      out.be("ul", null, "2", component, null, 0);

      for (const child of node.children) {
        out.be("li", null, "4", component, null, 0);

        _marko_dynamicTag(out, _renderTree, () => ({ ...child
        }), null, null, null, _component, "5");

        out.ee();
      }

      out.ee();
    }
  }

  _marko_dynamicTag(out, _renderTree, () => ({ ...input.node
  }), null, null, null, _component, "6");
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);
_marko_template.Component = _marko_defineComponent(_marko_component, _marko_template._);
_marko_template.meta = {
  id: _marko_componentType
};