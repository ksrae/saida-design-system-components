import { p as proxyCustomElement, H, h } from './index.js';
import { d as defineCustomElement$2 } from './p-DA_POXvZ.js';

const syCardCss = ":host{display:block;width:100%}.card{display:flex;flex-direction:column;height:100%;border:1px solid var(--card-container-border-enabled);border-radius:var(--border-radius-small);background-color:var(--card-container-background-enabled);overflow:hidden}.card-backdrop{box-shadow:var(--box-shadow)}[slot=cover]{display:block;font-size:0}[slot=cover] img{display:block;width:100%;height:auto}.card-header-wrapper{display:flex;align-items:center;padding:var(--spacing-2xsmall) var(--spacing-small);min-height:var(--component-large);box-sizing:border-box}.card-header-wrapper:has([slot=header]:not(:empty)){border-bottom:1px solid var(--card-body-border-enabled)}.card-header-wrapper>sy-icon{margin-right:var(--spacing-small);cursor:pointer}[slot=header]{display:flex;align-items:center;justify-content:space-between;width:100%;font-weight:bold;color:var(--card-header-text-enabled)}.card-content{overflow:hidden}.card-content.collapsed{display:none}.card-content>.card-body{padding:var(--spacing-small)}[slot=footer]{padding:var(--spacing-2xsmall) var(--spacing-small);border-top:1px solid var(--card-body-border-enabled)}.card-header-wrapper:has([slot=header]:empty):not(:has(sy-icon)),[slot=footer]:empty{display:none}";

const SyCard$1 = /*@__PURE__*/ proxyCustomElement(class SyCard extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
    }
    get el() { return this; }
    // --- Public Properties (spec: props) ---
    collapsible = false;
    backdrop = false;
    openDelay = 0;
    closeDelay = 0;
    // --- Private State ---
    isCollapsed = false;
    hasHeaderSlot = false;
    pendingToggleTimer;
    mutationObserver = null;
    componentWillLoad() {
        this.checkHeaderSlot();
    }
    componentDidLoad() {
        this.checkHeaderSlot();
        this.mutationObserver = new MutationObserver(() => this.checkHeaderSlot());
        this.mutationObserver.observe(this.el, { childList: true, subtree: true });
    }
    disconnectedCallback() {
        if (this.pendingToggleTimer !== undefined) {
            window.clearTimeout(this.pendingToggleTimer);
            this.pendingToggleTimer = undefined;
        }
        if (this.mutationObserver) {
            this.mutationObserver.disconnect();
            this.mutationObserver = null;
        }
    }
    checkHeaderSlot = () => {
        this.hasHeaderSlot = !!this.el.querySelector('[slot="header"]');
    };
    toggle = () => {
        if (this.pendingToggleTimer !== undefined) {
            window.clearTimeout(this.pendingToggleTimer);
            this.pendingToggleTimer = undefined;
        }
        const willCollapse = !this.isCollapsed;
        const delay = willCollapse ? this.closeDelay : this.openDelay;
        if (delay > 0) {
            this.pendingToggleTimer = window.setTimeout(() => {
                this.isCollapsed = willCollapse;
                this.pendingToggleTimer = undefined;
            }, delay);
        }
        else {
            this.isCollapsed = willCollapse;
        }
    };
    render() {
        const showCollapseIcon = this.collapsible && this.hasHeaderSlot;
        const bodyId = 'card-body';
        return (h("div", { key: '63fe49ce0b59bc7523e82de819f4f3caeea1a221', class: {
                'card': true,
                'card-backdrop': this.backdrop,
            }, role: "region", "aria-label": "Card" }, h("slot", { key: '72c4357782734cd9e9dbc300193aa77ab4d93ae2', name: "cover" }), h("div", { key: 'ba71e46dd0dc2dfbc907e6ba732d4445db59c7eb', class: "card-header-wrapper" }, showCollapseIcon && (h("sy-icon", { key: 'fcd803d0a908c0814772b5d6d21b31ccc0daafed', selectable: true, onSelected: this.toggle, "aria-expanded": !this.isCollapsed ? 'true' : 'false', "aria-controls": bodyId, "aria-label": this.isCollapsed ? 'Expand card' : 'Collapse card' }, this.isCollapsed ? (h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { fill: "currentColor", d: "M303.5 473C312.9 482.4 328.1 482.4 337.4 473L537.4 273C546.8 263.6 546.8 248.4 537.4 239.1C528 229.8 512.8 229.7 503.5 239.1L320.5 422.1L137.5 239.1C128.1 229.7 112.9 229.7 103.6 239.1C94.3 248.5 94.2 263.7 103.6 273L303.6 473z" }))) : (h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { fill: "currentColor", d: "M303.5 167C312.9 157.6 328.1 157.6 337.4 167L537.4 367C546.8 376.4 546.8 391.6 537.4 400.9C528 410.2 512.8 410.3 503.5 400.9L320.5 217.9L137.5 400.9C128.1 410.3 112.9 410.3 103.6 400.9C94.3 391.5 94.2 376.3 103.6 367L303.6 167z" }))))), h("slot", { key: '0270074f523c7166138ff2d5dd7972d7418b05de', name: "header" })), h("div", { key: '5b638c18af1b644868e6277850f85c36d2c9098f', id: bodyId, class: { 'card-content': true, 'collapsed': this.collapsible && this.isCollapsed }, "aria-hidden": this.collapsible && this.isCollapsed ? 'true' : 'false' }, h("slot", { key: '9e6c9014d5c25cd7c6e94fb1c0be2186aa0d8c56' })), h("slot", { key: '18cc3bd2127e34e827188ae7020e23609eb28df7', name: "footer" })));
    }
    static get style() { return syCardCss; }
}, [260, "sy-card", {
        "collapsible": [516],
        "backdrop": [516],
        "openDelay": [2, "open-delay"],
        "closeDelay": [2, "close-delay"],
        "isCollapsed": [32],
        "hasHeaderSlot": [32]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-card", "sy-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-card":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyCard$1);
            }
            break;
        case "sy-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const SyCard = SyCard$1;
const defineCustomElement = defineCustomElement$1;

export { SyCard, defineCustomElement };
