import { p as proxyCustomElement, H, c as createEvent, h, F as Fragment } from './index.js';
import { f as fnAssignPropFromAlias } from './p-Dlcw8XSW.js';
import { d as defineCustomElement$4 } from './p-Dzzv4fG9.js';
import { d as defineCustomElement$3 } from './p-DA_POXvZ.js';
import { d as defineCustomElement$2 } from './p-Dx2eAEw1.js';
import { d as defineCustomElement$1 } from './p-C0DM0GPD.js';

const sySelectOptionCss = ".sc-sy-option-h{display:block;cursor:pointer}sy-option.sc-sy-option-h .select-item.sc-sy-option{display:flex;align-items:center;visibility:visible;gap:var(--spacing-3xsmall);justify-content:start;width:100%;box-sizing:border-box;padding:var(--spacing-3xsmall) var(--spacing-xsmall);font-family:\"Roboto\";font-size:14px;font-weight:400;line-height:22px;text-decoration:none;text-transform:none;letter-spacing:0.25px;overflow:hidden;text-overflow:ellipsis;background-color:var(--select-form-background-enabled)}sy-option.sc-sy-option-h .select-item.sc-sy-option *.sc-sy-option{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-break:break-all}sy-option.sc-sy-option-h .select-item[disabled].sc-sy-option{cursor:auto;color:var(--select-form-text-disabled)}sy-option.sc-sy-option-h .select-item[disabled].sc-sy-option:hover{background-color:transparent}sy-option.sc-sy-option-h .select-item[readonly].sc-sy-option{cursor:auto}sy-option.sc-sy-option-h .select-item.option-selected.sc-sy-option{background-color:var(--background-extended-purple-default);color:var(--select-form-text-selected);border:var(--select-form-border-selected);font-family:\"Roboto\";font-size:14px;font-weight:500;line-height:22px;letter-spacing:0.25px}sy-option.sc-sy-option-h .select-item.option-active.sc-sy-option{background-color:var(--background-bold)}sy-option.sc-sy-option-h .select-item.option-selected.option-active.sc-sy-option{background-color:var(--background-extended-purple-default);color:var(--select-form-text-selected);border:var(--select-form-border-selected)}sy-option.sc-sy-option-h [selected].sc-sy-option{background-color:var(--select-form-background-selected)}";

const SyOption = /*@__PURE__*/ proxyCustomElement(class SyOption extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.onActivated = createEvent(this, "activated");
    }
    get host() { return this; }
    disabled = false;
    label = '';
    readonly = false;
    value = '';
    showTooltip = false;
    selected = false;
    hide = false;
    empty = false;
    loading = false;
    isCustomTag = false;
    active = false;
    hasSlotContents = false;
    onActivated;
    handleLabelOrValueChange() {
        if (!this.label) {
            const textFromSlot = Array.from(this.host.childNodes)
                .filter(node => node.nodeType === Node.TEXT_NODE)
                .map(node => node.textContent?.trim())
                .join('');
            this.label = textFromSlot?.length ? textFromSlot : this.value;
        }
    }
    componentWillLoad() {
        this.showTooltip = fnAssignPropFromAlias(this.host, 'show-tooltip') ?? this.showTooltip;
    }
    componentDidLoad() {
        this.checkSlotContents();
        this.handleLabelOrValueChange();
    }
    componentDidUpdate() {
        this.checkSlotContents();
    }
    getHide() {
        return this.hide;
    }
    checkSlotContents() {
        this.hasSlotContents = Array.from(this.host.children).some(child => child.tagName.toLowerCase() !== 'div');
    }
    handleOptionClick = () => {
        if (this.disabled || this.readonly || this.empty || this.loading)
            return;
        this.onActivated.emit({ value: this.value, label: this.label });
    };
    disconnectedCallback() { }
    render() {
        const classes = {
            'select-item': true,
            'option-active': this.active,
            'option-selected': this.selected && !this.disabled,
        };
        return (h("div", { key: '496ab4c8ce92838778c709d73040ec2d0dd02e51', class: classes, style: { display: this.hide ? 'none' : 'flex' }, "data-disabled": this.disabled ? true : null, "data-readonly": this.readonly ? true : null, onClick: this.handleOptionClick }, !this.empty && !this.loading && !this.hasSlotContents ? (h(Fragment, null, this.showTooltip ? h("sy-tooltip", { maxWidth: this.host.clientWidth, content: this.label }) : null, h("span", null, this.label))) : this.empty ? (h("sy-empty", null)) : this.loading ? (h("sy-spinner", null)) : null, h("slot", { key: '5743afb825b34a5a66d8a5d368cf06fa4023e66a' })));
    }
    static get watchers() { return {
        "label": ["handleLabelOrValueChange"],
        "value": ["handleLabelOrValueChange"]
    }; }
    static get style() { return sySelectOptionCss; }
}, [262, "sy-option", {
        "disabled": [4],
        "label": [1537],
        "readonly": [4],
        "value": [513],
        "showTooltip": [1028, "showtooltip"],
        "selected": [1540],
        "hide": [4],
        "empty": [4],
        "loading": [4],
        "isCustomTag": [4, "is-custom-tag"],
        "active": [4],
        "hasSlotContents": [32]
    }, undefined, {
        "label": ["handleLabelOrValueChange"],
        "value": ["handleLabelOrValueChange"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-option", "sy-empty", "sy-icon", "sy-spinner", "sy-tooltip"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-option":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyOption);
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
        case "sy-tooltip":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { SyOption as S, defineCustomElement as d };
