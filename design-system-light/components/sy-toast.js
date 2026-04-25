import { p as proxyCustomElement, H, h } from './index.js';
import { f as fnAssignPropFromAlias } from './p-Dlcw8XSW.js';
import { d as defineCustomElement$3 } from './p-DA_POXvZ.js';
import { d as defineCustomElement$2 } from './p-BZJsgHjm.js';

const syToastCss = ".sc-sy-toast-h{display:none}";

const SyToast$1 = /*@__PURE__*/ proxyCustomElement(class SyToast extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
    }
    get host() { return this; }
    latestTop = false;
    duration = 3000;
    componentWillLoad() {
        this.latestTop = fnAssignPropFromAlias(this.host, 'latest-top') ?? this.latestTop;
    }
    createSlotElement(content, slotName) {
        const slotElement = document.createElement('div');
        slotElement.setAttribute('slot', slotName);
        if (typeof content === 'string') {
            slotElement.innerHTML = content;
        }
        else {
            slotElement.appendChild(content.cloneNode(true));
        }
        return slotElement;
    }
    async createToast(variant, option) {
        const toastItem = document.createElement('sy-toast-item');
        toastItem.variant = variant ?? 'neutral';
        toastItem.position = option?.position ?? 'bottomRight';
        // sy-toast-item의 duration prop에 값을 명시적으로 전달합니다.
        toastItem.duration = option?.duration ?? this.duration;
        toastItem.closable = option?.closable ?? false;
        toastItem.latestTop = this.latestTop;
        if (option?.iconSlot)
            toastItem.appendChild(this.createSlotElement(option.iconSlot, 'icon'));
        if (option?.headerSlot)
            toastItem.appendChild(this.createSlotElement(option.headerSlot, 'header'));
        if (option?.bodySlot)
            toastItem.appendChild(this.createSlotElement(option.bodySlot, 'body'));
        if (option?.footerSlot)
            toastItem.appendChild(this.createSlotElement(option.footerSlot, 'footer'));
        document.body.appendChild(toastItem);
        // [핵심 수정]
        // 1. 'sy-toast-item' 커스텀 엘리먼트가 브라우저에 완전히 정의될 때까지 기다립니다.
        await customElements.whenDefined('sy-toast-item');
        // 2. 다음 프레임에 toastItem의 'show()' 메소드를 직접 호출하여 타이머와 애니메이션을 시작합니다.
        requestAnimationFrame(() => {
            toastItem.show();
        });
    }
    async createNeutralToast(option) { this.createToast('neutral', option); }
    async createSuccessToast(option) { this.createToast('success', option); }
    async createErrorToast(option) { this.createToast('error', option); }
    async createInfoToast(option) { this.createToast('info', option); }
    async createWarningToast(option) { this.createToast('warning', option); }
    async closeToast(toastItemElement) {
        if (toastItemElement && typeof toastItemElement.close === 'function') {
            toastItemElement.close();
        }
    }
    render() {
        return (h("div", { key: 'c63ddb8f2e8b241218457ab1da062373e5024b06', style: { display: 'none' } }, h("slot", { key: '9a522b1c414782d6b96d040f6309b3ccc13f59bd', name: "icon" }), h("slot", { key: '38e39a35104917cfecd97a046e011abc33e51b60', name: "header" }), h("slot", { key: 'b2ee173cb8f270c4c134ed8021b06b8a0a57450b', name: "body" }), h("slot", { key: '3350699d97f866ce84179950e8c11ba778cce0fc', name: "footer" })));
    }
    static get style() { return syToastCss; }
}, [262, "sy-toast", {
        "latestTop": [1028, "latesttop"],
        "duration": [2],
        "createToast": [64],
        "createNeutralToast": [64],
        "createSuccessToast": [64],
        "createErrorToast": [64],
        "createInfoToast": [64],
        "createWarningToast": [64],
        "closeToast": [64]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-toast", "sy-icon", "sy-toast-item"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-toast":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyToast$1);
            }
            break;
        case "sy-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "sy-toast-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const SyToast = SyToast$1;
const defineCustomElement = defineCustomElement$1;

export { SyToast, defineCustomElement };
