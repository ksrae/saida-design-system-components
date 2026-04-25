import { p as proxyCustomElement, H, h } from './index.js';
import { f as fnAssignPropFromAlias } from './p-Dlcw8XSW.js';

const syBadgeCss = "@charset \"UTF-8\";.sc-sy-badge-h{--badge-size-medium:20px;--badge-size-small:16px;--badge-dot-size-medium:8px;--badge-dot-size-small:6px;display:flex}[standalone].sc-sy-badge-h{display:inline-flex}[standalone].sc-sy-badge-h .badge-content.sc-sy-badge{display:none}.container.sc-sy-badge{position:relative;display:flex;align-items:center;justify-content:center}.badge-content.sc-sy-badge{display:flex}.badge.sc-sy-badge{display:flex;align-items:center;justify-content:center;position:absolute;font-weight:bold;visibility:hidden;box-sizing:border-box;border-radius:var(--border-radius-full);font-family:\"Roboto\";font-size:12px;font-weight:400;line-height:18px;letter-spacing:0}.badge.visible.sc-sy-badge{visibility:visible}.badge.badge-over.sc-sy-badge{padding:0 var(--spacing-2xsmall)}.badge.sc-sy-badge sy-icon.sc-sy-badge{color:inherit}[standalone].sc-sy-badge-h .badge.sc-sy-badge{position:relative}.badge.small.sc-sy-badge{min-width:var(--badge-size-small);height:var(--badge-size-small)}.badge.small.dot.sc-sy-badge{min-width:auto;width:var(--badge-dot-size-small);height:var(--badge-dot-size-small);padding:0}.badge.medium.sc-sy-badge{min-width:var(--badge-size-medium);height:var(--badge-size-medium)}.badge.medium.dot.sc-sy-badge{min-width:auto;width:var(--badge-dot-size-medium);height:var(--badge-dot-size-medium);padding:0}.badge.topRight.sc-sy-badge{top:-10px;right:-10px}.badge.topLeft.sc-sy-badge{top:-10px;left:-10px}.badge.bottomRight.sc-sy-badge{bottom:-10px;right:-10px}.badge.bottomLeft.sc-sy-badge{bottom:-10px;left:-10px}.badge.small.topRight.sc-sy-badge{top:-8px;right:-8px}.badge.small.topLeft.sc-sy-badge{top:-8px;left:-8px}.badge.small.bottomRight.sc-sy-badge{bottom:-8px;right:-8px}.badge.small.bottomLeft.sc-sy-badge{bottom:-8px;left:-8px}.badge.small.dot.topRight.sc-sy-badge{top:-3px;right:-3px}.badge.small.dot.topLeft.sc-sy-badge{top:-3px;left:-3px}.badge.small.dot.bottomRight.sc-sy-badge{bottom:-3px;right:-3px}.badge.small.dot.bottomLeft.sc-sy-badge{bottom:-3px;left:-3px}.badge.medium.dot.topRight.sc-sy-badge{top:-4px;right:-4px}.badge.medium.dot.topLeft.sc-sy-badge{top:-4px;left:-4px}.badge.medium.dot.bottomRight.sc-sy-badge{bottom:-4px;right:-4px}.badge.medium.dot.bottomLeft.sc-sy-badge{bottom:-4px;left:-4px}.badge.badge-red.sc-sy-badge{background-color:var(--badge-error-background-enabled);color:var(--badge-error-text-enabled)}.badge.badge-red.sc-sy-badge sy-icon.sc-sy-badge{color:var(--badge-error-icon-enabled)}.badge.badge-yellow.sc-sy-badge{background-color:var(--badge-warning-background-enabled);color:var(--badge-warning-text-enabled)}.badge.badge-yellow.sc-sy-badge sy-icon.sc-sy-badge{color:var(--badge-warning-icon-enabled)}.badge.badge-green.sc-sy-badge{background-color:var(--badge-success-background-enabled);color:var(--badge-success-text-enabled)}.badge.badge-green.sc-sy-badge sy-icon.sc-sy-badge{color:var(--badge-success-icon-enabled)}.badge.badge-blue.sc-sy-badge{background-color:var(--badge-info-background-enabled);color:var(--badge-info-text-enabled)}.badge.badge-blue.sc-sy-badge sy-icon.sc-sy-badge{color:var(--badge-info-icon-enabled)}.badge.badge-gray.sc-sy-badge{background-color:var(--badge-neutral-background-enabled);color:var(--badge-neutral-text-enabled)}.badge.badge-gray.sc-sy-badge sy-icon.sc-sy-badge{color:var(--badge-neutral-icon-enabled)}";

