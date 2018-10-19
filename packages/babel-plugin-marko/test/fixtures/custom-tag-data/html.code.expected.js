import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import { t as _t } from "marko/src/runtime/html";

const _customTagData2 = _t(_customTagData);

import _customTagData from "./custom-tag-data-tag.js";

const _marko_template = _t(__filename),
      _marko_componentType = "9G-EElad";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
  _customTagData2({
    "name": "Frank".toUpperCase(),
    "age": 32
  }, out, "0")
}, {
  ___type: _marko_componentType,
  ___implicit: true
})
_marko_template.Component = _marko_defineComponent(null, _marko_template._)
_marko_template.meta = {
  id: _marko_componentType,
  tags: ["./custom-tag-data-tag.js"]
}
export default _marko_template;