import { p as proxyCustomElement, H, c as createEvent, h } from './index.js';
import { f as fnAssignPropFromAlias } from './p-Dlcw8XSW.js';
import { d as defineCustomElement$2 } from './p-DA_POXvZ.js';

const syTabCss = "@charset \"UTF-8\";sy-tab.sc-sy-tab{display:inline-flex;position:relative;align-items:stretch;box-sizing:border-box;color:var(--tabs-line-list-text-enabled);user-select:none;white-space:nowrap;flex:0 0 auto}sy-tab.sc-sy-tab .tab-wrapper.sc-sy-tab{display:flex;align-items:stretch;width:100%;height:100%}sy-tab.sc-sy-tab .tab-container.sc-sy-tab{display:flex;align-items:center;justify-content:center;box-sizing:border-box;cursor:pointer;outline:none;padding:0 var(--spacing-medium);height:var(--header-medium);min-width:0;max-width:100%}sy-tab.sc-sy-tab .tab-container.tab-container--small.sc-sy-tab{height:var(--header-small);padding:0 var(--spacing-small)}sy-tab.sc-sy-tab .tab-container.tab-container--medium.sc-sy-tab{height:var(--header-medium);padding:0 var(--spacing-medium)}sy-tab.sc-sy-tab .tab-container.tab-container--large.sc-sy-tab{height:var(--header-large);padding:0 var(--spacing-large)}sy-tab.sc-sy-tab .tab-container.sc-sy-tab .tab-inner.sc-sy-tab{display:flex;align-items:center;gap:var(--spacing-3xsmall);height:100%;min-width:0;overflow:hidden;text-overflow:ellipsis}sy-tab.sc-sy-tab .tab-container.sc-sy-tab .tab-inner.sc-sy-tab:focus-visible{border:var(--border-small) var(--focus-outline);outline:var(--border-small) var(--focus-outline);z-index:2}sy-tab.sc-sy-tab .tab-container.sc-sy-tab .tab-inner.sc-sy-tab sy-icon.sc-sy-tab{color:var(--tabs-line-list-icon-enabled);flex-shrink:0}sy-tab.sc-sy-tab .tab-container.sc-sy-tab .tab-inner.sc-sy-tab .tab-close-icon.sc-sy-tab{flex-shrink:0;margin-left:var(--spacing-3xsmall);color:var(--tabs-line-list-icon-enabled);opacity:0.55;transition:opacity 120ms ease, color 120ms ease}sy-tab.sc-sy-tab .tab-container.sc-sy-tab .tab-inner.sc-sy-tab .tab-close-icon.sc-sy-tab svg.sc-sy-tab{width:10px;height:10px;display:block}sy-tab.sc-sy-tab .tab-container.sc-sy-tab .tab-inner.sc-sy-tab .tab-close-icon.sc-sy-tab:hover{opacity:1;color:var(--tabs-line-list-icon-hover, currentColor)}sy-tab.sc-sy-tab:hover .tab-close-icon.sc-sy-tab{opacity:1}sy-tab.sc-sy-tab:hover .tab-container.sc-sy-tab{color:var(--tabs-line-list-text-hover)}sy-tab.sc-sy-tab:hover .tab-container.sc-sy-tab sy-icon.sc-sy-tab{color:var(--tabs-line-list-icon-hover)}sy-tab[active].sc-sy-tab .tab-container--line.sc-sy-tab{position:relative;color:var(--tabs-line-list-text-selected)}sy-tab[active].sc-sy-tab .tab-container--line.sc-sy-tab::after{content:\"\";position:absolute;z-index:2;pointer-events:none}sy-tab[active].sc-sy-tab .tab-container--line.tab-position-top.sc-sy-tab::after{left:0;right:0;bottom:0;height:2px;background-color:var(--tabs-line-list-border-selected)}sy-tab[active].sc-sy-tab .tab-container--line.tab-position-bottom.sc-sy-tab::after{left:0;right:0;top:0;height:2px;background-color:var(--tabs-line-list-border-selected)}sy-tab[active].sc-sy-tab .tab-container--line.tab-position-left.sc-sy-tab::after{top:0;bottom:0;right:0;width:2px;background-color:var(--tabs-line-list-border-selected)}sy-tab[active].sc-sy-tab .tab-container--line.tab-position-right.sc-sy-tab::after{top:0;bottom:0;left:0;width:2px;background-color:var(--tabs-line-list-border-selected)}sy-tab.sc-sy-tab .tab-container--card.sc-sy-tab{border:var(--border-small) var(--tabs-card-list-border-enabeld);background-color:var(--tabs-card-list-background-enabled);color:var(--tabs-card-list-text-enabled);margin-right:var(--spacing-3xsmall)}sy-tab.sc-sy-tab .tab-container--card.sc-sy-tab:hover{color:var(--tabs-line-list-text-hover);background-color:var(--tabs-card-list-background-hover)}sy-tab.sc-sy-tab .tab-container--card.tab-position-top.sc-sy-tab{border-top-left-radius:var(--border-radius-medium);border-top-right-radius:var(--border-radius-medium)}sy-tab.sc-sy-tab .tab-container--card.tab-position-bottom.sc-sy-tab{border-bottom-left-radius:var(--border-radius-medium);border-bottom-right-radius:var(--border-radius-medium)}sy-tab.sc-sy-tab .tab-container--card.tab-position-left.sc-sy-tab{border-top-left-radius:var(--border-radius-medium);border-bottom-left-radius:var(--border-radius-medium)}sy-tab.sc-sy-tab .tab-container--card.tab-position-right.sc-sy-tab{border-top-right-radius:var(--border-radius-medium);border-bottom-right-radius:var(--border-radius-medium)}sy-tab[active].sc-sy-tab .tab-container--card.sc-sy-tab{background-color:var(--tabs-card-list-background-selected);color:var(--tabs-card-list-text-selected)}sy-tab[disabled].sc-sy-tab .tab-container.sc-sy-tab,sy-tab.sc-sy-tab .tab-container.tab-container-disabled.sc-sy-tab{color:var(--tabs-line-list-text-disabled) !important;cursor:auto !important;pointer-events:none}sy-tab[dragover=true].sc-sy-tab .tab-container.sc-sy-tab{position:relative;z-index:2}";

