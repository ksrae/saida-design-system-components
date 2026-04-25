import { p as proxyCustomElement, H, h } from './index.js';

const syTabContentCss = ".sc-sy-tab-content-h{display:none}[active].sc-sy-tab-content-h{display:block}";

const SyTabContent$1 = /*@__PURE__*/ proxyCustomElement(class SyTabContent extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
    }
    get host() { return this; }
    active = false;
    disabled = false;
    name;
    render() {
        return h("slot", { key: 'bbfa38bf7231f459ee2484b100fded95c47aa3fa' });
    }
    static get style() { return syTabContentCss; }
}, [262, "sy-tab-content", {
        "active": [516],
        "disabled": [516],
        "name": [513]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-tab-content"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-tab-content":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyTabContent$1);
            }
            break;
    } });
}

const SyTabContent = SyTabContent$1;
const defineCustomElement = defineCustomElement$1;

export { SyTabContent, defineCustomElement };
