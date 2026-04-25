import { p as proxyCustomElement, H, c as createEvent, h } from './index.js';

const syIconCss = ".sc-sy-icon-h{--icon-xxsmall:10px;--icon-xsmall:12px;--icon-small:14px;--icon-medium:16px;--icon-large:18px;--icon-xlarge:20px;--icon-xxlarge:24px;--icon-xxxlarge:30px;--icon-xxxxlarge:40px;display:inline-flex;width:var(--icon-medium);height:var(--icon-medium)}[size=xxsmall].sc-sy-icon-h{width:var(--icon-xxsmall);height:var(--icon-xxsmall)}[size=xsmall].sc-sy-icon-h{width:var(--icon-xsmall);height:var(--icon-xsmall)}[size=small].sc-sy-icon-h{width:var(--icon-small);height:var(--icon-small)}[size=medium].sc-sy-icon-h{width:var(--icon-medium);height:var(--icon-medium)}[size=large].sc-sy-icon-h{width:var(--icon-large);height:var(--icon-large)}[size=xlarge].sc-sy-icon-h{width:var(--icon-xlarge);height:var(--icon-xlarge)}[size=xxlarge].sc-sy-icon-h{width:var(--icon-xxlarge);height:var(--icon-xxlarge)}[size=xxxlarge].sc-sy-icon-h{width:var(--icon-xxxlarge);height:var(--icon-xxxlarge)}.icon.sc-sy-icon{position:relative;display:inline-flex;justify-content:center;align-items:center;width:100%;height:100%;aspect-ratio:auto}.icon.selectable.sc-sy-icon{cursor:pointer}.svg-container.sc-sy-icon{display:flex;align-items:center;justify-content:center;width:100%;height:100%}.svg-container.sc-sy-icon svg.sc-sy-icon{display:block;width:100%;height:100%}.icon.sc-sy-icon{font-size:initial;aspect-ratio:1/1;display:flex;align-items:center;justify-content:center}.icon.xxsmall.sc-sy-icon{zoom:0.8;font-size:var(--icon-xxsmall);width:var(--icon-xxsmall);height:var(--icon-xxsmall)}.icon.xsmall.sc-sy-icon{zoom:0.92;font-size:var(--icon-xsmall);width:var(--icon-xsmall);height:var(--icon-xsmall)}.icon.small.sc-sy-icon{font-size:calc(var(--icon-small) - 2px);width:var(--icon-small);height:var(--icon-small)}.icon.medium.sc-sy-icon{font-size:calc(var(--icon-medium) - 3px);width:var(--icon-medium);height:var(--icon-medium)}.icon.large.sc-sy-icon{font-size:calc(var(--icon-large) - 3px);width:var(--icon-large);height:var(--icon-large)}.icon.xlarge.sc-sy-icon{font-size:calc(var(--icon-xlarge) - 4px);width:var(--icon-xlarge);height:var(--icon-xlarge)}.icon.xxlarge.sc-sy-icon{font-size:calc(var(--icon-xxlarge) - 6px);width:var(--icon-xxlarge);height:var(--icon-xxlarge)}.icon.xxxlarge.sc-sy-icon{font-size:calc(var(--icon-xxxlarge) - 6px);width:var(--icon-xxxlarge);height:var(--icon-xxxlarge)}.icon.natural-aspect.sc-sy-icon{width:100%}";

