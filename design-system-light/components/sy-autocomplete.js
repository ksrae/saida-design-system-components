import { p as proxyCustomElement, H, c as createEvent, h } from './index.js';
import { d as defineCustomElement$5 } from './p-DUfLytkc.js';
import { d as defineCustomElement$4 } from './p-Dzzv4fG9.js';
import { d as defineCustomElement$3 } from './p-DA_POXvZ.js';
import { d as defineCustomElement$2 } from './p-Dx2eAEw1.js';

const syAutocompleteCss = "@charset \"UTF-8\";.sc-sy-autocomplete:root,.sc-sy-autocomplete-h{display:flex;flex-direction:column;width:100%;--autocomplete-size-large:var(--component-large);--autocomplete-size-medium:var(--component-medium);--autocomplete-size-small:var(--component-small);--autocomplete-padding-large:var(--spacing-2xsmall) var(--spacing-small);--autocomplete-padding-medium:var(--spacing-3xsmall) var(--spacing-xsmall);--autocomplete-padding-small:var(--spacing-4xsmall) var(--spacing-2xsmall);--autocomplete-gap-large:var(--spacing-2xsmall);--autocomplete-gap-medium:var(--spacing-3xsmall);--autocomplete-gap-small:var(--spacing-3xsmall)}.sc-sy-autocomplete:root .autocomplete-container.sc-sy-autocomplete,.sc-sy-autocomplete-h .autocomplete-container.sc-sy-autocomplete{display:flex;flex-direction:row;width:100%;box-sizing:border-box}.sc-sy-autocomplete:root .autocomplete-wrapper.sc-sy-autocomplete,.sc-sy-autocomplete-h .autocomplete-wrapper.sc-sy-autocomplete{position:relative;width:100%;display:flex;flex-direction:column;gap:var(--spacing-3xsmall)}.sc-sy-autocomplete:root .autocomplete.sc-sy-autocomplete,.sc-sy-autocomplete-h .autocomplete.sc-sy-autocomplete{flex:1;height:var(--autocomplete-size-medium);border:var(--border-small) var(--autocomplete-input-border-enabled);padding:var(--autocomplete-padding-medium);color:var(--autocomplete-input-text-placeholder);background-color:var(--autocomplete-input-background-enabled);border-radius:var(--border-radius-medium);box-sizing:border-box;font-family:\"Roboto\";font-size:14px;font-weight:400;line-height:22px;text-decoration:none;text-transform:none;letter-spacing:0.25px;outline:none;display:flex;align-items:center;gap:var(--autocomplete-gap-medium);box-shadow:none;transition:background-color 120ms ease, border-color 120ms ease, color 120ms ease}.sc-sy-autocomplete:root .autocomplete.sc-sy-autocomplete input.sc-sy-autocomplete,.sc-sy-autocomplete-h .autocomplete.sc-sy-autocomplete input.sc-sy-autocomplete{flex:1;min-width:0;border:var(--border-small) transparent;background:transparent;color:inherit;outline:none;padding:0;font-family:\"Roboto\";font-size:14px;font-weight:400;line-height:22px;text-decoration:none;text-transform:none;letter-spacing:0.25px}.sc-sy-autocomplete:root .autocomplete.sc-sy-autocomplete input.sc-sy-autocomplete::placeholder,.sc-sy-autocomplete-h .autocomplete.sc-sy-autocomplete input.sc-sy-autocomplete::placeholder{color:var(--autocomplete-input-text-placeholder)}.sc-sy-autocomplete:root .autocomplete.sc-sy-autocomplete input.sc-sy-autocomplete:focus,.sc-sy-autocomplete:root .autocomplete.sc-sy-autocomplete input.sc-sy-autocomplete:focus-visible,.sc-sy-autocomplete-h .autocomplete.sc-sy-autocomplete input.sc-sy-autocomplete:focus,.sc-sy-autocomplete-h .autocomplete.sc-sy-autocomplete input.sc-sy-autocomplete:focus-visible{outline:none;border-color:transparent;box-shadow:none}.sc-sy-autocomplete:root .autocomplete.sc-sy-autocomplete:hover:not(.autocomplete--disabled):not(.autocomplete--readonly),.sc-sy-autocomplete-h .autocomplete.sc-sy-autocomplete:hover:not(.autocomplete--disabled):not(.autocomplete--readonly){color:var(--autocomplete-input-text-hover);border:var(--border-small) var(--autocomplete-input-border-hover);background-color:var(--autocomplete-input-background-hover)}.sc-sy-autocomplete:root .autocomplete.autocomplete--focused.sc-sy-autocomplete,.sc-sy-autocomplete-h .autocomplete.autocomplete--focused.sc-sy-autocomplete{background-color:var(--autocomplete-input-background-focus);border:var(--border-small) var(--autocomplete-input-border-focus);outline:var(--border-small) var(--focus-outline);outline-offset:0}.sc-sy-autocomplete:root .autocomplete.autocomplete--filled.sc-sy-autocomplete,.sc-sy-autocomplete-h .autocomplete.autocomplete--filled.sc-sy-autocomplete{color:var(--autocomplete-input-text-enabled)}.sc-sy-autocomplete:root .autocomplete.autocomplete--filled.sc-sy-autocomplete input.sc-sy-autocomplete::placeholder,.sc-sy-autocomplete-h .autocomplete.autocomplete--filled.sc-sy-autocomplete input.sc-sy-autocomplete::placeholder{color:var(--autocomplete-input-text-placeholder)}.sc-sy-autocomplete:root .autocomplete.autocomplete--warning.sc-sy-autocomplete,.sc-sy-autocomplete-h .autocomplete.autocomplete--warning.sc-sy-autocomplete{background-color:var(--autocomplete-input-background-warning);border:var(--border-small) var(--autocomplete-input-border-warning)}.sc-sy-autocomplete:root .autocomplete.autocomplete--error.sc-sy-autocomplete,.sc-sy-autocomplete-h .autocomplete.autocomplete--error.sc-sy-autocomplete{background-color:var(--autocomplete-input-background-error);border:var(--border-small) var(--autocomplete-input-border-error)}.sc-sy-autocomplete:root .autocomplete.autocomplete--success.sc-sy-autocomplete,.sc-sy-autocomplete-h .autocomplete.autocomplete--success.sc-sy-autocomplete{background-color:var(--autocomplete-input-background-success);border:var(--border-small) var(--autocomplete-input-border-success)}.sc-sy-autocomplete:root .autocomplete.autocomplete--filled.autocomplete--warning.sc-sy-autocomplete,.sc-sy-autocomplete-h .autocomplete.autocomplete--filled.autocomplete--warning.sc-sy-autocomplete{color:var(--autocomplete-input-text-warning)}.sc-sy-autocomplete:root .autocomplete.autocomplete--filled.autocomplete--error.sc-sy-autocomplete,.sc-sy-autocomplete-h .autocomplete.autocomplete--filled.autocomplete--error.sc-sy-autocomplete{color:var(--autocomplete-input-text-error)}.sc-sy-autocomplete:root .autocomplete.autocomplete--filled.autocomplete--success.sc-sy-autocomplete,.sc-sy-autocomplete-h .autocomplete.autocomplete--filled.autocomplete--success.sc-sy-autocomplete{color:var(--autocomplete-input-text-success)}.sc-sy-autocomplete:root .autocomplete.autocomplete--invalid.sc-sy-autocomplete,.sc-sy-autocomplete-h .autocomplete.autocomplete--invalid.sc-sy-autocomplete{border:var(--border-small) var(--border-error) !important}.sc-sy-autocomplete:root .autocomplete.autocomplete--invalid.sc-sy-autocomplete:focus-visible,.sc-sy-autocomplete:root .autocomplete.autocomplete--invalid.autocomplete--focused.sc-sy-autocomplete,.sc-sy-autocomplete-h .autocomplete.autocomplete--invalid.sc-sy-autocomplete:focus-visible,.sc-sy-autocomplete-h .autocomplete.autocomplete--invalid.autocomplete--focused.sc-sy-autocomplete{border:var(--border-small) var(--border-error) !important;outline:var(--border-small) var(--focus-outline) !important}.sc-sy-autocomplete:root .autocomplete.autocomplete--disabled.sc-sy-autocomplete,.sc-sy-autocomplete-h .autocomplete.autocomplete--disabled.sc-sy-autocomplete{cursor:not-allowed;color:var(--autocomplete-input-text-disabled, var(--text-disabled));background-color:var(--autocomplete-input-background-disabled, var(--background-disabled));border:var(--border-small) var(--autocomplete-input-border-disabled, var(--border-disabled))}.sc-sy-autocomplete:root .autocomplete.autocomplete--disabled.sc-sy-autocomplete input.sc-sy-autocomplete,.sc-sy-autocomplete-h .autocomplete.autocomplete--disabled.sc-sy-autocomplete input.sc-sy-autocomplete{cursor:not-allowed;color:inherit}.sc-sy-autocomplete:root .autocomplete.autocomplete--readonly.sc-sy-autocomplete,.sc-sy-autocomplete-h .autocomplete.autocomplete--readonly.sc-sy-autocomplete{cursor:default;background-color:var(--autocomplete-input-background-readonly, var(--background-readonly, transparent))}.sc-sy-autocomplete:root .autocomplete.autocomplete--readonly.sc-sy-autocomplete input.sc-sy-autocomplete,.sc-sy-autocomplete-h .autocomplete.autocomplete--readonly.sc-sy-autocomplete input.sc-sy-autocomplete{cursor:text;background:transparent}.sc-sy-autocomplete:root .autocomplete.autocomplete--small.sc-sy-autocomplete,.sc-sy-autocomplete-h .autocomplete.autocomplete--small.sc-sy-autocomplete{height:var(--autocomplete-size-small);padding:var(--autocomplete-padding-small);gap:var(--autocomplete-gap-small);border-radius:var(--border-radius-small)}.sc-sy-autocomplete:root .autocomplete.autocomplete--small.sc-sy-autocomplete input.sc-sy-autocomplete,.sc-sy-autocomplete-h .autocomplete.autocomplete--small.sc-sy-autocomplete input.sc-sy-autocomplete{font-family:\"Roboto\";font-size:12px;font-weight:400;line-height:18px;letter-spacing:0}.sc-sy-autocomplete:root .autocomplete.autocomplete--large.sc-sy-autocomplete,.sc-sy-autocomplete-h .autocomplete.autocomplete--large.sc-sy-autocomplete{height:var(--autocomplete-size-large);padding:var(--autocomplete-padding-large);gap:var(--autocomplete-gap-large);border-radius:var(--border-radius-medium)}.sc-sy-autocomplete:root .autocomplete.autocomplete--large.sc-sy-autocomplete input.sc-sy-autocomplete,.sc-sy-autocomplete-h .autocomplete.autocomplete--large.sc-sy-autocomplete input.sc-sy-autocomplete{font-family:\"Roboto\";font-size:16px;font-weight:400;line-height:26px;letter-spacing:0.5px}:root [size=small].sc-sy-autocomplete-h .autocomplete.sc-sy-autocomplete,.sc-sy-autocomplete-h([size=small]).sc-sy-autocomplete .autocomplete.sc-sy-autocomplete{height:var(--autocomplete-size-small)}:root [size=large].sc-sy-autocomplete-h .autocomplete.sc-sy-autocomplete,.sc-sy-autocomplete-h([size=large]).sc-sy-autocomplete .autocomplete.sc-sy-autocomplete{height:var(--autocomplete-size-large)}.sc-sy-autocomplete:root input.sc-sy-autocomplete::-webkit-search-decoration,.sc-sy-autocomplete:root input.sc-sy-autocomplete::-webkit-search-cancel-button,.sc-sy-autocomplete:root input.sc-sy-autocomplete::-webkit-search-results-button,.sc-sy-autocomplete:root input.sc-sy-autocomplete::-webkit-search-results-decoration,.sc-sy-autocomplete-h input.sc-sy-autocomplete::-webkit-search-decoration,.sc-sy-autocomplete-h input.sc-sy-autocomplete::-webkit-search-cancel-button,.sc-sy-autocomplete-h input.sc-sy-autocomplete::-webkit-search-results-button,.sc-sy-autocomplete-h input.sc-sy-autocomplete::-webkit-search-results-decoration{opacity:0;pointer-events:none}.autocomplete-option-container.sc-sy-autocomplete{box-shadow:var(--shadow-dropdown, var(--box-shadow));background-color:var(--autocomplete-dropdownmenu-background-enabled, var(--autocomplete-inputlistcontainer-background-enabled));border-radius:var(--border-radius-medium);max-height:300px;overflow-y:auto;padding-top:var(--spacing-3xsmall);padding-bottom:var(--spacing-3xsmall);margin:var(--spacing-3xsmall) 0;max-width:100%;min-height:var(--component-medium)}.autocomplete-option-loading.sc-sy-autocomplete{display:flex;align-items:center;justify-content:center;padding:var(--spacing-xsmall);min-height:var(--component-medium)}sy-autocomplete-option.sc-sy-autocomplete-h{position:absolute;left:0;top:0;outline:none;display:block;visibility:hidden;z-index:var(--z-index-autocomplete, 800)}sy-autocomplete-option.sc-sy-autocomplete-h .option--list.sc-sy-autocomplete{cursor:pointer;display:block;color:var(--autocomplete-input-text-enabled);padding:0 var(--spacing-xsmall);height:var(--component-medium);width:100%;box-sizing:border-box}sy-autocomplete-option.sc-sy-autocomplete-h .option--list.sc-sy-autocomplete:hover{background-color:var(--autocomplete-menuitem-default-background-hover)}sy-autocomplete-option.sc-sy-autocomplete-h .option--list.option--active.sc-sy-autocomplete{background-color:var(--autocomplete-menuitem-default-background-active)}sy-autocomplete-option.sc-sy-autocomplete-h .option--list.option--selected.sc-sy-autocomplete{background-color:var(--autocomplete-menuitem-default-background-selected);font-family:\"Roboto\";font-size:14px;font-weight:500;line-height:22px;letter-spacing:0.25px}sy-autocomplete-option.sc-sy-autocomplete-h .option--list.sc-sy-autocomplete .option--list-inner.sc-sy-autocomplete{display:flex;align-items:center;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;height:100%}mark.option--highlight.sc-sy-autocomplete{background-color:transparent;color:inherit;font-weight:700;text-decoration:underline;text-underline-offset:2px}.error-container.sc-sy-autocomplete{color:var(--required, var(--color-status-error));display:none}.error-container.text-error-container.visible-error.sc-sy-autocomplete{display:block}.error-container.popup-error-container.sc-sy-autocomplete{position:absolute;top:0;left:0;width:100%;height:100%;margin:0;pointer-events:none;display:block}.popup-error-container>.sc-sy-autocomplete-s>*{pointer-events:auto;display:block;width:100%;height:100%}sy-autocomplete.sc-sy-autocomplete-h{display:flex;position:relative}sy-autocomplete[disabled].sc-sy-autocomplete-h{cursor:not-allowed;pointer-events:none;opacity:0.65}sy-autocomplete[required].sc-sy-autocomplete-h .required.sc-sy-autocomplete{font-family:\"Roboto\";font-size:12px;font-weight:400;line-height:18px;letter-spacing:0;color:var(--input-label-required-enabled, var(--required))}";

