import { p as proxyCustomElement, H, h } from './index.js';
import { f as fnAssignPropFromAlias, b as fnFindClosestParentByTagName, c as fnGetAssignedNodesContent } from './p-Dlcw8XSW.js';

const syButtonCss = ".sc-sy-button:root,.sc-sy-button-h{display:inline-block;--button-size-large:var(--component-large);--button-size-medium:var(--component-medium);--button-size-small:var(--component-small);--button-spacing-large:10px;--button-spacing-medium:var(--spacing-2xsmall);--button-spacing-small:var(--spacing-3xsmall);--button-justified:100%}.sc-sy-button:root sy-spinner.sc-sy-button,.sc-sy-button-h sy-spinner.sc-sy-button{width:min-content}sy-button[full-width].sc-sy-button-h,sy-button[justified].sc-sy-button-h{width:100%}sy-button[full-width].sc-sy-button-h,sy-button[full-width] .sc-sy-button-h,sy-button[full-width=true].sc-sy-button-h,sy-button[full-width=true] .sc-sy-button-h,sy-button[justified].sc-sy-button-h,sy-button[justified] .sc-sy-button-h,sy-button[justified=true].sc-sy-button-h,sy-button[justified=true] .sc-sy-button-h{display:block;width:100%}button.sc-sy-button{display:flex;align-items:center;justify-content:center;padding:0px var(--button-medium-spacing);line-height:normal !important;width:100%;white-space:nowrap}button.button--first.sc-sy-button,button.button--middle.sc-sy-button,button.button--last.sc-sy-button{margin:0;margin-left:-1px}button.button--first.sc-sy-button{margin-left:0}button.button--vertical.button--first.sc-sy-button,button.button--vertical.button--middle.sc-sy-button,button.button--vertical.button--last.sc-sy-button{margin:0;margin-top:-1px}button.button--vertical.button--first.sc-sy-button{margin-top:0}button.button--first.sc-sy-button{border-top-right-radius:0px;border-bottom-right-radius:0px}button.button--middle.sc-sy-button{border-radius:0px}button.button--last.sc-sy-button{border-top-left-radius:0px;border-bottom-left-radius:0px}button.button--vertical.button--first.sc-sy-button{border-top-left-radius:var(--border-radius-medium);border-top-right-radius:var(--border-radius-medium);border-bottom-left-radius:0px;border-bottom-right-radius:0px}button.button--vertical.button--middle.sc-sy-button{border-radius:0px}button.button--vertical.button--last.sc-sy-button{border-top-left-radius:0px;border-top-right-radius:0px;border-bottom-left-radius:var(--border-radius-medium);border-bottom-right-radius:var(--border-radius-medium)}button.button--small.button--first.sc-sy-button{border-top-left-radius:var(--border-radius-small);border-top-right-radius:var(--border-radius-small)}button.button--small.button--last.sc-sy-button{border-bottom-left-radius:var(--border-radius-small);border-bottom-right-radius:var(--border-radius-small)}button[full-width=true].sc-sy-button,button[justified=true].sc-sy-button{width:100%}button[full-width=true][loading=true].sc-sy-button .spinner--wrapper.sc-sy-button,button[justified=true][loading=true].sc-sy-button .spinner--wrapper.sc-sy-button{width:auto}button[disabled].sc-sy-button,button[disabled].sc-sy-button:hover,button[disabled].sc-sy-button:active,button[disabled].sc-sy-button:focus{border:var(--border-small) var(--button-default-border-disabled);background-color:var(--button-default-background-disabled);color:var(--button-default-text-disabled);cursor:auto}button[loading=false].sc-sy-button .spinner--wrapper.sc-sy-button{display:none}button[loading=true].sc-sy-button .spinner--wrapper.sc-sy-button{display:inline-flex;align-items:center;justify-content:center;height:100%;flex-direction:column;padding:0 var(--spacing-3xsmall)}button[loading=true].sc-sy-button .spinner--wrapper.sc-sy-button .spinner-contents.sc-sy-button{padding:var(--spacing-xsmall)}button[loading=true].sc-sy-button .spinner.sc-sy-button svg.sc-sy-button{width:100%;height:100%;animation:rotator 1.4s linear infinite}@keyframes rotator{0%{transform:rotate(0deg)}100%{transform:rotate(270deg)}}button[loading=true].sc-sy-button .path.sc-sy-button{stroke-dasharray:187;stroke-dashoffset:0;transform-origin:center;animation:dash 1.4s ease-in-out infinite, colors 5.6s ease-in-out infinite}@keyframes colors{0%{stroke:var(--button-default-icon-disabled)}100%{stroke:var(--button-default-icon-disabled)}}@keyframes dash{0%{stroke-dashoffset:187}50%{stroke-dashoffset:46.75;transform:rotate(135deg)}100%{stroke-dashoffset:187;transform:rotate(450deg)}}.button--primary.sc-sy-button{background-color:var(--button-primary-background-enabled);border:var(--border-small) var(--button-primary-border-enabled);color:var(--button-primary-text-enabled);cursor:var(--cursor-button)}.button--primary.sc-sy-button:hover{background-color:var(--button-primary-background-hover);border:var(--border-small) var(--button-primary-border-hover);color:var(--button-primary-text-hover)}.button--primary.sc-sy-button:active{background-color:var(--button-primary-background-active);border:var(--border-small) var(--button-primary-border-active);color:var(--button-primary-text-active)}.button--primary.sc-sy-button:focus-visible{background-color:var(--button-primary-background-focus);color:var(--button-primary-text-focus);border:var(--border-small) var(--button-primary-border-focus);outline:var(--border-small) var(--button-primary-border-focus)}.button--default.sc-sy-button{background-color:var(--button-default-background-enabled);border:var(--border-small) var(--button-default-border-enabled);color:var(--button-default-text-enabled);box-sizing:border-box;cursor:var(--cursor-button)}.button--default.sc-sy-button:hover{background-color:var(--button-default-background-enabled);border:var(--border-small) var(--button-default-border-hover);color:var(--button-default-text-hover)}.button--default.sc-sy-button:active{background-color:var(--button-default-background-enabled);border:var(--border-small) var(--button-default-border-active);color:var(--button-default-text-active)}.button--default.sc-sy-button:focus-visible{background-color:var(--button-default-background-enabled);border:var(--border-small) var(--button-default-border-focus);outline:var(--border-small) var(--button-default-text-focus)}.button--secondary.sc-sy-button{background-color:var(--button-secondary-background-enabled);border:var(--border-small) var(--button-secondary-border-enabled);color:var(--button-secondary-text-enabled);cursor:var(--cursor-button)}.button--secondary.sc-sy-button:hover{background-color:var(--button-secondary-background-enabled);border:var(--border-small) var(--button-secondary-border-hover);color:var(--button-secondary-text-hover)}.button--secondary.sc-sy-button:active{background-color:var(--button-secondary-background-enabled);border:var(--border-small) var(--button-secondary-border-active);color:var(--button-secondary-text-active)}.button--secondary.sc-sy-button:focus-visible{background-color:var(--button-secondary-background-enabled);border:var(--border-small) var(--button-secondary-border-focus);outline:var(--border-small) var(--button-secondary-border-focus)}.button--borderless.sc-sy-button{background-color:transparent;border:var(--border-small) transparent;color:var(--button-borderless-text-enabled);cursor:var(--cursor-button)}.button--borderless.sc-sy-button:hover{background-color:var(--button-borderless-background-hover);border:var(--border-small) var(--button-borderless-background-hover);color:var(--button-borderless-text-hover)}.button--borderless.sc-sy-button:active{background-color:var(--button-borderless-background-active);border:var(--border-small) var(--button-borderless-background-active);color:var(--button-borderless-text-active)}.button--borderless.sc-sy-button:focus-visible{background-color:var(--button-borderless-background-focus);border:var(--border-small) var(--button-borderless-background-focus);color:var(--button-borderless-text-focus);outline:var(--border-small) var(--button-borderless-border-focus)}.button--large.sc-sy-button{border-radius:var(--border-radius-medium);height:var(--button-size-large);min-width:var(--button-size-large);padding:0 var(--button-spacing-large);font-family:\"Roboto\";font-size:16px;font-weight:400;line-height:26px;letter-spacing:0.5px;gap:var(--spacing-2xsmall)}.button--large.sc-sy-button .spinner.sc-sy-button{width:20px;height:20px}.button--medium.sc-sy-button{border-radius:var(--border-radius-medium);height:var(--button-size-medium);min-width:var(--button-size-medium);padding:0 var(--button-spacing-medium);font-family:\"Roboto\";font-size:14px;font-weight:400;line-height:22px;text-decoration:none;text-transform:none;letter-spacing:0.25px;gap:var(--spacing-3xsmall)}.button--medium.sc-sy-button .spinner.sc-sy-button{width:16px;height:16px;border-width:5px !important}.button--small.sc-sy-button{border-radius:var(--border-radius-small);height:var(--button-size-small);min-width:var(--button-size-small);padding:0 var(--button-spacing-small);font-family:\"Roboto\";font-size:12px;font-weight:400;line-height:18px;letter-spacing:0;gap:var(--spacing-4xsmall)}.button--small.sc-sy-button .spinner.sc-sy-button{width:12px;height:12px;border-width:4px !important}.button--square.sc-sy-button{border-radius:0px}.button--circle.sc-sy-button{border-radius:var(--border-radius-full)}.button--round.sc-sy-button{border-radius:var(--border-radius-medium)}sy-radio-button.sc-sy-button-h{position:relative;display:inline-block}sy-radio-button.sc-sy-button-h button.sc-sy-button{border-left:0px;border-radius:0}sy-radio-button.sc-sy-button-h button.sc-sy-button:hover{border-left:0px}sy-radio-button.sc-sy-button-h button.sc-sy-button:hover::before{border-left:var(--border-small) var(--button-primary-border-hover)}sy-radio-button.sc-sy-button-h button.sc-sy-button::before{content:\"\";position:absolute;top:0px;left:-1px;display:inline-block;width:1px;height:100%;box-sizing:content-box;border-left:var(--border-small) var(--button-default-border-enabled)}sy-radio-button.sc-sy-button-h button.sc-sy-button:focus-visible{box-shadow:none;position:relative;z-index:1}sy-radio-button.sc-sy-button-h button.sc-sy-button:disabled{border-left:none}sy-radio-button.sc-sy-button-h button.sc-sy-button:disabled::before{border-left:var(--border-small) var(--button-default-border-disabled) !important}sy-radio-button.sc-sy-button-h .button--primary.sc-sy-button::before{border-left:var(--border-small) var(--button-primary-border-active)}sy-radio-button.sc-sy-button-h:first-of-type .button--default.sc-sy-button{border-left:var(--border-small) var(--button-default-border-enabled);border-radius:var(--border-radius-medium) 0 0 var(--border-radius-medium)}sy-radio-button.sc-sy-button-h:first-of-type .button--default.sc-sy-button::before{border-left:0px}sy-radio-button.sc-sy-button-h:first-of-type .button--default.sc-sy-button:hover{border-left:var(--border-small) var(--button-default-border-hover)}sy-radio-button.sc-sy-button-h:first-of-type .button--default.sc-sy-button:active{border-left:var(--border-small) var(--button-default-border-active)}sy-radio-button.sc-sy-button-h:first-of-type .button--default.sc-sy-button:disabled{border-left:var(--border-small) var(--button-default-border-disabled)}sy-radio-button.sc-sy-button-h:first-of-type .button--default.sc-sy-button:disabled::before{border-left:none !important}sy-radio-button.sc-sy-button-h:first-of-type .button--default.sc-sy-button:after:hover{border-right:var(--border-small) var(--button-default-border-hover)}sy-radio-button.sc-sy-button-h:first-of-type .button--secondary.sc-sy-button{border-left:var(--border-small) var(--button-secondary-border-enabled);border-radius:var(--border-radius-medium) 0 0 var(--border-radius-medium)}sy-radio-button.sc-sy-button-h:first-of-type .button--secondary.sc-sy-button::before{border-left:0px}sy-radio-button.sc-sy-button-h:first-of-type .button--secondary.sc-sy-button:hover{border-left:var(--border-small) var(--button-secondary-border-hover)}sy-radio-button.sc-sy-button-h:first-of-type .button--secondary.sc-sy-button:active{border-left:var(--border-small) var(--button-secondary-border-active)}sy-radio-button.sc-sy-button-h:first-of-type .button--secondary.sc-sy-button:disabled{border-left:var(--border-small) var(--button-default-border-disabled)}sy-radio-button.sc-sy-button-h:first-of-type .button--secondary.sc-sy-button:disabled::before{border-left:none !important}sy-radio-button.sc-sy-button-h:first-of-type .button--primary.sc-sy-button{border-left:var(--border-small) var(--button-primary-border-enabled);border-radius:var(--border-radius-medium) 0 0 var(--border-radius-medium)}sy-radio-button.sc-sy-button-h:first-of-type .button--primary.sc-sy-button::before{border-left:0px}sy-radio-button.sc-sy-button-h:first-of-type .button--primary.sc-sy-button:hover{border-left:var(--border-small) var(--button-primary-border-hover)}sy-radio-button.sc-sy-button-h:first-of-type .button--primary.sc-sy-button:active{border-left:var(--border-small) var(--button-primary-border-hover)}sy-radio-button.sc-sy-button-h:first-of-type .button--primary.sc-sy-button:disabled{border-left:var(--border-small) var(--button-default-border-disabled)}sy-radio-button.sc-sy-button-h:first-of-type .button--primary.sc-sy-button:disabled::before{border-left:none !important}sy-radio-button.sc-sy-button-h:last-of-type button.sc-sy-button{border-radius:0 var(--border-radius-medium) var(--border-radius-medium) 0}sy-radio-button.sc-sy-button-h:last-of-type button.sc-sy-button::after{border-right:var(--border-small) transparent}sy-radio-button.sc-sy-button-h:last-of-type::before{border-left:var(--border-small) var(--button-default-border-enabled)}sy-radio-button.sc-sy-button-h:last-of-type button.button--small.sc-sy-button{border-radius:0 var(--border-radius-small) var(--border-radius-small) 0}sy-radio-button.sc-sy-button-h:last-of-type::before{border-left:var(--border-small) var(--button-default-border-enabled)}";

