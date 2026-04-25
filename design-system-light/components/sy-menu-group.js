import { p as proxyCustomElement, H, h } from './index.js';

const syMenuGroupCss = ".sc-sy-menu-group-h,.sc-sy-menu-group:root{display:block;margin:var(--spacing-xsmall) 0}.sc-sy-menu-group-h .group-title.sc-sy-menu-group,.sc-sy-menu-group:root .group-title.sc-sy-menu-group{display:inline-flex;align-items:center;white-space:nowrap;padding-left:var(--spacing-xsmall);padding-right:var(--spacing-xsmall);height:var(--component-medium);background-color:var(--menu-dropdownmenu-background-enabled);color:var(--menu-grouptitle-text-enabled);cursor:auto;gap:var(--spacing-3xsmall)}.sc-sy-menu-group-h .group-content.sc-sy-menu-group,.sc-sy-menu-group:root .group-content.sc-sy-menu-group{padding:0px}sy-menu-group.sc-sy-menu-group-h{margin:0px;padding:0px}";

const SyMenuGroup$1 = /*@__PURE__*/ proxyCustomElement(class SyMenuGroup extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
    }
    get host() { return this; }
    menuGroupTitle = '';
    sanitizeHtml(content) {
        if (!content)
            return '';
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        return tempDiv.innerText.trim();
    }
    render() {
        const safeTitle = this.sanitizeHtml(this.menuGroupTitle);
        return (h("div", { key: 'f9290958bd64ecd7a8443a7f164f97f92e015815' }, h("div", { key: '8136398c8c6463501a48a48a898472a5cf11f648', class: "group-title", title: safeTitle }, safeTitle), h("div", { key: '849334e4b09eca7c1fdab65b21beeb5fca77329b', class: "group-content" }, h("slot", { key: 'a9e374978322e310783e275cb6504791bebc5a0d' }))));
    }
    static get style() { return syMenuGroupCss; }
}, [262, "sy-menu-group", {
        "menuGroupTitle": [1, "title"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-menu-group"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-menu-group":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyMenuGroup$1);
            }
            break;
    } });
}

const SyMenuGroup = SyMenuGroup$1;
const defineCustomElement = defineCustomElement$1;

export { SyMenuGroup, defineCustomElement };
