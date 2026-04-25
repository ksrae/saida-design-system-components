import { p as proxyCustomElement, H, c as createEvent, h } from './index.js';
import { d as defineCustomElement$2 } from './p-BTJnmsnM.js';
import { d as defineCustomElement$1 } from './p-DA_POXvZ.js';

const syMenuItemCss = ".sc-sy-menu-item-h,.sc-sy-menu-item:root{display:block;min-width:max-content}.sc-sy-menu-item-h li.sc-sy-menu-item,.sc-sy-menu-item:root li.sc-sy-menu-item{cursor:pointer;padding:var(--spacing-3xsmall) var(--spacing-xsmall);color:var(--menu-menuitem-default-text-enabled);background-color:var(--menu-dropdownmenu-background-enabled);min-width:max-content;min-height:var(--component-medium);box-sizing:border-box;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:var(--spacing-3xsmall)}.sc-sy-menu-item-h li.sc-sy-menu-item:hover,.sc-sy-menu-item:root li.sc-sy-menu-item:hover{background-color:var(--menu-menuitem-default-background-hover)}.sc-sy-menu-item-h li.sc-sy-menu-item:active,.sc-sy-menu-item:root li.sc-sy-menu-item:active{color:var(--menu-menuitem-default-text-active)}.sc-sy-menu-item-h li.active.sc-sy-menu-item,.sc-sy-menu-item:root li.active.sc-sy-menu-item{background-color:var(--menu-menuitem-default-background-active)}.sc-sy-menu-item-h li.menu-item--selected.sc-sy-menu-item,.sc-sy-menu-item:root li.menu-item--selected.sc-sy-menu-item{background-color:var(--menu-menuitem-default-background-selected);font-family:\"Roboto\";font-size:14px;font-weight:500;line-height:22px;letter-spacing:0.25px}.sc-sy-menu-item-h li[disabled].sc-sy-menu-item,.sc-sy-menu-item-h li.menu-item--disabled.sc-sy-menu-item,.sc-sy-menu-item:root li[disabled].sc-sy-menu-item,.sc-sy-menu-item:root li.menu-item--disabled.sc-sy-menu-item{cursor:auto;color:var(--menu-menuitem-default-text-disabled)}.sc-sy-menu-item-h li[disabled].sc-sy-menu-item:hover,.sc-sy-menu-item-h li.menu-item--disabled.sc-sy-menu-item:hover,.sc-sy-menu-item:root li[disabled].sc-sy-menu-item:hover,.sc-sy-menu-item:root li.menu-item--disabled.sc-sy-menu-item:hover{background-color:var(--menu-dropdownmenu-background-enabled)}";

const SyMenuItem = /*@__PURE__*/ proxyCustomElement(class SyMenuItem extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.itemSelected = createEvent(this, "itemSelected");
        this.itemChecked = createEvent(this, "itemChecked");
    }
    get host() { return this; }
    disabled = false;
    value = '';
    select = false;
    selectable = false;
    checkable = false;
    checked = false;
    sanitizedSlotContent = '';
    itemSelected;
    itemChecked;
    observer;
    componentWillLoad() {
        this.selectable = !!this.checkable;
        this.updateSlotContent();
    }
    componentDidLoad() {
        this.observeSlotChanges();
    }
    disconnectedCallback() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
    observeSlotChanges() {
        this.observer = new MutationObserver(() => {
            this.updateSlotContent();
        });
        this.observer.observe(this.host, {
            childList: true,
            subtree: true,
            characterData: true
        });
    }
    watchCheckable() {
        this.selectable = !!this.checkable;
    }
    sanitizeHtml(content) {
        if (!content)
            return '';
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        return tempDiv.innerText.trim();
    }
    updateSlotContent() {
        const text = this.getTextContent();
        this.sanitizedSlotContent = this.sanitizeHtml(text || '');
    }
    getTextContent() {
        if (this.checkable) {
            const checkbox = this.host.querySelector('sy-checkbox');
            return checkbox ? checkbox.textContent || '' : this.host.textContent || '';
        }
        return this.host.textContent || '';
    }
    onClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (this.disabled)
            return;
        const clickedElement = e.target;
        // 체크박스가 아닌 다른 내부 컴포넌트 클릭은 무시
        if (clickedElement !== this.host &&
            clickedElement.tagName &&
            clickedElement.tagName.startsWith('SY-') &&
            clickedElement.tagName !== 'SY-CHECKBOX') {
            return;
        }
        if (this.checkable) {
            // checkable인 경우 체크 상태 토글
            this.checked = !this.checked;
            this.select = this.checked;
            this.emitCheckedEvent();
        }
        else {
            // checkable이 아닌 경우 선택
            this.select = true;
            this.emitSelectedEvent();
        }
    };
    handleCheckboxChange = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // 체크박스 변경은 onClick에서 처리
    };
    emitSelectedEvent() {
        const label = this.getTextContent();
        this.itemSelected.emit({
            value: this.value || label.trim(),
            label: label.trim()
        });
    }
    emitCheckedEvent() {
        const label = this.getTextContent();
        this.itemChecked.emit({
            value: this.value || label.trim(),
            label: label.trim(),
            checked: this.checked
        });
    }
    render() {
        const liClass = {
            'menu-item': true,
            'menu-item--selected': this.selectable && this.select,
            'menu-item--disabled': this.disabled,
            'menu-item--checkable': this.checkable
        };
        return (h("li", { key: 'a7b83fab6c72394097eb2fae0b9a974a33e2130a', tabIndex: this.disabled ? -1 : 0, class: liClass, "aria-disabled": this.disabled ? 'true' : 'false', onClick: this.onClick, title: this.sanitizedSlotContent }, this.checkable ? (h("sy-checkbox", { checked: this.checked, disabled: this.disabled, onChanged: this.handleCheckboxChange }, h("slot", null))) : (h("slot", null))));
    }
    static get watchers() { return {
        "checkable": ["watchCheckable"]
    }; }
    static get style() { return syMenuItemCss; }
}, [262, "sy-menu-item", {
        "disabled": [516],
        "value": [1],
        "select": [1540],
        "selectable": [1540],
        "checkable": [1540],
        "checked": [32],
        "sanitizedSlotContent": [32]
    }, undefined, {
        "checkable": ["watchCheckable"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-menu-item", "sy-checkbox", "sy-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-menu-item":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyMenuItem);
            }
            break;
        case "sy-checkbox":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "sy-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { SyMenuItem as S, defineCustomElement as d };