const SyIcon = /*@__PURE__*/ proxyCustomElement(class SyIcon extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.selected = createEvent(this, "selected");
    }
    get host() { return this; }
    size = 'medium';
    path; // slot보다 path가 우선함.
    svgMarkup;
    naturalAspect = false;
    selectable = false;
    svgContent = '';
    selected;
    containerEl;
    mutationObserver;
    componentWillLoad() {
        // Load external SVG if path is provided
        if (this.path) {
            this.loadExternalSvg(this.path);
            return;
        }
        if (this.svgMarkup) {
            this.svgContent = this.normalizeSvgMarkup(this.svgMarkup);
        }
    }
    componentDidLoad() {
        this.observeSvgMutations();
        this.normalizeRenderedSvgDimensions();
    }
    componentDidRender() {
        this.normalizeRenderedSvgDimensions();
    }
    disconnectedCallback() {
        this.mutationObserver?.disconnect();
    }
    async watchPath(newValue, oldValue) {
        if (newValue && newValue !== oldValue) {
            await this.loadExternalSvg(newValue);
            return;
        }
        if (!newValue) {
            this.svgContent = this.svgMarkup ? this.normalizeSvgMarkup(this.svgMarkup) : '';
        }
    }
    watchSvgMarkup(newValue) {
        if (!this.path) {
            this.svgContent = newValue ? this.normalizeSvgMarkup(newValue) : '';
        }
    }
    async loadExternalSvg(path) {
        try {
            const res = await fetch(path);
            if (res.ok) {
                this.svgContent = this.normalizeSvgMarkup(await res.text());
            }
            else {
                console.error(`Failed to load SVG from path: ${path}, status: ${res.status}`);
            }
        }
        catch (e) {
            console.error(`Error loading SVG: ${e.message}`);
        }
    }
    normalizeSvgMarkup(svgMarkup) {
        if (!svgMarkup || typeof document === 'undefined' || !svgMarkup.includes('<svg')) {
            return svgMarkup;
        }
        try {
            const template = document.createElement('template');
            template.innerHTML = svgMarkup.trim();
            template.content.querySelectorAll('svg').forEach((svg) => {
                const hadDimensions = svg.hasAttribute('width') || svg.hasAttribute('height');
                svg.removeAttribute('width');
                svg.removeAttribute('height');
                if (hadDimensions) {
                    svg.setAttribute('data-sy-had-dimensions', 'true');
                }
            });
            return template.innerHTML.trim();
        }
        catch {
            return svgMarkup;
        }
    }
    normalizeRenderedSvgDimensions() {
        // sy-icon controls the final rendered size, so incoming SVG dimensions are stripped.
        this.host?.querySelectorAll('svg').forEach((svg) => {
            const hadDimensions = svg.hasAttribute('width') || svg.hasAttribute('height') || svg.getAttribute('data-sy-had-dimensions') === 'true';
            svg.removeAttribute('width');
            svg.removeAttribute('height');
            svg.removeAttribute('data-sy-had-dimensions');
            if (hadDimensions) {
                this.normalizeSvgViewBox(svg);
            }
        });
    }
    observeSvgMutations() {
        if (!this.host || typeof MutationObserver === 'undefined') {
            return;
        }
        this.mutationObserver?.disconnect();
        this.mutationObserver = new MutationObserver(() => {
            this.normalizeRenderedSvgDimensions();
        });
        this.mutationObserver.observe(this.host, { childList: true, subtree: true });
    }
    normalizeSvgViewBox(svg) {
        const viewBox = svg.viewBox?.baseVal;
        const bbox = this.getSvgBBox(svg);
        if (!bbox || bbox.width <= 0 || bbox.height <= 0) {
            return;
        }
        const shouldTrimViewBox = !viewBox ||
            !Number.isFinite(viewBox.width) ||
            !Number.isFinite(viewBox.height) ||
            viewBox.width <= 0 ||
            viewBox.height <= 0 ||
            viewBox.x !== 0 ||
            viewBox.y !== 0 ||
            (bbox.width / viewBox.width) < 0.6 ||
            (bbox.height / viewBox.height) < 0.6;
        if (!shouldTrimViewBox) {
            return;
        }
        svg.setAttribute('viewBox', `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    }
    getSvgBBox(svg) {
        try {
            return svg.getBBox();
        }
        catch {
            try {
                const graphic = svg.querySelector('path, g, rect, circle, ellipse, polygon, polyline, line');
                return graphic?.getBBox();
            }
            catch {
                return null;
            }
        }
    }
    handleClick = () => {
        // selectable이 false이면 아무 작업도 하지 않음
        if (!this.selectable) {
            return;
        }
        // 1. path prop이 있으면 최우선으로 path 값을 사용
        if (this.path) {
            this.selected.emit({ value: this.path });
            return;
        }
        // 2. path가 없을 경우, slot에 있는 첫 번째 자식 요소를 찾음
        // containerEl은 slot을 감싸는 span이며, firstElementChild는 slot에 실제로 들어온 첫 번째 HTML 요소를 가리킴
        const slottedElement = this.containerEl.firstElementChild;
        if (slottedElement) {
            // 텍스트가 아닌 요소의 전체 HTML(예: <svg>...</svg>)을 값으로 사용
            const value = slottedElement.outerHTML;
            this.selected.emit({ value });
        }
        // path도 없고 slot에 요소도 없으면 아무것도 emit하지 않음
    };
    render() {
        const classNames = {
            icon: true,
            xxsmall: this.size === 'xxsmall',
            xsmall: this.size === 'xsmall',
            small: this.size === 'small',
            medium: this.size === 'medium',
            large: this.size === 'large',
            xlarge: this.size === 'xlarge',
            xxlarge: this.size === 'xxlarge',
            xxxlarge: this.size === 'xxxlarge',
            'natural-aspect': this.naturalAspect,
            selectable: this.selectable,
        };
        return (h("span", { key: '7db5f6364f1035945b4b011e1db9fa84cc255124', class: Object.keys(classNames).filter(key => classNames[key]).join(' '), onClick: this.handleClick }, h("span", { key: '96da8ff11418c9ebb4ee6cae652065f986832f62', ref: (el) => this.containerEl = el, class: "svg-container", style: { display: this.svgContent ? 'none' : undefined } }, h("slot", { key: '2f5a7f727ec5dbd338ea3492fc19ca59c88156cd' })), this.svgContent && (h("span", { key: 'a359da79313366ec91a076d3ea97a6e59b552b9a', class: "svg-container", innerHTML: this.svgContent }))));
    }
    static get watchers() { return {
        "path": ["watchPath"],
        "svgMarkup": ["watchSvgMarkup"]
    }; }
    static get style() { return syIconCss; }
}, [262, "sy-icon", {
        "size": [513],
        "path": [513],
        "svgMarkup": [1, "svg-markup"],
        "naturalAspect": [516, "natural-aspect"],
        "selectable": [516],
        "svgContent": [32]
    }, undefined, {
        "path": ["watchPath"],
        "svgMarkup": ["watchSvgMarkup"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-icon":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyIcon);
            }
            break;
    } });
}

export { SyIcon as S, defineCustomElement as d };
