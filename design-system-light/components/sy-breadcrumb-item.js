import { p as proxyCustomElement, H, c as createEvent, f as forceUpdate, h } from './index.js';
import { f as fnAssignPropFromAlias } from './p-Dlcw8XSW.js';
import { d as defineCustomElement$2 } from './p-DA_POXvZ.js';

const syBreadcrumbCss = "@charset \"UTF-8\";.sc-sy-breadcrumb-item:root,.sc-sy-breadcrumb-item-h{display:inline-flex;align-items:center}.sc-sy-breadcrumb-item:root .breadcrumb.sc-sy-breadcrumb-item,.sc-sy-breadcrumb-item-h .breadcrumb.sc-sy-breadcrumb-item{display:flex;align-items:center}.sc-sy-breadcrumb-item:root .breadcrumb--item.sc-sy-breadcrumb-item,.sc-sy-breadcrumb-item-h .breadcrumb--item.sc-sy-breadcrumb-item{cursor:pointer;display:inline-flex;align-items:center;height:22px;color:var(--breadcrumb-previous-default-text-enabled);line-height:normal;user-select:none}.sc-sy-breadcrumb-item:root .breadcrumb--item.sc-sy-breadcrumb-item:hover,.sc-sy-breadcrumb-item-h .breadcrumb--item.sc-sy-breadcrumb-item:hover{color:var(--breadcrumb-previous-default-text-hover)}.sc-sy-breadcrumb-item:root .breadcrumb--item.sc-sy-breadcrumb-item:focus-visible,.sc-sy-breadcrumb-item-h .breadcrumb--item.sc-sy-breadcrumb-item:focus-visible{outline:var(--border-small) var(--focus-outline, var(--button-primary-border-focus));outline-offset:2px}.sc-sy-breadcrumb-item:root .breadcrumb--item.breadcrumb--item-current.sc-sy-breadcrumb-item,.sc-sy-breadcrumb-item-h .breadcrumb--item.breadcrumb--item-current.sc-sy-breadcrumb-item{color:var(--breadcrumb-current-default-text-enabled);cursor:default}.sc-sy-breadcrumb-item:root .breadcrumb--item.breadcrumb--item-disabled.sc-sy-breadcrumb-item,.sc-sy-breadcrumb-item-h .breadcrumb--item.breadcrumb--item-disabled.sc-sy-breadcrumb-item{cursor:not-allowed;opacity:0.6}.sc-sy-breadcrumb-item:root .breadcrumb--item.breadcrumb--item-disabled.sc-sy-breadcrumb-item:hover,.sc-sy-breadcrumb-item-h .breadcrumb--item.breadcrumb--item-disabled.sc-sy-breadcrumb-item:hover{color:var(--breadcrumb-previous-default-text-enabled)}.sc-sy-breadcrumb-item:root .separator.sc-sy-breadcrumb-item,.sc-sy-breadcrumb-item-h .separator.sc-sy-breadcrumb-item{display:inline-flex;align-items:center;justify-content:center;color:var(--breadcrumb-previous-withicon-icon-enabled);padding:5px}sy-breadcrumb-item.sc-sy-breadcrumb-item-h .breadcrumb--item.sc-sy-breadcrumb-item:hover{color:var(--breadcrumb-previous-default-text-hover)}";

const SyBreadcrumbItem$1 = /*@__PURE__*/ proxyCustomElement(class SyBreadcrumbItem extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.selected = createEvent(this, "selected");
    }
    get host() { return this; }
    // --- Public Properties ---
    active = false;
    disabled = false;
    /** Per-item override of the parent breadcrumb's separator choice. */
    separator;
    /** Set by the parent `sy-breadcrumb` to inherit its separator. */
    parentSeparator = 'slash';
    /** Set by the parent `sy-breadcrumb`. When true, no trailing separator is rendered. */
    isLast = false;
    hasFocus = false;
    selected;
    componentWillLoad() {
        this.parentSeparator =
            fnAssignPropFromAlias(this.host, 'parent-separator') ?? this.parentSeparator;
    }
    /** Public so that the parent breadcrumb can re-trigger a render after updating props. */
    async forceUpdate() {
        forceUpdate(this);
    }
    // --- Interaction ---
    isInteractive() {
        return !this.disabled && !this.active;
    }
    emitSelected() {
        if (!this.isInteractive())
            return;
        this.selected.emit(this.host);
    }
    handleFocus = () => {
        if (this.isInteractive())
            this.hasFocus = true;
    };
    handleBlur = () => { this.hasFocus = false; };
    handleClick = () => { this.emitSelected(); };
    handleKeydown = (e) => {
        if (!this.isInteractive())
            return;
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault();
            this.emitSelected();
        }
    };
    render() {
        const finalSeparator = this.separator || this.parentSeparator;
        const arrowIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M433.5 303C442.9 312.4 442.9 327.6 433.5 336.9L273.5 497C264.1 506.4 248.9 506.4 239.6 497C230.3 487.6 230.2 472.4 239.6 463.1L382.6 320.1L239.6 177.1C230.2 167.7 230.2 152.5 239.6 143.2C249 133.9 264.2 133.8 273.5 143.2L433.5 303.2z"/></svg>';
        const slashIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M468.1 67.3C479.5 74 483.4 88.7 476.7 100.1L204.7 564.1C198 575.5 183.3 579.4 171.9 572.7C160.5 566 156.6 551.3 163.3 539.9L435.3 75.9C442 64.4 456.7 60.6 468.1 67.3z"/></svg>';
        const interactive = this.isInteractive();
        return [
            h("span", { key: 'd3e258d1cfdf93ae2666ab6ec0f6606ed8a7030e', class: {
                    'breadcrumb--item': true,
                    'breadcrumb--item-focused': this.hasFocus,
                    'breadcrumb--item-current': !this.disabled && this.active,
                    'breadcrumb--item-disabled': this.disabled,
                }, role: "link", tabindex: interactive ? 0 : -1, "aria-current": this.active ? 'page' : null, "aria-disabled": this.disabled ? 'true' : null, onFocus: this.handleFocus, onMouseEnter: this.handleFocus, onBlur: this.handleBlur, onMouseLeave: this.handleBlur, onClick: this.handleClick, onKeyDown: this.handleKeydown }, h("slot", { key: 'ae66ef87e0b6d1af9713489146a83c13c6e1b07a' })),
            !this.isLast && (h("span", { key: '931abb627422befa43f85d9cf6d829505c184a45', class: "separator", "aria-hidden": "true" }, h("sy-icon", { key: 'd7dccca1bc9f5ac8e10da19fef18292a0845f428', size: "xsmall", svgMarkup: finalSeparator === 'arrow' ? arrowIcon : slashIcon }))),
        ];
    }
    static get style() { return syBreadcrumbCss; }
}, [262, "sy-breadcrumb-item", {
        "active": [516],
        "disabled": [516],
        "separator": [1],
        "parentSeparator": [1025, "parentseparator"],
        "isLast": [1028, "is-last"],
        "hasFocus": [32],
        "forceUpdate": [64]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-breadcrumb-item", "sy-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-breadcrumb-item":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyBreadcrumbItem$1);
            }
            break;
        case "sy-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const SyBreadcrumbItem = SyBreadcrumbItem$1;
const defineCustomElement = defineCustomElement$1;

export { SyBreadcrumbItem, defineCustomElement };
