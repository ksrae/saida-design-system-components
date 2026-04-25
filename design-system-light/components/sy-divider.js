import { p as proxyCustomElement, H, h } from './index.js';

const syDividerCss = "@charset \"UTF-8\";.sc-sy-divider-h{--border-small:1px solid;--divider-horizontal-border-enabled:#e0e0e0;--divider-vertical-border-enabled:#e0e0e0}[inset][type=horizontal].sc-sy-divider-h .horizontal.sc-sy-divider{margin-left:var(--spacing-medium);margin-right:var(--spacing-medium)}[inset][type=vertical].sc-sy-divider-h .vertical.sc-sy-divider{margin-top:var(--spacing-medium);margin-bottom:var(--spacing-medium)}[type=horizontal].sc-sy-divider-h{display:block;width:100%;margin:1rem 0}[type=vertical].sc-sy-divider-h{display:block;height:100%;margin:0 1rem}.horizontal.sc-sy-divider{display:block;width:100%;height:fit-content}.horizontal.divider--small.sc-sy-divider{border-top:var(--border-small) var(--divider-horizontal-border-enabled)}.vertical.sc-sy-divider{display:block;height:100%;width:fit-content}.vertical.divider--small.sc-sy-divider{border-left:var(--border-small) var(--divider-vertical-border-enabled)}";

const SyDivider$1 = /*@__PURE__*/ proxyCustomElement(class SyDivider extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
    }
    get host() { return this; }
    // --- Public Properties (spec: attributes) ---
    type = 'horizontal';
    inset = false;
    thickness = 1;
    color = '';
    connectedCallback() {
        this.host.setAttribute('role', 'separator');
        this.host.setAttribute('aria-orientation', this.type);
    }
    render() {
        const classes = {
            horizontal: this.type === 'horizontal',
            vertical: this.type === 'vertical',
            'divider--inset': this.inset,
            'divider--small': true,
        };
        // Inline style overrides token defaults when custom thickness/color are given.
        const inlineStyle = {};
        if (this.thickness && this.thickness !== 1) {
            if (this.type === 'horizontal')
                inlineStyle.borderTopWidth = `${this.thickness}px`;
            else
                inlineStyle.borderLeftWidth = `${this.thickness}px`;
        }
        if (this.color) {
            if (this.type === 'horizontal')
                inlineStyle.borderTopColor = this.color;
            else
                inlineStyle.borderLeftColor = this.color;
        }
        return (h("div", { key: 'e8254fd4984a311fa511a057e688e6211dbdb2c5', class: Object.keys(classes).filter((key) => classes[key]).join(' '), style: inlineStyle }));
    }
    static get style() { return syDividerCss; }
}, [258, "sy-divider", {
        "type": [513],
        "inset": [516],
        "thickness": [2],
        "color": [1]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-divider"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-divider":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyDivider$1);
            }
            break;
    } });
}

const SyDivider = SyDivider$1;
const defineCustomElement = defineCustomElement$1;

export { SyDivider, defineCustomElement };
