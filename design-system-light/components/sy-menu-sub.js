import { p as proxyCustomElement, H, h } from './index.js';
import { d as defineCustomElement$2 } from './p-DA_POXvZ.js';

const syMenuSubCss = "@charset \"UTF-8\";.sc-sy-menu-sub:root,.sc-sy-menu-sub-h{display:block;min-width:max-content;position:relative}.sc-sy-menu-sub:root .submenu.sc-sy-menu-sub,.sc-sy-menu-sub-h .submenu.sc-sy-menu-sub{display:none;list-style-type:none;margin:0;cursor:pointer;padding:0px;box-shadow:var(--box-shadow);background-color:white;box-sizing:border-box;border-radius:var(--border-radius-medium);margin-left:1px}.sc-sy-menu-sub:root .submenu.sc-sy-menu-sub,.sc-sy-menu-sub-h .submenu.sc-sy-menu-sub{position:absolute;width:max-content;min-width:max-content;top:0;left:100%;padding:var(--spacing-3xsmall) 0}.sc-sy-menu-sub:root .submenu.open.sc-sy-menu-sub,.sc-sy-menu-sub-h .submenu.open.sc-sy-menu-sub{display:block}.sc-sy-menu-sub:root .submenu-title.sc-sy-menu-sub,.sc-sy-menu-sub-h .submenu-title.sc-sy-menu-sub{display:inline-flex;align-items:center;height:var(--component-medium);padding-left:var(--spacing-xsmall);padding-right:var(--spacing-xsmall);color:var(--menu-menuitem-default-text-enabled);justify-content:space-between;white-space:nowrap;cursor:pointer;width:100%;min-width:max-content;box-sizing:border-box}.sc-sy-menu-sub:root .submenu-title.sc-sy-menu-sub sy-icon.sc-sy-menu-sub,.sc-sy-menu-sub-h .submenu-title.sc-sy-menu-sub sy-icon.sc-sy-menu-sub{color:var(--menu-menuitem-icon-enabled);width:14px;height:14px}.sc-sy-menu-sub:root .submenu-title.sc-sy-menu-sub:hover,.sc-sy-menu-sub-h .submenu-title.sc-sy-menu-sub:hover{background-color:var(--menu-menuitem-default-background-hover);color:var(--menu-menuitem-icon-hover)}.sc-sy-menu-sub:root .submenu-title.sc-sy-menu-sub:active,.sc-sy-menu-sub-h .submenu-title.sc-sy-menu-sub:active{background-color:var(--menu-menuitem-default-background-selected);color:var(--menu-menuitem-default-text-active);color:var(--menu-menuitem-icon-selected)}.sc-sy-menu-sub:root .submenu-title.sc-sy-menu-sub .menu-title.sc-sy-menu-sub,.sc-sy-menu-sub:root .submenu-title.sc-sy-menu-sub .title.sc-sy-menu-sub,.sc-sy-menu-sub-h .submenu-title.sc-sy-menu-sub .menu-title.sc-sy-menu-sub,.sc-sy-menu-sub-h .submenu-title.sc-sy-menu-sub .title.sc-sy-menu-sub{display:flex;align-items:center;gap:var(--spacing-3xsmall)}.sc-sy-menu-sub:root .submenu-title.sc-sy-menu-sub .submenu-open.sc-sy-menu-sub,.sc-sy-menu-sub-h .submenu-title.sc-sy-menu-sub .submenu-open.sc-sy-menu-sub{color:var(--menu-menuitem-arrow-icon-enabled);margin:0px}.sc-sy-menu-sub:root .submenu-title.sc-sy-menu-sub .submenu-open.sc-sy-menu-sub:hover,.sc-sy-menu-sub-h .submenu-title.sc-sy-menu-sub .submenu-open.sc-sy-menu-sub:hover{color:var(--menu-menuitem-arrow-icon-hover)}.sc-sy-menu-sub:root .submenu-title.sc-sy-menu-sub .submenu-open.sc-sy-menu-sub:active,.sc-sy-menu-sub-h .submenu-title.sc-sy-menu-sub .submenu-open.sc-sy-menu-sub:active{color:var(--menu-menuitem-arrow-icon-active)}sy-menu-sub[disabled].sc-sy-menu-sub-h .submenu-title.sc-sy-menu-sub{cursor:auto;color:var(--menu-menuitem-default-text-disabled)}sy-menu-sub[disabled].sc-sy-menu-sub-h .submenu-title.sc-sy-menu-sub:after{border-color:var(--menu-menuitem-default-text-disabled)}sy-menu-sub[disabled].sc-sy-menu-sub-h .submenu-title.sc-sy-menu-sub:hover{background-color:var(--menu-dropdownmenu-background-enabled)}";

