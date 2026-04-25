import { p as proxyCustomElement, H, c as createEvent, h } from './index.js';

const sySwitchCss = ".sc-sy-switch:root,.sc-sy-switch-h{display:inline-block;cursor:pointer;user-select:none;display:flex;align-items:center;gap:var(--spacing-2xsmall)}.switch.sc-sy-switch{width:44px;height:22px;border-radius:15px;border:var(--border-small) var(--switch-unchecked-background-enabled);background-color:var(--switch-unchecked-background-enabled);position:relative;color:var(--switch-unchecked-text-enabled);box-sizing:border-box}.switch.sc-sy-switch .handle.sc-sy-switch{width:18px;height:18px;border-radius:50%;background-color:var(--switch-unchecked-icon-enabled);position:absolute;top:1px;left:1px;transition:transform var(--transition-slow);display:flex;align-items:center;justify-content:center;box-shadow:var(--switch-shadow)}.switch.sc-sy-switch:active .handle.sc-sy-switch{width:24px;transition:all 0.2s ease-in-out;border-radius:var(--border-radius-full)}.switch.readonly.sc-sy-switch{opacity:var(--opacity-03)}.switch.readonly.sc-sy-switch .handle.sc-sy-switch::before{display:inline-block;content:\"\";width:2px;height:10px;background-color:var(--switch-unchecked-background-readonly)}.switch.readonly.on.sc-sy-switch .handle.sc-sy-switch::before{background-color:var(--switch-checked-background-readonly)}.switch.disabled.sc-sy-switch{background-color:var(--switch-unchecked-background-disabled);cursor:auto;opacity:var(--opacity-03)}.switch.on.sc-sy-switch{background-color:var(--switch-checked-background-enabled);border:var(--border-small) var(--switch-checked-background-enabled)}.switch.on.sc-sy-switch .handle.sc-sy-switch{right:1px;left:auto}.switch.on.readonly.sc-sy-switch{background-color:var(--switch-checked-background-disabled)}.switch.on.disabled.sc-sy-switch{background-color:var(--switch-checked-background-disabled)}.switch.on.sc-sy-switch .loader.sc-sy-switch{border:1.5px solid var(--switch-checked-icon-loading);border-top:1.5px solid var(--switch-checked-background-loading)}.switch.disabled.sc-sy-switch:active .handle.sc-sy-switch,.switch.readonly.sc-sy-switch:active .handle.sc-sy-switch,.switch.sc-sy-switch .loader.sc-sy-switch:active .handle.sc-sy-switch{width:18px;transition:none !important}.switch.switch--small.sc-sy-switch{width:28px;height:16px;line-height:16px}.switch.switch--small.on.sc-sy-switch .handle.sc-sy-switch{right:1px;left:auto}.switch.switch--small.sc-sy-switch:active .handle.sc-sy-switch{width:16px;transition:all var(--transition-slow) ease-in-out;border-radius:var(--border-radius-full)}.switch.switch--small.sc-sy-switch .handle.sc-sy-switch{position:absolute;top:1px;left:1px;width:12px;height:12px}.switch.switch--small.readonly.sc-sy-switch .handle.sc-sy-switch::before{width:1px;height:6px}.switch.switch--small.sc-sy-switch .loader.sc-sy-switch{width:9px;height:9px}.switch.switch--small.disabled.sc-sy-switch:active .handle.sc-sy-switch,.switch.switch--small.readonly.sc-sy-switch:active .handle.sc-sy-switch,.switch.switch--small.sc-sy-switch .loader.sc-sy-switch:active .handle.sc-sy-switch{width:12px;transition:none !important}.switch.sc-sy-switch:focus-visible{border:var(--border-small) var(--border-brand-bold);outline:var(--border-small) var(--border-brand-bold)}.switch.switch--invalid.sc-sy-switch{border:var(--border-small) var(--input-form-field-border-invaild);background-color:var(--input-form-field-background-invaild)}.loader.sc-sy-switch{border:2px solid var(--switch-unchecked-icon-loading);border-top:2px solid var(--switch-unchecked-background-enabled);box-sizing:border-box;border-radius:50%;width:14px;height:14px;animation:spin var(--transition-slow) linear infinite}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}sy-switch[size=small].sc-sy-switch-h{gap:var(--spacing-3xsmall)}sy-switch[size=small].sc-sy-switch-h .switch-label.sc-sy-switch{font-family:\"Roboto\";font-size:12px;font-weight:400;line-height:18px;letter-spacing:0}sy-switch[loading].sc-sy-switch-h .readonly.sc-sy-switch .handle.sc-sy-switch::before{display:none}sy-switch[disabled].sc-sy-switch-h .switch-label.sc-sy-switch{color:var(--switch-unchecked-text-disabled)}";

