import { p as proxyCustomElement, H, h } from './index.js';
import { d as defineCustomElement$2 } from './p-DA_POXvZ.js';

const syStepCss = ".sc-sy-step-h{flex:1;width:fit-content;font-family:\"Roboto\";font-size:16px;font-weight:400;line-height:26px;letter-spacing:0.5px}.sc-sy-step-h .step.sc-sy-step{display:flex;flex-direction:row;align-items:start;padding:var(--spacing-xsmall);gap:var(--spacing-xsmall);flex:1;align-items:baseline;cursor:pointer;position:relative;width:min-content;overflow:hidden}.sc-sy-step-h .step.sc-sy-step .step-value.sc-sy-step{margin-top:5px;width:auto}.sc-sy-step-h .step.step-small.sc-sy-step .step-item.sc-sy-step{font-family:\"Roboto\";font-size:12px;font-weight:400;line-height:18px;letter-spacing:0}.sc-sy-step-h .step.step-small.sc-sy-step .title.sc-sy-step,.sc-sy-step-h .step.step-small.sc-sy-step .description.sc-sy-step{font-family:\"Roboto\";font-size:14px;font-weight:400;line-height:22px;text-decoration:none;text-transform:none;letter-spacing:0.25px;word-break:normal;white-space:nowrap}.sc-sy-step-h .step.step-small.sc-sy-step .title.sc-sy-step:after{left:10px;top:40px}.sc-sy-step-h .step.sc-sy-step .description.sc-sy-step{font-family:\"Roboto\";font-size:14px;font-weight:400;line-height:22px;text-decoration:none;text-transform:none;letter-spacing:0.25px;color:var(--steps-current-description-text-enabled);overflow:hidden;text-overflow:ellipsis}.sc-sy-step-h .step.sc-sy-step .step-item.sc-sy-step{border:var(--border-small) transparent;min-width:32px}.sc-sy-step-h .step.step-vertical.sc-sy-step{flex-direction:row;width:100%;height:100%;box-sizing:border-box;display:flex;align-items:start;padding-bottom:20px}.sc-sy-step-h .step.step-wait.sc-sy-step .step-item.sc-sy-step{background-color:transparent;border:var(--border-small) var(--steps-wait-icon-border-enabled);color:var(--steps-wait-icon-text-enabled)}.sc-sy-step-h .step.step-wait.sc-sy-step .title.sc-sy-step{color:var(--steps-wait-title-text-enabled)}.sc-sy-step-h .step.step-wait.sc-sy-step .description.sc-sy-step{color:var(--steps-wait-description-text-enabled)}.sc-sy-step-h .step.step-active.sc-sy-step{cursor:auto}.sc-sy-step-h .step.step-active.sc-sy-step .step-item.sc-sy-step{border:var(--border-small) transparent;color:var(--steps-current-icon-text-enabled)}.sc-sy-step-h .step.step-active.sc-sy-step .description.sc-sy-step{color:var(--steps-current-description-text-enabled)}.sc-sy-step-h .step.step-error.sc-sy-step .step-item.sc-sy-step{background-color:white;border:var(--border-small) var(--steps-error-icon-border-enabled);color:var(--steps-error-icon-icon-enabled)}.sc-sy-step-h .step.step-error.sc-sy-step .title.sc-sy-step{color:var(--steps-error-title-text-enabled)}.sc-sy-step-h .step.step-error.sc-sy-step .description.sc-sy-step{color:var(--steps-error-description-text-enabled)}.sc-sy-step-h .step.step-loading.sc-sy-step .step-item.sc-sy-step{background-color:white;color:var(--steps-process-icon-text-enabled)}.sc-sy-step-h .step.step-loading.sc-sy-step .step-item.sc-sy-step:before{content:\"\";position:absolute;width:var(--component-medium);height:var(--component-medium);border:var(--border-large) var(--steps-process-icon-icon-enabled);border-bottom-color:transparent;border-radius:50%;display:inline-block;box-sizing:border-box;animation:rotation 1s linear infinite}.sc-sy-step-h .step.step-loading.sc-sy-step .description.sc-sy-step{color:var(--steps-process-description-text-enabled)}@keyframes rotation{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}.sc-sy-step-h .step.step-disabled.sc-sy-step .step-item.sc-sy-step{background-color:var(--steps-disabled-icon-background-enabled);border:var(--border-small) var(--steps-disabled-title-border-enabled);color:var(--steps-disabled-icon-text-enabled)}.sc-sy-step-h .step.step-disabled.sc-sy-step .title.sc-sy-step{color:var(--steps-disabled-title-text-enabled)}.sc-sy-step-h .step.step-disabled.sc-sy-step .description.sc-sy-step{color:var(--steps-disabled-description-text-enabled)}.sc-sy-step-h .step.step-done.sc-sy-step{border-color:lightgray;cursor:auto}.sc-sy-step-h .step.step-done.sc-sy-step .step-item.sc-sy-step{background-color:white;color:var(--steps-finished-icon-icon-enabled);border:var(--border-small) var(--steps-finished-icon-border-enabled)}.sc-sy-step-h .step.step-done.sc-sy-step .title.sc-sy-step:after{border-top:var(--border-small) var(--steps-finished-tail-border-enabled)}.sc-sy-step-h .step.step-done.sc-sy-step .description.sc-sy-step{color:var(--steps-finished-description-text-enabled)}.sc-sy-step-h .step.step-clickable.sc-sy-step{cursor:pointer}.sc-sy-step-h .step-horizontal.sc-sy-step{position:relative;width:auto;display:flex;align-items:start;display:flex;padding-right:20px}.sc-sy-step-h .step-horizontal.step-small.sc-sy-step{padding-right:95px}.sc-sy-step-h .step-horizontal.step-small.sc-sy-step .step-item.sc-sy-step{font-family:\"Roboto\";font-size:12px;font-weight:400;line-height:18px;letter-spacing:0}.sc-sy-step-h .step-horizontal.step-small.sc-sy-step .title.sc-sy-step,.sc-sy-step-h .step-horizontal.step-small.sc-sy-step .description.sc-sy-step{font-family:\"Roboto\";font-size:14px;font-weight:400;line-height:22px;text-decoration:none;text-transform:none;letter-spacing:0.25px}.sc-sy-step-h .step-horizontal.step-small.sc-sy-step .title.sc-sy-step:after{top:10px;left:100%}.sc-sy-step-h .step-horizontal.sc-sy-step .title.sc-sy-step{position:relative;display:inline-block;min-height:18px;word-break:normal;white-space:nowrap}.sc-sy-step-h .step-horizontal.sc-sy-step .title.sc-sy-step:after{content:\"\";position:absolute;top:10px;left:100%;display:block;width:9999px;height:1px;border-top:1px solid var(--steps-current-tail-border-enabled);box-sizing:border-box;margin-left:var(--spacing-xsmall)}.sc-sy-step-h .step-vertical.sc-sy-step{position:relative;align-items:start;padding-bottom:40px;height:100%}.sc-sy-step-h .step-vertical.sc-sy-step:after{content:\"\";position:absolute;left:16px;top:46px;display:block;height:9999px;width:1px;border-left:1px solid var(--steps-current-tail-border-enabled);box-sizing:border-box;margin-left:var(--spacing-xsmall)}.sc-sy-step-h .step-vertical.step-small.sc-sy-step{padding-bottom:15px}.sc-sy-step-h .step-vertical.step-small.sc-sy-step:after{left:12px;top:38px}.sc-sy-step-h .step-item.sc-sy-step{background-color:var(--steps-current-icon-background-enabled);color:white;min-width:var(--component-medium);min-height:var(--component-medium);display:inline-flex;align-items:center;justify-content:center;border-radius:50%;line-height:25px;box-sizing:border-box}.sc-sy-step-h .step-small.sc-sy-step .step-item.sc-sy-step{display:flex;align-items:center;min-width:var(--component-small);min-height:var(--component-small);box-sizing:border-box}.sc-sy-step-h .step-small.sc-sy-step .step-value.sc-sy-step{margin-top:2px}sy-step.sc-sy-step-h:last-child,sy-step.sc-sy-step-h:nth-last-child(1){flex:none}sy-step.sc-sy-step-h:last-child .step.sc-sy-step:last-child,sy-step.sc-sy-step-h:nth-last-child(1) .step.sc-sy-step:last-child{padding:var(--spacing-xsmall)}sy-step.sc-sy-step-h:last-child .step.sc-sy-step .title.sc-sy-step:after,sy-step.sc-sy-step-h:nth-last-child(1) .step.sc-sy-step .title.sc-sy-step:after{border:none}sy-step.sc-sy-step-h:last-child .step-vertical.sc-sy-step:after,sy-step.sc-sy-step-h:nth-last-child(1) .step-vertical.sc-sy-step:after{display:none}";