const SyTab$1 = /*@__PURE__*/ proxyCustomElement(class SyTab extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.selected = createEvent(this, "selected");
        this.closed = createEvent(this, "closed");
    }
    get host() { return this; }
    closable = false;
    disabled = false;
    tabkey;
    manualClose = false;
    // State에서 Prop으로 변경된 부분들
    active = false;
    parentDisabled = false;
    currentDisabledStatus = false;
    index;
    type = "line";
    size = "medium";
    position = "top";
    inHeader = false;
    selected;
    closed;
    confirmVisible = false;
    componentDidLoad() {
        this.setEnabled();
    }
    componentWillLoad() {
        this.parentDisabled = fnAssignPropFromAlias(this.host, 'parent-disabled') ?? this.parentDisabled;
        this.currentDisabledStatus = fnAssignPropFromAlias(this.host, 'current-disabled-status') ?? this.disabled;
        this.inHeader = fnAssignPropFromAlias(this.host, 'in-header') ?? this.inHeader;
        if (this.parentDisabled) {
            this.currentDisabledStatus = true;
            this.active = false;
        }
    }
    watchActive() {
        this.setEnabled();
    }
    watchDisabled() {
        if (!this.parentDisabled) {
            this.currentDisabledStatus = this.disabled;
        }
        this.setEnabled();
    }
    watchParentDisabled() {
        if (this.parentDisabled) {
            this.currentDisabledStatus = true;
            this.active = false;
        }
        else {
            this.currentDisabledStatus = this.disabled;
        }
        this.setEnabled();
    }
    async setClose(isForce = false) {
        if (this.closable && !this.currentDisabledStatus) {
            this.closeEvent(isForce);
        }
    }
    render() {
        const containerClasses = {
            "tab-container": true,
            [`tab-container--${this.type}`]: true,
            [`tab-container--${this.size}`]: true,
            'tab-container-disabled': this.parentDisabled || this.currentDisabledStatus,
            "tab-position-top": this.position === "top",
            "tab-position-bottom": this.position === "bottom",
            "tab-position-left": this.position === "left",
            "tab-position-right": this.position === "right",
        };
        return (h("div", { key: '20e9948548f609bf994aadc9cf2d3fda916b58f5', class: `tab-wrapper ${this.inHeader ? "tab-in-header" : ""}` }, h("div", { key: '4240e7c35781dfa11127607f823ad42b60c8e838', class: containerClasses, onClick: this.handleClick.bind(this), onMouseUp: this.handleMouseUp.bind(this) }, h("div", { key: '349d3947ec64ec65da642d9382b65a3933b40892', class: "tab-inner", tabindex: "0" }, h("slot", { key: 'be0d680b683bb6e8162919fac8a4030051b933ce' }), this.closable ? (h("sy-icon", { class: "tab-close-icon", selectable: true, size: "xsmall", onSelected: this.handleCloseClick.bind(this) }, h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", "aria-hidden": "true" }, h("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-width": "1.6", d: "M5.5 5.5l9 9M14.5 5.5l-9 9" })))) : null))));
    }
    setEnabled() {
        if (this.active && !this.currentDisabledStatus && !this.parentDisabled) {
            this.host.setAttribute("active", "");
        }
        else if (this.host.hasAttribute('active')) {
            this.host.removeAttribute("active");
        }
    }
    handleMouseUp(event) {
        if (event.button === 1 && !this.currentDisabledStatus) {
            // middle click to close
            this.handleCloseClick(event);
        }
    }
    handleClick() {
        if (!this.currentDisabledStatus) {
            this.selectedEvent();
        }
    }
    handleCloseClick(e) {
        e.stopPropagation();
        if (this.closable && !this.currentDisabledStatus) {
            this.closeEvent();
        }
    }
    selectedEvent() {
        this.selected.emit({ tabkey: this.tabkey, index: this.index });
    }
    closeEvent(isForceClose = false) {
        this.closed.emit({
            tabkey: this.tabkey,
            index: this.index,
            isManualClose: isForceClose ? false : this.manualClose,
        });
    }
    static get watchers() { return {
        "active": ["watchActive"],
        "disabled": ["watchDisabled"],
        "parentDisabled": ["watchParentDisabled"]
    }; }
    static get style() { return syTabCss; }
}, [262, "sy-tab", {
        "closable": [4],
        "disabled": [516],
        "tabkey": [513],
        "manualClose": [4, "manual-close"],
        "active": [1028],
        "parentDisabled": [1028, "parentdisabled"],
        "currentDisabledStatus": [1028, "currentdisabledstatus"],
        "index": [1026],
        "type": [1025],
        "size": [1025],
        "position": [1025],
        "inHeader": [1028, "inheader"],
        "setClose": [64]
    }, undefined, {
        "active": ["watchActive"],
        "disabled": ["watchDisabled"],
        "parentDisabled": ["watchParentDisabled"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-tab", "sy-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-tab":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyTab$1);
            }
            break;
        case "sy-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const SyTab = SyTab$1;
const defineCustomElement = defineCustomElement$1;

export { SyTab, defineCustomElement };
