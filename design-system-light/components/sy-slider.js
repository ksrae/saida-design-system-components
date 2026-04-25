import { p as proxyCustomElement, H, h } from './index.js';
import { f as fnAssignPropFromAlias } from './p-Dlcw8XSW.js';

const sySliderCss = ".sc-sy-slider-h{display:flex;width:100%;flex-direction:column}.slider-wrapper.sc-sy-slider{padding:0 var(--spacing-3xsmall);align-items:center;height:14px;margin-bottom:24px}.slider.sc-sy-slider{width:100%;height:4px;background-color:var(--slider-rail-background-enabled);position:relative;cursor:pointer;display:flex;flex-direction:column}.slider.slider--disabled.sc-sy-slider .slider-track.sc-sy-slider{background-color:var(--slider-track-background-disabled)}.slider.slider--disabled.sc-sy-slider .slider-thumb.sc-sy-slider{border:2px solid var(--slider-handle-border-disabled);background-color:var(--slider-handle-background-disabled)}.slider.slider--disabled.sc-sy-slider .mark-circle--active.sc-sy-slider{border:2px solid var(--slider-handle-border-disabled);background-color:var(--slider-handle-background-disabled)}.slider.slider--disabled.sc-sy-slider .current-value.sc-sy-slider{display:none}.slider.slider--disabled.sc-sy-slider .current-value.visible.sc-sy-slider{opacity:0.44;display:block}.slider.sc-sy-slider:hover{background-color:var(--slider-rail-background-hover)}.slider.sc-sy-slider:hover .slider-thumb.sc-sy-slider{border:2px solid var(--slider-handle-border-hover)}.slider.slider--disabled.sc-sy-slider{opacity:0.5;cursor:auto}.slider-wrapper.sc-sy-slider{display:flex;justify-content:center}.slider-wrapper.sc-sy-slider:hover .slider.sc-sy-slider{background-color:var(--slider-rail-background-hover)}.slider-wrapper.sc-sy-slider:hover .slider-track.sc-sy-slider{background-color:var(--slider-track-background-hover)}.slider-label.sc-sy-slider{display:flex;align-items:center;font-family:\"Roboto\";font-size:14px;font-weight:400;line-height:22px;text-decoration:none;text-transform:none;letter-spacing:0.25px;color:var(--textarea-label-title-enabled);height:var(--component-medium)}.slider-track.sc-sy-slider{position:absolute;height:4px;background-color:var(--slider-track-background-enabled);top:50%;transform:translateY(-50%)}.slider-thumb.sc-sy-slider{position:absolute;width:14px;height:14px;background-color:var(--slider-handle-background-enabled);border:2px solid var(--slider-handle-border-enabled);box-sizing:border-box;border-radius:50%;top:50%;transform:translate(-50%, -50%);z-index:2}.slider.slider--disabled.sc-sy-slider .slider-thumb.sc-sy-slider{cursor:auto}.slider-thumb.sc-sy-slider:hover{outline:none;background-color:var(--slider-handle-background-enabled);border:2px solid var(--slider-handle-border-hover)}.slider-thumb.sc-sy-slider:focus,.slider-thumb.sc-sy-slider:active{outline:none;box-shadow:0 0 0 2px rgba(158, 114, 196, 0.2);border:2px solid var(--slider-handle-border-active)}.current-value.visible.sc-sy-slider{opacity:1}.current-value.sc-sy-slider{opacity:0;transition:opacity 0.2s, visibility 0.2s;position:absolute;font-family:\"Roboto\";font-size:12px;font-weight:400;line-height:18px;letter-spacing:0;user-select:none;white-space:nowrap;border-radius:var(--border-radius-small);z-index:var(--z-index-tooltip);padding:var(--spacing-2xsmall) var(--spacing-xsmall);background-color:var(--tooltip-background-enabled);color:var(--tooltip-text-enabled)}.current-value.sc-sy-slider:not(.bottom):not(.left):not(.right){top:-38px;left:50%;transform:translate(-50%, 0)}.current-value.bottom.sc-sy-slider{bottom:-38px;left:50%;transform:translate(-50%, 0)}.current-value.left.sc-sy-slider{left:-8px;top:50%;transform:translate(-100%, -50%)}.current-value.right.sc-sy-slider{right:-8px;top:50%;transform:translate(100%, -50%)}.current-value.sc-sy-slider::after{content:\"\";position:absolute;width:0;height:0}.current-value.sc-sy-slider:not(.bottom):not(.left):not(.right)::after{left:50%;bottom:-4px;transform:translateX(-50%);border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid var(--tooltip-background-enabled)}.current-value.bottom.sc-sy-slider::after{left:50%;top:-4px;transform:translateX(-50%);border-left:5px solid transparent;border-right:5px solid transparent;border-bottom:5px solid var(--tooltip-background-enabled)}.current-value.left.sc-sy-slider::after{right:-4px;top:50%;transform:translateY(-50%);border-top:5px solid transparent;border-bottom:5px solid transparent;border-left:5px solid var(--tooltip-background-enabled)}.current-value.right.sc-sy-slider::after{left:-4px;top:50%;transform:translateY(-50%);border-top:5px solid transparent;border-bottom:5px solid transparent;border-right:5px solid var(--tooltip-background-enabled)}.disabled.sc-sy-slider .slider.slider--disabled.sc-sy-slider .current-value.sc-sy-slider{background-color:#ccc;color:var(--slider-mark-text-enabled);cursor:auto}.mark.sc-sy-slider{position:absolute;top:12px;left:50%;transform:translate(-50%, 0);font-family:\"Roboto\";font-size:14px;font-weight:400;line-height:22px;text-decoration:none;text-transform:none;letter-spacing:0.25px;color:var(--slider-mark-text-enabled);white-space:nowrap}.mark.sc-sy-slider span.sc-sy-slider{display:inline-block;margin-left:0px}.mark-circle.sc-sy-slider{position:absolute;background-color:var(--slider-mark-background-enabled);border:2px solid var(--slider-mark-border-enabled);box-sizing:border-box;width:8px;height:8px;border-radius:50%;top:50%;transform:translate(-50%, -50%);z-index:1}.mark-circle--active.sc-sy-slider{background-color:var(--slider-mark-background-active);border:2px solid var(--slider-mark-border-active)}.mark-circle--inactive.sc-sy-slider{background-color:var(--slider-mark-background-enabled);border:2px solid var(--slider-mark-border-enabled)}[readonly].sc-sy-slider-h{cursor:auto}[readonly].sc-sy-slider-h .slider.sc-sy-slider,[readonly].sc-sy-slider-h .mark-circle.sc-sy-slider,[readonly].sc-sy-slider-h .mark-circle--active.sc-sy-slider{cursor:auto}[readonly].sc-sy-slider-h .slider.sc-sy-slider{background-color:var(--slider-rail-background-enabled);cursor:auto}[readonly].sc-sy-slider-h .slider-thumb.sc-sy-slider:focus,[readonly].sc-sy-slider-h .slider-thumb.sc-sy-slider:hover,[readonly].sc-sy-slider-h .slider-thumb.sc-sy-slider:active{box-shadow:none;cursor:auto;border:2px solid var(--slider-handle-border-readonly)}[readonly].sc-sy-slider-h .current-value.sc-sy-slider{display:none}[readonly].sc-sy-slider-h .slider.sc-sy-slider:hover{background-color:var(--slider-rail-background-enabled)}[readonly].sc-sy-slider-h .slider-track.sc-sy-slider{background-color:var(--slider-track-background-readonly)}[readonly].sc-sy-slider-h .slider-thumb.sc-sy-slider{border:2px solid var(--slider-handle-border-readonly)}[disabled].sc-sy-slider-h .slider.sc-sy-slider,[disabled].sc-sy-slider-h .mark-circle.sc-sy-slider,[disabled].sc-sy-slider-h .mark-circle--active.sc-sy-slider{cursor:auto}[disabled].sc-sy-slider-h .slider.sc-sy-slider{background-color:var(--slider-rail-background-enabled);cursor:auto}[disabled].sc-sy-slider-h .slider-track.sc-sy-slider{cursor:auto;background-color:var(--slider-track-background-disabled)}[disabled].sc-sy-slider-h .slider-thumb.sc-sy-slider{cursor:auto;border:2px solid var(--slider-handle-border-disabled);background-color:var(--slider-handle-background-disabled)}[disabled].sc-sy-slider-h .slider-thumb.sc-sy-slider:focus,[disabled].sc-sy-slider-h .slider-thumb.sc-sy-slider:hover,[disabled].sc-sy-slider-h .slider-thumb.sc-sy-slider:active{box-shadow:none;cursor:auto}[disabled].sc-sy-slider-h .current-value.sc-sy-slider{display:none}[disabled].sc-sy-slider-h .slider.sc-sy-slider:hover{background-color:var(--slider-rail-background-enabled)}[disabled].sc-sy-slider-h .slider-track.sc-sy-slider{background-color:var(--slider-track-background-disabled)}[disabled].sc-sy-slider-h .slider-thumb.sc-sy-slider{border:2px solid var(--slider-handle-border-disabled)}[vertical].sc-sy-slider-h{display:inline-flex;flex-direction:column;width:auto;height:100%}[vertical].sc-sy-slider-h .sy-slider-root.sc-sy-slider{height:100%;display:flex;flex-direction:column;justify-content:center}[vertical].sc-sy-slider-h .slider-wrapper.sc-sy-slider{height:100%;display:flex;padding:0 var(--spacing-2xsmall);justify-content:center}[vertical].sc-sy-slider-h .slider.sc-sy-slider{background-color:var(--slider-rail-background-enabled);position:relative;cursor:pointer;display:flex;flex-direction:row;width:4px;height:100%}[vertical].sc-sy-slider-h .slider-label.sc-sy-slider{text-align:center;margin-bottom:var(--spacing-xsmall);display:block;font-family:\"Roboto\";font-size:12px;font-weight:400;line-height:18px;letter-spacing:0;color:var(--textarea-label-title-enabled)}[vertical].sc-sy-slider-h .slider-thumb.sc-sy-slider{left:50%;bottom:10px;top:inherit;transform:translate(-50%, 35%)}[vertical].sc-sy-slider-h .slider--vertical.sc-sy-slider .slider-track.sc-sy-slider{width:4px;height:auto;top:auto;bottom:0;left:50%;transform:translateX(-50%)}[vertical].sc-sy-slider-h .slider--vertical.sc-sy-slider .mark.sc-sy-slider{top:auto;left:auto;right:14px;bottom:50%;transform:translate(0, 50%)}[vertical].sc-sy-slider-h .slider--vertical.sc-sy-slider .mark-circle.sc-sy-slider{top:auto;left:50%;bottom:50%;transform:translate(-50%, 50%)}";

