import { p as proxyCustomElement, H, h } from './index.js';
import { a as fnHasSlotContentByName } from './p-Dlcw8XSW.js';
import { d as defineCustomElement$1 } from './p-DA_POXvZ.js';

const syEmptyCss = ".empty-wrapper.sc-sy-empty{height:100%;display:flex;align-items:center;justify-content:center}.empty-wrapper.sc-sy-empty .empty.sc-sy-empty{display:flex;flex-direction:column;align-items:center;padding:var(--spacing-3xsmall)}.empty-wrapper.sc-sy-empty .empty.sc-sy-empty sy-icon.sc-sy-empty{fill:var(--empty-default-icon-enabled);width:40px;height:40px;display:inline-flex;justify-content:center;align-items:center}.empty-wrapper.sc-sy-empty .empty.sc-sy-empty .description.sc-sy-empty{color:var(--empty-default-text-enabled)}";

const SyEmpty = /*@__PURE__*/ proxyCustomElement(class SyEmpty extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
    }
    get host() { return this; }
    // --- Public Properties (spec: attributes) ---
    text = 'No Data';
    icon = '';
    /** Legacy: was a string message; spec defines it as a boolean visibility flag.
     *  Non-empty strings are accepted for back-compat and promoted to `text`. */
    description = true;
    componentWillLoad() {
        // Back-compat: if `description` arrives as a non-empty string that isn't "true"/"false",
        // treat it as the legacy message text and leave `description` as truthy.
        if (typeof this.description === 'string') {
            const trimmed = this.description.trim().toLowerCase();
            if (trimmed !== 'true' && trimmed !== 'false' && trimmed.length > 0) {
                if (!this.text || this.text === 'No Data') {
                    this.text = this.description;
                }
                this.description = true;
            }
        }
    }
    shouldShowText() {
        if (this.description === false)
            return false;
        if (typeof this.description === 'string' && this.description.trim().toLowerCase() === 'false')
            return false;
        return !!this.text && this.text.length > 0;
    }
    render() {
        const hasIconSlot = fnHasSlotContentByName(this.host, 'icon');
        return (h("div", { key: '52c918596be1c641030d809edf01ab119225ffe9', class: "empty-wrapper", role: "status", "aria-live": "polite" }, h("div", { key: 'be63b7f9fcc997e5e4f0ee28ac203b960f1e7204', class: "empty" }, hasIconSlot ? (h("slot", { name: "icon" })) : (h("sy-icon", { size: "xxxlarge" }, h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { d: "M139.3 158C140.3 150 147.1 144 155.2 144L484.9 144C492.9 144 499.7 150 500.8 158L525.8 352L440.6 352C427.2 352 414.7 358.7 407.3 369.8L387.2 400L252.9 400L232.8 369.8C225.4 358.7 212.9 352 199.5 352L114.3 352L139.3 158zM112 400L195.2 400L215.3 430.2C222.7 441.3 235.2 448 248.6 448L391.5 448C404.9 448 417.4 441.3 424.8 430.2L444.9 400L528.1 400L528.1 480C528.1 488.8 520.9 496 512.1 496L128 496C119.2 496 112 488.8 112 480L112 400zM155.2 96C123 96 95.8 119.9 91.7 151.8L64.2 364.9L64 366.5L64 480C64 515.3 92.7 544 128 544L512 544C547.3 544 576 515.3 576 480L576 366.5L575.8 365L548.3 151.9C544.2 119.9 517 96 484.8 96L155.2 96z" })))), this.shouldShowText() && (h("span", { key: '6c92fb5fe6a52cd25d142b67f90088a82fd8f317', class: "description" }, this.text)), h("slot", { key: '7d486944a91a45378a1e737d7a17c6c94f2789c5' }))));
    }
    static get style() { return syEmptyCss; }
}, [262, "sy-empty", {
        "text": [1025],
        "icon": [1],
        "description": [1032]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-empty", "sy-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-empty":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyEmpty);
            }
            break;
        case "sy-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { SyEmpty as S, defineCustomElement as d };