const SyStep$1 = /*@__PURE__*/ proxyCustomElement(class SyStep extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
    }
    get host() { return this; }
    description = "";
    disabled = false;
    loading = false;
    status = "none";
    small = false;
    clickable = false;
    index = 0;
    current = 0;
    size = "medium";
    parentStatus = "none";
    currentStatus = "none";
    type = "horizontal";
    lastStep = false;
    componentWillLoad() {
        this.updateCurrentStatus();
    }
    componentDidLoad() {
        // Light DOM에서는 슬롯이 필요없음
    }
    watchParentStatus() {
        this.updateCurrentStatus();
    }
    watchStatus() {
        this.updateCurrentStatus();
    }
    watchCurrent(newValue) {
        this.current = Number(newValue);
        this.updateCurrentStatus();
    }
    watchIndex(newValue) {
        this.index = Number(newValue);
        this.updateCurrentStatus();
    }
    updateCurrentStatus() {
        // 숫자로 명시적 변환
        const currentNum = Number(this.current);
        const indexNum = Number(this.index);
        if (this.parentStatus === "finish") {
            this.currentStatus = "finish";
        }
        else if (this.status !== "none") {
            this.currentStatus = this.status;
        }
        else {
            if (currentNum > indexNum) {
                this.currentStatus = "finish";
            }
            else if (currentNum === indexNum) {
                this.currentStatus = "current";
            }
            else {
                this.currentStatus = "wait";
            }
        }
    }
    handleClick = (_e) => {
        if (this.clickable && !this.disabled) {
            this.host.dispatchEvent(new CustomEvent("selected", {
                detail: { index: this.index, step: this.host },
                bubbles: true,
                composed: true,
                cancelable: false,
            }));
        }
    };
    render() {
        const classNames = {
            'step': true,
            'step-small': this.size === "small",
            'step-clickable': this.currentStatus !== "error" && this.clickable,
            'step-disabled': this.disabled && this.currentStatus !== "error",
            'step-error': this.currentStatus === "error",
            'step-done': this.currentStatus === "finish",
            'step-active': this.currentStatus === "current",
            'step-wait': this.currentStatus === "wait",
            'step-horizontal': this.type === "horizontal",
            'step-vertical': this.type === "vertical",
            'step-loading': this.loading && !this.disabled && this.currentStatus !== "error" && this.currentStatus !== "finish",
            'step-last': this.lastStep,
        };
        return (h("div", { key: '8023b7fbf288ff27be69ecc8cc0aa054d6364a31', class: Object.keys(classNames).filter(k => classNames[k]).join(' '), onClick: this.handleClick }, h("div", { key: '762d7ecc34d8229e0765de0ef065b1c722078202', class: "step-item" }, this.currentStatus === "finish" ? (h("sy-icon", { size: "large" }, h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { fill: "currentColor", d: "M534 132.5C544.8 140.2 547.2 155.2 539.5 166L275.5 534C271.4 539.7 265 543.4 258 543.9C251 544.4 244 542 239 537L103 401C93.6 391.6 93.6 376.4 103 367.1C112.4 357.8 127.6 357.7 136.9 367.1L253 483L500.5 138C508.2 127.2 523.2 124.8 534 132.5z" })))) : this.currentStatus === "error" ? (h("sy-icon", { size: "large" }, h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { fill: "currentColor", d: "M135.5 169C126.1 159.6 126.1 144.4 135.5 135.1C144.9 125.8 160.1 125.7 169.4 135.1L320.4 286.1L471.4 135.1C480.8 125.7 496 125.7 505.3 135.1C514.6 144.5 514.7 159.7 505.3 169L354.3 320L505.3 471C514.7 480.4 514.7 495.6 505.3 504.9C495.9 514.2 480.7 514.3 471.4 504.9L320.4 353.9L169.4 504.9C160 514.3 144.8 514.3 135.5 504.9C126.2 495.5 126.1 480.3 135.5 471L286.5 320L135.5 169z" })))) : (this.index >= 0 ? this.index : '')), h("div", { key: '26462eb516bd11b08105c3f477c9243d01b9abef', class: "step-value" }, h("div", { key: 'b05ac69033473d985aec79f215c915bd7799827f', class: "title" }, h("slot", { key: '3e55701d6da5aa0a9c47d8320c9c3fdc0bfbb1ac' })), h("div", { key: '3b923507cf1a32ea3f5ef0dd69fff70fb4e85ca5', class: "description" }, this.description))));
    }
    static get watchers() { return {
        "parentStatus": ["watchParentStatus"],
        "status": ["watchStatus"],
        "current": ["watchCurrent"],
        "index": ["watchIndex"]
    }; }
    static get style() { return syStepCss; }
}, [262, "sy-step", {
        "description": [513],
        "disabled": [516],
        "loading": [516],
        "status": [513],
        "small": [1028],
        "clickable": [1028],
        "index": [1538],
        "current": [1026],
        "size": [1025],
        "parentStatus": [1025, "parent-status"],
        "currentStatus": [1537, "current-status"],
        "type": [1025],
        "lastStep": [1028, "last-step"]
    }, undefined, {
        "parentStatus": ["watchParentStatus"],
        "status": ["watchStatus"],
        "current": ["watchCurrent"],
        "index": ["watchIndex"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-step", "sy-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-step":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyStep$1);
            }
            break;
        case "sy-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const SyStep = SyStep$1;
const defineCustomElement = defineCustomElement$1;

export { SyStep, defineCustomElement };
