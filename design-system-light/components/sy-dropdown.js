import { p as proxyCustomElement, H, c as createEvent, h } from './index.js';
import { d as defineCustomElement$2 } from './p-DA_POXvZ.js';

const syDropdownCss = "sy-dropdown.sc-sy-dropdown-h{display:inline-block;height:fit-content}sy-dropdown.sc-sy-dropdown-h .dropdown--container.sc-sy-dropdown{position:relative;width:auto;display:inline-flex;align-items:center;color:var(--dropdown-default-text-enabled);padding:var(--spacing-3xsmall) var(--spacing-xsmall);border:var(--border-small) var(--dropdown-default-border-enabled);border-radius:var(--border-radius-medium);cursor:var(--cursor-button);background-color:var(--dropdown-default-background-enabled);box-sizing:border-box;height:var(--component-medium)}sy-dropdown.sc-sy-dropdown-h .dropdown--container.dropdown--medium.sc-sy-dropdown{gap:var(--spacing-3xsmall)}sy-dropdown.sc-sy-dropdown-h .dropdown--container.dropdown--small.sc-sy-dropdown{gap:var(--spacing-3xsmall);padding:var(--spacing-4xsmall) var(--spacing-2xsmall) var(--spacing-4xsmall) var(--spacing-2xsmall);border-radius:var(--border-radius-small);font-family:\"Roboto\";font-size:12px;font-weight:400;line-height:18px;letter-spacing:0;box-sizing:border-box;height:var(--component-small)}sy-dropdown.sc-sy-dropdown-h .dropdown--container.dropdown--large.sc-sy-dropdown{gap:var(--spacing-3xsmall);padding:var(--spacing-xsmall) var(--spacing-small) var(--spacing-xsmall) var(--spacing-small);font-family:\"Roboto\";font-size:16px;font-weight:400;line-height:26px;letter-spacing:0.5px;box-sizing:border-box;height:var(--component-large)}sy-dropdown.sc-sy-dropdown-h .dropdown--container.dropdown--large.sc-sy-dropdown .dropdown--header.sc-sy-dropdown:after{top:45%;right:var(--spacing-small);color:var(--dropdown-default-icon-enabled)}sy-dropdown.sc-sy-dropdown-h .dropdown--container.sc-sy-dropdown:hover{border:var(--border-small) var(--dropdown-default-border-hover);color:var(--dropdown-default-text-hover)}sy-dropdown.sc-sy-dropdown-h .dropdown--container.sc-sy-dropdown:hover .dropdown--header.sc-sy-dropdown:after{border-color:var(--dropdown-default-icon-hover)}sy-dropdown.sc-sy-dropdown-h .dropdown--container.sc-sy-dropdown:hover sy-icon[type=angle-down].sc-sy-dropdown{color:var(--dropdown-twofold-icon-hover)}sy-dropdown.sc-sy-dropdown-h .dropdown--container.sc-sy-dropdown:active{border:var(--border-small) var(--dropdown-default-border-active);color:var(--dropdown-default-text-active)}sy-dropdown.sc-sy-dropdown-h .dropdown--container.sc-sy-dropdown:active .dropdown--header.sc-sy-dropdown:after{border-color:var(--dropdown-default-icon-active)}sy-dropdown.sc-sy-dropdown-h .dropdown--container.sc-sy-dropdown:focus-visible{border:var(--border-small) var(--dropdown-default-border-focused);color:var(--dropdown-default-text-focused)}sy-dropdown.sc-sy-dropdown-h .dropdown--container.sc-sy-dropdown:focus-visible .dropdown--header.sc-sy-dropdown:after{border-color:var(--dropdown-default-icon-focused)}sy-dropdown.sc-sy-dropdown-h .dropdown--container.sc-sy-dropdown:focus-visible:active{border:var(--border-small) var(--dropdown-default-border-focused);color:var(--dropdown-default-text-active)}sy-dropdown.sc-sy-dropdown-h .dropdown--container.sc-sy-dropdown:focus-visible:active .dropdown--header.sc-sy-dropdown:after{border-color:var(--dropdown-default-icon-focused)}sy-dropdown.sc-sy-dropdown-h .dropdown--container.sc-sy-dropdown sy-icon[type=angle-down].sc-sy-dropdown{color:var(--dropdown-twofold-icon-enabled)}[borderless].sc-sy-dropdown-h .dropdown--container.sc-sy-dropdown{border:var(--border-small) transparent;background-color:transparent}[borderless].sc-sy-dropdown-h .dropdown--container.sc-sy-dropdown:hover{color:var(--dropdown-borderless-text-hover);border:1px solid transparent}[borderless].sc-sy-dropdown-h .dropdown--container.sc-sy-dropdown:active{color:var(--dropdown-borderless-text-activ)}[disabled].sc-sy-dropdown-h .dropdown--container.sc-sy-dropdown{background-color:var(--dropdown-default-background-disabled);border:var(--border-small) var(--dropdown-default-border-disabled);color:var(--dropdown-default-text-disabled);cursor:auto}[disabled].sc-sy-dropdown-h .dropdown--container.sc-sy-dropdown .dropdown--header.sc-sy-dropdown:after{border-color:var(--dropdown-default-icon-disabled)}[disabled].sc-sy-dropdown-h .dropdown--container.sc-sy-dropdown:hover{border:var(--border-small) var(--dropdown-default-border-disabled);color:var(--dropdown-default-text-disabled)}[disabled].sc-sy-dropdown-h .dropdown--container.sc-sy-dropdown:hover .dropdown--header.sc-sy-dropdown:after{border-color:var(--dropdown-default-icon-disabled)}[disabled].sc-sy-dropdown-h .dropdown--container.sc-sy-dropdown:active{color:var(--dropdown-default-text-disabled)}sy-menu.sc-sy-dropdown-h{margin:0px}";

