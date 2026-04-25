import { p as proxyCustomElement, H, c as createEvent, h } from './index.js';
import { f as fnAssignPropFromAlias } from './p-Dlcw8XSW.js';

const sySplitPanelCss = ".sc-sy-split-panel-h{display:flex;height:100%;width:100%}.sc-sy-split-panel-h .divider.sc-sy-split-panel{background-color:var(--splitpanel-background-enabled);width:var(--spacing-3xsmall);cursor:col-resize;position:relative;display:flex}.sc-sy-split-panel-h .divider.sc-sy-split-panel:after{content:\"\";width:2px;height:80px;background-color:white;position:absolute;top:calc(50% - 40px);left:calc(50% - 1px)}.sc-sy-split-panel-h .divider.sc-sy-split-panel:hover{background-color:var(--splitpanel-background-hover)}.sc-sy-split-panel-h .divider.disabled.sc-sy-split-panel{background-color:var(--splitpanel-background-disabled);cursor:auto}.sc-sy-split-panel-h .divider.divider-hide.sc-sy-split-panel{display:none}[type=vertical].sc-sy-split-panel-h{flex-direction:column}.panel.sc-sy-split-panel{height:100%;overflow:auto}[type=vertical].sc-sy-split-panel-h .panel.sc-sy-split-panel{width:100%}[type=vertical].sc-sy-split-panel-h .divider.sc-sy-split-panel{width:100%;height:var(--spacing-3xsmall);cursor:row-resize;position:relative}[type=vertical].sc-sy-split-panel-h .divider.sc-sy-split-panel:after{content:\"\";width:80px;height:2px;background-color:white;position:absolute;left:calc(50% - 40px);top:calc(50% - 1px)}[type=vertical].sc-sy-split-panel-h .divider.disabled.sc-sy-split-panel{background-color:var(--splitpanel-background-disabled);cursor:auto}.divider.sc-sy-split-panel:before{content:\"\";position:absolute;top:0;left:0;width:100%;height:100%;background-color:transparent}[type=vertical].sc-sy-split-panel-h .divider.sc-sy-split-panel:before{width:100%;height:100%}";

const SySplitPanel$1 = /*@__PURE__*/ proxyCustomElement(class SySplitPanel extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.horizontalChanged = createEvent(this, "horizontalChanged");
        this.verticalChanged = createEvent(this, "verticalChanged");
    }
    get host() { return this; }
    disabled = false;
    hideDivider = false;
    minRatio = 0; // Ensure default value
    ratio = 50;
    type = 'horizontal';
    leftRatio = 50;
    rightRatio = 50;
    horizontalChanged;
    verticalChanged;
    isDragging = false;
    initialX = 0;
    initialY = 0;
    startLeftWidth = 0;
    startLeftHeight = 0;
    watchRatio() {
        this.updateRatio();
    }
    componentDidLoad() {
        this.updateSlotElements();
        document.addEventListener('mousemove', this.drag);
        document.addEventListener('mouseup', this.stopDrag);
    }
    disconnectedCallback() {
        document.removeEventListener('mousemove', this.drag);
        document.removeEventListener('mouseup', this.stopDrag);
    }
    componentWillLoad() {
        this.hideDivider = fnAssignPropFromAlias(this.host, 'hide-divider') ?? this.hideDivider;
        this.minRatio = fnAssignPropFromAlias(this.host, 'min-ratio') ?? this.minRatio;
        // Validate minRatio to ensure it is not null or undefined
        if (this.minRatio == null) {
            this.minRatio = 0;
        }
        this.updateRatio();
    }
    render() {
        const panelStyle = this.type === 'vertical'
            ? { height: `${this.leftRatio}%` }
            : { width: `${this.leftRatio}%` };
        const oppositePanelStyle = this.type === 'vertical'
            ? { height: `${this.rightRatio}%` }
            : { width: `${this.rightRatio}%` };
        const dividerClasses = {
            'divider': true,
            'disabled': this.disabled,
            'divider-hide': this.hideDivider
        };
        return [
            h("div", { key: 'd896330617e3f061e51dd09777d97e658dc053c1', class: "panel", style: panelStyle }, h("slot", { key: '2196e8d89857a64059f6c683488a0f674679267f', name: "left" })),
            h("div", { key: 'aa486bec72b2c5780e18d4264abc949c71b6e6be', class: dividerClasses, onMouseDown: this.startDrag }),
            h("div", { key: 'f145cea4a9732356376e4ef1c6071292631b1dee', class: "panel", style: oppositePanelStyle }, h("slot", { key: '12851b708b6deaafa5c055dd47fdabd01638386c', name: "right" }))
        ];
    }
    startDrag = (event) => {
        if (this.disabled)
            return;
        this.isDragging = true;
        this.initialX = event.clientX;
        this.initialY = event.clientY;
        this.startLeftWidth = this.leftRatio;
        this.startLeftHeight = this.leftRatio;
        event.preventDefault();
    };
    drag = (event) => {
        if (!this.disabled && this.isDragging) {
            if (this.type === 'vertical') {
                const movementY = event.clientY - this.initialY;
                this.leftRatio = Math.max(this.minRatio, Math.min(100 - this.minRatio, this.startLeftWidth + (movementY / this.host.offsetHeight) * 100));
            }
            else {
                const movementX = event.clientX - this.initialX;
                this.leftRatio = Math.max(this.minRatio, Math.min(100 - this.minRatio, this.startLeftWidth + (movementX / this.host.offsetWidth) * 100));
            }
            this.rightRatio = 100 - this.leftRatio;
        }
    };
    stopDrag = () => {
        if (!this.disabled && this.isDragging) {
            this.isDragging = false;
            // Emit the event only if the leftRate dimension (width or height) has changed
            if (this.type === 'horizontal' && this.leftRatio !== this.startLeftWidth) {
                this.horizontalChanged.emit({
                    leftRatio: this.leftRatio,
                    rightRatio: this.rightRatio
                });
            }
            else if (this.type === 'vertical' && this.leftRatio !== this.startLeftHeight) {
                this.verticalChanged.emit({
                    topRatio: this.leftRatio,
                    bottomRatio: this.rightRatio
                });
            }
        }
    };
    updateRatio() {
        this.leftRatio = this.ratio;
        this.rightRatio = 100 - this.ratio;
    }
    updateSlotElements() {
        const slotNames = ['left', 'right'];
        const slots = slotNames.map(name => this.host.querySelector(`slot[name='${name}']`));
        slots.forEach(slot => {
            if (slot) {
                const assignedElements = slot.assignedElements();
                assignedElements.forEach(element => {
                    element.style.height = `100%`;
                });
            }
        });
    }
    static get watchers() { return {
        "ratio": ["watchRatio"]
    }; }
    static get style() { return sySplitPanelCss; }
}, [262, "sy-split-panel", {
        "disabled": [516],
        "hideDivider": [1540, "hidedivider"],
        "minRatio": [1538, "minratio"],
        "ratio": [514],
        "type": [513],
        "leftRatio": [32],
        "rightRatio": [32]
    }, undefined, {
        "ratio": ["watchRatio"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-split-panel"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-split-panel":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SySplitPanel$1);
            }
            break;
    } });
}

const SySplitPanel = SySplitPanel$1;
const defineCustomElement = defineCustomElement$1;

export { SySplitPanel, defineCustomElement };
