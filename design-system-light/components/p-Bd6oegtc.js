import { p as proxyCustomElement, H, c as createEvent, h } from './index.js';
import { d as defineCustomElement$1 } from './p-DA_POXvZ.js';

const syTagCss = ".sc-sy-tag-h{--tag-small:18px;--tag-medium:22px;--tag-large:26px}.sc-sy-tag-h{display:inline-flex;max-width:100%}[selectable].sc-sy-tag-h .tag.sc-sy-tag{background-color:var(--tag-selectable-unselected-background-enabled);border:var(--border-small) var(--tag-selectable-unselected-border-enabled);color:var(--tag-selectable-unselected-text-enabled);cursor:var(--cursor-button)}[selectable].sc-sy-tag-h .tag.sc-sy-tag:hover{color:var(--tag-selectable-unselected-text-hover)}[selectable].sc-sy-tag-h .tag.tag--checked.sc-sy-tag{background-color:var(--tag-selectable-selected-background-enabled);border:var(--border-small) var(--tag-selectable-selected-border-enabled)}[selectable][disabled].sc-sy-tag-h .tag.sc-sy-tag{background-color:var(--tag-gray-background-disabled);border:var(--border-small) var(--tag-gray-border-disabled);color:var(--tag-gray-text-disabled);cursor:auto}[selectable][disabled].sc-sy-tag-h .tag.sc-sy-tag:hover{color:var(--tag-gray-text-disabled)}[selectable][readonly].sc-sy-tag-h .tag.sc-sy-tag{background-color:var(--tag-gray-background-readonly);border:var(--border-small) var(--tag-gray-border-readonly);color:var(--tag-gray-text-readonly);cursor:auto}[selectable][readonly].sc-sy-tag-h .tag.sc-sy-tag:hover{color:var(--tag-gray-text-readonly)}.tag.sc-sy-tag{padding:var(--spacing-4xsmall) var(--spacing-xsmall);border-width:var(--border-small);box-sizing:border-box;border-radius:var(--border-radius-small);height:var(--tag-medium);gap:var(--spacing-3xsmall);line-height:normal;display:inline-flex;align-items:center;max-width:100%;background-color:var(--tag-gray-background-enabled);border:var(--border-small) var(--tag-gray-border-enabled);color:var(--tag-gray-text-enabled)}.tag.sc-sy-tag slot.sc-sy-tag{white-space:nowrap;display:inline-block}.tag.tag--rounded.sc-sy-tag{border-radius:var(--border-radius-full)}.tag.tag--small.sc-sy-tag{height:var(--tag-small)}.tag.tag--large.sc-sy-tag{height:var(--tag-large)}.tag.tag--purple.sc-sy-tag{background-color:var(--tag-purple-background-enabled);border:var(--border-small) var(--tag-purple-border-enabled);color:var(--tag-purple-text-enabled)}.tag.tag--purple.sc-sy-tag .icon.sc-sy-tag{color:var(--tag-purple-icon-enabled)}.tag.tag--blue.sc-sy-tag{background-color:var(--tag-blue-background-enabled);border:var(--border-small) var(--tag-blue-border-enabled);color:var(--tag-blue-text-enabled)}.tag.tag--blue.sc-sy-tag .icon.sc-sy-tag{color:var(--tag-blue-icon-enabled)}.tag.tag--green.sc-sy-tag{background-color:var(--tag-green-background-enabled);border:var(--border-small) var(--tag-green-border-enabled);color:var(--tag-green-text-enabled)}.tag.tag--green.sc-sy-tag .icon.sc-sy-tag{color:var(--tag-green-icon-enabled)}.tag.tag--cyan.sc-sy-tag{background-color:var(--tag-cyan-background-enabled);border:var(--border-small) var(--tag-cyan-border-enabled);color:var(--tag-cyan-text-enabled)}.tag.tag--cyan.sc-sy-tag .icon.sc-sy-tag{color:var(--tag-cyan-icon-enabled)}.tag.tag--yellow.sc-sy-tag{background-color:var(--tag-yellow-background-enabled);border:var(--border-small) var(--tag-yellow-border-enabled);color:var(--tag-yellow-text-enabled)}.tag.tag--yellow.sc-sy-tag .icon.sc-sy-tag{color:var(--tag-yellow-icon-enabled)}.tag.tag--orange.sc-sy-tag{background-color:var(--tag-orange-background-enabled);border:var(--border-small) var(--tag-orange-border-enabled);color:var(--tag-orange-text-enabled)}.tag.tag--orange.sc-sy-tag .icon.sc-sy-tag{color:var(--tag-orange-icon-enabled)}.tag.tag--red.sc-sy-tag{background-color:var(--tag-red-background-enabled);border:var(--border-small) var(--tag-red-border-enabled);color:var(--tag-red-text-enabled)}.tag.tag--red.sc-sy-tag .icon.sc-sy-tag{color:var(--tag-red-icon-enabled)}.tag.tag--disabled.sc-sy-tag{background-color:var(--tag-gray-background-disabled);border:var(--border-small) var(--tag-gray-border-disabled);color:var(--tag-gray-text-disabled)}.tag.tag--disabled.sc-sy-tag .icon.sc-sy-tag{color:var(--tag-gray-icon-disabled)}.tag.tag--disabled.sc-sy-tag .tag-remove.sc-sy-tag{color:var(--tag-gray-icon-disabled);cursor:auto !important}.tag.tag--disabled.sc-sy-tag .tag-remove.sc-sy-tag:hover{color:var(--tag-gray-icon-disabled)}.tag.tag--readonly.sc-sy-tag .tag-remove.sc-sy-tag{cursor:auto;color:var(--tag-removable-icon-enabled)}.tag.tag--readonly.sc-sy-tag .tag-remove.sc-sy-tag:hover{color:var(--tag-removable-icon-enabled)}.tag--removable.sc-sy-tag .tag-remove.sc-sy-tag{display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--tag-removable-icon-enabled)}.tag--removable.sc-sy-tag .tag-remove.sc-sy-tag:hover{color:var(--tag-removable-icon-hover)}";

