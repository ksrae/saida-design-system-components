import { p as proxyCustomElement, H, h, a as Host } from './index.js';
import { f as fnAssignPropFromAlias } from './p-Dlcw8XSW.js';

const syProgressBarCss = "@charset \"UTF-8\";.sc-sy-progress-bar-h{display:block;width:100%}.progress-bar.sc-sy-progress-bar{width:100%;height:100%;background-color:var(--progress-line-initial-inner-background-enabled);border-radius:3px;overflow:hidden;position:relative;height:12px;border-radius:var(--border-radius-full)}.progress-bar.progress-bar--error.sc-sy-progress-bar .progress-bar--indicator.sc-sy-progress-bar{background-color:var(--progress-line-error-bar-background-enabled)}.progress-bar.progress-bar--complete.sc-sy-progress-bar .progress-bar--indicator.sc-sy-progress-bar{background-color:var(--progress-line-completed-bar-background-enabled)}.progress-bar--label.sc-sy-progress-bar{position:absolute;align-content:center;align-items:center;font-size:12px;font-weight:bold;z-index:1;color:white;height:12px;line-height:11px;text-shadow:var(--text-shadow)}.progress-bar--value-position-center.sc-sy-progress-bar .progress-bar--label.sc-sy-progress-bar{left:50%}.progress-bar--value-position-left.sc-sy-progress-bar .progress-bar--label.sc-sy-progress-bar{left:var(--spacing-xsmall)}.progress-bar--value-position-right.sc-sy-progress-bar .progress-bar--label.sc-sy-progress-bar{right:var(--spacing-xsmall)}.progress-bar--value-position-hidden.sc-sy-progress-bar .progress-bar--label.sc-sy-progress-bar{display:none !important}.progress-bar--indicator.sc-sy-progress-bar{height:100%;background-color:var(--progress-line-inprogress-bar-background-enabled);display:flex;align-items:center;justify-content:center;position:relative;border-radius:var(--border-radius-full)}.progress-bar--indeterminate.sc-sy-progress-bar .progress-bar--indicator.sc-sy-progress-bar{position:absolute;border-radius:var(--border-radius-full);top:0;right:100%;bottom:0;left:0;width:0;animation:indeterminate var(--transition-x-slow) linear infinite}@keyframes indeterminate{0%{left:0;width:0}50%{left:0;width:100%}100%{left:100%;width:0}}.progress-bar--segments.sc-sy-progress-bar{position:absolute;top:0;left:0;height:100%;display:flex;border-radius:var(--border-radius-full);overflow:hidden}.progress-bar--segment.sc-sy-progress-bar{height:100%}.progress-bar--segment-default.sc-sy-progress-bar{background-color:var(--progress-line-inprogress-bar-background-enabled)}.progress-bar--segment-error.sc-sy-progress-bar{background-color:var(--progress-line-error-bar-background-enabled)}.progress-bar--segment-complete.sc-sy-progress-bar{background-color:var(--progress-line-completed-bar-background-enabled)}.progress-bar--segment.progress-bar--segment-last.sc-sy-progress-bar{border-top-right-radius:var(--border-radius-full);border-bottom-right-radius:var(--border-radius-full)}.progress-bar--segmented.sc-sy-progress-bar .progress-bar--indicator.sc-sy-progress-bar{display:none}";