const SyDropdown$1 = /*@__PURE__*/ proxyCustomElement(class SyDropdown extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.selected = createEvent(this, "selected");
    }
    get host() { return this; }
    menu = null;
    selectedEventHandler = null;
    // --- Public Properties (spec: props) ---
    borderless = false;
    disabled = false;
    position = 'bottomLeft';
    size = 'medium';
    trigger = 'click';
    tooltip = '';
    // --- Events (spec: api.events.selected) ---
    selected;
    // --- Lifecycle ---
    componentWillLoad() {
        this.selectedEventHandler = this.handleItemSelected.bind(this);
    }
    componentDidLoad() {
        this.setMenu();
    }
    disconnectedCallback() {
        if (this.menu && this.selectedEventHandler) {
            this.menu.removeEventListener('itemSelected', this.selectedEventHandler);
        }
    }
    watchTrigger() {
        if (this.menu)
            this.menu.trigger = this.trigger;
    }
    watchPosition() {
        if (this.menu)
            this.menu.position = this.position;
    }
    watchDisabled() {
        if (this.menu)
            this.menu.disabled = this.disabled;
    }
    handleKeydown(e) {
        if (this.disabled)
            return;
        if (e.key === 'Enter' || e.key === ' ') {
            // Don't hijack Enter/Space when the user is interacting with a menu item.
            const target = e.composedPath()[0];
            if (target && target.closest?.('sy-menu-item'))
                return;
            e.preventDefault();
            this.menu?.toggle?.();
        }
        else if (e.key === 'Escape') {
            this.menu?.close?.();
        }
    }
    setMenu() {
        const newMenu = this.host.querySelector('sy-menu');
        if (this.menu && this.menu !== newMenu && this.selectedEventHandler) {
            this.menu.removeEventListener('itemSelected', this.selectedEventHandler);
        }
        this.menu = newMenu || null;
        if (this.menu && this.selectedEventHandler) {
            this.menu.removeEventListener('itemSelected', this.selectedEventHandler);
            this.menu.addEventListener('itemSelected', this.selectedEventHandler);
        }
        else if (!this.menu) {
            console.warn('[sy-dropdown] No <sy-menu> child found — dropdown has no options to show.');
        }
    }
    handleItemSelected(e) {
        e.stopPropagation();
        if (this.menu?.clearSelectedItem) {
            this.menu.clearSelectedItem();
        }
        const selectedMenuItem = e.target;
        if (selectedMenuItem) {
            selectedMenuItem.select = true;
        }
        const detail = e.detail;
        this.selected.emit(detail);
    }
    render() {
        const containerClasses = {
            'dropdown--container': true,
            'borderless': this.borderless,
            'dropdown--small': this.size === 'small',
            'dropdown--medium': this.size === 'medium',
            'dropdown--large': this.size === 'large',
        };
        return (h("div", { key: '24d1c89f86d8bc0ba77cc43341751a4de2775334', class: containerClasses, tabindex: this.disabled ? -1 : 0, role: "button", "aria-haspopup": "menu", "aria-disabled": this.disabled ? 'true' : undefined, title: this.tooltip || undefined }, h("div", { key: '6023b130ed710b1bda42c2f26ab5439fb59b28a2', class: "dropdown--header" }, h("slot", { key: '3d21a293d4623e422a593abb7a061dbdb1dfaa43', name: "title" })), h("sy-icon", { key: '189eae40c9820207f95fcc926b8529f40cf305ce', size: this.size }, h("svg", { key: '1a78c20b85653c6611519c1fea9cf0506f86e7ba', xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { key: 'e11e557162f40a107bda0326e8c218fe3cf2fc9f', fill: "currentColor", d: "M337.5 433C328.1 442.4 312.9 442.4 303.6 433L143.5 273C134.1 263.6 134.1 248.4 143.5 239.1C152.9 229.8 168.1 229.7 177.4 239.1L320.4 382.1L463.4 239.1C472.8 229.7 488 229.7 497.3 239.1C506.6 248.5 506.7 263.7 497.3 273L337.3 433z" }))), h("slot", { key: '2c32094ec20cbc429b203204b691b6580a8fe43c' })));
    }
    static get watchers() { return {
        "trigger": ["watchTrigger"],
        "position": ["watchPosition"],
        "disabled": ["watchDisabled"]
    }; }
    static get style() { return syDropdownCss; }
}, [262, "sy-dropdown", {
        "borderless": [516],
        "disabled": [516],
        "position": [513],
        "size": [513],
        "trigger": [513],
        "tooltip": [1]
    }, [[0, "keydown", "handleKeydown"]], {
        "trigger": ["watchTrigger"],
        "position": ["watchPosition"],
        "disabled": ["watchDisabled"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-dropdown", "sy-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-dropdown":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyDropdown$1);
            }
            break;
        case "sy-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const SyDropdown = SyDropdown$1;
const defineCustomElement = defineCustomElement$1;

export { SyDropdown, defineCustomElement };
