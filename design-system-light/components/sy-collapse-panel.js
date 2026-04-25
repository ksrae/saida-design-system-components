import { p as proxyCustomElement, H, c as createEvent, h, a as Host } from './index.js';

const syCollapseCss = "@charset \"UTF-8\";.sc-sy-collapse-panel:root,.sc-sy-collapse-panel-h{display:block;width:100%}sy-collapse.sc-sy-collapse-panel-h{border-width:1px;border-style:solid;border-color:var(--collapse-default-header-border-enabled);overflow:auto;height:inherit}sy-collapse[borderless].sc-sy-collapse-panel-h{border-width:1px;border-style:solid;border-color:transparent}sy-collapse[disabled].sc-sy-collapse-panel-h sy-collpase-panel.sc-sy-collapse-panel{background-color:var(--collapse-default-header-background-disabled);color:var(--collapse-default-header-text-disabled)}sy-collapse[disabled].sc-sy-collapse-panel-h .collapse--arrow.sc-sy-collapse-panel::after{border-color:var(--collapse-default-header-border-disabled)}sy-collapse-panel.sc-sy-collapse-panel-h:last-child .collapse--item.sc-sy-collapse-panel{border-bottom:var(--border-small) transparent}sy-collapse-panel.sc-sy-collapse-panel-h .collapse--item.sc-sy-collapse-panel{width:100%;border-bottom:var(--border-small) var(--collapse-default-header-border-enabled)}sy-collapse-panel.sc-sy-collapse-panel-h .collapse--item.borderless.sc-sy-collapse-panel{border-bottom:var(--border-small) transparent}sy-collapse-panel.sc-sy-collapse-panel-h .collapse--item.ghost.sc-sy-collapse-panel .collapse--header.sc-sy-collapse-panel,sy-collapse-panel.sc-sy-collapse-panel-h .collapse--item.ghost.sc-sy-collapse-panel .collapse--content.sc-sy-collapse-panel{color:var(--collapse-ghost-header-text-enabled);background-color:transparent}sy-collapse-panel.sc-sy-collapse-panel-h .collapse--item.ghost.sc-sy-collapse-panel .collapse--header.sc-sy-collapse-panel:after,sy-collapse-panel.sc-sy-collapse-panel-h .collapse--item.ghost.sc-sy-collapse-panel .collapse--content.sc-sy-collapse-panel:after{border-color:var(--collapse-ghost-header-icon-enable)}sy-collapse-panel.sc-sy-collapse-panel-h .collapse--item.ghost.disabled.sc-sy-collapse-panel .collapse--header.sc-sy-collapse-panel,sy-collapse-panel.sc-sy-collapse-panel-h .collapse--item.ghost.disabled.sc-sy-collapse-panel .collapse--content.sc-sy-collapse-panel{color:var(--collapse-ghost-header-text-disabled);background-color:transparent}sy-collapse-panel.sc-sy-collapse-panel-h .collapse--item.ghost.disabled.sc-sy-collapse-panel .collapse--header.sc-sy-collapse-panel:after,sy-collapse-panel.sc-sy-collapse-panel-h .collapse--item.ghost.disabled.sc-sy-collapse-panel .collapse--content.sc-sy-collapse-panel:after{border-color:var(--collapse-ghost-header-icon-enable)}sy-collapse-panel.sc-sy-collapse-panel-h .collapse--item.disabled.sc-sy-collapse-panel{color:var(--collapse-default-header-text-disabled)}sy-collapse-panel.sc-sy-collapse-panel-h .collapse--item.disabled.sc-sy-collapse-panel .collapse--header.sc-sy-collapse-panel{cursor:auto}sy-collapse-panel.sc-sy-collapse-panel-h .collapse--item.disabled.sc-sy-collapse-panel .collapse--header.sc-sy-collapse-panel:after{border-color:var(--collapse-default-header-border-enabled)}sy-collapse-panel.sc-sy-collapse-panel-h .collapse--item.full-height-collapse.sc-sy-collapse-panel{width:100%;min-height:18px;box-sizing:border-box}sy-collapse-panel.sc-sy-collapse-panel-h .active.sc-sy-collapse-panel .collapse--header.sc-sy-collapse-panel{border-bottom:var(--border-small) var(--collapse-default-header-border-enabled);border-bottom-left-radius:0px;border-bottom-right-radius:0px}sy-collapse-panel.sc-sy-collapse-panel-h .active.sc-sy-collapse-panel .collapse--header.sc-sy-collapse-panel::after{transform:translateY(0%) rotate(45deg)}sy-collapse-panel.sc-sy-collapse-panel-h .active.borderless.sc-sy-collapse-panel .collapse--header.sc-sy-collapse-panel{border-bottom:var(--border-small) transparent}.sc-sy-collapse-panel-hsy-collapse-panel[fullheight].sc-sy-collapse-panel-s>div[class=content],.sc-sy-collapse-panel-hsy-collapse-panel[fullheight] .sc-sy-collapse-panel-s>div[class=content],.sc-sy-collapse-panel-hsy-collapse-panel[fullheight].sc-sy-collapse-panel-s>span[class=content],.sc-sy-collapse-panel-hsy-collapse-panel[fullheight] .sc-sy-collapse-panel-s>span[class=content]{max-height:0px}sy-collapse-panel[type=hidden].sc-sy-collapse-panel-h .collapse--header.sc-sy-collapse-panel{padding-left:var(--spacing-xsmall)}sy-collapse-panel.sc-sy-collapse-panel-h{display:inherit}sy-collapse-panel.sc-sy-collapse-panel-h .collapse--header.sc-sy-collapse-panel{position:relative;padding:var(--spacing-xsmall);cursor:pointer;background-color:var(--collapse-default-header-background-enabled);border:var(--border-small) transparent;box-sizing:border-box}sy-collapse-panel.sc-sy-collapse-panel-h .collapse--header.sc-sy-collapse-panel:focus-visible{border:var(--border-small) var(--focus-outline);outline:var(--border-small) var(--focus-outline)}sy-collapse-panel.sc-sy-collapse-panel-h .collapse--header.sc-sy-collapse-panel .header.sc-sy-collapse-panel{padding-left:var(--spacing-3xsmall)}sy-collapse-panel.sc-sy-collapse-panel-h .collapse--arrow.sc-sy-collapse-panel{padding-left:var(--spacing-xlarge)}sy-collapse-panel.sc-sy-collapse-panel-h .collapse--arrow.sc-sy-collapse-panel::after{content:\"\";position:absolute;top:calc(50% - var(--spacing-3xsmall));left:var(--spacing-small);transform:translateY(0%) rotate(-45deg);border:solid var(--collapse-default-header-icon-enabled);border-width:0 1px 1px 0;display:inline-block;padding:3px;transition:var(--transition-x-fast);transform-origin:center}sy-collapse-panel.sc-sy-collapse-panel-h .collapse--arrow.active.sc-sy-collapse-panel::after{transform:translateY(0%) rotate(45deg)}sy-collapse-panel.sc-sy-collapse-panel-h .collapse--arrow.sc-sy-collapse-panel>.collapse-title.sc-sy-collapse-panel{padding-left:var(--spacing-medium);height:100%;display:flex;align-content:center;align-items:center}sy-collapse-panel.sc-sy-collapse-panel-h(sy-collapse-panel[borderless]).sc-sy-collapse-panel{border:none}sy-collapse-panel.sc-sy-collapse-panel-h(sy-collapse-panel[borderless]).active.sc-sy-collapse-panel .collapse--header.sc-sy-collapse-panel{border:none}";

