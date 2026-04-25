import { p as proxyCustomElement, H, h } from './index.js';
import { d as fnGetChildrenByTagName } from './p-Dlcw8XSW.js';

const syBreadcrumbCss = "@charset \"UTF-8\";.sc-sy-breadcrumb:root,.sc-sy-breadcrumb-h{display:inline-flex;align-items:center}.sc-sy-breadcrumb:root .breadcrumb.sc-sy-breadcrumb,.sc-sy-breadcrumb-h .breadcrumb.sc-sy-breadcrumb{display:flex;align-items:center}.sc-sy-breadcrumb:root .breadcrumb--item.sc-sy-breadcrumb,.sc-sy-breadcrumb-h .breadcrumb--item.sc-sy-breadcrumb{cursor:pointer;display:inline-flex;align-items:center;height:22px;color:var(--breadcrumb-previous-default-text-enabled);line-height:normal;user-select:none}.sc-sy-breadcrumb:root .breadcrumb--item.sc-sy-breadcrumb:hover,.sc-sy-breadcrumb-h .breadcrumb--item.sc-sy-breadcrumb:hover{color:var(--breadcrumb-previous-default-text-hover)}.sc-sy-breadcrumb:root .breadcrumb--item.sc-sy-breadcrumb:focus-visible,.sc-sy-breadcrumb-h .breadcrumb--item.sc-sy-breadcrumb:focus-visible{outline:var(--border-small) var(--focus-outline, var(--button-primary-border-focus));outline-offset:2px}.sc-sy-breadcrumb:root .breadcrumb--item.breadcrumb--item-current.sc-sy-breadcrumb,.sc-sy-breadcrumb-h .breadcrumb--item.breadcrumb--item-current.sc-sy-breadcrumb{color:var(--breadcrumb-current-default-text-enabled);cursor:default}.sc-sy-breadcrumb:root .breadcrumb--item.breadcrumb--item-disabled.sc-sy-breadcrumb,.sc-sy-breadcrumb-h .breadcrumb--item.breadcrumb--item-disabled.sc-sy-breadcrumb{cursor:not-allowed;opacity:0.6}.sc-sy-breadcrumb:root .breadcrumb--item.breadcrumb--item-disabled.sc-sy-breadcrumb:hover,.sc-sy-breadcrumb-h .breadcrumb--item.breadcrumb--item-disabled.sc-sy-breadcrumb:hover{color:var(--breadcrumb-previous-default-text-enabled)}.sc-sy-breadcrumb:root .separator.sc-sy-breadcrumb,.sc-sy-breadcrumb-h .separator.sc-sy-breadcrumb{display:inline-flex;align-items:center;justify-content:center;color:var(--breadcrumb-previous-withicon-icon-enabled);padding:5px}sy-breadcrumb-item.sc-sy-breadcrumb-h .breadcrumb--item.sc-sy-breadcrumb:hover{color:var(--breadcrumb-previous-default-text-hover)}";

const SyBreadcrumb$1 = /*@__PURE__*/ proxyCustomElement(class SyBreadcrumb extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
    }
    get host() { return this; }
    // --- Public Properties (spec: props) ---
    separator = 'slash';
    // --- Private ---
    containerEl;
    mutationObserver = null;
    componentDidLoad() {
        this.updateChildren();
    }
    componentDidRender() {
        if (!this.mutationObserver && this.containerEl) {
            this.mutationObserver = new MutationObserver(() => this.updateChildren());
            this.mutationObserver.observe(this.containerEl, { childList: true });
        }
        this.updateChildren();
    }
    disconnectedCallback() {
        if (this.mutationObserver) {
            this.mutationObserver.disconnect();
            this.mutationObserver = null;
        }
    }
    handleSeparatorChange() {
        this.updateChildren();
    }
    updateChildren = () => {
        const children = fnGetChildrenByTagName(this.containerEl, 'sy-breadcrumb-item');
        if (children.length === 0)
            return;
        children.forEach((item, index) => {
            item.parentSeparator = this.separator;
            item.isLast = index === children.length - 1;
            if (typeof item.forceUpdate === 'function') {
                item.forceUpdate();
            }
        });
    };
    render() {
        return (h("nav", { key: 'dfa5759e9ed4bf92f07d7dbbbdd64b1e86691154', class: "breadcrumb", "aria-label": "Breadcrumb" }, h("span", { key: '50924e35b8bb2ca6b86a1c762ef68cbb71515713', ref: (el) => (this.containerEl = el) }, h("slot", { key: '0cb9669f95c8508f2fa7b9ce27a69a7aa5971ae0' }))));
    }
    static get watchers() { return {
        "separator": ["handleSeparatorChange"]
    }; }
    static get style() { return syBreadcrumbCss; }
}, [262, "sy-breadcrumb", {
        "separator": [513]
    }, undefined, {
        "separator": ["handleSeparatorChange"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-breadcrumb"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-breadcrumb":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyBreadcrumb$1);
            }
            break;
    } });
}

const SyBreadcrumb = SyBreadcrumb$1;
const defineCustomElement = defineCustomElement$1;

export { SyBreadcrumb, defineCustomElement };
