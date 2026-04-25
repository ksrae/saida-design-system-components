import { p as proxyCustomElement, H, h } from './index.js';

const sySkeletonCss = ".sc-sy-skeleton-h{display:block;width:100%}.skeleton-container.sc-sy-skeleton{width:100%;display:flex;flex-direction:column;position:relative;gap:var(--spacing-medium)}.skeleton-container.align-center.sc-sy-skeleton{align-items:center;justify-content:center}.skeleton-item.sc-sy-skeleton{background:var(--skeleton-background-enabled);border-radius:var(--spacing-3xsmall)}.skeleton-animated.sc-sy-skeleton{background:linear-gradient(90deg, #f0f0f0 25%, #e1e1e1 50%, #f0f0f0 75%);background-size:200% 100%;animation:skeleton 3s infinite}@keyframes skeleton{0%{background-position:200% 0}100%{background-position:-200% 0}}.skeleton-text.sc-sy-skeleton{height:16px;width:100%}.skeleton-avatar.sc-sy-skeleton{border-radius:50%;min-width:var(--component-large);min-height:var(--component-large);margin-bottom:auto}.skeleton-image.sc-sy-skeleton{min-width:var(--component-large);min-height:var(--component-large);margin-bottom:auto}.skeleton-image.large.sc-sy-skeleton{min-width:100px;min-height:100px}.skeleton-button.sc-sy-skeleton{width:120px;border-radius:var(--border-radius-small);height:var(--component-medium);border-radius:4px;display:inline-block;gap:var(--spacing-xsmall)}.skeleton-table.sc-sy-skeleton{width:100%;border-spacing:0;border-collapse:collapse;table-layout:fixed}.skeleton-table.sc-sy-skeleton td.sc-sy-skeleton{padding:var(--spacing-xsmall);border:1px solid var(--skeleton-border-enabled)}.skeleton-table-cell.sc-sy-skeleton{height:16px;width:100%;border-radius:var(--border-radius-xsmall);margin-bottom:0px}.skeleton-with-avatar.sc-sy-skeleton,.skeleton-with-image.sc-sy-skeleton{display:flex;width:100%}.skeleton-content.sc-sy-skeleton{flex:1;display:flex;flex-direction:column;margin-left:16px;gap:var(--spacing-small)}.skeleton-content.vertical-center.sc-sy-skeleton{display:flex;align-items:center}.skeleton-content.vertical-center.sc-sy-skeleton .skeleton-text.sc-sy-skeleton{width:100%}.skeleton-buttons-container.sc-sy-skeleton{display:flex;flex-wrap:wrap;gap:var(--spacing-medium)}.skeleton-gallary-container.sc-sy-skeleton{display:flex;flex-direction:column;width:100%;gap:var(--spacing-medium)}.skeleton-gallary-row.sc-sy-skeleton{display:flex;justify-content:space-between;gap:var(--spacing-medium)}.skeleton-gallary-item.sc-sy-skeleton{width:22%;aspect-ratio:1/1;min-height:60px;flex:1}.skeleton-tree-container.sc-sy-skeleton{display:flex;flex-direction:column;width:100%;max-width:100%;gap:var(--spacing-medium)}.skeleton-tree-item.sc-sy-skeleton{display:flex;align-items:center;width:100%;box-sizing:border-box}.skeleton-tree-indent.sc-sy-skeleton{height:16px;width:20px;flex-shrink:0}.skeleton-tree-content.sc-sy-skeleton{flex:1;min-width:0;max-width:100%}sy-skeleton[disabled].sc-sy-skeleton-h .skeleton-item.sc-sy-skeleton{background-color:var(--background-subtlest)}";