const SyButton = /*@__PURE__*/ proxyCustomElement(class SyButton extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.internals = this.attachInternals();
    }
    get host() { return this; }
    internals;
    formSubmitGuard;
    // --- Public Properties (spec: attributes) ---
    disabled = false;
    loading = false;
    size = 'medium';
    variant = 'default';
    /** Expand the button to the parent container's full width. Spec name: `full-width`. */
    fullWidth = false;
    /** Render the button without its text label (icon-only). Spec name: `icon-only`. */
    iconOnly = false;
    /** Tooltip text exposed via the native `title` attribute. Required for icon-only buttons. */
    tooltip = '';
    /** Native button type — drives form submit/reset behaviour. */
    type = 'button';
    /** Native formnovalidate — skip form validation when this button submits. */
    formnovalidate = false;
    // --- Private State ---
    buttonGroup = false;
    vertical = false;
    first = false;
    last = false;
    hasContent = false;
    isInsideHeader = false;
    /** Mirror of `disabled` that can be flipped by `formDisabledCallback` (fieldset disabled). */
    internalDisabled = false;
    // --- Lifecycle ---
    connectedCallback() {
        this.installFormSubmitGuard();
    }
    disconnectedCallback() {
        this.removeFormSubmitGuard();
    }
    componentWillLoad() {
        // Accept legacy `justified` attribute as a fallback for `full-width`. Existing
        // consumers using the old attribute continue to work while we migrate their
        // markup. Spec rule #6: document-based naming wins; we coexist temporarily.
        const legacyJustified = fnAssignPropFromAlias(this.host, 'justified');
        if (legacyJustified !== null && legacyJustified !== undefined) {
            this.fullWidth = legacyJustified;
        }
        this.internalDisabled = this.disabled;
    }
    componentDidLoad() {
        this.isInsideHeader = fnFindClosestParentByTagName(this.host, 'sy-global-header');
    }
    componentWillRender() {
        this.hasContent = !!fnGetAssignedNodesContent(this.host);
    }
    handleDisabledChange(newValue) {
        this.internalDisabled = newValue;
    }
    // --- Form callbacks ---
    formAssociatedCallback() { }
    formDisabledCallback(disabled) { this.internalDisabled = disabled; }
    formResetCallback() { this.host.dispatchEvent(new CustomEvent('form-reset')); }
    formStateRestoreCallback(_state, _mode) { }
    // --- Public Methods ---
    async setButtonGroupState(state) {
        this.buttonGroup = state.buttonGroup;
        this.vertical = state.vertical;
        this.first = state.first;
        this.last = state.last;
    }
    async setClick() { this.host.querySelector('button')?.click(); }
    async setFocus() { this.host.querySelector('button')?.focus({ focusVisible: true }); }
    async setBlur() { this.host.querySelector('button')?.blur(); }
    // --- Form submit guard ---
    /**
     * Install a CAPTURE-phase `submit` listener on `document`. Running during capture
     * means we see the event before any bubbling listener (including lit-html's
     * `@submit` binding in stories). That gives us a chance to cancel submission
     * when any SAIDA form-associated control is invalid.
     *
     * Attaching directly to the form doesn't work: on a target element the DOM spec
     * invokes listeners in registration order regardless of useCapture.
     *
     * `stopImmediatePropagation` from a document-capture handler stops the target-
     * phase and bubble-phase listeners on the form from firing at all — this is
     * what makes `required` + unchecked `sy-checkbox` guarantee a block.
     */
    installFormSubmitGuard() {
        const form = this.host.closest('form');
        if (!form)
            return;
        this.formSubmitGuard = (e) => {
            if (e.target !== form)
                return;
            if (this.type !== 'submit' || this.formnovalidate)
                return;
            if (!this.isFormValid(form)) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                form.reportValidity();
            }
        };
        document.addEventListener('submit', this.formSubmitGuard, true);
    }
    removeFormSubmitGuard() {
        if (this.formSubmitGuard) {
            document.removeEventListener('submit', this.formSubmitGuard, true);
        }
        this.formSubmitGuard = undefined;
    }
    handleButtonClick = (event) => {
        if (this.internalDisabled || this.loading) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        // Fall back to DOM traversal if internals.form is flaky.
        const form = this.internals?.form || this.host.closest('form');
        if (!form)
            return;
        switch (this.type) {
            case 'submit': {
                // Always cancel the native click's default submit flow — we drive
                // submission manually so we can run validation first.
                event.preventDefault();
                event.stopPropagation();
                if (!this.formnovalidate && !this.isFormValid(form)) {
                    form.reportValidity();
                    break;
                }
                const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
                if (!form.dispatchEvent(submitEvent))
                    break;
                form.submit();
                break;
            }
            case 'reset':
                event.preventDefault();
                event.stopPropagation();
                form.reset();
                break;
        }
    };
    /**
     * Native `form.checkValidity()` surfaces invalidity set via ElementInternals.setValidity().
     * Custom controls that haven't finished form-association wiring are checked via a
     * defensive sweep — belt-and-braces so required controls always block submission.
     */
    isFormValid(form) {
        let valid = form.checkValidity();
        if (!valid)
            return false;
        const customControls = form.querySelectorAll('sy-checkbox, sy-radio, sy-input, sy-input-number, sy-textarea, sy-select, sy-switch, sy-autocomplete, sy-datepicker');
        customControls.forEach((el) => {
            const required = el.required === true || el.hasAttribute('required');
            if (!required)
                return;
            const checked = el.checked === true;
            const indeterminate = el.indeterminate === true;
            const value = el.value;
            const isEmpty = (el.tagName === 'SY-CHECKBOX' && !checked && !indeterminate) ||
                (el.tagName === 'SY-RADIO' && !checked) ||
                (el.tagName === 'SY-SWITCH' && !checked) ||
                ((el.tagName !== 'SY-CHECKBOX' && el.tagName !== 'SY-RADIO' && el.tagName !== 'SY-SWITCH') &&
                    (value === undefined || value === null || value === ''));
            if (isEmpty)
                valid = false;
        });
        return valid;
    }
    render() {
        const classNames = {
            [`button--${this.variant}`]: true,
            [`button--${this.size}`]: true,
            'button--first': this.buttonGroup && this.first,
            'button--last': this.buttonGroup && this.last,
            'button--middle': this.buttonGroup && !this.first && !this.last,
            'button--vertical': this.buttonGroup && this.vertical,
            'button--header': this.isInsideHeader,
            'button--no-content': !this.hasContent,
            'button--icon-only': this.iconOnly,
        };
        return (h("button", { key: '1dc15a65f14e2368dff285e47d63731c4e4765b1', class: Object.keys(classNames).filter(key => classNames[key]).join(' '),
            // Always type="button" on the inner native button. Native type="submit"/"reset"
            // fires BEFORE our click handler's preventDefault has a chance to cancel validation
            // in some browser timing edge cases. We drive submit/reset manually from
            // handleButtonClick; the outer sy-button still exposes `this.type` for tooling.
            type: "button", disabled: this.internalDisabled || this.loading, formnovalidate: this.formnovalidate, title: this.tooltip || undefined, "aria-busy": this.loading ? 'true' : undefined, "aria-disabled": this.internalDisabled ? 'true' : undefined, "aria-label": this.iconOnly && this.tooltip ? this.tooltip : undefined, ...(this.loading ? { loading: 'true' } : { loading: 'false' }), ...(this.fullWidth && { 'full-width': 'true' }), ...(this.fullWidth && { justified: 'true' }), onClick: this.handleButtonClick }, this.loading && (h("div", { key: 'fc7739f5a17757509c6d0f1df7234a2eb0c51927', class: "spinner--wrapper" }, h("div", { key: '27506c40c8537c48fdc8fad2b93e8897dd9ae2ba', class: "spinner" }, h("svg", { key: 'bf03dfdb8d1289a67ebd7c442f7b3efbc67a5918', viewBox: "0 0 66 66" }, h("circle", { key: '5099fc83008cdb12e883a5355bb2601e9d9865ee', class: "path", fill: "none", "stroke-width": "6", "stroke-linecap": "round", cx: "33", cy: "33", r: "30" }))))), h("slot", { key: 'c30ecbd9d252e95d87d57c4522e424862fb90759' })));
    }
    static get formAssociated() { return true; }
    static get watchers() { return {
        "disabled": ["handleDisabledChange"]
    }; }
    static get style() { return syButtonCss; }
}, [326, "sy-button", {
        "disabled": [516],
        "loading": [516],
        "size": [513],
        "variant": [513],
        "fullWidth": [1540, "full-width"],
        "iconOnly": [1540, "icon-only"],
        "tooltip": [1],
        "type": [1],
        "formnovalidate": [4],
        "buttonGroup": [32],
        "vertical": [32],
        "first": [32],
        "last": [32],
        "hasContent": [32],
        "isInsideHeader": [32],
        "internalDisabled": [32],
        "setButtonGroupState": [64],
        "setClick": [64],
        "setFocus": [64],
        "setBlur": [64]
    }, undefined, {
        "disabled": ["handleDisabledChange"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-button"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-button":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyButton);
            }
            break;
    } });
}

export { SyButton as S, defineCustomElement as d };
