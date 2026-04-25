import { p as proxyCustomElement, H, c as createEvent, h } from './index.js';

const syRadioCss = ".sc-sy-radio-h{--radio-size-large:18px;--radio-size-medium:16px;--radio-size-small:14px;display:inline-block}sy-radio.sc-sy-radio-h{display:inline-flex;align-items:center}[readonly].sc-sy-radio-h,[disabled].sc-sy-radio-h{filter:grayscale(100%);cursor:auto}[readonly].sc-sy-radio-h input.sc-sy-radio:checked~.radio-checkmark.sc-sy-radio,[disabled].sc-sy-radio-h input.sc-sy-radio:checked~.radio-checkmark.sc-sy-radio{background-color:var(--radio-solid-background-readonly);border:var(--border-small) var(--radio-solid-border-readonly)}[readonly].sc-sy-radio-h input.sc-sy-radio:checked~.radio-checkmark.sc-sy-radio:after,[disabled].sc-sy-radio-h input.sc-sy-radio:checked~.radio-checkmark.sc-sy-radio:after{background-color:var(--radio-solid-icon-readonly)}[readonly].sc-sy-radio-h input.sc-sy-radio~.radio-checkmark.sc-sy-radio,[disabled].sc-sy-radio-h input.sc-sy-radio~.radio-checkmark.sc-sy-radio{background-color:var(--radio-default-background-disabled);border:var(--border-small) var(--radio-default-border-readonly)}[readonly].sc-sy-radio-h input.sc-sy-radio~.radio-checkmark.sc-sy-radio:after,[disabled].sc-sy-radio-h input.sc-sy-radio~.radio-checkmark.sc-sy-radio:after{background-color:var(--radio-default-icon-readonly)}[readonly].sc-sy-radio-h input.sc-sy-radio~.radio-checkmark.sc-sy-radio:focus,[readonly].sc-sy-radio-h input.sc-sy-radio~.radio-checkmark.sc-sy-radio:focus-visible,[disabled].sc-sy-radio-h input.sc-sy-radio~.radio-checkmark.sc-sy-radio:focus,[disabled].sc-sy-radio-h input.sc-sy-radio~.radio-checkmark.sc-sy-radio:focus-visible{border:var(--border-small) var(--radio-solid-border-readonly) !important;outline:var(--border-small) transparent}[disabled].sc-sy-radio-h{color:var(--radio-solid-text-disabled)}.sc-sy-radio-h label.sc-sy-radio{display:inline-flex;align-items:center;position:relative;cursor:var(--cursor-button);white-space:nowrap}.sc-sy-radio-h input.sc-sy-radio{position:absolute;opacity:0;height:var(--radio-size-medium);width:var(--radio-size-medium);opacity:0;top:3px;left:0px;margin:0px;cursor:var(--cursor-button)}.sc-sy-radio-h .radio-checkmark.sc-sy-radio{top:0;left:0;position:relative;display:inline-block;box-sizing:border-box;margin-right:var(--spacing-3xsmall);height:var(--radio-size-medium);width:var(--radio-size-medium);background-color:var(--radio-default-background);border-radius:var(--border-radius-full);border:var(--radio-default-border-enabled);cursor:var(--cursor-button);border-color:var(--radio-default-border-enabled);border-style:solid;border-width:1px}.sc-sy-radio-h .radio-checkmark.sc-sy-radio:hover{background-color:var(--radio-default-background);border:var(--border-small) var(--radio-default-border-hover)}.sc-sy-radio-h .radio-checkmark.sc-sy-radio:focus-visible,.sc-sy-radio-h .radio-checkmark.sc-sy-radio:focus{border:var(--border-small) var(--radio-default-border-focus) !important;outline:var(--border-small) var(--radio-default-border-focus)}.sc-sy-radio-h:hover input.sc-sy-radio~.radio-checkmark.sc-sy-radio{background-color:#ccc}.sc-sy-radio-h input.sc-sy-radio:checked~.radio-checkmark.sc-sy-radio{background-color:var(--radio-default-background);border:var(--border-small) var(--radio-solid-border-enabled)}.sc-sy-radio-h .radio-checkmark.sc-sy-radio:after{content:\"\";position:absolute;display:none;top:50%;left:50%;margin-left:-5px;margin-top:-5px;width:calc(var(--radio-size-medium) / 2 + 2px);height:calc(var(--radio-size-medium) / 2 + 2px);border-radius:50%;box-sizing:border-box;background:var(--radio-solid-icon)}.sc-sy-radio-h input.sc-sy-radio:checked~.radio-checkmark.sc-sy-radio:after{display:block}";

const SyRadio$1 = /*@__PURE__*/ proxyCustomElement(class SyRadio extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.selected = createEvent(this, "selected");
    }
    get host() { return this; }
    input;
    // --- Props ---
    checked = false;
    disabled = false;
    readonly = false;
    value = '';
    // --- Events ---
    selected;
    // --- Lifecycle Methods ---
    componentDidLoad() {
        if (this.checked && this.input) {
            this.input.checked = this.checked;
        }
    }
    // --- Watchers ---
    handleCheckedChange() {
        if (this.input) {
            this.input.checked = this.checked;
        }
    }
    // --- Host Event Listeners ---
    handleKeydown(e) {
        if (this.disabled || this.readonly)
            return;
        if (!this.checked) {
            if (e.code === 'Enter' || e.code === 'Space') {
                e.preventDefault();
                this.setChecked();
            }
        }
    }
    // --- Event Handlers ---
    handleLabelClick = (e) => {
        e.preventDefault();
        // input 클릭은 별도로 처리되므로 여기서는 무시
        if (e.target.tagName === 'INPUT')
            return;
        if (this.disabled || this.readonly)
            return;
        if (!this.checked) {
            this.setChecked();
        }
    };
    handleInputChange = (e) => {
        e.stopPropagation();
        if (this.disabled || this.readonly) {
            e.preventDefault();
            return;
        }
        const target = e.target;
        if (target.checked && !this.checked) {
            this.setChecked();
        }
    };
    setChecked() {
        this.checked = true;
        this.selected.emit(this.value);
    }
    // --- Render Method ---
    render() {
        return (h("label", { key: '27ef61c6344fc15e637a088ab6937d18aae8b659', onClick: this.handleLabelClick }, h("input", { key: '06aa3618db70e37a6f340f4998791fbb6dc5f92e', ref: (el) => (this.input = el), type: "radio", value: this.value, disabled: this.disabled, checked: this.checked, onChange: this.handleInputChange }), h("span", { key: 'f5bc7b1f5b6f414775c36bbf718861c9840b364e', class: "radio-checkmark", tabindex: "0" }), h("slot", { key: '2e18db36b401beda566492f2bbdfe237badcbb9f' })));
    }
    static get watchers() { return {
        "checked": ["handleCheckedChange"]
    }; }
    static get style() { return syRadioCss; }
}, [262, "sy-radio", {
        "checked": [1540],
        "disabled": [1540],
        "readonly": [516],
        "value": [1]
    }, [[0, "keydown", "handleKeydown"]], {
        "checked": ["handleCheckedChange"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-radio"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-radio":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyRadio$1);
            }
            break;
    } });
}

const SyRadio = SyRadio$1;
const defineCustomElement = defineCustomElement$1;

export { SyRadio, defineCustomElement };