const SyTag = /*@__PURE__*/ proxyCustomElement(class SyTag extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.selected = createEvent(this, "selected");
        this.removed = createEvent(this, "removed");
    }
    get host() { return this; }
    disabled = false;
    readonly = false;
    removable = false;
    rounded = false;
    selectable = false;
    size = 'medium';
    variant = 'gray';
    // Lit의 `checked` state와 동일
    checked = false;
    // Stencil의 이벤트 발송 방식
    selected;
    removed;
    // Lit의 `updated` 라이프사이클 훅을 @Watch로 대체
    handleSelectableChange(isSelectable) {
        if (isSelectable) {
            // selectable이 true가 되면 variant를 purple로 변경
            this.variant = 'purple';
        }
        else {
            // selectable이 false가 되면 checked 상태를 리셋
            this.checked = false;
        }
    }
    handleClick = () => {
        if (this.selectable && !this.disabled && !this.readonly) {
            this.checked = !this.checked;
            // 'selected' 이벤트를 발송
            this.selected.emit({ tag: this.host });
        }
    };
    handleRemoveClick = (event) => {
        event.stopPropagation(); // 이벤트 버블링 중지
        if (this.removable && !this.disabled && !this.readonly) {
            // 'removed' 이벤트를 발송
            this.removed.emit({ tag: this.host });
            this.host.remove(); // 이 줄을 제거하여 부모가 렌더링을 담당하도록 함
        }
    };
    render() {
        const tagClasses = {
            tag: true,
            'tag--selectable': this.selectable,
            'tag--checked': this.checked,
            'tag--gray': this.variant === 'gray',
            'tag--purple': this.variant === 'purple',
            'tag--blue': this.variant === 'blue',
            'tag--green': this.variant === 'green',
            'tag--cyan': this.variant === 'cyan',
            'tag--yellow': this.variant === 'yellow',
            'tag--orange': this.variant === 'orange',
            'tag--red': this.variant === 'red',
            'tag--small': this.size === 'small',
            'tag--medium': this.size === 'medium',
            'tag--large': this.size === 'large',
            'tag--disabled': this.disabled,
            'tag--readonly': this.readonly,
            'tag--removable': this.removable,
            'tag--rounded': this.rounded,
        };
        return (h("span", { key: 'b0c3888b372c393b157a24e3a6c47048c0ccb1f4', class: Object.keys(tagClasses).filter(key => tagClasses[key]).join(' '), onClick: this.handleClick }, h("slot", { key: '4cbfa596cf489544f67f1a3b3d77477f71f7bc2e' }), this.removable && (h("sy-icon", { key: 'db02dcec733b7ce43fbaa40fd5ca1ac6a8d1ea6e', size: "xxsmall", class: "tag-remove", selectable: true,
            // Lit의 @selected -> Stencil의 onSelected
            onSelected: this.handleRemoveClick }, h("svg", { key: 'e773191dd7689e9c0051d0c9e1e67580e605daba', xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { key: '8532455dbdc3f7e8b7f333650976fc820a39daa5', fill: "currentColor", d: "M71.5 105C62.2 95.6 62.2 80.4 71.5 71C80.8 61.6 96.1 61.7 105.5 71L320.5 286L535.5 71C544.9 61.6 560.1 61.6 569.4 71C578.7 80.4 578.8 95.6 569.4 104.9L354.4 319.9L569.4 534.9C578.8 544.3 578.8 559.5 569.4 568.8C560 578.1 544.8 578.2 535.5 568.8L320.5 353.8L105.5 568.8C96.1 578.2 80.9 578.2 71.6 568.8C62.3 559.4 62.2 544.2 71.6 534.9L286.6 319.9L71.6 104.9z" }))))));
    }
    static get watchers() { return {
        "selectable": ["handleSelectableChange"]
    }; }
    static get style() { return syTagCss; }
}, [262, "sy-tag", {
        "disabled": [516],
        "readonly": [516],
        "removable": [516],
        "rounded": [516],
        "selectable": [516],
        "size": [513],
        "variant": [1537],
        "checked": [32]
    }, undefined, {
        "selectable": ["handleSelectableChange"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-tag", "sy-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-tag":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyTag);
            }
            break;
        case "sy-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { SyTag as S, defineCustomElement as d };
