import { p as proxyCustomElement, H, c as createEvent, h } from './index.js';
import { d as defineCustomElement$3 } from './p-Dzzv4fG9.js';
import { d as defineCustomElement$2 } from './p-DA_POXvZ.js';
import { d as defineCustomElement$1 } from './p-Dx2eAEw1.js';

const syAutocompleteCss = "@charset \"UTF-8\";.sc-sy-autocomplete-option:root,.sc-sy-autocomplete-option-h{display:flex;flex-direction:column;width:100%;--autocomplete-size-large:var(--component-large);--autocomplete-size-medium:var(--component-medium);--autocomplete-size-small:var(--component-small);--autocomplete-padding-large:var(--spacing-2xsmall) var(--spacing-small);--autocomplete-padding-medium:var(--spacing-3xsmall) var(--spacing-xsmall);--autocomplete-padding-small:var(--spacing-4xsmall) var(--spacing-2xsmall);--autocomplete-gap-large:var(--spacing-2xsmall);--autocomplete-gap-medium:var(--spacing-3xsmall);--autocomplete-gap-small:var(--spacing-3xsmall)}.sc-sy-autocomplete-option:root .autocomplete-container.sc-sy-autocomplete-option,.sc-sy-autocomplete-option-h .autocomplete-container.sc-sy-autocomplete-option{display:flex;flex-direction:row;width:100%;box-sizing:border-box}.sc-sy-autocomplete-option:root .autocomplete-wrapper.sc-sy-autocomplete-option,.sc-sy-autocomplete-option-h .autocomplete-wrapper.sc-sy-autocomplete-option{position:relative;width:100%;display:flex;flex-direction:column;gap:var(--spacing-3xsmall)}.sc-sy-autocomplete-option:root .autocomplete.sc-sy-autocomplete-option,.sc-sy-autocomplete-option-h .autocomplete.sc-sy-autocomplete-option{flex:1;height:var(--autocomplete-size-medium);border:var(--border-small) var(--autocomplete-input-border-enabled);padding:var(--autocomplete-padding-medium);color:var(--autocomplete-input-text-placeholder);background-color:var(--autocomplete-input-background-enabled);border-radius:var(--border-radius-medium);box-sizing:border-box;font-family:\"Roboto\";font-size:14px;font-weight:400;line-height:22px;text-decoration:none;text-transform:none;letter-spacing:0.25px;outline:none;display:flex;align-items:center;gap:var(--autocomplete-gap-medium);box-shadow:none;transition:background-color 120ms ease, border-color 120ms ease, color 120ms ease}.sc-sy-autocomplete-option:root .autocomplete.sc-sy-autocomplete-option input.sc-sy-autocomplete-option,.sc-sy-autocomplete-option-h .autocomplete.sc-sy-autocomplete-option input.sc-sy-autocomplete-option{flex:1;min-width:0;border:var(--border-small) transparent;background:transparent;color:inherit;outline:none;padding:0;font-family:\"Roboto\";font-size:14px;font-weight:400;line-height:22px;text-decoration:none;text-transform:none;letter-spacing:0.25px}.sc-sy-autocomplete-option:root .autocomplete.sc-sy-autocomplete-option input.sc-sy-autocomplete-option::placeholder,.sc-sy-autocomplete-option-h .autocomplete.sc-sy-autocomplete-option input.sc-sy-autocomplete-option::placeholder{color:var(--autocomplete-input-text-placeholder)}.sc-sy-autocomplete-option:root .autocomplete.sc-sy-autocomplete-option input.sc-sy-autocomplete-option:focus,.sc-sy-autocomplete-option:root .autocomplete.sc-sy-autocomplete-option input.sc-sy-autocomplete-option:focus-visible,.sc-sy-autocomplete-option-h .autocomplete.sc-sy-autocomplete-option input.sc-sy-autocomplete-option:focus,.sc-sy-autocomplete-option-h .autocomplete.sc-sy-autocomplete-option input.sc-sy-autocomplete-option:focus-visible{outline:none;border-color:transparent;box-shadow:none}.sc-sy-autocomplete-option:root .autocomplete.sc-sy-autocomplete-option:hover:not(.autocomplete--disabled):not(.autocomplete--readonly),.sc-sy-autocomplete-option-h .autocomplete.sc-sy-autocomplete-option:hover:not(.autocomplete--disabled):not(.autocomplete--readonly){color:var(--autocomplete-input-text-hover);border:var(--border-small) var(--autocomplete-input-border-hover);background-color:var(--autocomplete-input-background-hover)}.sc-sy-autocomplete-option:root .autocomplete.autocomplete--focused.sc-sy-autocomplete-option,.sc-sy-autocomplete-option-h .autocomplete.autocomplete--focused.sc-sy-autocomplete-option{background-color:var(--autocomplete-input-background-focus);border:var(--border-small) var(--autocomplete-input-border-focus);outline:var(--border-small) var(--focus-outline);outline-offset:0}.sc-sy-autocomplete-option:root .autocomplete.autocomplete--filled.sc-sy-autocomplete-option,.sc-sy-autocomplete-option-h .autocomplete.autocomplete--filled.sc-sy-autocomplete-option{color:var(--autocomplete-input-text-enabled)}.sc-sy-autocomplete-option:root .autocomplete.autocomplete--filled.sc-sy-autocomplete-option input.sc-sy-autocomplete-option::placeholder,.sc-sy-autocomplete-option-h .autocomplete.autocomplete--filled.sc-sy-autocomplete-option input.sc-sy-autocomplete-option::placeholder{color:var(--autocomplete-input-text-placeholder)}.sc-sy-autocomplete-option:root .autocomplete.autocomplete--warning.sc-sy-autocomplete-option,.sc-sy-autocomplete-option-h .autocomplete.autocomplete--warning.sc-sy-autocomplete-option{background-color:var(--autocomplete-input-background-warning);border:var(--border-small) var(--autocomplete-input-border-warning)}.sc-sy-autocomplete-option:root .autocomplete.autocomplete--error.sc-sy-autocomplete-option,.sc-sy-autocomplete-option-h .autocomplete.autocomplete--error.sc-sy-autocomplete-option{background-color:var(--autocomplete-input-background-error);border:var(--border-small) var(--autocomplete-input-border-error)}.sc-sy-autocomplete-option:root .autocomplete.autocomplete--success.sc-sy-autocomplete-option,.sc-sy-autocomplete-option-h .autocomplete.autocomplete--success.sc-sy-autocomplete-option{background-color:var(--autocomplete-input-background-success);border:var(--border-small) var(--autocomplete-input-border-success)}.sc-sy-autocomplete-option:root .autocomplete.autocomplete--filled.autocomplete--warning.sc-sy-autocomplete-option,.sc-sy-autocomplete-option-h .autocomplete.autocomplete--filled.autocomplete--warning.sc-sy-autocomplete-option{color:var(--autocomplete-input-text-warning)}.sc-sy-autocomplete-option:root .autocomplete.autocomplete--filled.autocomplete--error.sc-sy-autocomplete-option,.sc-sy-autocomplete-option-h .autocomplete.autocomplete--filled.autocomplete--error.sc-sy-autocomplete-option{color:var(--autocomplete-input-text-error)}.sc-sy-autocomplete-option:root .autocomplete.autocomplete--filled.autocomplete--success.sc-sy-autocomplete-option,.sc-sy-autocomplete-option-h .autocomplete.autocomplete--filled.autocomplete--success.sc-sy-autocomplete-option{color:var(--autocomplete-input-text-success)}.sc-sy-autocomplete-option:root .autocomplete.autocomplete--invalid.sc-sy-autocomplete-option,.sc-sy-autocomplete-option-h .autocomplete.autocomplete--invalid.sc-sy-autocomplete-option{border:var(--border-small) var(--border-error) !important}.sc-sy-autocomplete-option:root .autocomplete.autocomplete--invalid.sc-sy-autocomplete-option:focus-visible,.sc-sy-autocomplete-option:root .autocomplete.autocomplete--invalid.autocomplete--focused.sc-sy-autocomplete-option,.sc-sy-autocomplete-option-h .autocomplete.autocomplete--invalid.sc-sy-autocomplete-option:focus-visible,.sc-sy-autocomplete-option-h .autocomplete.autocomplete--invalid.autocomplete--focused.sc-sy-autocomplete-option{border:var(--border-small) var(--border-error) !important;outline:var(--border-small) var(--focus-outline) !important}.sc-sy-autocomplete-option:root .autocomplete.autocomplete--disabled.sc-sy-autocomplete-option,.sc-sy-autocomplete-option-h .autocomplete.autocomplete--disabled.sc-sy-autocomplete-option{cursor:not-allowed;color:var(--autocomplete-input-text-disabled, var(--text-disabled));background-color:var(--autocomplete-input-background-disabled, var(--background-disabled));border:var(--border-small) var(--autocomplete-input-border-disabled, var(--border-disabled))}.sc-sy-autocomplete-option:root .autocomplete.autocomplete--disabled.sc-sy-autocomplete-option input.sc-sy-autocomplete-option,.sc-sy-autocomplete-option-h .autocomplete.autocomplete--disabled.sc-sy-autocomplete-option input.sc-sy-autocomplete-option{cursor:not-allowed;color:inherit}.sc-sy-autocomplete-option:root .autocomplete.autocomplete--readonly.sc-sy-autocomplete-option,.sc-sy-autocomplete-option-h .autocomplete.autocomplete--readonly.sc-sy-autocomplete-option{cursor:default;background-color:var(--autocomplete-input-background-readonly, var(--background-readonly, transparent))}.sc-sy-autocomplete-option:root .autocomplete.autocomplete--readonly.sc-sy-autocomplete-option input.sc-sy-autocomplete-option,.sc-sy-autocomplete-option-h .autocomplete.autocomplete--readonly.sc-sy-autocomplete-option input.sc-sy-autocomplete-option{cursor:text;background:transparent}.sc-sy-autocomplete-option:root .autocomplete.autocomplete--small.sc-sy-autocomplete-option,.sc-sy-autocomplete-option-h .autocomplete.autocomplete--small.sc-sy-autocomplete-option{height:var(--autocomplete-size-small);padding:var(--autocomplete-padding-small);gap:var(--autocomplete-gap-small);border-radius:var(--border-radius-small)}.sc-sy-autocomplete-option:root .autocomplete.autocomplete--small.sc-sy-autocomplete-option input.sc-sy-autocomplete-option,.sc-sy-autocomplete-option-h .autocomplete.autocomplete--small.sc-sy-autocomplete-option input.sc-sy-autocomplete-option{font-family:\"Roboto\";font-size:12px;font-weight:400;line-height:18px;letter-spacing:0}.sc-sy-autocomplete-option:root .autocomplete.autocomplete--large.sc-sy-autocomplete-option,.sc-sy-autocomplete-option-h .autocomplete.autocomplete--large.sc-sy-autocomplete-option{height:var(--autocomplete-size-large);padding:var(--autocomplete-padding-large);gap:var(--autocomplete-gap-large);border-radius:var(--border-radius-medium)}.sc-sy-autocomplete-option:root .autocomplete.autocomplete--large.sc-sy-autocomplete-option input.sc-sy-autocomplete-option,.sc-sy-autocomplete-option-h .autocomplete.autocomplete--large.sc-sy-autocomplete-option input.sc-sy-autocomplete-option{font-family:\"Roboto\";font-size:16px;font-weight:400;line-height:26px;letter-spacing:0.5px}:root [size=small].sc-sy-autocomplete-option-h .autocomplete.sc-sy-autocomplete-option,.sc-sy-autocomplete-option-h([size=small]).sc-sy-autocomplete-option .autocomplete.sc-sy-autocomplete-option{height:var(--autocomplete-size-small)}:root [size=large].sc-sy-autocomplete-option-h .autocomplete.sc-sy-autocomplete-option,.sc-sy-autocomplete-option-h([size=large]).sc-sy-autocomplete-option .autocomplete.sc-sy-autocomplete-option{height:var(--autocomplete-size-large)}.sc-sy-autocomplete-option:root input.sc-sy-autocomplete-option::-webkit-search-decoration,.sc-sy-autocomplete-option:root input.sc-sy-autocomplete-option::-webkit-search-cancel-button,.sc-sy-autocomplete-option:root input.sc-sy-autocomplete-option::-webkit-search-results-button,.sc-sy-autocomplete-option:root input.sc-sy-autocomplete-option::-webkit-search-results-decoration,.sc-sy-autocomplete-option-h input.sc-sy-autocomplete-option::-webkit-search-decoration,.sc-sy-autocomplete-option-h input.sc-sy-autocomplete-option::-webkit-search-cancel-button,.sc-sy-autocomplete-option-h input.sc-sy-autocomplete-option::-webkit-search-results-button,.sc-sy-autocomplete-option-h input.sc-sy-autocomplete-option::-webkit-search-results-decoration{opacity:0;pointer-events:none}.autocomplete-option-container.sc-sy-autocomplete-option{box-shadow:var(--shadow-dropdown, var(--box-shadow));background-color:var(--autocomplete-dropdownmenu-background-enabled, var(--autocomplete-inputlistcontainer-background-enabled));border-radius:var(--border-radius-medium);max-height:300px;overflow-y:auto;padding-top:var(--spacing-3xsmall);padding-bottom:var(--spacing-3xsmall);margin:var(--spacing-3xsmall) 0;max-width:100%;min-height:var(--component-medium)}.autocomplete-option-loading.sc-sy-autocomplete-option{display:flex;align-items:center;justify-content:center;padding:var(--spacing-xsmall);min-height:var(--component-medium)}sy-autocomplete-option.sc-sy-autocomplete-option-h{position:absolute;left:0;top:0;outline:none;display:block;visibility:hidden;z-index:var(--z-index-autocomplete, 800)}sy-autocomplete-option.sc-sy-autocomplete-option-h .option--list.sc-sy-autocomplete-option{cursor:pointer;display:block;color:var(--autocomplete-input-text-enabled);padding:0 var(--spacing-xsmall);height:var(--component-medium);width:100%;box-sizing:border-box}sy-autocomplete-option.sc-sy-autocomplete-option-h .option--list.sc-sy-autocomplete-option:hover{background-color:var(--autocomplete-menuitem-default-background-hover)}sy-autocomplete-option.sc-sy-autocomplete-option-h .option--list.option--active.sc-sy-autocomplete-option{background-color:var(--autocomplete-menuitem-default-background-active)}sy-autocomplete-option.sc-sy-autocomplete-option-h .option--list.option--selected.sc-sy-autocomplete-option{background-color:var(--autocomplete-menuitem-default-background-selected);font-family:\"Roboto\";font-size:14px;font-weight:500;line-height:22px;letter-spacing:0.25px}sy-autocomplete-option.sc-sy-autocomplete-option-h .option--list.sc-sy-autocomplete-option .option--list-inner.sc-sy-autocomplete-option{display:flex;align-items:center;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;height:100%}mark.option--highlight.sc-sy-autocomplete-option{background-color:transparent;color:inherit;font-weight:700;text-decoration:underline;text-underline-offset:2px}.error-container.sc-sy-autocomplete-option{color:var(--required, var(--color-status-error));display:none}.error-container.text-error-container.visible-error.sc-sy-autocomplete-option{display:block}.error-container.popup-error-container.sc-sy-autocomplete-option{position:absolute;top:0;left:0;width:100%;height:100%;margin:0;pointer-events:none;display:block}.popup-error-container>.sc-sy-autocomplete-option-s>*{pointer-events:auto;display:block;width:100%;height:100%}sy-autocomplete.sc-sy-autocomplete-option-h{display:flex;position:relative}sy-autocomplete[disabled].sc-sy-autocomplete-option-h{cursor:not-allowed;pointer-events:none;opacity:0.65}sy-autocomplete[required].sc-sy-autocomplete-option-h .required.sc-sy-autocomplete-option{font-family:\"Roboto\";font-size:12px;font-weight:400;line-height:18px;letter-spacing:0;color:var(--input-label-required-enabled, var(--required))}";