const SyProgressBar$1 = /*@__PURE__*/ proxyCustomElement(class SyProgressBar extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
    }
    get host() { return this; }
    /** When true, percentage is ignored, the label is hidden, and the progress bar is drawn in an indeterminate state. */
    indeterminate = false;
    /** The current progress as a percentage, 0 to 100. */
    percent = 0;
    /** The error state of the progress bar */
    status = 'default';
    /** The value position type of the progress bar. */
    valuePosition = 'center';
    hidePercent = false;
    segment = '';
    tooltipTitle = '';
    innerValuePosition = this.valuePosition;
    segmentInfo = [];
    minProgressWidth = 50;
    componentWillLoad() {
        this.valuePosition = fnAssignPropFromAlias(this.host, 'value-position') ?? this.valuePosition;
        this.hidePercent = fnAssignPropFromAlias(this.host, 'hide-percent') ?? this.hidePercent;
        this.tooltipTitle = fnAssignPropFromAlias(this.host, 'tooltip-title') ?? this.tooltipTitle;
        this.setValuePosition();
        this.parseSegmentsAttr();
    }
    componentWillRender() {
        this.percent = this.percent < 0 ? 0 : this.percent > 100 ? 100 : this.percent;
    }
    watchSegment() {
        this.parseSegmentsAttr();
    }
    parseSegmentsAttr() {
        if (!this.segment) {
            this.segmentInfo = [];
            return;
        }
        try {
            let parsedSegments = this.parsingSegment(this.segment);
            if (parsedSegments.length === 0) {
                this.segmentInfo = [];
                return;
            }
            const validSegments = parsedSegments
                .filter((segment) => segment && typeof segment === 'object')
                .map((segment) => ({
                percent: typeof segment.percent === 'number' ? segment.percent : 100,
                status: segment.status || 'default'
            }))
                .sort((a, b) => a.percent - b.percent);
            let previousPercent = 0;
            this.segmentInfo = validSegments.map((segment) => {
                const adjustedSegment = {
                    percent: segment.percent - previousPercent,
                    status: segment.status
                };
                previousPercent = segment.percent;
                return adjustedSegment;
            });
            if (previousPercent < 100 && this.segmentInfo.length > 0) {
                this.segmentInfo.push({ percent: 100 - previousPercent, status: 'default' });
            }
            this.segmentInfo = this.segmentInfo.filter(segment => segment.percent > 0);
        }
        catch (e) {
            console.error('세그먼트 파싱 오류:', e);
            this.segmentInfo = [{ percent: 100, status: 'default' }];
        }
    }
    parsingSegment(segment) {
        let parsedSegments = segment;
        if (typeof segment !== 'object') {
            const cleanedString = segment.replace(/,\s*]/g, ']');
            parsedSegments = JSON.parse(cleanedString);
        }
        if (!Array.isArray(parsedSegments)) {
            parsedSegments = [parsedSegments];
        }
        return parsedSegments;
    }
    setValuePosition() {
        const width = this.host.getBoundingClientRect().width || 0;
        const currentProgressWidth = width * (this.percent * 0.01);
        if (this.valuePosition.startsWith('progress') && currentProgressWidth <= this.minProgressWidth) {
            this.innerValuePosition = 'progress-left';
        }
        else {
            this.innerValuePosition = this.valuePosition;
        }
    }
    get progressBarLabelPositionStyle() {
        if (this.innerValuePosition.startsWith('progress')) {
            if (this.innerValuePosition === 'progress-center') {
                return { left: `50%`, transform: 'translate(-50%)' };
            }
            else if (this.innerValuePosition === 'progress-left') {
                return { left: `var(--spacing-xsmall)` };
            }
            else if (this.innerValuePosition === 'progress-right') {
                return { right: `var(--spacing-xsmall)` };
            }
        }
        return {};
    }
    get totalWidthLabelStyle() {
        if (this.innerValuePosition === 'center') {
            return { left: '50%', transform: 'translate(-50%)' };
        }
        else if (this.innerValuePosition === 'left') {
            return { left: 'var(--spacing-xsmall)' };
        }
        else if (this.innerValuePosition === 'right') {
            return { right: 'var(--spacing-xsmall)' };
        }
        return {};
    }
    renderLabel() {
        if (this.indeterminate)
            return null;
        if (this.innerValuePosition === 'progress-left' ||
            this.innerValuePosition === 'progress-center' ||
            this.innerValuePosition === 'progress-right') {
            return (h("div", { class: "progress-bar--label", style: this.progressBarLabelPositionStyle }, !this.hidePercent ? `${this.percent}%` : ''));
        }
        return null;
    }
    renderSegments() {
        const progressWidth = this.indeterminate ? '50%' : `${this.percent}%`;
        if (!this.segmentInfo || this.segmentInfo.length === 0) {
            return (h("div", { class: "progress-bar--indicator", style: { width: progressWidth } }, this.renderLabel()));
        }
        let cumulativePercent = 0;
        const segments = [];
        let totalSegmentPercent = 0;
        let visibleSegmentsCount = 0;
        for (const segment of this.segmentInfo) {
            const prevCumulativePercent = cumulativePercent;
            cumulativePercent += segment.percent;
            if (prevCumulativePercent >= this.percent)
                continue;
            if (cumulativePercent <= this.percent) {
                totalSegmentPercent += segment.percent;
                visibleSegmentsCount++;
            }
            else {
                totalSegmentPercent += (this.percent - prevCumulativePercent);
                visibleSegmentsCount++;
            }
        }
        cumulativePercent = 0;
        let currentSegmentIndex = 0;
        for (const segment of this.segmentInfo) {
            const prevCumulativePercent = cumulativePercent;
            cumulativePercent += segment.percent;
            if (prevCumulativePercent >= this.percent)
                continue;
            currentSegmentIndex++;
            const isLastSegment = currentSegmentIndex === visibleSegmentsCount;
            if (cumulativePercent <= this.percent) {
                const relativePercent = (segment.percent / totalSegmentPercent) * 100;
                segments.push(h("div", { class: `progress-bar--segment progress-bar--segment-${segment.status} ${isLastSegment ? 'progress-bar--segment-last' : ''}`, style: { width: `${relativePercent}%` } }));
            }
            else {
                const partialSegment = this.percent - prevCumulativePercent;
                const relativePercent = (partialSegment / totalSegmentPercent) * 100;
                segments.push(h("div", { class: `progress-bar--segment progress-bar--segment-${segment.status} ${isLastSegment ? 'progress-bar--segment-last' : ''}`, style: { width: `${relativePercent}%` } }));
            }
        }
        if (segments.length === 0) {
            return (h("div", { class: "progress-bar--indicator", style: { width: progressWidth } }, this.renderLabel()));
        }
        return (h("div", { class: "progress-bar--segments", style: { width: progressWidth } }, segments, this.renderLabel()));
    }
    render() {
        return (h(Host, { key: 'b8a78df82b5a6e0a3052ba3ed18d76a66f779c5f' }, h("div", { key: 'dee396405f8331acc8f381d9445d9f0a2a3638f0', class: `progress-bar ${this.indeterminate ? 'progress-bar--indeterminate' : ''} ${this.status === 'error' ? 'progress-bar--error' : ''} ${this.status === 'complete' ? 'progress-bar--complete' : ''} ${this.segmentInfo.length > 0 ? 'progress-bar--segmented' : ''} ${this.innerValuePosition === 'center' ? 'progress-bar--value-position-center' : ''} ${this.innerValuePosition === 'left' ? 'progress-bar--value-position-left' : ''} ${this.innerValuePosition === 'right' ? 'progress-bar--value-position-right' : ''} ${this.innerValuePosition === 'progress-left' ? 'progress-bar--value-position-left' : ''} ${this.innerValuePosition === 'progress-center' ? 'progress-bar--value-position-center' : ''} ${this.innerValuePosition === 'progress-right' ? 'progress-bar--value-position-right' : ''} ${this.hidePercent ? 'progress-bar--value-position-hidden' : ''}`, role: "progressbar", title: this.tooltipTitle || undefined, "aria-valuemin": "0", "aria-valuemax": "100", "aria-valuenow": this.indeterminate ? 0 : this.percent }, h("div", { key: '8aecfff57a8faf6dd63e0452ae1c87a10a797539', class: "progress-bar--label", style: { display: !this.indeterminate && (this.innerValuePosition === 'left' || this.innerValuePosition === 'center' || this.innerValuePosition === 'right') ? 'block' : 'none', ...this.totalWidthLabelStyle } }, !this.hidePercent ? `${this.percent}%` : ''), this.renderSegments())));
    }
    static get watchers() { return {
        "segment": ["watchSegment"]
    }; }
    static get style() { return syProgressBarCss; }
}, [258, "sy-progress-bar", {
        "indeterminate": [4],
        "percent": [1538],
        "status": [1],
        "valuePosition": [1025, "valueposition"],
        "hidePercent": [1028, "hidepercent"],
        "segment": [1],
        "tooltipTitle": [1025, "tooltiptitle"],
        "innerValuePosition": [32],
        "segmentInfo": [32]
    }, undefined, {
        "segment": ["watchSegment"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-progress-bar"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-progress-bar":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyProgressBar$1);
            }
            break;
    } });
}

const SyProgressBar = SyProgressBar$1;
const defineCustomElement = defineCustomElement$1;

export { SyProgressBar, defineCustomElement };