const SyMenuSub$1 = /*@__PURE__*/ proxyCustomElement(class SyMenuSub extends H {
    get host() { return this; }
    DefaultOpendelay = 0;
    DefaultClosedelay = 0;
    parentDirection = 'right';
    disabled = false;
    open = false;
    menuSubTitle = '';
    trigger = 'hover';
    // queries
    // private get submenuTitle(): HTMLElement | null {
    //   return this.host.querySelector('.submenu-title');
    // }
    get submenu() {
        return this.host.querySelector('.submenu');
    }
    opendelay = this.DefaultOpendelay;
    closedelay = this.DefaultClosedelay;
    innerOpen = false;
    menuObserver;
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.openOnMouseEnter = this.openOnMouseEnter.bind(this);
        this.closeOnMouseLeave = this.closeOnMouseLeave.bind(this);
        this.toggleOnClick = this.toggleOnClick.bind(this);
    }
    connectedCallback() {
        this.updateAttribute();
        this.applyEventListeners();
        if (this.open) {
            this.setOpen();
        }
        document.addEventListener('click', this.handleOutsideClick);
    }
    disconnectedCallback() {
        this.innerOpen = false;
        document.removeEventListener('click', this.handleOutsideClick);
        if (this.trigger === 'hover') {
            this.host.removeEventListener('mouseenter', this.openOnMouseEnter);
            this.host.removeEventListener('mouseleave', this.closeOnMouseLeave);
        }
        this.host.removeEventListener('click', this.toggleOnClick);
        if (this.menuObserver)
            this.menuObserver.disconnect();
    }
    handleOutsideClick = (_event) => {
        // placeholder for external click handling (original code commented)
    };
    updateAttribute() {
        const closestMenu = this.host.closest('sy-menu');
        if (closestMenu) {
            this.trigger = closestMenu.trigger === 'click' ? 'click' : 'hover';
            this.parentDirection = closestMenu.direction ?? this.parentDirection;
        }
    }
    applyEventListeners() {
        this.host.removeEventListener('mouseenter', this.openOnMouseEnter);
        this.host.removeEventListener('mouseleave', this.closeOnMouseLeave);
        this.host.removeEventListener('click', this.toggleOnClick);
        if (this.trigger !== 'click') {
            this.host.addEventListener('mouseenter', this.openOnMouseEnter);
            this.host.addEventListener('mouseleave', this.closeOnMouseLeave);
        }
    }
    watchTrigger() {
        this.applyEventListeners();
    }
    watchOpen(newVal) {
        if (newVal) {
            this.setOpen();
        }
        else {
            this.setClose();
        }
    }
    adjustSubMenuPosition() {
        requestAnimationFrame(() => {
            if (this.submenu) {
                setTimeout(() => {
                    const closestMenu = this.host.closest('sy-menu');
                    const rect = this.submenu.getBoundingClientRect();
                    this.parentDirection = closestMenu?.direction ?? this.parentDirection;
                    const rectWidth = this.parentDirection === 'left' ? rect.width * 2 : rect.width;
                    if (this.parentDirection === 'left') {
                        if (rect.left < rectWidth) {
                            if (closestMenu)
                                closestMenu.setAttribute('direction', 'right');
                            this.submenu.style.left = '100%';
                            this.submenu.style.right = 'auto';
                        }
                        else {
                            this.submenu.style.left = 'auto';
                            this.submenu.style.right = '100%';
                            if (closestMenu)
                                closestMenu.setAttribute('direction', 'left');
                        }
                    }
                    else if (this.parentDirection === 'right') {
                        if ((rect.left - rect.width < 0) || (rect.left - rect.width > 0 && window.innerWidth < (rect.left + rect.width))) {
                            if (closestMenu)
                                closestMenu.setAttribute('direction', 'left');
                            this.submenu.style.left = 'auto';
                            this.submenu.style.right = '100%';
                        }
                        else {
                            this.submenu.style.left = '100%';
                            this.submenu.style.right = 'auto';
                            if (closestMenu)
                                closestMenu.setAttribute('direction', 'right');
                        }
                    }
                }, 100);
            }
        });
    }
    sanitizeHtml(content) {
        if (!content)
            return '';
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        return tempDiv.innerText.trim();
    }
    render() {
        const safeTitle = this.sanitizeHtml(this.menuSubTitle);
        return (h("div", { key: 'feed39db16d5a7332251adb0bc589159313fbb3e' }, h("div", { key: '0f3bbbab8b89c62ba71e15fa53209c226e520ef4', tabindex: 0, class: { 'submenu-title': true, 'active': this.innerOpen }, onClick: this.toggleOnClick, title: safeTitle }, h("div", { key: 'dacba1f222103db66b160c170e56bada728d5592', class: "menu-title" }, h("span", { key: '13ac8212404390ea0f10dfdf9e8b85a8dcf9deb6', class: "title" }, safeTitle)), h("sy-icon", { key: '2a260e8323820b2d54891527de83e7a1f78f16c7', size: "medium", class: "submenu-open" }, h("svg", { key: '94a90149829d7a0ce2bed51095e22773ed2d241e', xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { key: 'a4524548bcbdbc512e2d8a23a98f5d2e4127274c', fill: "currentColor", d: "M433.5 303C442.9 312.4 442.9 327.6 433.5 336.9L273.5 497C264.1 506.4 248.9 506.4 239.6 497C230.3 487.6 230.2 472.4 239.6 463.1L382.6 320.1L239.6 177.1C230.2 167.7 230.2 152.5 239.6 143.2C249 133.9 264.2 133.8 273.5 143.2L433.5 303.2z" })))), h("ul", { key: 'dcc879ef78bb666304d35cea230093f7703e2bc2', class: { 'submenu': true, 'open': this.innerOpen }, "aria-disabled": this.disabled ? 'true' : 'false' }, h("slot", { key: 'cbaaa66cc09a146aed579256f033c8a939a46070' }))));
    }
    toggleOnClick(event) {
        if (this.trigger === 'click') {
            event?.preventDefault();
            event?.stopPropagation();
            this.setTrigger();
        }
    }
    openOnMouseEnter() {
        if (this.trigger !== 'click')
            this.setOpen();
    }
    closeOnMouseLeave() {
        if (this.trigger !== 'click')
            this.setClose();
    }
    setTrigger() {
        if (this.innerOpen)
            this.setClose();
        else
            this.setOpen();
    }
    setOpen() {
        if (this.disabled)
            return;
        setTimeout(() => {
            this.adjustSubMenuPosition();
            this.innerOpen = true;
            this.open = true;
        }, this.opendelay);
    }
    setClose() {
        setTimeout(() => {
            this.innerOpen = false;
            this.open = false;
            const children = Array.from(this.host.children);
            children?.forEach(child => {
                if (child.tagName === 'SY-MENU-SUB') {
                    child.setClose?.();
                }
            });
        }, this.closedelay);
    }
    static get watchers() { return {
        "trigger": ["watchTrigger"],
        "open": ["watchOpen"]
    }; }
    static get style() { return syMenuSubCss; }
}, [262, "sy-menu-sub", {
        "disabled": [4],
        "open": [1028],
        "menuSubTitle": [1, "title"],
        "trigger": [1025],
        "opendelay": [32],
        "closedelay": [32],
        "innerOpen": [32]
    }, undefined, {
        "trigger": ["watchTrigger"],
        "open": ["watchOpen"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-menu-sub", "sy-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-menu-sub":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyMenuSub$1);
            }
            break;
        case "sy-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const SyMenuSub = SyMenuSub$1;
const defineCustomElement = defineCustomElement$1;

export { SyMenuSub, defineCustomElement };
