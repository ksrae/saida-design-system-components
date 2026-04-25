import { p as proxyCustomElement, H, h } from './index.js';

const syNavCss = ".sc-sy-nav:root,.sc-sy-nav-h{display:block;width:100%;height:100%;overflow:auto;color:var(--nav-parent-text-enabled);background-color:var(--nav-parent-background-enabled)}.sc-sy-nav:root ul.sc-sy-nav,.sc-sy-nav-h ul.sc-sy-nav{display:flex;flex-direction:column;list-style-type:none;padding:0;margin:0;height:100%}.sc-sy-nav:root ul.sc-sy-nav li.sc-sy-nav:focus-visible,.sc-sy-nav-h ul.sc-sy-nav li.sc-sy-nav:focus-visible{border:var(--border-medium) var(--nav-parent-border-focused) !important;outline:none !important}";

const SUBNAV = 'SY-NAV-SUB';
const NAVITEM = 'SY-NAV-ITEM';
const GROUPNAV = 'SY-NAV-GROUP';
const SyNav$1 = /*@__PURE__*/ proxyCustomElement(class SyNav extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
    }
    get host() { return this; }
    disabled = false;
    currentActiveElement = null;
    // helper to safely invoke methods on child components that may not be present
    invokeChildMethod(element, methodName, ...args) {
        const fn = element[methodName];
        if (typeof fn === 'function') {
            return fn.apply(element, args);
        }
        return undefined;
    }
    componentDidLoad() {
        this.sendDisabled();
    }
    watchDisabled() {
        this.sendDisabled();
    }
    sendDisabled() {
        const elements = this.host.querySelectorAll('sy-nav-sub, sy-nav-item');
        elements.forEach((element) => {
            // Safely call parentDisabled if the child component exposes it.
            this.invokeChildMethod(element, 'parentDisabled', this.disabled);
        });
    }
    async handleSelected(event) {
        const selectedValue = event.detail;
        // slot의 실제 컨텐츠에서 검색 (Light DOM이므로 직접 자식 요소들을 검색)
        const slotChildren = this.host.querySelectorAll('sy-nav-item, sy-nav-sub, sy-nav-group');
        const newActiveElement = this.findElementByValueInNodeList(slotChildren, selectedValue);
        // 이전에 active된 요소가 있다면 비활성화
        if (this.currentActiveElement && this.currentActiveElement !== newActiveElement) {
            try {
                // Prefer using the safe invoker to call setActive if present. It may
                // return a Promise or void depending on the implementation.
                const result = this.invokeChildMethod(this.currentActiveElement, 'setActive', false);
                if (result && typeof result.then === 'function') {
                    await result;
                }
            }
            catch (error) {
                console.log('Nav handleSelected - error calling/awaiting setActive:', error);
            }
        }
        // 새로 선택된 요소를 현재 active 요소로 설정
        this.currentActiveElement = newActiveElement;
    }
    findElementByValueInNodeList(nodeList, value) {
        for (const element of Array.from(nodeList)) {
            const tagName = element.tagName.toUpperCase();
            if (tagName === NAVITEM) {
                const navItem = element;
                if (navItem.value === value) {
                    return navItem;
                }
            }
            else if (tagName === SUBNAV) {
                const navSub = element;
                if (navSub?.value === value) {
                    return navSub;
                }
                // if not direct match, search inside this sub's children
                const foundInSub = this.findElementByValueInNodeList(element.querySelectorAll('sy-nav-item, sy-nav-sub, sy-nav-group'), value);
                if (foundInSub)
                    return foundInSub;
            }
            else if (tagName === GROUPNAV) {
                // search inside group
                const foundInGroup = this.findElementByValueInNodeList(element.querySelectorAll('sy-nav-item, sy-nav-sub, sy-nav-group'), value);
                if (foundInGroup)
                    return foundInGroup;
            }
        }
        return null;
    }
    render() {
        return (h("ul", { key: '5df304e9333cd51180972ea0945b6bfb324fef06' }, h("slot", { key: '320336919824f05c87099ee223d21d823ce76f88' })));
    }
    static get watchers() { return {
        "disabled": ["watchDisabled"]
    }; }
    static get style() { return syNavCss; }
}, [262, "sy-nav", {
        "disabled": [516]
    }, [[0, "selected", "handleSelected"]], {
        "disabled": ["watchDisabled"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-nav"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-nav":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyNav$1);
            }
            break;
    } });
}

const SyNav = SyNav$1;
const defineCustomElement = defineCustomElement$1;

export { SyNav, defineCustomElement };