const SyAutocomplete$1 = /*@__PURE__*/ proxyCustomElement(class SyAutocomplete extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.changed = createEvent(this, "changed");
        this.selected = createEvent(this, "selected");
        this.internals = this.attachInternals();
    }
    get host() { return this; }
    internals;
    input;
    maxItemCount = 100;
    timer;
    optionElementClone = null;
    blurTimeout;
    initialValue = '';
    // --- Public Properties ---
    caseSensitive = false;
    debounceTime = 0;
    disabled = false;
    highlightMatches = false;
    loading = false;
    min = 0;
    name = '';
    placeholder = '';
    readonly = false;
    required = false;
    size = 'medium';
    status = 'default';
    value = '';
    source = [];
    trigger = 'focus';
    noNativeValidity = false;
    // --- Private State ---
    filteredList = [];
    hasFocus = false;
    touched = false;
    formSubmitted = false;
    active = -1;
    isValid = true;
    validStatus = '';
    hasSlotErrorMessage = false;
    hasPopupErrorComponent = false;
    isFilterActive = false;
    searchTerm = '';
    // --- Events ---
    changed;
    selected;
    // --- Watchers ---
    handleValidityChange() {
        this.updateValidityState();
    }
    handleSourceChange() {
        if (this.optionElementClone && this.hasFocus) {
            this.setData(this.input?.value?.trim() ?? '');
        }
    }
    handleDisabledChange(newVal) {
        if (newVal && this.hasFocus) {
            this.setBlur();
        }
    }
    // --- Lifecycle ---
    connectedCallback() {
        this.formSubmitListener();
        this.handleSlotChange();
        if (!this.host.hasAttribute('tabindex')) {
            this.host.setAttribute('tabindex', '0');
        }
    }
    disconnectedCallback() {
        this.formSubmitListenerRemover();
        window.removeEventListener('resize', this.updateOptionPosition);
        window.removeEventListener('scroll', this.updateOptionPosition, true);
        this.host.removeEventListener('keydown', this.handleKeydown);
        clearTimeout(this.timer);
        clearTimeout(this.blurTimeout);
        this.removeOptionClone();
    }
    componentWillLoad() {
        this.initialValue = this.value || '';
        this.handleSlotChange();
        this.updateValidityState();
    }
    componentDidLoad() {
        this.host.addEventListener('keydown', this.handleKeydown);
        window.addEventListener('resize', this.updateOptionPosition);
        window.addEventListener('scroll', this.updateOptionPosition, true);
    }
    formSubmitListener() {
        if (this.internals?.form) {
            this.internals.form.addEventListener('submit', this.handleFormSubmit);
        }
    }
    formSubmitListenerRemover() {
        if (this.internals?.form) {
            this.internals.form.removeEventListener('submit', this.handleFormSubmit);
        }
    }
    handleFormSubmit = (_e) => {
        this.formSubmitted = true;
        this.updateValidityState();
    };
    // --- Public Methods ---
    async setFocus() {
        if (this.disabled || this.readonly)
            return;
        this.input?.focus();
        this.handleFocus();
    }
    async setBlur() {
        this.input?.blur();
        this.blurEvent();
    }
    async checkValidity() {
        this.updateValidityState();
        return this.internals.checkValidity();
    }
    async reportValidity() {
        this.updateValidityState();
        return this.internals.reportValidity();
    }
    async getValidStatus() {
        return this.isValid ? '' : this.validStatus;
    }
    /**
     * Force the component into an app-driven invalid state (ValidityState.customError).
     * The error UI is whatever the consumer declared in [slot="error"]; if the slot is empty,
     * a neutral default message is supplied to ElementInternals so the native report bubble
     * still has something to show.
     */
    async setCustomError() {
        this.customSettingError();
    }
    async clearCustomError() {
        if (this.validStatus === 'custom') {
            this.validStatus = '';
            this.isValid = true;
        }
        this.updateValidityState();
    }
    get validity() {
        if (!this.isValid && (this.validStatus === 'custom' || this.hasSlotErrorMessage)) {
            return {
                badInput: false,
                customError: this.validStatus === 'custom' || this.hasSlotErrorMessage,
                patternMismatch: false,
                rangeOverflow: false,
                rangeUnderflow: false,
                stepMismatch: false,
                tooLong: false,
                tooShort: false,
                typeMismatch: false,
                valid: false,
                valueMissing: this.validStatus === 'valueMissing'
            };
        }
        return this.internals.validity;
    }
    get validationMessage() {
        if (!this.isValid && (this.validStatus === 'custom' || this.hasSlotErrorMessage)) {
            return this.getErrorMessage(this.validStatus);
        }
        return this.internals.validationMessage;
    }
    get willValidate() {
        return this.internals.willValidate;
    }
    // --- Option clone management ---
    appendOptionClone = () => {
        if (this.optionElementClone)
            return true;
        const originalOptionElement = this.host.querySelector('sy-autocomplete-option');
        if (!originalOptionElement) {
            console.error('Cannot find <sy-autocomplete-option> in DOM.');
            return false;
        }
        try {
            const newOptionElement = document.createElement('sy-autocomplete-option');
            if (originalOptionElement.className) {
                newOptionElement.className = originalOptionElement.className;
            }
            newOptionElement.style.position = 'absolute';
            newOptionElement.style.display = 'none';
            newOptionElement.style.visibility = 'hidden';
            newOptionElement.style.zIndex = 'var(--z-index-autocomplete, 800)';
            newOptionElement.source = this.source || [];
            newOptionElement.loading = false;
            newOptionElement.activeIndex = -1;
            newOptionElement.searchTerm = '';
            newOptionElement.caseSensitive = this.caseSensitive;
            newOptionElement.highlightMatches = this.highlightMatches;
            newOptionElement.addEventListener('click', (e) => e.stopPropagation());
            newOptionElement.addEventListener('selected', this.handleSelected);
            newOptionElement.addEventListener('activeChanged', this.activeChanged);
            document.body.appendChild(newOptionElement);
            this.optionElementClone = newOptionElement;
            originalOptionElement.style.setProperty('display', 'none', 'important');
            originalOptionElement.style.setProperty('visibility', 'hidden', 'important');
            originalOptionElement.style.setProperty('position', 'absolute', 'important');
            originalOptionElement.style.setProperty('pointer-events', 'none', 'important');
            originalOptionElement.style.setProperty('z-index', '-9999', 'important');
            return true;
        }
        catch (error) {
            console.error('sy-autocomplete appendOptionClone FAILED:', error);
            this.optionElementClone = null;
            return false;
        }
    };
    removeOptionClone = () => {
        if (this.optionElementClone && this.optionElementClone.parentElement === document.body) {
            try {
                this.optionElementClone.removeEventListener('selected', this.handleSelected);
                this.optionElementClone.removeEventListener('activeChanged', this.activeChanged);
                document.body.removeChild(this.optionElementClone);
            }
            catch (e) {
                console.warn('Error removing option clone', e);
            }
        }
        this.optionElementClone = null;
    };
    activeChanged = (e) => {
        if (e instanceof CustomEvent) {
            e.preventDefault();
            if (e.detail !== undefined && typeof e.detail === 'number') {
                this.active = e.detail;
            }
        }
    };
    // --- Keyboard handling ---
    handleKeydown = (e) => {
        if (this.disabled || this.readonly)
            return;
        const optionsVisible = this.optionElementClone?.style.visibility === 'visible';
        if (e.key === 'Escape') {
            if (optionsVisible) {
                e.preventDefault();
                this.hideOptions();
                this.input?.focus();
            }
        }
        else if (e.key === 'Enter') {
            if (optionsVisible && this.active >= 0 && this.active < this.filteredList.length) {
                e.preventDefault();
                this.optionElementClone?.setEvent(this.active);
            }
        }
        else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (!this.optionElementClone) {
                if (!this.appendOptionClone())
                    return;
            }
            if (this.filteredList.length > 0) {
                if (!optionsVisible) {
                    this.setData(this.input.value?.trim(), false);
                }
                else {
                    const newActive = (this.active + 1) % this.filteredList.length;
                    this.active = newActive;
                    if (this.optionElementClone) {
                        this.optionElementClone.activeIndex = this.active;
                    }
                    this.scrollToSelectedItem('down');
                }
            }
        }
        else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (!this.optionElementClone) {
                if (!this.appendOptionClone())
                    return;
            }
            if (this.filteredList.length > 0) {
                if (!optionsVisible) {
                    this.setData(this.input.value?.trim(), false);
                }
                else {
                    this.active = (this.active - 1 + this.filteredList.length) % this.filteredList.length;
                    if (this.optionElementClone)
                        this.optionElementClone.activeIndex = this.active;
                    this.scrollToSelectedItem('up');
                }
            }
        }
        else if (e.key === 'Tab') {
            if (optionsVisible) {
                this.hideOptions();
            }
        }
    };
    scrollToSelectedItem = (direction) => {
        if (!this.optionElementClone)
            return;
        const optionList = this.optionElementClone.querySelector('.autocomplete-option-container');
        const activeItem = this.optionElementClone.querySelector('.option--active');
        if (optionList && activeItem) {
            const optionListRect = optionList.getBoundingClientRect();
            const activeItemRect = activeItem.getBoundingClientRect();
            const itemHeight = activeItem.offsetHeight;
            if (direction === 'down') {
                if (activeItemRect.bottom > optionListRect.bottom) {
                    optionList.scrollTop += itemHeight;
                }
                else if (this.active === 0) {
                    optionList.scrollTop = 0;
                }
            }
            else if (direction === 'up') {
                if (activeItemRect.top < optionListRect.top) {
                    optionList.scrollTop -= itemHeight;
                }
                else if (this.active === this.filteredList.length - 1) {
                    optionList.scrollTop = optionList.scrollHeight;
                }
            }
        }
    };
    // --- Filtering / dropdown data ---
    // Per spec (autocomplete.yaml::options_guide.trigger):
    //   trigger=focus  → dropdown opens whenever min-length is met (including empty when min=0)
    //   trigger=input  → dropdown opens only after the user has typed AND min-length is met
    setFilter = (value, resetActive = true) => {
        let data = [];
        const rawInput = value ?? '';
        const searchInput = this.caseSensitive ? rawInput : rawInput.toLowerCase();
        this.searchTerm = rawInput;
        const meetsMin = rawInput.length >= (this.min || 0);
        const hasInputContent = rawInput.length > 0;
        const shouldFilter = this.trigger === 'focus'
            ? meetsMin
            : hasInputContent && meetsMin;
        if (shouldFilter) {
            if (hasInputContent) {
                data = this.source.filter(item => {
                    const itemValue = this.caseSensitive ? item : item.toLowerCase();
                    return itemValue.includes(searchInput);
                });
            }
            else {
                data = [...this.source];
            }
            this.isFilterActive = true;
        }
        else {
            this.isFilterActive = false;
        }
        const limitedData = data.slice(0, this.maxItemCount);
        const shouldShowOptions = this.loading || this.isFilterActive;
        if (shouldShowOptions) {
            this.setOptionList(limitedData, resetActive);
        }
        else {
            this.hideOptions();
        }
    };
    setOptionList = (data, resetActive = true) => {
        if (!this.optionElementClone)
            return;
        const cloneElement = this.optionElementClone;
        cloneElement.searchTerm = this.searchTerm;
        cloneElement.caseSensitive = this.caseSensitive;
        cloneElement.highlightMatches = this.highlightMatches;
        const isSameData = this.filteredList.length === data.length && this.filteredList.every((item, index) => item === data[index]);
        if (isSameData) {
            if (resetActive && this.active !== 0 && this.filteredList.length > 0) {
                this.active = 0;
                cloneElement.activeIndex = this.active;
            }
            requestAnimationFrame(() => this.updateOptionPosition());
            return;
        }
        this.filteredList = [...data];
        if (resetActive) {
            this.active = this.filteredList.length > 0 ? 0 : -1;
        }
        else {
            if (this.active >= this.filteredList.length) {
                this.active = this.filteredList.length > 0 ? this.filteredList.length - 1 : -1;
            }
            else if (this.active < 0 && this.filteredList.length > 0) {
                this.active = 0;
            }
        }
        cloneElement.activeIndex = this.active;
        cloneElement.source = [...this.filteredList];
        if (typeof cloneElement.forceUpdate === 'function') {
            cloneElement.forceUpdate();
        }
        requestAnimationFrame(() => this.updateOptionPosition());
    };
    // --- Input / focus / blur handlers ---
    handleInput = (event) => {
        if (this.disabled || this.readonly)
            return;
        this.touched = true;
        const value = event.target.value;
        this.value = value;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.setData(value?.trim());
            this.updateValidityState();
        }, this.debounceTime);
        this.eventEmitter('changed', value);
    };
    handleClick = (e) => {
        if (this.disabled || this.readonly)
            return;
        if (this.hasFocus)
            return;
        this.handleFocus();
        if (this.trigger === 'focus' || (this.trigger === 'input' && e.target.value)) {
            this.setData(e.target.value?.trim());
        }
    };
    handleFocus = () => {
        if (this.disabled || this.readonly)
            return;
        if (this.hasFocus)
            return;
        clearTimeout(this.blurTimeout);
        if (!this.optionElementClone) {
            if (!this.appendOptionClone())
                return;
        }
        this.hasFocus = true;
        if (this.trigger === 'focus') {
            this.setData(this.input?.value?.trim() ?? '');
        }
        else if (this.trigger === 'input' && this.input?.value) {
            this.setData(this.input?.value?.trim());
        }
    };
    setData = (value, resetActive = true) => {
        if (!this.optionElementClone) {
            console.warn('setData called but clone does not exist.');
            return;
        }
        if (!this.loading) {
            this.optionElementClone.loading = false;
            this.setFilter(value, resetActive);
        }
        else {
            const shouldShowLoading = this.trigger === 'focus' || (this.trigger === 'input' && value.length >= this.min);
            if (shouldShowLoading) {
                this.optionElementClone.loading = true;
                requestAnimationFrame(() => this.updateOptionPosition());
            }
            else {
                this.hideOptions();
            }
        }
    };
    handleSelected = (e) => {
        if (e instanceof CustomEvent && typeof e.detail === 'string') {
            this.touched = true;
            this.value = e.detail;
            this.eventEmitter('selected', e.detail);
        }
    };
    eventEmitter = (type, value) => {
        const eventDetail = {
            value,
            isValid: this.isValid,
            status: this.validStatus
        };
        if (type === 'changed')
            this.changed.emit(eventDetail);
        else if (type === 'selected')
            this.selected.emit(eventDetail);
        if (type === 'selected' && this.input) {
            this.input.value = value;
            this.input.focus();
        }
        if (type === 'selected') {
            this.hideOptions();
        }
    };
    handleBlur = (e) => {
        const relatedTarget = e.relatedTarget;
        const isFocusInsideClone = this.optionElementClone?.contains(relatedTarget);
        if (!isFocusInsideClone) {
            this.blurEvent();
        }
    };
    blurEvent() {
        this.blurTimeout = window.setTimeout(() => {
            this.hasFocus = false;
            this.hideOptions();
            if (this.input) {
                this.value = this.input.value;
            }
            this.touched = true;
            this.updateValidityState();
        }, 150);
    }
    // --- Dropdown positioning ---
    updateOptionPosition = () => {
        if (!this.optionElementClone)
            return;
        const shouldShow = this.hasFocus && (this.loading || this.isFilterActive);
        if (shouldShow) {
            const cloneElement = this.optionElementClone;
            cloneElement.style.display = 'block';
            cloneElement.style.visibility = 'hidden';
            const inputRect = this.host.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
            const optionRect = cloneElement.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const viewportWidth = window.innerWidth;
            let top = inputRect.bottom + scrollTop;
            if ((inputRect.bottom + optionRect.height > viewportHeight) && (inputRect.top - optionRect.height > 0)) {
                top = inputRect.top - optionRect.height + scrollTop;
            }
            let left = inputRect.left + scrollLeft;
            if (left + inputRect.width > viewportWidth + scrollLeft - 5) {
                left = viewportWidth + scrollLeft - inputRect.width - 5;
            }
            if (left < scrollLeft + 5) {
                left = scrollLeft + 5;
            }
            cloneElement.style.top = `${Math.max(0, top)}px`;
            cloneElement.style.left = `${Math.max(0, left)}px`;
            cloneElement.style.width = `${inputRect.width}px`;
            cloneElement.style.visibility = 'visible';
        }
        else {
            this.hideOptions();
        }
    };
    hideOptions = () => {
        if (!this.optionElementClone)
            return;
        this.active = -1;
        this.isFilterActive = false;
        this.optionElementClone.style.visibility = 'hidden';
        this.optionElementClone.style.display = 'none';
        this.optionElementClone.loading = false;
    };
    // --- Form-associated callbacks ---
    formAssociatedCallback() {
        this.updateValidityState();
    }
    formDisabledCallback(disabled) {
        this.disabled = disabled;
    }
    formResetCallback() {
        this.value = this.initialValue;
        if (this.input) {
            this.input.value = this.initialValue;
        }
        this.touched = false;
        this.formSubmitted = false;
        if (!this.isValid && this.validStatus === 'custom') {
            this.validStatus = '';
            this.isValid = true;
        }
        this.updateValidityState();
    }
    formStateRestoreCallback(state) {
        this.value = state || '';
        if (this.input) {
            this.input.value = this.value;
        }
        this.updateValidityState();
    }
    /* ===========================================================================
     *  Form-error pattern (shared across all SAIDA form-associated components)
     * ---------------------------------------------------------------------------
     *  One slot, two triggers:
     *
     *    1. Declarative — consumer writes the UI once, it appears automatically
     *       when any native constraint (`required`, …) fails AND the user has
     *       either touched the field or submitted the form.
     *
     *         <sy-autocomplete required>
     *           <div slot="error">Please pick a fruit</div>
     *         </sy-autocomplete>
     *
     *    2. Programmatic — app code decides a value is invalid per business
     *       rule and surfaces the same slot via setCustomError() / clearCustomError().
     *
     *         el.setCustomError();   // validStatus = 'custom', isValid = false
     *         el.clearCustomError(); // revert to native constraint validation
     *
     *  ElementInternals.validationMessage receives the slot's textContent when
     *  present (so FormData / reportValidity surfaces it), otherwise a neutral
     *  default is used. CSS controls visibility: `.visible-error` is applied
     *  when `(touched || formSubmitted) && !isValid`.
     * =========================================================================== */
    getSlotErrorText() {
        const slotEl = this.host.querySelector('[slot="error"]');
        return (slotEl?.textContent ?? '').trim();
    }
    updateValidityState() {
        // (1) Programmatic custom error takes priority — set by setCustomError().
        if (this.validStatus === 'custom' && !this.isValid) {
            const msg = this.getSlotErrorText() || this.getErrorMessage('custom') || ' ';
            this.internals?.setValidity({ customError: true }, msg);
            this.internals?.setFormValue(this.value || '', this.value || '');
            return;
        }
        // (2) Native constraint validation (required, …).
        let currentIsValid = true;
        let currentValidStatus = '';
        if (this.required && (!this.value || this.value.length === 0)) {
            currentIsValid = false;
            currentValidStatus = 'valueMissing';
        }
        this.isValid = currentIsValid;
        this.validStatus = currentValidStatus;
        this.internals?.setFormValue(this.value || '', this.value || '');
        if (!this.isValid) {
            // When the consumer supplied a slot="error" UI, we mark it as customError
            // (with the slot's text as the validation message) so the native bubble is
            // suppressed and the slot is what the user sees.
            if (this.hasSlotErrorMessage) {
                const slotText = this.getSlotErrorText() || this.getErrorMessage(this.validStatus) || ' ';
                this.internals?.setValidity({ customError: true }, slotText);
            }
            else {
                this.internals?.setValidity({ [this.validStatus]: true }, this.getErrorMessage(this.validStatus));
            }
        }
        else {
            this.internals?.setValidity({});
        }
    }
    customSettingError() {
        this.isValid = false;
        this.validStatus = 'custom';
        // Force visual invalid state — developer-triggered error should be immediately visible
        // without waiting for the user to blur or submit.
        this.touched = true;
        this.updateValidityState();
    }
    handleHostFocus() {
        // Tab-key focus lands on the host (tabindex="0"). Forward it to the inner input
        // so keyboard users get the same behaviour as mouse users.
        if (this.disabled || this.readonly)
            return;
        if (document.activeElement === this.input)
            return;
        this.input?.focus();
    }
    handleInvalidEvent(e) {
        this.formSubmitted = true;
        this.isValid = false;
        const errorSlotElement = this.host.querySelector('[slot="error"]');
        const slotHasContent = !!errorSlotElement && (errorSlotElement.textContent?.trim().length ?? 0) > 0;
        // Clear-cut toggle — consistent across all form-associated SAIDA controls:
        //   noNativeValidity=true  → native popup suppressed, slot becomes the UI
        //   noNativeValidity=false → browser shows native popup. DO NOT call
        //     preventDefault — per HTML spec, a single preventDefaulted invalid
        //     event suppresses popups on every form control in the form.
        if (this.noNativeValidity) {
            e.preventDefault();
            e.stopPropagation();
            this.hasSlotErrorMessage = slotHasContent;
            if (slotHasContent) {
                this.host.setAttribute('has-custom-error', '');
                if (this.input)
                    this.input.setCustomValidity('');
                this.internals?.setValidity({ customError: true }, ' ');
            }
            else {
                this.host.removeAttribute('has-custom-error');
            }
        }
        else {
            this.hasSlotErrorMessage = false;
            this.host.removeAttribute('has-custom-error');
        }
        this.updateValidityState();
    }
    handleSlotChange = () => {
        const errorSlot = this.host.querySelector('[slot="error"]');
        if (!errorSlot) {
            this.hasSlotErrorMessage = false;
            this.hasPopupErrorComponent = false;
            return;
        }
        this.hasPopupErrorComponent = !!errorSlot.querySelector('sy-tooltip, sy-popover, sy-popconfirm, sy-inline-message');
        this.hasSlotErrorMessage = errorSlot.textContent.trim().length > 0 || errorSlot.children.length > 0;
    };
    getErrorMessage(type) {
        if (type === '')
            return '';
        const validityMessage = {
            valueMissing: 'This field is required',
            custom: 'Invalid input'
        };
        return validityMessage[type] || '';
    }
    render() {
        const filled = !!(this.value && this.value.length > 0);
        const showInvalid = (this.formSubmitted || this.touched) && !this.isValid;
        const wrapperClasses = {
            'autocomplete-inner': true,
            'autocomplete': true,
            'autocomplete--small': this.size === 'small',
            'autocomplete--medium': this.size === 'medium',
            'autocomplete--large': this.size === 'large',
            'autocomplete--filled': filled,
            'autocomplete--focused': this.hasFocus,
            'autocomplete--disabled': this.disabled,
            'autocomplete--readonly': this.readonly,
            'autocomplete--default': this.status === 'default',
            'autocomplete--warning': this.status === 'warning',
            'autocomplete--error': this.status === 'error',
            'autocomplete--success': this.status === 'success',
            'autocomplete--invalid': showInvalid,
        };
        const errorContainerClasses = {
            'error-container': true,
            'popup-error-container': this.hasPopupErrorComponent,
            'text-error-container': !this.hasPopupErrorComponent,
            'visible-error': showInvalid,
        };
        return (h("div", { key: 'a59d754d0eb1ea78cd793aad8e9f716bdb12f3e3', class: "autocomplete-container" }, h("div", { key: 'fcf23dc77d6f358812859d0b869b4bcdc988660a', class: "autocomplete-wrapper" }, h("div", { key: '787be3acc4e77687337007d457b9311e488f78d5', tabindex: "-1", class: wrapperClasses }, h("input", { key: '08144f19369669d7602665e6a2ae345568ec870d', ref: (el) => this.input = el, type: "text", name: this.name, value: this.value, placeholder: this.placeholder, disabled: this.disabled, readOnly: this.readonly, required: this.required, "aria-autocomplete": "list", "aria-expanded": this.hasFocus ? 'true' : 'false', "aria-invalid": showInvalid ? 'true' : 'false', autoComplete: "off", onClick: (e) => this.handleClick(e), onInput: (e) => this.handleInput(e), onFocus: () => this.handleFocus(), onBlur: (e) => this.handleBlur(e) }), h("sy-autocomplete-option", { key: '037637f6eb227cdeb6a83a67315874af5e6489e9', ref: (el) => {
                if (el) {
                    el.style.setProperty('display', 'none', 'important');
                    el.style.setProperty('visibility', 'hidden', 'important');
                    el.style.setProperty('position', 'absolute', 'important');
                    el.style.setProperty('pointer-events', 'none', 'important');
                    el.style.setProperty('z-index', '-9999', 'important');
                }
            }, source: this.source })), h("div", { key: '35e9cd960fff9306873b0f6bd394bbf7b078d031', class: errorContainerClasses }, h("slot", { key: '665a72fca13bd1fb334b570dc81981ed8567ada5', name: "error", onSlotchange: () => this.handleSlotChange() })))));
    }
    static get formAssociated() { return true; }
    static get watchers() { return {
        "required": ["handleValidityChange"],
        "value": ["handleValidityChange"],
        "min": ["handleValidityChange"],
        "source": ["handleSourceChange"],
        "disabled": ["handleDisabledChange"]
    }; }
    static get style() { return syAutocompleteCss; }
}, [326, "sy-autocomplete", {
        "caseSensitive": [516, "case-sensitive"],
        "debounceTime": [2, "debounce-time"],
        "disabled": [1540],
        "highlightMatches": [516, "highlight-matches"],
        "loading": [516],
        "min": [514],
        "name": [1],
        "placeholder": [1],
        "readonly": [516],
        "required": [516],
        "size": [513],
        "status": [513],
        "value": [1025],
        "source": [1040],
        "trigger": [513],
        "noNativeValidity": [4, "no-native-validity"],
        "filteredList": [32],
        "hasFocus": [32],
        "touched": [32],
        "formSubmitted": [32],
        "active": [32],
        "isValid": [32],
        "validStatus": [32],
        "hasSlotErrorMessage": [32],
        "hasPopupErrorComponent": [32],
        "isFilterActive": [32],
        "searchTerm": [32],
        "setFocus": [64],
        "setBlur": [64],
        "checkValidity": [64],
        "reportValidity": [64],
        "getValidStatus": [64],
        "setCustomError": [64],
        "clearCustomError": [64]
    }, [[0, "focus", "handleHostFocus"], [2, "invalid", "handleInvalidEvent"]], {
        "required": ["handleValidityChange"],
        "value": ["handleValidityChange"],
        "min": ["handleValidityChange"],
        "source": ["handleSourceChange"],
        "disabled": ["handleDisabledChange"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-autocomplete", "sy-autocomplete-option", "sy-empty", "sy-icon", "sy-spinner"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-autocomplete":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyAutocomplete$1);
            }
            break;
        case "sy-autocomplete-option":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "sy-empty":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "sy-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "sy-spinner":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const SyAutocomplete = SyAutocomplete$1;
const defineCustomElement = defineCustomElement$1;

export { SyAutocomplete, defineCustomElement };
