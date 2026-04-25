import { p as proxyCustomElement, H, h } from './index.js';
import { d as fnGetChildrenByTagName } from './p-Dlcw8XSW.js';

const syButtonGroupCss = ".sc-sy-button-group:root,.sc-sy-button-group-h{display:inline-flex}.sc-sy-button-group:root .button-group.sc-sy-button-group,.sc-sy-button-group-h .button-group.sc-sy-button-group{display:inline-flex;justify-content:flex-start}.sc-sy-button-group:root .button-group--vertical.sc-sy-button-group,.sc-sy-button-group-h .button-group--vertical.sc-sy-button-group{flex-direction:column}sy-button-group.sc-sy-button-group-h .button-group.sc-sy-button-group>sy-button.sc-sy-button-group:focus-within{z-index:2}sy-button-group.sc-sy-button-group-h .button-group.sc-sy-button-group>sy-button.sc-sy-button-group{margin:0;margin-left:-1px}";

const SyButtonGroup$1 = /*@__PURE__*/ proxyCustomElement(class SyButtonGroup extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
    }
    get host() { return this; }
    // --- Public Properties (spec: props) ---
    vertical = false;
    // --- Private ---
    containerEl;
    mutationObserver = null;
    buttons = [];
    componentDidRender() {
        if (!this.mutationObserver && this.containerEl) {
            this.mutationObserver = new MutationObserver(() => this.updateButtons());
            this.mutationObserver.observe(this.containerEl, { childList: true });
        }
        this.updateButtons();
    }
    disconnectedCallback() {
        if (this.mutationObserver) {
            this.mutationObserver.disconnect();
            this.mutationObserver = null;
        }
    }
    handleVerticalChange() {
        // Child list hasn't changed when orientation flips, so haveButtonsChanged would
        // return false. Bust the cache so updateButtons pushes new state to every child.
        this.buttons = [];
        this.updateButtons();
    }
    updateButtons() {
        const children = fnGetChildrenByTagName(this.containerEl, 'sy-button');
        if (!this.haveButtonsChanged(children))
            return;
        this.buttons = children;
        if (this.buttons.length === 0)
            return;
        this.buttons.forEach((button, index) => {
            if (typeof button.setButtonGroupState === 'function') {
                const state = {
                    buttonGroup: true,
                    vertical: this.vertical,
                    first: index === 0,
                    last: index === this.buttons.length - 1,
                };
                button.setButtonGroupState(state);
            }
        });
    }
    haveButtonsChanged(newButtons) {
        if (this.buttons.length !== newButtons.length)
            return true;
        for (let i = 0; i < this.buttons.length; i++) {
            if (this.buttons[i] !== newButtons[i])
                return true;
        }
        return false;
    }
    render() {
        return (h("div", { key: '02a60c8af77d1c45380fa071b7f01b5a0dab998c', class: {
                'button-group': true,
                'button-group--vertical': this.vertical,
            }, role: "group", "aria-orientation": this.vertical ? 'vertical' : 'horizontal', ref: (el) => (this.containerEl = el) }, h("slot", { key: '68724050734dda2401f5800706c21cc91be03f4a' })));
    }
    static get watchers() { return {
        "vertical": ["handleVerticalChange"]
    }; }
    static get style() { return syButtonGroupCss; }
}, [262, "sy-button-group", {
        "vertical": [516]
    }, undefined, {
        "vertical": ["handleVerticalChange"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-button-group"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-button-group":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyButtonGroup$1);
            }
            break;
    } });
}

const SyButtonGroup = SyButtonGroup$1;
const defineCustomElement = defineCustomElement$1;

export { SyButtonGroup, defineCustomElement };