const SySkeleton$1 = /*@__PURE__*/ proxyCustomElement(class SySkeleton extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
    }
    get host() { return this; }
    // `gallery` is the spec-aligned spelling; `gallary` stays for legacy
    // compatibility. Normalized in componentWillLoad.
    type = 'text';
    rows = 0;
    width = '100%';
    disabled = false;
    // --- State (Lit의 @state와 동일) ---
    skeletonWidth = '100%';
    animationKey = 0;
    treeContentWidth = 0;
    numColumns = 0; // for table
    // --- Internal properties ---
    resizeObserver;
    // --- Lifecycle Hooks ---
    componentWillLoad() {
        // Normalize the spec-aligned `gallery` to the code-canonical `gallary`
        // so downstream render switch matches either spelling.
        if (this.type === 'gallery')
            this.type = 'gallary';
        this.skeletonWidth = this.getSizeValue(this.width);
    }
    connectedCallback() {
        // Lit의 connectedCallback과 유사. DOM에 연결될 때 호출
        // ResizeObserver를 여기서 설정
        this.setupResizeObserver();
    }
    disconnectedCallback() {
        // Lit의 disconnectedCallback. DOM에서 제거될 때 호출
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
            this.resizeObserver = null;
        }
    }
    componentDidLoad() {
        // [설명] 이 컴포넌트는 렌더링된 후의 실제 너비를 기준으로
        // 내부 컨텐츠(테이블 컬럼 수, 트리 너비)를 계산해야 합니다.
        // 따라서 첫 렌더링 이후인 componentDidLoad()에서 크기를 측정하고
        // State를 업데이트하는 것이 필수적입니다.
        // 이로 인해 발생하는 초기 리렌더링은 의도된 동작이며,
        // Stencil의 경고는 이 특정 케이스에서는 무시해도 괜찮습니다.
        this.updateDimensions();
        this.resetAnimation();
    }
    // componentDidUpdate는 Stencil에 없으므로 Watcher로 대체합니다.
    // 이 hook은 Stencil V1에 있었지만 현재는 사용되지 않습니다.
    // prop 변경에 따른 로직은 Watcher에서 처리합니다.
    // --- Watchers (Lit의 updated() 대체) ---
    handleWidthChange(newValue) {
        this.skeletonWidth = this.getSizeValue(newValue);
        if (this.type === 'tree') {
            this.calculateTreeContentWidth();
        }
    }
    handleTypeOrRowsChange() {
        if (this.type === 'table') {
            // type이 table로 변경되거나, table인 상태에서 다른 prop이 바뀔 때 컬럼 재계산
            this.numColumns = this.calculateColumns();
        }
        if (this.type === 'tree') {
            this.calculateTreeContentWidth();
        }
        // 애니메이션 리셋 로직
        if (!this.disabled) {
            this.animationKey = Date.now();
            this.resetAnimation();
        }
        // Observer 재설정
        this.setupResizeObserver();
    }
    handleDisabledChange(isDisabled) {
        if (isDisabled) {
            this.stopAnimation();
        }
        else {
            this.resetAnimation();
        }
    }
    // --- Private Methods (원본 Lit 코드에서 거의 그대로 가져옴) ---
    updateDimensions() {
        if (this.type === 'table') {
            this.numColumns = this.calculateColumns();
        }
        if (this.type === 'tree') {
            this.calculateTreeContentWidth();
        }
    }
    setupResizeObserver() {
        // 기존 옵저버가 있으면 해제
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
        if (this.type === 'table' || this.type === 'tree') {
            this.resizeObserver = new ResizeObserver(() => {
                if (this.type === 'table') {
                    // State를 직접 변경하여 리렌더링 유도
                    this.numColumns = this.calculateColumns();
                }
                if (this.type === 'tree') {
                    this.calculateTreeContentWidth();
                }
            });
            // host 엘리먼트를 관찰
            this.resizeObserver.observe(this.host);
        }
    }
    async stopAnimation() {
        const animatedElements = this.host.querySelectorAll('.skeleton-animated');
        animatedElements.forEach(el => {
            el.style.animation = 'none';
            el.classList.remove('skeleton-animated');
        });
    }
    async resetAnimation() {
        if (this.disabled)
            return;
        setTimeout(() => {
            const allSkeletonItems = this.host.querySelectorAll('.skeleton-item');
            allSkeletonItems.forEach(el => {
                el.style.animation = 'none';
                el.classList.add('skeleton-animated');
                el.style.animation = ''; // SCSS에 정의된 애니메이션을 다시 적용
            });
        }, 10);
    }
    getSizeValue(value) {
        if (!value)
            return '100%';
        if (/^\d+$/.test(value)) {
            return `${value}px`;
        }
        return value;
    }
    calculateColumns() {
        const containerWidth = this.host.getBoundingClientRect().width;
        if (containerWidth < 300)
            return 2;
        if (containerWidth < 500)
            return 3;
        if (containerWidth < 700)
            return 4;
        if (containerWidth < 900)
            return 5;
        return 6;
    }
    calculateTreeContentWidth() {
        const containerWidth = this.host.getBoundingClientRect().width;
        if (containerWidth <= 0)
            return;
        const maxIndentation = 2 * 24; // 24px is an example indent width
        const availableWidth = Math.max(150, containerWidth - maxIndentation);
        // State를 직접 변경하여 리렌더링 유도
        this.treeContentWidth = availableWidth;
    }
    // --- Render Method ---
    render() {
        const actualRow = Math.max(1, this.rows);
        const rows = Array.from({ length: actualRow }, (_, i) => i);
        const columns = Array.from({ length: this.numColumns }, (_, i) => i);
        const gallaryPerRow = 4;
        const itemClass = (extraClasses) => ({
            'skeleton-item': true,
            'skeleton-animated': !this.disabled,
            [extraClasses]: true,
        });
        const renderContent = () => {
            switch (this.type) {
                case 'table':
                    return (h("table", { class: "skeleton-table" }, h("tbody", null, rows.map(() => (h("tr", null, columns.map(() => (h("td", null, h("div", { class: itemClass('skeleton-table-cell') }))))))))));
                case 'button':
                    return (h("div", { class: "skeleton-buttons-container" }, rows.map(() => h("div", { class: itemClass('skeleton-button') }))));
                case 'gallary':
                    return (h("div", { class: "skeleton-gallary-container" }, rows.map(() => (h("div", { class: "skeleton-gallary-row" }, Array.from({ length: gallaryPerRow }).map(() => (h("div", { class: itemClass('skeleton-gallary-item') }))))))));
                case 'tree':
                    return (h("div", { class: "skeleton-tree-container" }, rows.map((index) => {
                        const normalizedIndex = index % 10;
                        let depth = 0;
                        if ([0, 1, 8].includes(normalizedIndex))
                            depth = 0;
                        else if ([2, 6, 7, 9].includes(normalizedIndex))
                            depth = 1;
                        else if (normalizedIndex >= 3 && normalizedIndex <= 5)
                            depth = 2;
                        return (h("div", { class: "skeleton-tree-item" }, Array.from({ length: depth }).map(() => h("div", { class: "skeleton-tree-indent" })), h("div", { class: "skeleton-tree-content" }, h("div", { class: itemClass('skeleton-text'), style: { width: this.treeContentWidth > 0 ? `${this.treeContentWidth}px` : '100%' } }))));
                    })));
                default: // text, avatar, image
                    if (this.rows >= 1 && (this.type === 'avatar' || this.type === 'image')) {
                        return [
                            h("div", { class: {
                                    'skeleton-with-avatar': this.type === 'avatar',
                                    'skeleton-with-image': this.type === 'image',
                                } }, h("div", { class: itemClass(this.type === 'avatar' ? 'skeleton-avatar' : 'skeleton-image') }), h("div", { class: {
                                    'skeleton-content': true,
                                    'vertical-center': this.rows === 1
                                } }, this.rows === 1
                                ? h("div", { class: itemClass('skeleton-text') })
                                : rows.slice(0, 2).map(() => h("div", { class: itemClass('skeleton-text') })))),
                            ...rows.slice(2).map(() => h("div", { class: itemClass('skeleton-text') }))
                        ];
                    }
                    return rows.map(() => (h("div", { class: {
                            'skeleton-item': true,
                            'skeleton-animated': !this.disabled,
                            'skeleton-text': this.type === 'text',
                            'skeleton-avatar': this.type === 'avatar',
                            'skeleton-image': this.type === 'image',
                            'large': this.type === 'image' && this.rows === 0,
                        } })));
            }
        };
        return (h("div", { class: {
                "skeleton-container": true,
                "align-center": this.rows === 0 && (this.type === 'avatar' || this.type === 'image'),
            }, style: { width: this.skeletonWidth }, "data-animation-key": this.animationKey }, renderContent()));
    }
    static get watchers() { return {
        "width": ["handleWidthChange"],
        "rows": ["handleTypeOrRowsChange"],
        "type": ["handleTypeOrRowsChange"],
        "disabled": ["handleDisabledChange"]
    }; }
    static get style() { return sySkeletonCss; }
}, [258, "sy-skeleton", {
        "type": [1025],
        "rows": [2],
        "width": [1],
        "disabled": [4],
        "skeletonWidth": [32],
        "animationKey": [32],
        "treeContentWidth": [32],
        "numColumns": [32],
        "stopAnimation": [64],
        "resetAnimation": [64]
    }, undefined, {
        "width": ["handleWidthChange"],
        "rows": ["handleTypeOrRowsChange"],
        "type": ["handleTypeOrRowsChange"],
        "disabled": ["handleDisabledChange"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-skeleton"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-skeleton":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SySkeleton$1);
            }
            break;
    } });
}

const SySkeleton = SySkeleton$1;
const defineCustomElement = defineCustomElement$1;

export { SySkeleton, defineCustomElement };
