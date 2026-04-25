import { p as proxyCustomElement, H, h } from './index.js';

const syStepsCss = ".sc-sy-steps-h{display:flex;width:100%;justify-content:space-between;align-items:start}.sc-sy-steps-h .steps-wrapper.sc-sy-steps{display:flex;flex-direction:row;width:100%}.sc-sy-steps-h .step.sc-sy-steps{display:flex;align-items:start}[type=horizontal].sc-sy-steps-h sy-step.sc-sy-steps .step.sc-sy-steps{position:relative;width:auto}[type=horizontal].sc-sy-steps-h .steps-wrapper.sc-sy-steps{display:flex;flex-direction:row;width:100%}[type=vertical].sc-sy-steps-h{display:flex;flex-direction:column;height:100%;justify-content:space-between;align-items:center;width:fit-content}[type=vertical].sc-sy-steps-h .steps-wrapper.sc-sy-steps{display:flex;flex-direction:column;width:100%}";

const SySteps$1 = /*@__PURE__*/ proxyCustomElement(class SySteps extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
    }
    get host() { return this; }
    current = 0;
    clickable = false;
    complete = false;
    type = "horizontal";
    size = "medium";
    startIndex = 0;
    componentWillLoad() {
        // 문자열인 경우 숫자로 변환
        if (typeof this.current === 'string') {
            this.current = parseInt(this.current, 10);
        }
        if (typeof this.startIndex === 'string') {
            this.startIndex = parseInt(this.startIndex, 10);
        }
        this.validateCurrent();
    }
    componentDidLoad() {
        setTimeout(() => {
            this.initializeAllSteps();
        }, 10);
    }
    watchCurrent(newValue) {
        this.current = Number(newValue);
        this.validateCurrent();
        this.updateCurrentOnChildren();
    }
    watchStartIndex(newValue) {
        this.startIndex = Number(newValue);
        this.validateCurrent();
        this.updateStartIndex();
    }
    watchClickable() {
        this.updateClickable();
    }
    watchSize() {
        this.updateSize();
    }
    watchComplete() {
        this.updateCompleteSteps();
    }
    watchType() {
        this.updateType();
    }
    getStepContents() {
        // Light DOM에서 직접 sy-step 요소들을 찾기
        // slot 내부가 아니라 host의 직접 자식들
        return Array.from(this.host.querySelectorAll('sy-step'));
    }
    validateCurrent() {
        const stepList = this.getStepContents();
        if (stepList.length === 0)
            return;
        const maxIndex = stepList.length - 1 + this.startIndex;
        if (this.current < this.startIndex) {
            this.current = this.startIndex;
        }
        else if (this.current > maxIndex + 1) {
            this.current = maxIndex + 1;
        }
    }
    initializeAllSteps() {
        const steps = this.getStepContents();
        steps.forEach((step, i, arr) => {
            const calculatedIndex = this.startIndex + i;
            step.index = calculatedIndex;
            step.current = this.current;
            step.size = this.size;
            step.lastStep = i === arr.length - 1;
            step.clickable = this.clickable;
            step.type = this.type;
            if (this.complete) {
                step.parentStatus = "finish";
            }
        });
    }
    updateCurrentOnChildren() {
        this.getStepContents().forEach((step) => {
            step.current = this.current;
        });
    }
    updateSize() {
        this.getStepContents().forEach((element, index, arr) => {
            element.size = this.size;
            element.lastStep = index === arr.length - 1;
        });
    }
    updateStartIndex() {
        const steps = this.getStepContents();
        steps.forEach((stepElement, i) => {
            const newIndex = this.startIndex + i;
            stepElement.index = newIndex;
        });
    }
    updateClickable() {
        this.getStepContents().forEach((stepElement) => {
            stepElement.clickable = this.clickable;
        });
    }
    updateCompleteSteps() {
        this.getStepContents().forEach((stepElement) => {
            stepElement.parentStatus = this.complete ? "finish" : "none";
        });
        if (!this.complete) {
            this.updateCurrentOnChildren();
        }
    }
    updateType() {
        this.getStepContents().forEach((stepElement) => {
            stepElement.type = this.type;
        });
    }
    handleSlotChange = () => {
        // 슬롯 내용이 변경되면 재초기화
        setTimeout(() => {
            this.initializeAllSteps();
        }, 10);
    };
    render() {
        return (h("div", { key: '0247ff26e3e0bbfd086e279af3c52c9f25db30d7', class: "steps-wrapper" }, h("slot", { key: '9884ba599ffe4b8b68413d0295ebb2dec6b4ce9a', onSlotchange: this.handleSlotChange })));
    }
    static get watchers() { return {
        "current": ["watchCurrent"],
        "startIndex": ["watchStartIndex"],
        "clickable": ["watchClickable"],
        "size": ["watchSize"],
        "complete": ["watchComplete"],
        "type": ["watchType"]
    }; }
    static get style() { return syStepsCss; }
}, [262, "sy-steps", {
        "current": [1538],
        "clickable": [516],
        "complete": [516],
        "type": [513],
        "size": [513],
        "startIndex": [514, "start-index"]
    }, undefined, {
        "current": ["watchCurrent"],
        "startIndex": ["watchStartIndex"],
        "clickable": ["watchClickable"],
        "size": ["watchSize"],
        "complete": ["watchComplete"],
        "type": ["watchType"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-steps"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-steps":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SySteps$1);
            }
            break;
    } });
}

const SySteps = SySteps$1;
const defineCustomElement = defineCustomElement$1;

export { SySteps, defineCustomElement };
