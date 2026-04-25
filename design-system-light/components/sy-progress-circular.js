import { p as proxyCustomElement, H, h, a as Host } from './index.js';
import { f as fnAssignPropFromAlias } from './p-Dlcw8XSW.js';

const syProgressCircularCss = "@charset \"UTF-8\";.sc-sy-progress-circular-h{display:inline-block;position:relative;width:60px;height:60px}.sc-sy-progress-circular-h{--progress-thickness-small:2px;--progress-thickness-medium:2px;--progress-thickness-large:2px;transition:all 0.3s ease}[size=small].sc-sy-progress-circular-h{width:56px;height:56px}[size=small].sc-sy-progress-circular-h .text.sc-sy-progress-circular{font-family:\"Roboto\";font-size:12px;font-weight:500;line-height:18px;letter-spacing:0}[size=medium].sc-sy-progress-circular-h{width:92px;height:92px}[size=medium].sc-sy-progress-circular-h .text.sc-sy-progress-circular{font-family:\"Roboto\";font-size:20px;font-weight:500;line-height:28px;letter-spacing:0.15px}[size=large].sc-sy-progress-circular-h{width:128px;height:128px}[size=large].sc-sy-progress-circular-h .text.sc-sy-progress-circular{font-family:\"Roboto\";font-size:30px;font-weight:500;line-height:38px}.progress-status-error[size=small].sc-sy-progress-circular-h .text.sc-sy-progress-circular,.progress-status-complete[size=small].sc-sy-progress-circular-h .text.sc-sy-progress-circular{width:20px;height:20px}.progress-status-error[size=medium].sc-sy-progress-circular-h .text.sc-sy-progress-circular,.progress-status-complete[size=medium].sc-sy-progress-circular-h .text.sc-sy-progress-circular{width:26px;height:26px}.progress-status-error[size=large].sc-sy-progress-circular-h .text.sc-sy-progress-circular,.progress-status-complete[size=large].sc-sy-progress-circular-h .text.sc-sy-progress-circular{width:34px;height:34px}.circle.sc-sy-progress-circular{fill:none;stroke-width:var(--stroke-width);transition:stroke-dashoffset 0.5s cubic-bezier(0.4, 0, 0.2, 1);transform-origin:center;stroke-linecap:round}.circle-background.sc-sy-progress-circular{fill:none;stroke:var(--progress-circluar-complete-container-background-enabled);opacity:0.3;stroke-width:var(--stroke-width)}.circle.status-default.sc-sy-progress-circular{stroke:var(--progress-circluar-inprogress-border-enabled)}.circle.status-error.sc-sy-progress-circular{stroke:var(--progress-circluar-error-border-enabled)}.circle.status-complete.sc-sy-progress-circular{stroke:var(--progress-circluar-complete-border-enabled)}.progress-status-default.sc-sy-progress-circular-h circle[name=circle-storke].sc-sy-progress-circular{stroke:var(--progress-circluar-inprogress-border-enabled)}.progress-status-error.sc-sy-progress-circular-h circle[name=circle-storke].sc-sy-progress-circular{stroke:var(--progress-circluar-error-border-enabled)}.progress-status-complete.sc-sy-progress-circular-h circle[name=circle-storke].sc-sy-progress-circular{stroke:var(--progress-circluar-complete-border-enabled)}sy-progress-circular[size=small].sc-sy-progress-circular-h circle[name=circle-storke].sc-sy-progress-circular,sy-progress-circular[size=small].sc-sy-progress-circular-h circle[name=circle-bg].sc-sy-progress-circular{stroke-width:var(--progress-thickness-small)}sy-progress-circular[size=medium].sc-sy-progress-circular-h circle[name=circle-storke].sc-sy-progress-circular,sy-progress-circular[size=medium].sc-sy-progress-circular-h circle[name=circle-bg].sc-sy-progress-circular{stroke-width:var(--progress-thickness-medium)}sy-progress-circular[size=large].sc-sy-progress-circular-h circle[name=circle-storke].sc-sy-progress-circular,sy-progress-circular[size=large].sc-sy-progress-circular-h circle[name=circle-bg].sc-sy-progress-circular{stroke-width:var(--progress-thickness-large)}.text.sc-sy-progress-circular{position:absolute;top:50%;left:50%;display:flex;align-items:center;justify-content:center;transform:translate(-50%, -50%);color:var(--progress-circluar-initial-inner-text-enabled);text-align:center;font-weight:600;transition:color 0.3s ease;overflow:hidden;word-break:break-word;-webkit-box-orient:vertical;text-overflow:ellipsis}.text.status-default.sc-sy-progress-circular{width:100%;height:40%;color:var(--progress-circluar-initial-inner-text-enabled)}.text.status-error.sc-sy-progress-circular{color:var(--progress-circluar-error-icon-enabled);width:100%;height:40%}.text.status-error.sc-sy-progress-circular svg.sc-sy-progress-circular{transform:rotate(0);fill:var(--progress-circluar-error-border-enabled)}.text.status-complete.sc-sy-progress-circular{color:var(--progress-circluar-complete-icon-enabled);width:100%;height:40%}.text.status-complete.sc-sy-progress-circular svg.sc-sy-progress-circular{transform:rotate(0);fill:var(--progress-circluar-complete-border-enabled)}svg.sc-sy-progress-circular{width:100%;height:100%;transform:rotate(-90deg)}.progress-container.sc-sy-progress-circular{position:relative;width:100%;height:100%;display:flex;justify-content:center;align-items:center}";