const SyCollapsePanel$1 = /*@__PURE__*/ proxyCustomElement(class SyCollapsePanel extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.changed = createEvent(this, "changed");
    }
    get host() { return this; }
    active = false;
    arrow = false;
    disabled = false;
    ghost = false;
    fullheight = false;
    // 내부 상태로만 관리
    borderless = false;
    contentHeight = 0;
    changed;
    // 현재 인덱스를 동적으로 계산
    get currentIndex() {
        const parent = this.host.closest('sy-collapse');
        if (!parent)
            return -1;
        const panels = Array.from(parent.querySelectorAll('sy-collapse-panel'));
        return panels.indexOf(this.host);
    }
    watchDisabled(newValue) {
        if (newValue) {
            this.active = false;
        }
    }
    watchActive(newValue, _oldValue) {
        // const index = this.currentIndex;
        if (newValue) {
            this.contentHeight = this.calculateContentHeight();
        }
    }
    async toggle() {
        if (!this.disabled) {
            this.active = !this.active;
            this.emitChange();
        }
    }
    async open() {
        if (!this.disabled) {
            this.active = true;
            this.emitChange();
        }
    }
    async close() {
        this.active = false;
        this.emitChange();
    }
    componentDidLoad() {
        this.applyHostStyle();
    }
    componentDidRender() {
        this.applyHostStyle();
    }
    applyHostStyle() {
        const fullheightActive = this.fullheight && this.active;
        const s = this.host.style;
        if (fullheightActive) {
            s.display = 'flex';
            s.flexDirection = 'column';
            s.flex = '1';
            s.minHeight = '0';
        }
        else {
            s.display = '';
            s.flexDirection = '';
            s.flex = '';
            s.minHeight = '';
        }
    }
    render() {
        const itemClasses = {
            'collapse--item': true,
            'ghost': this.ghost,
            'active': this.active,
            'borderless': this.borderless,
            'disabled': this.disabled,
            'full-height-collapse': this.fullheight
        };
        const headerClasses = {
            'collapse--header': true,
            'collapse--arrow': this.arrow
        };
        const fullheightActive = this.fullheight && this.active;
        const itemStyle = fullheightActive
            ? { display: 'flex', flexDirection: 'column', flex: '1', minHeight: '0' }
            : {};
        // Inline styles guarantee the animation runs regardless of Stencil
        // scoped-CSS selector transforms. In fullheight+active mode we bypass
        // the grid animation and let flexbox stretch the content instead.
        const contentStyle = fullheightActive
            ? {
                display: 'block',
                flex: '1',
                minHeight: '0',
                padding: 'var(--spacing-xsmall)',
                overflow: 'hidden',
                backgroundColor: 'var(--collapse-default-body-background-enabled)',
                boxSizing: 'border-box',
            }
            : {
                display: 'grid',
                gridTemplateRows: this.active ? '1fr' : '0fr',
                paddingLeft: 'var(--spacing-xsmall)',
                paddingRight: 'var(--spacing-xsmall)',
                paddingTop: this.active ? 'var(--spacing-xsmall)' : '0',
                paddingBottom: this.active ? 'var(--spacing-xsmall)' : '0',
                transition: 'grid-template-rows var(--collapse-transition-duration, 0.3s) var(--collapse-transition-timing, ease-in-out),' +
                    ' padding var(--collapse-transition-duration, 0.3s) var(--collapse-transition-timing, ease-in-out)',
                overflow: 'hidden',
                backgroundColor: 'var(--collapse-default-body-background-enabled)',
                boxSizing: 'border-box',
            };
        const slotWrapperStyle = fullheightActive
            ? { display: 'block', overflow: 'auto', height: '100%', minHeight: '0', boxSizing: 'border-box' }
            : { display: 'block', overflow: 'hidden', minHeight: '0', boxSizing: 'border-box' };
        return (h(Host, { key: 'a4298a9ff166502c22256e31e14ba32cc8ab4e3c' }, h("div", { key: '1e2554b610bac8eddf60c59685a8751677e28cfc', class: Object.keys(itemClasses).filter(key => itemClasses[key]).join(' '), style: itemStyle }, h("div", { key: 'bb6f0be92dd9033c4d34dcff9b9414b5bb28a63b', tabindex: 0, class: Object.keys(headerClasses).filter(key => headerClasses[key]).join(' '), "aria-disabled": this.disabled ? 'true' : 'false', onClick: () => this.handleClick() }, h("div", { key: '9dcd1ab1bc60bc4f8815a781ecdc2f451d241b42', class: "collapse--title" }, h("slot", { key: '53a54cfe99e31143a66730710a9a1670c041d46e', name: "header" }))), h("div", { key: 'f3ec1f9aa3149eae5159d2b1a1cd0e802980e076', class: "collapse--content", style: contentStyle, "aria-hidden": this.active ? 'false' : 'true' }, h("div", { key: '5b305db91256318f5d8229035b4cde85252692c6', class: "collapse--slot-wrapper", style: slotWrapperStyle }, h("slot", { key: 'df4b537991007b36f982c31098ff41340f1849c9' }))))));
    }
    calculateContentHeight() {
        const content = this.host.querySelector('.collapse--content');
        if (content) {
            const contentHeight = content.scrollHeight;
            return contentHeight;
        }
        else {
            return 0;
        }
    }
    handleClick() {
        const index = this.currentIndex;
        if (!this.disabled && index !== -1) {
            this.active = !this.active;
            this.emitChange();
        }
    }
    emitChange() {
        const index = this.currentIndex;
        const detail = {
            active: this.active,
            arrow: this.arrow,
            disabled: this.disabled,
            ghost: this.ghost,
            fullheight: this.fullheight,
            index: index,
            borderless: this.borderless
        };
        this.changed.emit(detail);
    }
    static get watchers() { return {
        "disabled": ["watchDisabled"],
        "active": ["watchActive"]
    }; }
    static get style() { return syCollapseCss; }
}, [262, "sy-collapse-panel", {
        "active": [1540],
        "arrow": [4],
        "disabled": [4],
        "ghost": [4],
        "fullheight": [4],
        "contentHeight": [32],
        "toggle": [64],
        "open": [64],
        "close": [64]
    }, undefined, {
        "disabled": ["watchDisabled"],
        "active": ["watchActive"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-collapse-panel"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-collapse-panel":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyCollapsePanel$1);
            }
            break;
    } });
}

const SyCollapsePanel = SyCollapsePanel$1;
const defineCustomElement = defineCustomElement$1;

export { SyCollapsePanel, defineCustomElement };