const SyBadge$1 = /*@__PURE__*/ proxyCustomElement(class SyBadge extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
    }
    get host() { return this; }
    // --- Public Properties (spec: props) ---
    dot = false;
    hidden = false;
    standalone = false;
    overflowCount = Infinity;
    value = 0;
    position = 'topRight';
    size = 'medium';
    variant = 'red';
    displayValue = '';
    // --- Lifecycle ---
    componentWillLoad() {
        this.overflowCount =
            fnAssignPropFromAlias(this.host, 'overflow-count') ?? this.overflowCount;
        this.computeDisplayValue();
    }
    handleValueChange() {
        this.computeDisplayValue();
    }
    // --- Helpers ---
    computeDisplayValue() {
        if (this.dot) {
            this.displayValue = '';
            return;
        }
        const numValue = Math.floor(Number(this.value) || 0);
        if (this.overflowCount !== Infinity && numValue > this.overflowCount) {
            this.displayValue = `${this.overflowCount}+`;
        }
        else {
            this.displayValue = `${numValue}`;
        }
    }
    // --- Render ---
    render() {
        const classNames = {
            badge: true,
            dot: this.dot,
            visible: !this.hidden,
            standalone: this.standalone,
            'badge-over': this.displayValue.length >= 2,
            [`badge-${this.variant}`]: true,
            [this.size]: true,
            [this.position]: !this.standalone,
        };
        const badgeClass = Object.keys(classNames).filter(k => classNames[k]).join(' ');
        // Screen-reader label: "3 unread" is more useful than just "3".
        // Dot badges announce the presence of an indicator via role="status".
        const ariaLabel = this.dot
            ? 'Indicator'
            : (this.hidden ? undefined : this.displayValue);
        return (h("div", { key: '2d10f29cb0a61f49ddd10c7214e69d838a49ad43', class: "container" }, h("span", { key: 'd58f60d1db912c51ce47d5183b63875e98c7b7bc', class: "badge-content" }, h("slot", { key: 'f8dde81f14ae396211a9c0e6d83c78d35c0050d3' })), h("div", { key: '5a95534cc3361bbb7ee0c579e165c5080d6980c4', class: badgeClass, role: "status", "aria-label": ariaLabel, "aria-hidden": this.hidden ? 'true' : 'false' }, this.displayValue)));
    }
    static get watchers() { return {
        "dot": ["handleValueChange"],
        "value": ["handleValueChange"],
        "overflowCount": ["handleValueChange"]
    }; }
    static get style() { return syBadgeCss; }
}, [262, "sy-badge", {
        "dot": [516],
        "hidden": [516],
        "standalone": [516],
        "overflowCount": [1538, "overflowcount"],
        "value": [514],
        "position": [513],
        "size": [513],
        "variant": [513],
        "displayValue": [32]
    }, undefined, {
        "dot": ["handleValueChange"],
        "value": ["handleValueChange"],
        "overflowCount": ["handleValueChange"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-badge"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-badge":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyBadge$1);
            }
            break;
    } });
}

const SyBadge = SyBadge$1;
const defineCustomElement = defineCustomElement$1;

export { SyBadge, defineCustomElement };
