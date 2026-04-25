import { p as proxyCustomElement, H, h, a as Host } from './index.js';

const syCollapseCss = "@charset \"UTF-8\";.sc-sy-collapse:root,.sc-sy-collapse-h{display:block;width:100%}sy-collapse.sc-sy-collapse-h{border-width:1px;border-style:solid;border-color:var(--collapse-default-header-border-enabled);overflow:auto;height:inherit}sy-collapse[borderless].sc-sy-collapse-h{border-width:1px;border-style:solid;border-color:transparent}sy-collapse[disabled].sc-sy-collapse-h sy-collpase-panel.sc-sy-collapse{background-color:var(--collapse-default-header-background-disabled);color:var(--collapse-default-header-text-disabled)}sy-collapse[disabled].sc-sy-collapse-h .collapse--arrow.sc-sy-collapse::after{border-color:var(--collapse-default-header-border-disabled)}sy-collapse-panel.sc-sy-collapse-h:last-child .collapse--item.sc-sy-collapse{border-bottom:var(--border-small) transparent}sy-collapse-panel.sc-sy-collapse-h .collapse--item.sc-sy-collapse{width:100%;border-bottom:var(--border-small) var(--collapse-default-header-border-enabled)}sy-collapse-panel.sc-sy-collapse-h .collapse--item.borderless.sc-sy-collapse{border-bottom:var(--border-small) transparent}sy-collapse-panel.sc-sy-collapse-h .collapse--item.ghost.sc-sy-collapse .collapse--header.sc-sy-collapse,sy-collapse-panel.sc-sy-collapse-h .collapse--item.ghost.sc-sy-collapse .collapse--content.sc-sy-collapse{color:var(--collapse-ghost-header-text-enabled);background-color:transparent}sy-collapse-panel.sc-sy-collapse-h .collapse--item.ghost.sc-sy-collapse .collapse--header.sc-sy-collapse:after,sy-collapse-panel.sc-sy-collapse-h .collapse--item.ghost.sc-sy-collapse .collapse--content.sc-sy-collapse:after{border-color:var(--collapse-ghost-header-icon-enable)}sy-collapse-panel.sc-sy-collapse-h .collapse--item.ghost.disabled.sc-sy-collapse .collapse--header.sc-sy-collapse,sy-collapse-panel.sc-sy-collapse-h .collapse--item.ghost.disabled.sc-sy-collapse .collapse--content.sc-sy-collapse{color:var(--collapse-ghost-header-text-disabled);background-color:transparent}sy-collapse-panel.sc-sy-collapse-h .collapse--item.ghost.disabled.sc-sy-collapse .collapse--header.sc-sy-collapse:after,sy-collapse-panel.sc-sy-collapse-h .collapse--item.ghost.disabled.sc-sy-collapse .collapse--content.sc-sy-collapse:after{border-color:var(--collapse-ghost-header-icon-enable)}sy-collapse-panel.sc-sy-collapse-h .collapse--item.disabled.sc-sy-collapse{color:var(--collapse-default-header-text-disabled)}sy-collapse-panel.sc-sy-collapse-h .collapse--item.disabled.sc-sy-collapse .collapse--header.sc-sy-collapse{cursor:auto}sy-collapse-panel.sc-sy-collapse-h .collapse--item.disabled.sc-sy-collapse .collapse--header.sc-sy-collapse:after{border-color:var(--collapse-default-header-border-enabled)}sy-collapse-panel.sc-sy-collapse-h .collapse--item.full-height-collapse.sc-sy-collapse{width:100%;min-height:18px;box-sizing:border-box}sy-collapse-panel.sc-sy-collapse-h .active.sc-sy-collapse .collapse--header.sc-sy-collapse{border-bottom:var(--border-small) var(--collapse-default-header-border-enabled);border-bottom-left-radius:0px;border-bottom-right-radius:0px}sy-collapse-panel.sc-sy-collapse-h .active.sc-sy-collapse .collapse--header.sc-sy-collapse::after{transform:translateY(0%) rotate(45deg)}sy-collapse-panel.sc-sy-collapse-h .active.borderless.sc-sy-collapse .collapse--header.sc-sy-collapse{border-bottom:var(--border-small) transparent}.sc-sy-collapse-hsy-collapse-panel[fullheight].sc-sy-collapse-s>div[class=content],.sc-sy-collapse-hsy-collapse-panel[fullheight] .sc-sy-collapse-s>div[class=content],.sc-sy-collapse-hsy-collapse-panel[fullheight].sc-sy-collapse-s>span[class=content],.sc-sy-collapse-hsy-collapse-panel[fullheight] .sc-sy-collapse-s>span[class=content]{max-height:0px}sy-collapse-panel[type=hidden].sc-sy-collapse-h .collapse--header.sc-sy-collapse{padding-left:var(--spacing-xsmall)}sy-collapse-panel.sc-sy-collapse-h{display:inherit}sy-collapse-panel.sc-sy-collapse-h .collapse--header.sc-sy-collapse{position:relative;padding:var(--spacing-xsmall);cursor:pointer;background-color:var(--collapse-default-header-background-enabled);border:var(--border-small) transparent;box-sizing:border-box}sy-collapse-panel.sc-sy-collapse-h .collapse--header.sc-sy-collapse:focus-visible{border:var(--border-small) var(--focus-outline);outline:var(--border-small) var(--focus-outline)}sy-collapse-panel.sc-sy-collapse-h .collapse--header.sc-sy-collapse .header.sc-sy-collapse{padding-left:var(--spacing-3xsmall)}sy-collapse-panel.sc-sy-collapse-h .collapse--arrow.sc-sy-collapse{padding-left:var(--spacing-xlarge)}sy-collapse-panel.sc-sy-collapse-h .collapse--arrow.sc-sy-collapse::after{content:\"\";position:absolute;top:calc(50% - var(--spacing-3xsmall));left:var(--spacing-small);transform:translateY(0%) rotate(-45deg);border:solid var(--collapse-default-header-icon-enabled);border-width:0 1px 1px 0;display:inline-block;padding:3px;transition:var(--transition-x-fast);transform-origin:center}sy-collapse-panel.sc-sy-collapse-h .collapse--arrow.active.sc-sy-collapse::after{transform:translateY(0%) rotate(45deg)}sy-collapse-panel.sc-sy-collapse-h .collapse--arrow.sc-sy-collapse>.collapse-title.sc-sy-collapse{padding-left:var(--spacing-medium);height:100%;display:flex;align-content:center;align-items:center}sy-collapse-panel.sc-sy-collapse-h(sy-collapse-panel[borderless]).sc-sy-collapse{border:none}sy-collapse-panel.sc-sy-collapse-h(sy-collapse-panel[borderless]).active.sc-sy-collapse .collapse--header.sc-sy-collapse{border:none}";