const SyProgressCircular$1 = /*@__PURE__*/ proxyCustomElement(class SyProgressCircular extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
    }
    get host() { return this; }
    percent = 0;
    segment = '';
    status = 'default';
    hideText = false;
    size = 'medium';
    tooltipTitle = '';
    indeterminate = false;
    segmentInfo = [];
    displayPercent = 0;
    center = 20;
    get radius() {
        return 18;
    }
    get circumference() {
        return 2 * Math.PI * this.radius;
    }
    connectedCallback() {
        this.parseSegmentsAttr();
    }
    async componentWillLoad() {
        this.hideText = fnAssignPropFromAlias(this.host, 'hide-text') ?? this.hideText;
        this.tooltipTitle = fnAssignPropFromAlias(this.host, 'tooltip-title') ?? this.tooltipTitle;
        this.parseSegmentsAttr();
    }
    componentWillRender() {
        if (this.percent < 0)
            this.displayPercent = 0;
        else if (this.percent > 100)
            this.displayPercent = 100;
        else
            this.displayPercent = Math.round(this.percent || 0);
    }
    watchSegment() {
        this.parseSegmentsAttr();
    }
    parseSegmentsAttr() {
        if (!this.segment)
            return;
        try {
            let parsedSegments;
            if (typeof this.segment === 'object')
                parsedSegments = this.segment;
            else
                parsedSegments = JSON.parse(this.segment);
            let previousPercent = 0;
            this.segmentInfo = parsedSegments.map((segment) => {
                const adjustedSegment = {
                    percent: segment.percent - previousPercent,
                    status: segment.status || this.status,
                };
                previousPercent = segment.percent;
                return adjustedSegment;
            });
        }
        catch (e) {
            console.error('Invalid segments JSON format:', e);
            this.segmentInfo = [];
        }
    }
    getStatusColor(status) {
        switch (status) {
            case 'error': return 'var(--progress-circluar-error-border-enabled)';
            case 'complete': return 'var(--progress-circluar-complete-border-enabled)';
            default: return 'var(--progress-circluar-inprogress-border-enabled)';
        }
    }
    withoutSegment() {
        if (this.percent <= 0)
            return null;
        const dashLength = this.circumference * (this.percent / 100);
        const strokeColor = this.getStatusColor(this.status);
        return (h("circle", { cx: String(this.center), cy: String(this.center), r: String(this.radius), fill: "none", stroke: strokeColor, "stroke-linecap": "round", "stroke-dasharray": `${dashLength} ${this.circumference - dashLength}`, name: "circle-stroke" }));
    }
    withSegments() {
        const dashLength = this.circumference;
        if (!this.segmentInfo || this.segmentInfo.length === 0)
            return null;
        let cumulativePercent = 0;
        return (h("g", null, this.segmentInfo.map(segment => {
            const startAngle = cumulativePercent / 100 * this.circumference;
            const segmentLength = segment.percent / 100 * this.circumference;
            cumulativePercent += segment.percent;
            const strokeColor = this.getStatusColor(segment.status || this.status);
            if (segment.percent > 0) {
                return (h("circle", { cx: String(this.center), cy: String(this.center), r: String(this.radius), fill: "none", stroke: strokeColor, "stroke-linecap": "round", "stroke-dasharray": `${segmentLength} ${dashLength - segmentLength}`, "stroke-dashoffset": String(-startAngle) }));
            }
            return null;
        })));
    }
    renderIndeterminate() {
        const arc = this.circumference * 0.4;
        const strokeColor = this.getStatusColor(this.status);
        return (h("circle", { cx: String(this.center), cy: String(this.center), r: String(this.radius), fill: "none", stroke: strokeColor, "stroke-width": `var(--progress-thickness-${this.size})`, "stroke-linecap": "round", "stroke-dasharray": `${arc} ${this.circumference - arc}`, "stroke-dashoffset": `${this.circumference / 4}` }, h("animateTransform", { attributeName: "transform", type: "rotate", from: `0 ${this.center} ${this.center}`, to: `360 ${this.center} ${this.center}`, dur: "1s", repeatCount: "indefinite" })));
    }
    render() {
        return (h(Host, { key: 'a298a8913696f6bc0bcb820f9b8255f83a78c662' }, h("div", { key: '258523b2878c4aabb2fb175b54a466fa6a65d47b', class: "progress-container" }, this.tooltipTitle && this.tooltipTitle.trim() !== '' ? h("slot", { name: "tooltip" }) : null, h("svg", { key: '89b7e90156149e961f2c0f7b7af7a1d0d5063d70', viewBox: "0 0 40 40", xmlns: "http://www.w3.org/2000/svg", class: this.indeterminate ? 'indeterminate' : '' }, h("circle", { key: '66ade8e36a2a038633aa49e7d395b59de7c51530', cx: String(this.center), cy: String(this.center), r: String(this.radius), fill: "none", stroke: "var(--progress-circluar-initial-inner-background-enabled)", name: "circle-bg" }), this.indeterminate ? this.renderIndeterminate() : (this.segmentInfo.length === 0 ? this.withoutSegment() : this.withSegments())), !this.hideText && !this.indeterminate ? (h("div", { class: { 'text': true, [`status-${this.status}`]: true } }, this.status === 'error' ? (h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 384 512" }, h("path", { d: "M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z" }))) : this.status === 'complete' ? (h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { d: "M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z" }))) : (`${this.displayPercent}%`))) : null)));
    }
    static get watchers() { return {
        "segment": ["watchSegment"]
    }; }
    static get style() { return syProgressCircularCss; }
}, [262, "sy-progress-circular", {
        "percent": [1538],
        "segment": [1],
        "status": [1],
        "hideText": [1028, "hidetext"],
        "size": [513],
        "tooltipTitle": [1025, "tooltiptitle"],
        "indeterminate": [4],
        "segmentInfo": [32],
        "displayPercent": [32]
    }, undefined, {
        "segment": ["watchSegment"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-progress-circular"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-progress-circular":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyProgressCircular$1);
            }
            break;
    } });
}

const SyProgressCircular = SyProgressCircular$1;
const defineCustomElement = defineCustomElement$1;

export { SyProgressCircular, defineCustomElement };
