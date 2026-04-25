import { p as proxyCustomElement, H, h, a as Host } from './index.js';

const sySpinnerCss = ".sc-sy-spinner-h{display:contents}[hidden].sc-sy-spinner-h{display:none}.spinner-container.sc-sy-spinner{position:absolute;top:0;left:0;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:1;background-color:transparent}.spinner-container.has-mask.sc-sy-spinner{background-color:var(--spinner-mask-background, rgba(255, 255, 255, 0.8))}.spinner-core.sc-sy-spinner{display:flex;flex-direction:column;align-items:center}.spinner-core.size--small.sc-sy-spinner .spinner.sc-sy-spinner{width:12px;height:12px}.spinner-core.size--medium.sc-sy-spinner .spinner.sc-sy-spinner{width:16px;height:16px}.spinner-core.size--large.sc-sy-spinner .spinner.sc-sy-spinner{width:20px;height:20px}.spinner-core.size--xlarge.sc-sy-spinner .spinner.sc-sy-spinner{width:24px;height:24px}.spinner--text.sc-sy-spinner{padding-top:var(--spacing-3xsmall);color:var(--spinner-text)}.spinner-slot-content.sc-sy-spinner{margin-top:var(--spacing-medium, 1rem)}.spinner.sc-sy-spinner svg.sc-sy-spinner{width:100%;height:100%;animation:rotator 1.4s linear infinite}@keyframes rotator{0%{transform:rotate(0deg)}100%{transform:rotate(270deg)}}.path.sc-sy-spinner{stroke-dasharray:187;stroke-dashoffset:0;transform-origin:center;animation:dash 1.4s ease-in-out infinite, colors 5.6s ease-in-out infinite}@keyframes colors{0%{stroke:var(--spinner-icon)}100%{stroke:var(--spinner-icon)}}@keyframes dash{0%{stroke-dashoffset:187}50%{stroke-dashoffset:46.75;transform:rotate(135deg)}100%{stroke-dashoffset:187;transform:rotate(450deg)}}";

const SySpinner = /*@__PURE__*/ proxyCustomElement(class SySpinner extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
    }
    get host() { return this; }
    delay = 0;
    description = '';
    hidden = false;
    inline = false;
    size = 'medium';
    isVisible = false;
    // [핵심] 슬롯 컨텐츠 유무를 추적하기 위한 State를 다시 추가합니다.
    hasContent = false;
    delayTimer;
    parentEl = null;
    originalParentPosition = null;
    connectedCallback() {
        this.setupParentPositioning();
        this.setupSpinnerDelay();
    }
    disconnectedCallback() {
        this.revertParentPositioning();
        clearTimeout(this.delayTimer);
    }
    // [핵심] 렌더링 직전에 슬롯에 컨텐츠가 있는지 확인합니다.
    componentWillRender() {
        this.hasContent = Array.from(this.host.childNodes).some(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                return node.textContent.trim() !== '';
            }
            if (node.nodeType !== Node.ELEMENT_NODE) {
                return false;
            }
            return !node.classList.contains('spinner-container');
        });
    }
    setupParentPositioning() {
        this.parentEl = this.host.parentElement;
        if (this.parentEl) {
            this.originalParentPosition = this.parentEl.style.position;
            this.parentEl.style.position = 'relative';
        }
    }
    revertParentPositioning() {
        if (this.parentEl) {
            this.parentEl.style.position = this.originalParentPosition;
            this.parentEl = null;
            this.originalParentPosition = null;
        }
    }
    handleDelayChange() { this.setupSpinnerDelay(); }
    setupSpinnerDelay() {
        this.isVisible = false;
        clearTimeout(this.delayTimer);
        if (this.delay > 0) {
            this.delayTimer = setTimeout(() => { this.isVisible = true; }, this.delay);
        }
        else {
            this.isVisible = true;
        }
    }
    render() {
        const containerClasses = {
            'spinner-container': true,
            'has-mask': this.inline,
        };
        const spinnerCoreClasses = {
            'spinner-core': true,
            [`size--${this.size}`]: true,
        };
        const spinnerCore = (h("div", { key: '338785b498f49e965037b6df0d048e1df8aaf221', class: Object.keys(spinnerCoreClasses).filter(key => spinnerCoreClasses[key]).join(' ') }, h("div", { key: 'db3d6cfd07afc01bbe70053ab73d4d16e277f4db', class: "spinner" }, h("svg", { key: '450353869e0da87111c8d4d26ec893cc69c2c63f', viewBox: "0 0 66 66" }, h("circle", { key: '7adf4d5fa6a81ca9e80ab1f5ff15552f83d560dd', class: "path", fill: "none", "stroke-width": "6", "stroke-linecap": "round", cx: "33", cy: "33", r: "30" }))), this.description && h("span", { key: 'd21f381d7b5e624938b821df26f4171ce203da72', class: "spinner--text" }, this.description)));
        return (h(Host, { key: '6a025f2220886ea08b16fb4016eca438b1de4e87', style: { display: this.isVisible && !this.hidden ? 'contents' : 'none' } }, h("div", { key: 'cce5be84a72a91dd9f04623aecb315c762b43b4f', class: Object.keys(containerClasses).filter(key => containerClasses[key]).join(' ') }, spinnerCore, this.hasContent && (h("div", { key: '76a84f877ed4d35d64699978124463937d412a30', class: "spinner-slot-content" }, h("slot", { key: '3cce309b4a3e0660578e1f93218df0d5c1a0151e' }))))));
    }
    static get watchers() { return {
        "delay": ["handleDelayChange"]
    }; }
    static get style() { return sySpinnerCss; }
}, [262, "sy-spinner", {
        "delay": [2],
        "description": [1],
        "hidden": [516],
        "inline": [516],
        "size": [513],
        "isVisible": [32],
        "hasContent": [32]
    }, undefined, {
        "delay": ["handleDelayChange"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-spinner"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-spinner":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SySpinner);
            }
            break;
    } });
}

export { SySpinner as S, defineCustomElement as d };