const SySwitch$1 = /*@__PURE__*/ proxyCustomElement(class SySwitch extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.changed = createEvent(this, "changed");
        this.internals = this.attachInternals();
    }
    get host() { return this; }
    internals;
    // Props
    checked = false;
    disabled = false;
    label = '';
    loading = false;
    readonly = false;
    size = 'medium';
    name = '';
    /** Value submitted as the form value when checked. Defaults to `"on"` (native convention). */
    value = 'on';
    // State
    internalDisabled = false;
    // Events
    changed;
    // --- Form-association lifecycle ---
    formAssociatedCallback() { this.syncFormValue(); }
    formResetCallback() { this.checked = false; this.syncFormValue(); }
    formDisabledCallback(disabled) { this.disabled = disabled; }
    formStateRestoreCallback(state) {
        this.checked = state === this.value || state === 'on';
        this.syncFormValue();
    }
    // Lifecycle
    componentWillLoad() {
        this.updateInternalDisabled();
        this.syncFormValue();
    }
    // Watchers
    handleLoadingOrDisabledChange() {
        this.updateInternalDisabled();
    }
    handleCheckedChange() {
        this.syncFormValue();
        this.changed.emit(this.checked);
    }
    // --- Private helpers ---
    updateInternalDisabled() {
        this.internalDisabled = this.loading ? true : this.disabled;
    }
    syncFormValue() {
        // Only submit a value when checked (matches native checkbox convention).
        this.internals?.setFormValue(this.checked ? this.value : null);
    }
    handleClick = () => {
        if (this.internalDisabled || this.readonly)
            return;
        this.checked = !this.checked;
        // `changed` event is emitted by the @Watch('checked') handler above to
        // avoid double-firing when consumers set `checked` programmatically.
    };
    handleKeydown = (e) => {
        if (this.internalDisabled || this.readonly)
            return;
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            this.checked = !this.checked;
        }
    };
    // Render
    render() {
        const switchClasses = {
            switch: true,
            on: this.checked,
            readonly: this.readonly,
            disabled: this.internalDisabled,
            'switch--small': this.size === 'small',
            'switch--medium': this.size === 'medium',
        };
        return (h("div", { key: 'c904547c7f7f0e00e3e300f182473fbc05a9378e' }, h("div", { key: 'b92c6a7d2541d1dbe39b0ed969e14d07c746a89d', class: switchClasses, tabindex: this.internalDisabled ? -1 : 0, role: "switch", "aria-checked": this.checked ? 'true' : 'false', "aria-disabled": this.internalDisabled ? 'true' : undefined, "aria-readonly": this.readonly ? 'true' : undefined, onClick: this.handleClick, onKeyDown: this.handleKeydown }, h("div", { key: 'd5aca93c5ee1ca96ca82a1344198fd4c4bfe0ed8', class: "handle" }, this.loading && h("div", { key: '07927c434cefef59cf5515638e156ec2f6398f88', class: "loader" }))), this.label && h("span", { key: '77709be37900f5bb627f4ab7be97ffb5cd0993c2', class: "switch-label" }, this.label)));
    }
    static get formAssociated() { return true; }
    static get watchers() { return {
        "loading": ["handleLoadingOrDisabledChange"],
        "disabled": ["handleLoadingOrDisabledChange"],
        "checked": ["handleCheckedChange"]
    }; }
    static get style() { return sySwitchCss; }
}, [322, "sy-switch", {
        "checked": [1540],
        "disabled": [1540],
        "label": [1],
        "loading": [516],
        "readonly": [516],
        "size": [513],
        "name": [1],
        "value": [1],
        "internalDisabled": [32]
    }, undefined, {
        "loading": ["handleLoadingOrDisabledChange"],
        "disabled": ["handleLoadingOrDisabledChange"],
        "checked": ["handleCheckedChange"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-switch"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-switch":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SySwitch$1);
            }
            break;
    } });
}

const SySwitch = SySwitch$1;
const defineCustomElement = defineCustomElement$1;

export { SySwitch, defineCustomElement };
