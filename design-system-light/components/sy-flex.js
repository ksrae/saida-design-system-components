import { p as proxyCustomElement, H, h } from './index.js';
import { f as fnAssignPropFromAlias } from './p-Dlcw8XSW.js';

const syFlexCss = ":host{display:inline-flex}.flex-container{display:flex;box-sizing:border-box;align-items:flex-start;text-align:start}.flex-container>*{flex-shrink:0;flex-grow:0}.flex-container.horizontal{flex-direction:row}.flex-container.vertical{flex-direction:column}sy-flex[direction=horizontal-reverse] .flex-container{flex-direction:row-reverse}sy-flex[direction=vertical-reverse] .flex-container{flex-direction:column-reverse}sy-flex[wrap=wrap] .flex-container{flex-wrap:wrap}sy-flex[wrap=nowrap] .flex-container{flex-wrap:nowrap;overflow:auto}sy-flex[wrap=wrap-reverse] .flex-container{flex-wrap:wrap-reverse}sy-flex[align=start] .flex-container{align-items:flex-start}sy-flex[align=center] .flex-container{align-items:center}sy-flex[align=end] .flex-container{align-items:flex-end}sy-flex[align=baseline] .flex-container{align-items:baseline}sy-flex[align=stretch] .flex-container{align-items:stretch}sy-flex[justify=start] .flex-container{justify-content:flex-start}sy-flex[justify=center] .flex-container{justify-content:center}sy-flex[justify=end] .flex-container{justify-content:flex-end}sy-flex[justify=space-between] .flex-container{justify-content:space-between}sy-flex[justify=space-around] .flex-container{justify-content:space-around}sy-flex[justify=space-evenly] .flex-container{justify-content:space-evenly}sy-flex[columngap=xsmall] .flex-container{column-gap:2px}sy-flex[columngap=small] .flex-container{column-gap:4px}sy-flex[columngap=medium] .flex-container{column-gap:8px}sy-flex[columngap=large] .flex-container{column-gap:12px}sy-flex[columngap=xlarge] .flex-container{column-gap:16px}sy-flex[rowgap=xsmall] .flex-container{row-gap:2px}sy-flex[rowgap=small] .flex-container{row-gap:4px}sy-flex[rowgap=medium] .flex-container{row-gap:8px}sy-flex[rowgap=large] .flex-container{row-gap:12px}sy-flex[rowgap=xlarge] .flex-container{row-gap:16px}sy-flex[padding=xsmall] .flex-container{padding:var(--spacing-3xsmall)}sy-flex[padding=small] .flex-container{padding:var(--spacing-3xsmall)}sy-flex[padding=medium] .flex-container{padding:var(--spacing-small)}sy-flex[padding=large] .flex-container{padding:var(--spacing-medium)}sy-flex[padding=xlarge] .flex-container{padding:var(--spacing-large)}";

const SyFlex$1 = /*@__PURE__*/ proxyCustomElement(class SyFlex extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
    }
    get host() { return this; }
    align = 'start';
    rowGap = 'medium';
    columnGap = 'medium';
    // Spec adds `space-around` and `space-evenly` on top of the legacy values.
    justify = 'start';
    direction = "horizontal";
    wrap = 'nowrap';
    padding = 'medium';
    width = '';
    height = '';
    containerWidth = '';
    containerHeight = '';
    componentWillLoad() {
        // Support attribute aliases (kebab-case)
        this.rowGap = fnAssignPropFromAlias(this.host, 'row-gap') ?? this.rowGap;
        this.columnGap = fnAssignPropFromAlias(this.host, 'column-gap') ?? this.columnGap;
        // Set initial width/height on host and internal container
        this.updateHostDimensions();
    }
    updateHostDimensions() {
        // compute container size values (use px for numeric values, otherwise pass through)
        if (this.width) {
            const w = this.getSizeValue(this.width);
            this.containerWidth = w;
        }
        else {
            // default inner container has no explicit width
            this.containerWidth = '';
        }
        if (this.height) {
            const h = this.getSizeValue(this.height);
            this.containerHeight = h;
        }
        else {
            this.containerHeight = '';
        }
    }
    getSizeValue(value) {
        if (!value)
            return '';
        if (/^\d+$/.test(value))
            return `${value}px`;
        return value;
    }
    render() {
        // apply direction classes and inline styles to the inner container
        const cls = `flex-container ${this.direction === 'vertical' || this.direction === 'vertical-reverse' ? 'vertical' : 'horizontal'}`;
        const containerStyle = {};
        if (this.containerWidth) {
            containerStyle.width = this.containerWidth;
        }
        if (this.containerHeight) {
            containerStyle.height = this.containerHeight;
        }
        return (h("div", { key: 'b464a7a8f01ec9b4fb3fdc39184f84f072da2a3c', class: cls, style: containerStyle }, h("slot", { key: '6a009982cf5a8d5665b26a3840a20acf8b409e5a' })));
    }
    static get watchers() { return {
        "width": ["updateHostDimensions"],
        "height": ["updateHostDimensions"]
    }; }
    static get style() { return syFlexCss; }
}, [260, "sy-flex", {
        "align": [513],
        "rowGap": [1537, "rowgap"],
        "columnGap": [1537, "columngap"],
        "justify": [513],
        "direction": [513],
        "wrap": [513],
        "padding": [513],
        "width": [513],
        "height": [513],
        "containerWidth": [32],
        "containerHeight": [32]
    }, undefined, {
        "width": ["updateHostDimensions"],
        "height": ["updateHostDimensions"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-flex"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-flex":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyFlex$1);
            }
            break;
    } });
}

const SyFlex = SyFlex$1;
const defineCustomElement = defineCustomElement$1;

export { SyFlex, defineCustomElement };