const SyCollapse$1 = /*@__PURE__*/ proxyCustomElement(class SyCollapse extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
    }
    get host() { return this; }
    accordion = false;
    borderless = false;
    disabled = false;
    fullheight = false;
    ghost = false;
    // Effective fullheight only applies when accordion is true — stretching a
    // single active panel to fill the remaining space only makes sense when
    // exactly one panel can be open at a time.
    get effectiveFullheight() {
        return this.fullheight && this.accordion;
    }
    componentDidLoad() {
        this.setupPanels();
        if (this.accordion) {
            this.initializeAccordion();
        }
        this.applyHostStyle();
    }
    componentDidRender() {
        // Reapply host inline style after every render so `effectiveFullheight`
        // changes flip the flex chain immediately. Done via direct style
        // manipulation (not <Host style={...}>) to guarantee the styles land on
        // the element even if Stencil's Host prop wiring misbehaves.
        this.applyHostStyle();
    }
    applyHostStyle() {
        const s = this.host.style;
        if (this.effectiveFullheight) {
            s.display = 'flex';
            s.flexDirection = 'column';
            s.height = '100%';
            s.minHeight = '0';
        }
        else {
            s.display = '';
            s.flexDirection = '';
            s.height = '';
            s.minHeight = '';
        }
    }
    watchAccordion(newValue) {
        if (newValue) {
            this.initializeAccordion();
        }
        // Accordion toggles also flip effective fullheight.
        this.updatePanelProp('fullheight');
    }
    watchDisabled() {
        this.updatePanelProp('disabled');
    }
    watchBorderless() {
        this.updatePanelProp('borderless');
    }
    watchFullheight() {
        this.updatePanelProp('fullheight');
    }
    watchGhost() {
        this.updatePanelProp('ghost');
    }
    updatePanelProp(prop) {
        const panels = this.host.querySelectorAll('sy-collapse-panel');
        panels.forEach((panel) => {
            if (prop === 'disabled') {
                panel.disabled = panel.hasAttribute('disabled') ? true : this.disabled;
            }
            else if (prop === 'fullheight') {
                panel.fullheight = this.effectiveFullheight;
            }
            else {
                panel[prop] = this[prop];
            }
        });
    }
    async openAll() {
        if (this.accordion)
            return;
        const panels = this.host.querySelectorAll('sy-collapse-panel');
        panels.forEach((panel) => {
            if (!panel.disabled) {
                panel.active = true;
            }
        });
    }
    async closeAll() {
        const panels = this.host.querySelectorAll('sy-collapse-panel');
        panels.forEach((panel) => {
            panel.active = false;
        });
    }
    async openPanel(index) {
        const panels = this.host.querySelectorAll('sy-collapse-panel');
        const panel = panels[index];
        if (panel && !panel.disabled) {
            panel.active = true;
        }
    }
    async closePanel(index) {
        const panels = this.host.querySelectorAll('sy-collapse-panel');
        const panel = panels[index];
        if (panel) {
            panel.active = false;
        }
    }
    render() {
        const classes = {
            'collapse--panel': true,
            'disabled': this.disabled,
            'borderless': this.borderless,
            'ghost': this.ghost
        };
        // When effectiveFullheight, the inner panel div becomes a flex column
        // that takes all remaining space. Host-level flex is set in
        // applyHostStyle() (called from componentDidRender) to survive
        // Stencil's scoped-CSS transforms.
        const panelStyle = this.effectiveFullheight
            ? { display: 'flex', flexDirection: 'column', flex: '1', minHeight: '0' }
            : {};
        return (h(Host, { key: '04bc0dd4e8b8af2babf579d2d01a6d7c90e121df' }, h("div", { key: 'ca54c628aff75f90d3b63f8e2559ef5031d11218', class: Object.keys(classes).filter(key => classes[key]).join(' '), style: panelStyle }, h("slot", { key: '7a0b798a7a0e99ad3db32d90a370c880fc3ce211' }))));
    }
    setupPanels() {
        const panels = this.host.querySelectorAll('sy-collapse-panel');
        panels.forEach((panel) => {
            // 프로퍼티 설정
            panel.borderless = this.borderless;
            panel.ghost = this.ghost;
            panel.disabled = panel.hasAttribute('disabled') ? true : this.disabled;
            panel.fullheight = this.effectiveFullheight;
            // 이벤트 리스너 등록 (한 번만)
            if (!panel._hasCollapseListener) {
                panel._hasCollapseListener = true;
                panel.addEventListener('changed', (e) => {
                    this.handlePanelChange(e.detail);
                });
            }
        });
    }
    initializeAccordion() {
        const panels = this.host.querySelectorAll('sy-collapse-panel');
        const activePanels = Array.from(panels).filter((p) => p.active);
        // accordion 모드에서는 첫 번째 활성 패널만 유지
        if (activePanels.length > 1) {
            activePanels.forEach((panel, index) => {
                if (index > 0) {
                    panel.active = false;
                }
            });
        }
    }
    handlePanelChange(detail) {
        if (detail.disabled || detail.index === -1) {
            return;
        }
        if (this.accordion && detail.active) {
            // Accordion 모드: 다른 모든 패널 닫기
            const panels = this.host.querySelectorAll('sy-collapse-panel');
            panels.forEach((panel, idx) => {
                if (idx !== detail.index && panel.active) {
                    panel.active = false;
                }
            });
        }
    }
    static get watchers() { return {
        "accordion": ["watchAccordion"],
        "disabled": ["watchDisabled"],
        "borderless": ["watchBorderless"],
        "fullheight": ["watchFullheight"],
        "ghost": ["watchGhost"]
    }; }
    static get style() { return syCollapseCss; }
}, [262, "sy-collapse", {
        "accordion": [516],
        "borderless": [4],
        "disabled": [4],
        "fullheight": [516],
        "ghost": [4],
        "openAll": [64],
        "closeAll": [64],
        "openPanel": [64],
        "closePanel": [64]
    }, undefined, {
        "accordion": ["watchAccordion"],
        "disabled": ["watchDisabled"],
        "borderless": ["watchBorderless"],
        "fullheight": ["watchFullheight"],
        "ghost": ["watchGhost"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-collapse"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-collapse":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyCollapse$1);
            }
            break;
    } });
}

const SyCollapse = SyCollapse$1;
const defineCustomElement = defineCustomElement$1;

export { SyCollapse, defineCustomElement };