const SyAutocompleteOption = /*@__PURE__*/ proxyCustomElement(class SyAutocompleteOption extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.activeChanged = createEvent(this, "activeChanged");
        this.selected = createEvent(this, "selected");
    }
    get host() { return this; }
    source = [];
    loading = false;
    activeIndex = -1;
    searchTerm = '';
    caseSensitive = false;
    highlightMatches = false;
    hoverIndex = -1;
    activeChanged;
    selected;
    handleHoverIndexChange() {
        this.activeIndex = this.hoverIndex;
        this.activeChanged.emit(this.activeIndex);
    }
    handleSourceChange() {
        if (this.source.length > 0 && this.activeIndex === -1) {
            this.activeIndex = 0;
        }
        else if (this.source.length === 0) {
            this.activeIndex = -1;
        }
    }
    async setEvent(index) {
        this.eventEmitter(this.source[index]);
    }
    async forceUpdate() {
        this.source = [...this.source];
    }
    handleMouseEnter(index) {
        this.hoverIndex = index;
        this.activeChanged.emit(this.hoverIndex);
    }
    handleMouseDown(e, index) {
        e.preventDefault();
        this.activeIndex = index;
        this.activeChanged.emit(this.activeIndex);
        const selectedValue = this.source[index];
        if (selectedValue !== undefined) {
            this.eventEmitter(selectedValue);
        }
    }
    eventEmitter(value) {
        this.selected.emit(value);
    }
    renderLabel(value) {
        if (!this.highlightMatches || !this.searchTerm) {
            return h("span", null, value);
        }
        const needle = this.caseSensitive ? this.searchTerm : this.searchTerm.toLowerCase();
        if (needle.length === 0)
            return h("span", null, value);
        const haystack = this.caseSensitive ? value : value.toLowerCase();
        const idx = haystack.indexOf(needle);
        if (idx < 0)
            return h("span", null, value);
        const before = value.substring(0, idx);
        const match = value.substring(idx, idx + needle.length);
        const after = value.substring(idx + needle.length);
        // Inline styles guarantee rendering regardless of Stencil scoped-CSS resolution.
        const markStyle = {
            backgroundColor: 'transparent',
            color: 'inherit',
            fontWeight: '700',
            textDecoration: 'underline',
            textUnderlineOffset: '2px',
        };
        return (h("span", null, before, h("mark", { class: "option--highlight", style: markStyle }, match), after));
    }
    render() {
        const hasSource = this.source && Array.isArray(this.source) && this.source.length > 0;
        return (h("div", { key: '29b9693774ec0daf6e35606a00d953805c21df45', class: "autocomplete-option-container", role: "listbox" }, this.loading ? (h("div", { class: "autocomplete-option-loading" }, h("sy-spinner", null))) : hasSource ? (this.source.map((value, index) => (h("div", { role: "option", "aria-selected": this.activeIndex === index ? 'true' : 'false', class: {
                'option--list': true,
                'option--active': this.activeIndex === index,
            }, onMouseDown: (e) => this.handleMouseDown(e, index), onMouseEnter: () => this.handleMouseEnter(index) }, h("div", { class: "option--list-inner" }, this.renderLabel(value)))))) : (h("sy-empty", null))));
    }
    static get watchers() { return {
        "hoverIndex": ["handleHoverIndexChange"],
        "source": ["handleSourceChange"]
    }; }
    static get style() { return syAutocompleteCss; }
}, [258, "sy-autocomplete-option", {
        "source": [1040],
        "loading": [4],
        "activeIndex": [1026, "active-index"],
        "searchTerm": [1025, "search-term"],
        "caseSensitive": [4, "case-sensitive"],
        "highlightMatches": [4, "highlight-matches"],
        "hoverIndex": [32],
        "setEvent": [64],
        "forceUpdate": [64]
    }, undefined, {
        "hoverIndex": ["handleHoverIndexChange"],
        "source": ["handleSourceChange"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-autocomplete-option", "sy-empty", "sy-icon", "sy-spinner"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-autocomplete-option":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyAutocompleteOption);
            }
            break;
        case "sy-empty":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "sy-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "sy-spinner":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { SyAutocompleteOption as S, defineCustomElement as d };