const SySlider$1 = /*@__PURE__*/ proxyCustomElement(class SySlider extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
    }
    get host() { return this; }
    min = 0;
    max = 100;
    step = 1;
    value = 0;
    disabled = false;
    readonly = false;
    showTooltip = 'default';
    tooltipPlacement = 'top';
    marks = {};
    hideMarks = false;
    range = false;
    rangeValue = [];
    reverse = false;
    label = '';
    hideTrackFill = false;
    snapToMarks = false;
    vertical = false;
    // refs
    slider;
    showMinValue = false;
    showMaxValue = false;
    showSingleValue = false;
    currentMinRangeValue;
    currentMaxRangeValue;
    currentValue = 0;
    dragTarget = null;
    isDragging = false;
    valueScale = 0;
    boundHandleMouseMove;
    boundHandleMouseUp;
    async componentWillLoad() {
        this.showTooltip = fnAssignPropFromAlias(this.host, 'show-tooltip') ?? this.showTooltip;
        this.tooltipPlacement = fnAssignPropFromAlias(this.host, 'tooltip-placement') ?? this.tooltipPlacement;
        this.hideMarks = fnAssignPropFromAlias(this.host, 'hide-marks') ?? this.hideMarks;
        this.rangeValue = fnAssignPropFromAlias(this.host, 'range-value') ?? this.rangeValue;
        this.hideTrackFill = fnAssignPropFromAlias(this.host, 'hide-track-fill') ?? this.hideTrackFill;
        this.snapToMarks = fnAssignPropFromAlias(this.host, 'snap-to-marks') ?? this.snapToMarks;
        this.currentValue = this.value;
        this.calValueScale();
        if (this.rangeValue && this.rangeValue.length >= 2) {
            this.currentMinRangeValue = this.rangeValue[0];
            this.currentMaxRangeValue = this.rangeValue[1];
        }
        else {
            this.currentMinRangeValue = this.min;
            this.currentMaxRangeValue = this.max;
        }
    }
    componentDidLoad() {
        // element ref
        this.slider = this.host.querySelector('.slider');
    }
    componentWillUpdate() {
        if (this.min > this.max) {
            this.min = this.max;
        }
    }
    onValueChange(newValue) {
        this.currentValue = newValue;
    }
    get displayValue() {
        return this.currentValue > this.max ? this.max : this.currentValue < this.min ? this.min : this.currentValue;
    }
    get displayMinRangeValue() {
        return this.currentMinRangeValue > this.max ? this.max : this.currentMinRangeValue < this.min ? this.min : this.currentMinRangeValue;
    }
    get displayMaxRangeValue() {
        return this.currentMaxRangeValue > this.max ? this.max : this.currentMaxRangeValue < this.min ? this.min : this.currentMaxRangeValue;
    }
    get thumbPosition() {
        const normalThumbPosition = this.max === this.min ? 100 : ((this.displayValue - this.min) / (this.max - this.min)) * 100;
        return this.reverse ? 100 - normalThumbPosition : normalThumbPosition;
    }
    calValueScale() {
        const match = this.step.toString().match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
        if (!match)
            this.valueScale = 0;
        else if (match[2])
            this.valueScale = Math.max(0, (match[1] ? match[1].length : 0) - parseInt(match[2], 10));
        else
            this.valueScale = match[1] ? match[1].length : 0;
    }
    formatValue(value) {
        if (value === undefined || value === null)
            return '0';
        if (value === 0)
            return '0';
        return 6 < this.valueScale ? value.toExponential(0) : value.toFixed(this.valueScale);
    }
    getTooltipClassMap(type) {
        let isVisible = false;
        if (type === 'min') {
            isVisible = (this.showMinValue && this.showTooltip !== 'never') || this.showTooltip === 'always';
        }
        else if (type === 'max') {
            isVisible = (this.showMaxValue && this.showTooltip !== 'never') || this.showTooltip === 'always';
        }
        else {
            isVisible = (this.showSingleValue && this.showTooltip !== 'never') || this.showTooltip === 'always';
        }
        const placementClass = { left: 'left', bottom: 'bottom', right: 'right', top: 'top' }[this.tooltipPlacement] || 'top';
        return `current-value  ${placementClass} ${isVisible ? 'visible' : ''}`;
    }
    handleThumbMouseEnter(_e, type) {
        if (this.showTooltip === 'default' && !this.disabled) {
            if (type === 'min')
                this.showMinValue = true;
            else if (type === 'max')
                this.showMaxValue = true;
            else
                this.showSingleValue = true;
        }
    }
    handleThumbKeyDown(e, type) {
        if (this.readonly || this.disabled)
            return;
        const key = e.key;
        let delta = 0;
        if (key === 'ArrowLeft' || key === 'ArrowDown')
            delta = -this.step;
        else if (key === 'ArrowRight' || key === 'ArrowUp')
            delta = this.step;
        else if (key === 'PageDown')
            delta = -this.step * 10;
        else if (key === 'PageUp')
            delta = this.step * 10;
        else if (key === 'Home') {
            if (type === 'min')
                this.currentMinRangeValue = this.min;
            else if (type === 'max')
                this.currentMaxRangeValue = this.min;
            else
                this.currentValue = this.min;
            this.dispatchChangeEvent();
            return;
        }
        else if (key === 'End') {
            if (type === 'min')
                this.currentMinRangeValue = this.max;
            else if (type === 'max')
                this.currentMaxRangeValue = this.max;
            else
                this.currentValue = this.max;
            this.dispatchChangeEvent();
            return;
        }
        if (delta !== 0) {
            if (this.range) {
                if (type === 'min')
                    this.currentMinRangeValue = Math.max(this.min, Math.min(this.currentMinRangeValue + delta, this.currentMaxRangeValue - this.step));
                else if (type === 'max')
                    this.currentMaxRangeValue = Math.min(this.max, Math.max(this.currentMaxRangeValue + delta, this.currentMinRangeValue + this.step));
            }
            else {
                this.currentValue = Math.min(this.max, Math.max(this.min, this.currentValue + delta));
            }
            this.dispatchChangeEvent();
        }
    }
    handleThumbMouseLeave(_e) {
        if (!this.isDragging && this.showTooltip === 'default') {
            this.showMaxValue = false;
            this.showMinValue = false;
            this.showSingleValue = false;
        }
    }
    handleThumbMouseDown(e, type) {
        e.preventDefault();
        e.currentTarget.focus();
        if (!this.disabled && !this.readonly) {
            this.isDragging = true;
            this.dragTarget = type;
            // bind appropriate mousemove handler for vertical or horizontal
            this.boundHandleMouseMove = this.vertical ? this.handleVerticalMouseMove.bind(this) : this.handleMouseMove.bind(this);
            this.boundHandleMouseUp = this.handleMouseUp.bind(this);
            document.addEventListener('mousemove', this.boundHandleMouseMove);
            document.addEventListener('mouseup', this.boundHandleMouseUp);
        }
    }
    handleMouseMove(e) {
        if (this.isDragging && this.slider) {
            const sliderWidth = this.slider.offsetWidth;
            const sliderRect = this.slider.getBoundingClientRect();
            let position = (e.clientX - sliderRect.left) / sliderWidth;
            if (this.reverse)
                position = 1 - position;
            const newValue = position * (this.max - this.min) + this.min;
            const newValueRounded = Math.round(newValue / this.step) * this.step;
            if (this.snapToMarks && Object.keys(this.marks).length > 0)
                this.handleSnapToMarks(newValue);
            else {
                if (this.range) {
                    if (this.dragTarget === 'min') {
                        if (newValueRounded > this.currentMaxRangeValue) {
                            const tempValue = this.currentMaxRangeValue;
                            this.currentMaxRangeValue = newValueRounded;
                            this.currentMinRangeValue = tempValue;
                            this.dragTarget = 'max';
                            this.showMinValue = false;
                            this.showMaxValue = true;
                        }
                        else {
                            this.currentMinRangeValue = Math.max(this.min, newValueRounded);
                        }
                    }
                    else if (this.dragTarget === 'max') {
                        if (newValueRounded < this.displayMinRangeValue) {
                            const tempValue = this.displayMinRangeValue;
                            this.currentMinRangeValue = newValueRounded;
                            this.currentMaxRangeValue = tempValue;
                            this.dragTarget = 'min';
                            this.showMinValue = true;
                            this.showMaxValue = false;
                        }
                        else {
                            this.currentMaxRangeValue = Math.min(this.max, newValueRounded);
                        }
                    }
                }
                else {
                    this.currentValue = newValueRounded;
                }
            }
            // @State changes will trigger re-render
        }
    }
    handleMouseUp(e) {
        e.preventDefault();
        this.isDragging = false;
        this.dragTarget = null;
        this.showSingleValue = false;
        this.showMinValue = false;
        this.showMaxValue = false;
        if (!this.disabled && !this.readonly) {
            this.dispatchChangeEvent();
            document.removeEventListener('mousemove', this.boundHandleMouseMove);
            document.removeEventListener('mouseup', this.boundHandleMouseUp);
        }
    }
    handleSliderClick(e) {
        if (this.readonly || this.disabled)
            return;
        if (this.slider && this.step) {
            const sliderWidth = this.slider.offsetWidth;
            const sliderRect = this.slider.getBoundingClientRect();
            let position = (e.clientX - sliderRect.left) / sliderWidth;
            if (this.reverse)
                position = 1 - position;
            const newValue = position * (this.max - this.min) + this.min;
            const newValueRounded = Math.round(newValue / this.step) * this.step;
            if (this.snapToMarks) {
                if (this.range) {
                    const distanceToMin = Math.abs(newValue - this.displayMinRangeValue);
                    const distanceToMax = Math.abs(newValue - this.displayMaxRangeValue);
                    if (distanceToMin <= distanceToMax)
                        this.dragTarget = 'min';
                    else
                        this.dragTarget = 'max';
                    this.handleSnapToMarks(newValue);
                }
                else {
                    this.dragTarget = null;
                    this.handleSnapToMarks(newValue);
                }
            }
            else {
                if (this.range) {
                    const distanceToMin = Math.abs(newValueRounded - this.displayMinRangeValue);
                    const distanceToMax = Math.abs(newValueRounded - this.displayMaxRangeValue);
                    if (distanceToMin <= distanceToMax)
                        this.currentMinRangeValue = Math.max(this.min, Math.min(newValueRounded, this.displayMaxRangeValue - this.step));
                    else
                        this.currentMaxRangeValue = Math.min(this.max, Math.max(newValueRounded, this.displayMinRangeValue + this.step));
                }
                else {
                    this.currentValue = Math.min(this.max, Math.max(this.min, newValueRounded));
                }
            }
            this.dispatchChangeEvent();
        }
    }
    handleVerticalMouseMove(e) {
        if (this.isDragging && this.slider) {
            const sliderHeight = this.slider.offsetHeight;
            const sliderRect = this.slider.getBoundingClientRect();
            let position = (e.clientY - sliderRect.top) / sliderHeight;
            if (!this.reverse)
                position = 1 - position;
            const newValue = position * (this.max - this.min) + this.min;
            const newValueRounded = Math.round(newValue / this.step) * this.step;
            if (this.snapToMarks && Object.keys(this.marks).length > 0)
                this.handleSnapToMarks(newValue);
            else {
                if (this.range) {
                    if (this.dragTarget === 'min') {
                        if (newValueRounded > this.currentMaxRangeValue) {
                            const tempValue = this.currentMaxRangeValue;
                            this.currentMaxRangeValue = newValueRounded;
                            this.currentMinRangeValue = tempValue;
                            this.dragTarget = 'max';
                            this.showMinValue = false;
                            this.showMaxValue = true;
                        }
                        else {
                            this.currentMinRangeValue = Math.max(this.min, newValueRounded);
                        }
                    }
                    else if (this.dragTarget === 'max') {
                        if (newValueRounded < this.displayMinRangeValue) {
                            const tempValue = this.displayMinRangeValue;
                            this.currentMinRangeValue = newValueRounded;
                            this.currentMaxRangeValue = tempValue;
                            this.dragTarget = 'min';
                            this.showMinValue = true;
                            this.showMaxValue = false;
                        }
                        else {
                            this.currentMaxRangeValue = Math.min(this.max, newValueRounded);
                        }
                    }
                }
                else {
                    this.currentValue = Math.min(this.max, Math.max(this.min, newValueRounded));
                }
            }
            // @State changes will trigger re-render
        }
    }
    handleVerticalSliderClick(e) {
        if (this.readonly || this.disabled)
            return;
        if (this.slider && this.step) {
            const sliderHeight = this.slider.offsetHeight;
            const sliderRect = this.slider.getBoundingClientRect();
            let position = (e.clientY - sliderRect.top) / sliderHeight;
            if (!this.reverse)
                position = 1 - position;
            const newValue = position * (this.max - this.min) + this.min;
            const newValueRounded = Math.round(newValue / this.step) * this.step;
            if (this.snapToMarks) {
                if (this.range) {
                    const distanceToMin = Math.abs(newValue - this.displayMinRangeValue);
                    const distanceToMax = Math.abs(newValue - this.displayMaxRangeValue);
                    if (distanceToMin <= distanceToMax)
                        this.dragTarget = 'min';
                    else
                        this.dragTarget = 'max';
                    this.handleSnapToMarks(newValue);
                }
                else {
                    this.dragTarget = null;
                    this.handleSnapToMarks(newValue);
                }
            }
            else {
                if (this.range) {
                    const distanceToMin = Math.abs(newValueRounded - this.displayMinRangeValue);
                    const distanceToMax = Math.abs(newValueRounded - this.displayMaxRangeValue);
                    if (distanceToMin <= distanceToMax)
                        this.currentMinRangeValue = Math.max(this.min, Math.min(newValueRounded, this.displayMaxRangeValue - this.step));
                    else
                        this.currentMaxRangeValue = Math.min(this.max, Math.max(newValueRounded, this.displayMinRangeValue + this.step));
                }
                else {
                    this.currentValue = Math.min(this.max, Math.max(this.min, newValueRounded));
                }
            }
            // @State changes will trigger re-render
            this.dispatchChangeEvent();
        }
    }
    handleSnapToMarks(newValue) {
        const markValues = this.getMarkValues();
        let closestValue = markValues[0];
        let minDistance = Math.abs(newValue - closestValue);
        for (let i = 1; i < markValues.length; i++) {
            const distance = Math.abs(newValue - markValues[i]);
            if (distance < minDistance) {
                minDistance = distance;
                closestValue = markValues[i];
            }
        }
        if (this.range) {
            if (this.dragTarget === 'min') {
                const validMaxValues = markValues.filter(val => val < this.displayMaxRangeValue);
                if (validMaxValues.length > 0)
                    closestValue = validMaxValues.reduce((prev, curr) => Math.abs(curr - newValue) < Math.abs(prev - newValue) ? curr : prev);
                this.currentMinRangeValue = Math.max(this.min, closestValue);
            }
            else if (this.dragTarget === 'max') {
                const validMinValues = markValues.filter(val => val > this.displayMinRangeValue);
                if (validMinValues.length > 0)
                    closestValue = validMinValues.reduce((prev, curr) => Math.abs(curr - newValue) < Math.abs(prev - newValue) ? curr : prev);
                this.currentMaxRangeValue = Math.min(this.max, closestValue);
            }
        }
        else {
            this.currentValue = Math.min(this.max, Math.max(this.min, closestValue));
        }
    }
    getMarkValues() {
        const markValues = Object.keys(this.marks).map(key => parseFloat(key)).filter(value => value >= this.min);
        if (!markValues.includes(this.min))
            markValues.push(this.min);
        if (!markValues.includes(this.max))
            markValues.push(this.max);
        return markValues.sort((a, b) => a - b);
    }
    dispatchChangeEvent() {
        const detail = this.range ? { min: this.displayMinRangeValue, max: this.displayMaxRangeValue } : { value: this.displayValue };
        this.host.dispatchEvent(new CustomEvent('changed', { detail }));
    }
    render() {
        const normalMinRangeThumbPosition = ((this.displayMinRangeValue - this.min) / (this.max - this.min)) * 100;
        const normalMaxRangeThumbPosition = ((this.displayMaxRangeValue - this.min) / (this.max - this.min)) * 100;
        const minRangeThumbPosition = this.reverse ? 100 - normalMinRangeThumbPosition : normalMinRangeThumbPosition;
        const maxRangeThumbPosition = this.reverse ? 100 - normalMaxRangeThumbPosition : normalMaxRangeThumbPosition;
        if (this.vertical) {
            return (h("div", { class: "sy-slider-root" }, h("div", { class: "slider-label" }, this.label), h("div", { class: "slider-wrapper" }, h("div", { class: { 'slider': true, 'slider--disabled': this.disabled, 'slider--range': this.range, 'slider--has-label': this.label.length > 0, 'slider--vertical': true }, onClick: (e) => this.handleVerticalSliderClick(e) }, this.range ? (h("div", null, h("div", { class: "slider-track", style: { height: this.hideTrackFill ? '0' : this.reverse ? `${100 - minRangeThumbPosition}%` : `${minRangeThumbPosition}%`, backgroundColor: 'var(--slider-rail-background-enabled)', ...(this.reverse ? { top: '0' } : { bottom: '0' }) } }), h("div", { class: "slider-thumb", style: { bottom: `${minRangeThumbPosition}%` }, tabIndex: 0, onMouseEnter: (e) => this.handleThumbMouseEnter(e, 'min'), onMouseLeave: () => this.handleThumbMouseLeave(undefined), onMouseDown: (e) => this.handleThumbMouseDown(e, 'min'), onKeyDown: (e) => this.handleThumbKeyDown(e, 'min') }, h("div", { class: this.getTooltipClassMap('min') }, this.formatValue(this.displayMinRangeValue))), h("div", { class: "slider-track", style: { height: this.hideTrackFill ? '0' : `${Math.abs(maxRangeThumbPosition - minRangeThumbPosition)}%`, ...(this.reverse ? { bottom: `${maxRangeThumbPosition}%` } : { bottom: `${minRangeThumbPosition}%` }) } }), h("div", { class: "slider-thumb", style: { bottom: `${maxRangeThumbPosition}%` }, tabIndex: 0, onMouseEnter: (e) => this.handleThumbMouseEnter(e, 'max'), onMouseLeave: () => this.handleThumbMouseLeave(undefined), onMouseDown: (e) => this.handleThumbMouseDown(e, 'max'), onKeyDown: (e) => this.handleThumbKeyDown(e, 'max') }, h("div", { class: this.getTooltipClassMap('max') }, this.formatValue(this.displayMaxRangeValue))))) : (h("div", null, h("div", { class: "slider-track", style: { height: this.hideTrackFill ? '0' : this.reverse ? `${100 - this.thumbPosition}%` : `${this.thumbPosition}%`, ...(this.reverse ? { top: '0', bottom: 'auto' } : {}) } }), h("div", { class: "slider-thumb", style: { bottom: `${this.thumbPosition}%` }, tabIndex: 0, onMouseEnter: (e) => this.handleThumbMouseEnter(e, 'single'), onMouseLeave: () => this.handleThumbMouseLeave(undefined), onMouseDown: (e) => this.handleThumbMouseDown(e, 'single'), onKeyDown: (e) => this.handleThumbKeyDown(e, 'single') }, h("div", { class: this.getTooltipClassMap('single') }, this.formatValue(this.currentValue))))), !this.hideMarks && Object.keys(this.marks).length > 0 ? this.renderVerticalMarks() : null))));
        }
        return (h("div", null, h("div", { class: "slider-label" }, this.label), h("div", { class: "slider-wrapper" }, h("div", { class: { 'slider': true, 'slider--disabled': this.disabled, 'slider--range': this.range, 'slider--has-label': this.label.length > 0 }, onClick: (e) => this.handleSliderClick(e) }, this.range ? (h("div", null, h("div", { class: "slider-track", style: { width: this.hideTrackFill ? '0' : this.reverse ? `${100 - minRangeThumbPosition}%` : `${minRangeThumbPosition}%`, backgroundColor: 'var(--slider-rail-background-enabled)', ...(this.reverse ? { right: '0' } : {}) } }), h("div", { class: "slider-thumb", style: { left: `${minRangeThumbPosition}%` }, tabIndex: 0, onMouseEnter: (e) => this.handleThumbMouseEnter(e, 'min'), onMouseLeave: () => this.handleThumbMouseLeave(undefined), onMouseDown: (e) => this.handleThumbMouseDown(e, 'min'), onKeyDown: (e) => this.handleThumbKeyDown(e, 'min') }, h("div", { class: this.getTooltipClassMap('min') }, this.formatValue(this.displayMinRangeValue))), h("div", { class: "slider-track", style: { width: this.hideTrackFill ? '0' : `${Math.abs(maxRangeThumbPosition - minRangeThumbPosition)}%`, ...(this.reverse ? { right: '0' } : {}), ...(this.reverse ? { left: `${maxRangeThumbPosition}%` } : { left: `${minRangeThumbPosition}%` }) } }), h("div", { class: "slider-thumb", style: { left: `${maxRangeThumbPosition}%` }, tabIndex: 0, onMouseEnter: (e) => this.handleThumbMouseEnter(e, 'max'), onMouseLeave: () => this.handleThumbMouseLeave(undefined), onMouseDown: (e) => this.handleThumbMouseDown(e, 'max'), onKeyDown: (e) => this.handleThumbKeyDown(e, 'max') }, h("div", { class: this.getTooltipClassMap('max') }, this.formatValue(this.displayMaxRangeValue))))) : (h("div", null, h("div", { class: "slider-track", style: { width: this.hideTrackFill ? '0' : this.reverse ? `${100 - this.thumbPosition}%` : `${this.thumbPosition}%`, ...(this.reverse ? { right: '0', left: 'auto' } : {}) } }), h("div", { class: "slider-thumb", style: { left: `${this.thumbPosition}%` }, tabIndex: 0, onMouseEnter: (e) => this.handleThumbMouseEnter(e, 'single'), onMouseLeave: () => this.handleThumbMouseLeave(undefined), onMouseDown: (e) => this.handleThumbMouseDown(e, 'single'), onKeyDown: (e) => this.handleThumbKeyDown(e, 'single') }, h("div", { class: this.getTooltipClassMap('single') }, this.formatValue(this.displayValue))))), !this.hideMarks && Object.keys(this.marks).length > 0 ? this.renderMarks() : null))));
    }
    renderMarks() {
        const validMarkEntries = Object.entries(this.marks).filter(([key]) => parseFloat(key) >= this.min);
        const markValues = validMarkEntries.map(([key]) => parseFloat(key));
        const maxValueInMarks = markValues.includes(this.max);
        const minValueInMarks = markValues.includes(this.min);
        const nodes = [];
        if (!minValueInMarks) {
            nodes.push(h("div", { class: "mark", style: { left: this.reverse ? '100%' : '0%' } }, h("span", null, this.formatValue(this.min))));
            nodes.push(h("div", { class: `mark-circle ${this.range ? (this.displayMinRangeValue <= this.min ? 'mark-circle--active' : 'mark-circle--inactive') : (this.displayValue <= this.min ? 'mark-circle--active' : 'mark-circle--inactive')}`, style: { left: this.reverse ? '100%' : '0%' } }));
        }
        for (const [key, value] of validMarkEntries) {
            const position = this.reverse ? 100 - ((parseFloat(key) - this.min) / Math.max((this.max - this.min), 1)) * 100 : ((parseFloat(key) - this.min) / Math.max((this.max - this.min), 1)) * 100;
            const isActive = this.range ? (parseFloat(key) >= this.displayMinRangeValue && parseFloat(key) <= this.displayMaxRangeValue) : this.reverse ? (this.displayValue <= parseFloat(key)) : (this.displayValue >= parseFloat(key));
            nodes.push(h("div", { class: "mark", style: { left: `${position}%` } }, h("span", null, value)));
            nodes.push(h("div", { class: { 'mark-circle': true, [isActive ? 'mark-circle--active' : 'mark-circle--inactive']: true }, style: { left: `${position}%` } }));
        }
        if (!maxValueInMarks) {
            nodes.push(h("div", { class: "mark", style: { left: this.reverse ? '0%' : '100%' } }, h("span", null, this.formatValue(this.max))));
            nodes.push(h("div", { class: `mark-circle ${this.range ? (this.displayMaxRangeValue >= this.max ? 'mark-circle--active' : 'mark-circle--inactive') : this.reverse ? (this.displayValue <= this.max ? 'mark-circle--active' : 'mark-circle--inactive') : (this.displayValue >= this.max ? 'mark-circle--active' : 'mark-circle--inactive')}`, style: { left: this.reverse ? '0%' : '100%' } }));
        }
        return nodes;
    }
    renderVerticalMarks() {
        const validMarkEntries = Object.entries(this.marks).filter(([key]) => parseFloat(key) >= this.min);
        const markValues = validMarkEntries.map(([key]) => parseFloat(key));
        const maxValueInMarks = markValues.includes(this.max);
        const minValueInMarks = markValues.includes(this.min);
        const nodes = [];
        if (!minValueInMarks) {
            nodes.push(h("div", { class: "mark", style: { bottom: this.reverse ? '100%' : '0%' } }, h("span", null, this.formatValue(this.min))));
            nodes.push(h("div", { class: `mark-circle ${this.range ? (this.displayMinRangeValue <= this.min ? 'mark-circle--active' : 'mark-circle--inactive') : (this.displayValue <= this.min ? 'mark-circle--active' : 'mark-circle--inactive')}`, style: { bottom: this.reverse ? '100%' : '0%' } }));
        }
        for (const [key, value] of validMarkEntries) {
            const numeric = parseFloat(key);
            const position = this.reverse ? 100 - ((numeric - this.min) / Math.max((this.max - this.min), 1)) * 100 : ((numeric - this.min) / Math.max((this.max - this.min), 1)) * 100;
            const isActive = this.range ? (numeric >= this.displayMinRangeValue && numeric <= this.displayMaxRangeValue) : this.reverse ? (this.displayValue <= numeric) : (this.displayValue >= numeric);
            nodes.push(h("div", { class: "mark", style: { bottom: `${position}%` } }, h("span", null, value)));
            nodes.push(h("div", { class: { 'mark-circle': true, [isActive ? 'mark-circle--active' : 'mark-circle--inactive']: true }, style: { bottom: `${position}%` } }));
        }
        if (!maxValueInMarks) {
            nodes.push(h("div", { class: "mark", style: { bottom: this.reverse ? '0%' : '100%' } }, h("span", null, this.formatValue(this.max))));
            nodes.push(h("div", { class: `mark-circle ${this.range ? (this.displayMaxRangeValue >= this.max ? 'mark-circle--active' : 'mark-circle--inactive') : this.reverse ? (this.displayValue <= this.max ? 'mark-circle--active' : 'mark-circle--inactive') : (this.displayValue >= this.max ? 'mark-circle--active' : 'mark-circle--inactive')}`, style: { bottom: this.reverse ? '0%' : '100%' } }));
        }
        return nodes;
    }
    static get watchers() { return {
        "value": ["onValueChange"]
    }; }
    static get style() { return sySliderCss; }
}, [258, "sy-slider", {
        "min": [2],
        "max": [2],
        "step": [2],
        "value": [2],
        "disabled": [4],
        "readonly": [4],
        "showTooltip": [1025, "showtooltip"],
        "tooltipPlacement": [1025, "tooltipplacement"],
        "marks": [16],
        "hideMarks": [1028, "hidemarks"],
        "range": [4],
        "rangeValue": [1040],
        "reverse": [4],
        "label": [1],
        "hideTrackFill": [1028, "hidetrackfill"],
        "snapToMarks": [1028, "snaptomarks"],
        "vertical": [516],
        "showMinValue": [32],
        "showMaxValue": [32],
        "showSingleValue": [32],
        "currentMinRangeValue": [32],
        "currentMaxRangeValue": [32],
        "currentValue": [32]
    }, undefined, {
        "value": ["onValueChange"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-slider"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-slider":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SySlider$1);
            }
            break;
    } });
}

const SySlider = SySlider$1;
const defineCustomElement = defineCustomElement$1;

export { SySlider, defineCustomElement };
