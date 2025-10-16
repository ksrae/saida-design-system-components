import { Component, Prop, h, State, Element, Watch } from '@stencil/core';
import { fnAssignPropFromAlias } from '../../utils/utils';

@Component({
  tag: 'sy-slider',
  styleUrl: 'sy-slider.scss',
  scoped: true,
  shadow: false,
})
export class SySlider {
  @Element() host!: HTMLSySliderElement;

  @Prop() min: number = 0;
  @Prop() max: number = 100;
  @Prop() step: number = 1;
  @Prop() value: number = 0;
  @Prop() disabled: boolean = false;
  @Prop() readonly: boolean = false;
  @Prop({ attribute: 'showTooltip', mutable: true }) showTooltip: 'default' | 'always' | 'never' = 'default';
  @Prop({ attribute: 'tooltipPlacement', mutable: true }) tooltipPlacement: 'top' | 'bottom' | 'right' | 'left' = 'top';
  @Prop() marks: { [key: number]: string } = {};
  @Prop({ attribute: 'hideMarks', mutable: true }) hideMarks: boolean = false;
  @Prop() range: boolean = false;
  @Prop({ attribute: 'rangeValue', mutable: true }) rangeValue: number[] = [];
  @Prop() reverse: boolean = false;
  @Prop() label: string = '';
  @Prop({ attribute: 'hideTrackFill', mutable: true }) hideTrackFill: boolean = false;
  @Prop({ attribute: 'snapToMarks', mutable: true }) snapToMarks: boolean = false;
  @Prop({ reflect: true }) vertical: boolean = false;

  // refs
  private slider!: HTMLDivElement;

  @State() private showMinValue = false;
  @State() private showMaxValue = false;
  @State() private showSingleValue = false;

  @State() private currentMinRangeValue!: number;
  @State() private currentMaxRangeValue!: number;
  @State() private currentValue: number = 0;
  private dragTarget: 'min' | 'max' | 'single' | null = null;
  private isDragging : boolean = false;
  private valueScale: number = 0;

  private boundHandleMouseMove!: (e: MouseEvent) => void;
  private boundHandleMouseUp!: (e: MouseEvent) => void;

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
    } else {
      this.currentMinRangeValue = this.min;
      this.currentMaxRangeValue = this.max;
    }
  }

  componentDidLoad() {
    // element ref
    this.slider = this.host.querySelector('.slider') as HTMLDivElement;
  }

  componentWillUpdate() {
    if (this.min > this.max) {
      this.min = this.max;
    }
  }

  @Watch('value')
  onValueChange(newValue: number) {
    this.currentValue = newValue;
  }

  private get displayValue(): number {
    return this.currentValue > this.max ? this.max : this.currentValue < this.min ? this.min : this.currentValue;
  }

  private get displayMinRangeValue(): number {
    return this.currentMinRangeValue > this.max ? this.max : this.currentMinRangeValue < this.min ? this.min : this.currentMinRangeValue;
  }

  private get displayMaxRangeValue(): number {
    return this.currentMaxRangeValue > this.max ? this.max : this.currentMaxRangeValue < this.min ? this.min : this.currentMaxRangeValue;
  }

  private get thumbPosition(): number {
    const normalThumbPosition = this.max === this.min ? 100 : ((this.displayValue - this.min) / (this.max - this.min)) * 100;
    return this.reverse ? 100 - normalThumbPosition : normalThumbPosition;
  }

  private calValueScale() {
    const match = this.step.toString().match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    if (!match) this.valueScale = 0;
    else if (match[2]) this.valueScale = Math.max(0, (match[1] ? match[1].length : 0) - parseInt(match[2], 10));
    else this.valueScale = match[1] ? match[1].length : 0;
  }

  private formatValue(value: number): string {
    if (value === undefined || value === null) return '0';
    if (value === 0) return '0';
    return 6 < this.valueScale ? value.toExponential(0) : value.toFixed(this.valueScale);
  }

  private getTooltipClassMap(type: 'min' | 'max' | 'single'): string {
    let isVisible = false;
    if (type === 'min') {
      isVisible = (this.showMinValue && this.showTooltip !== 'never') || this.showTooltip === 'always';
    } else if (type === 'max') {
      isVisible = (this.showMaxValue && this.showTooltip !== 'never') || this.showTooltip === 'always';
    } else {
      isVisible = (this.showSingleValue && this.showTooltip !== 'never') || this.showTooltip === 'always';
    }
    const placementClass = ({ left: 'left', bottom: 'bottom', right: 'right', top: 'top' } as any)[this.tooltipPlacement] || 'top';
    return `current-value  ${placementClass} ${isVisible ? 'visible' : ''}`;
  }

  private handleThumbMouseEnter(_e:MouseEvent, type: 'min' | 'max' | 'single') {
    if(this.showTooltip === 'default' && !this.disabled) {
      if(type === 'min') this.showMinValue = true;
      else if(type === 'max') this.showMaxValue = true;
      else this.showSingleValue = true;
    }
  }
  
  private handleThumbKeyDown(e: KeyboardEvent, type: 'min' | 'max' | 'single') {
    if(this.readonly || this.disabled) return;
    const key = e.key;
    let delta = 0;
    if (key === 'ArrowLeft' || key === 'ArrowDown') delta = -this.step;
    else if (key === 'ArrowRight' || key === 'ArrowUp') delta = this.step;
    else if (key === 'PageDown') delta = -this.step * 10;
    else if (key === 'PageUp') delta = this.step * 10;
    else if (key === 'Home') { 
      if (type === 'min') this.currentMinRangeValue = this.min; 
      else if (type === 'max') this.currentMaxRangeValue = this.min; 
      else this.currentValue = this.min; 
      this.dispatchChangeEvent(); 
      return; 
    }
    else if (key === 'End') { 
      if (type === 'min') this.currentMinRangeValue = this.max; 
      else if (type === 'max') this.currentMaxRangeValue = this.max; 
      else this.currentValue = this.max; 
      this.dispatchChangeEvent(); 
      return; 
    }

    if (delta !== 0) {
      if (this.range) {
        if (type === 'min') 
          this.currentMinRangeValue = Math.max(this.min, Math.min(this.currentMinRangeValue + delta, this.currentMaxRangeValue - this.step));
        else if (type === 'max') 
          this.currentMaxRangeValue = Math.min(this.max, Math.max(this.currentMaxRangeValue + delta, this.currentMinRangeValue + this.step));
      } else {
        this.currentValue = Math.min(this.max, Math.max(this.min, this.currentValue + delta));
      }
      this.dispatchChangeEvent();
    }
  }

  private handleThumbMouseLeave(_e?:MouseEvent) {
    if(!this.isDragging && this.showTooltip === 'default'){
      this.showMaxValue = false; this.showMinValue = false; this.showSingleValue = false;
    }
  }

  private handleThumbMouseDown(e: MouseEvent, type: 'min' | 'max' | 'single') {
    e.preventDefault();
    (e.currentTarget as HTMLElement).focus();
    if (!this.disabled && !this.readonly) {
      this.isDragging = true; this.dragTarget = type;
      // bind appropriate mousemove handler for vertical or horizontal
      this.boundHandleMouseMove = this.vertical ? this.handleVerticalMouseMove.bind(this) : this.handleMouseMove.bind(this);
      this.boundHandleMouseUp = this.handleMouseUp.bind(this);
      document.addEventListener('mousemove', this.boundHandleMouseMove);
      document.addEventListener('mouseup', this.boundHandleMouseUp);
    }
  }

  private handleMouseMove(e: MouseEvent) {
    if (this.isDragging && this.slider) {
      const sliderWidth = this.slider!.offsetWidth;
      const sliderRect = this.slider!.getBoundingClientRect();
      let position = (e.clientX - sliderRect.left) / sliderWidth;
      if (this.reverse) position = 1 - position;
      const newValue = position * (this.max - this.min) + this.min;
      const newValueRounded = Math.round(newValue / this.step) * this.step;
      if (this.snapToMarks && Object.keys(this.marks).length > 0) this.handleSnapToMarks(newValue);
      else {
        if (this.range) {
          if (this.dragTarget === 'min') {
            if (newValueRounded > this.currentMaxRangeValue) {
              const tempValue = this.currentMaxRangeValue; this.currentMaxRangeValue = newValueRounded; this.currentMinRangeValue = tempValue; this.dragTarget = 'max'; this.showMinValue = false; this.showMaxValue = true;
            } else { this.currentMinRangeValue = Math.max(this.min, newValueRounded); }
          } else if (this.dragTarget === 'max') {
            if (newValueRounded < this.displayMinRangeValue) { const tempValue = this.displayMinRangeValue; this.currentMinRangeValue = newValueRounded; this.currentMaxRangeValue = tempValue; this.dragTarget = 'min'; this.showMinValue = true; this.showMaxValue = false; } else { this.currentMaxRangeValue = Math.min(this.max, newValueRounded); }
          }
        } else { this.currentValue = newValueRounded; }
      }
      // @State changes will trigger re-render
    }
  }

  private handleMouseUp(e: any) {
    e.preventDefault(); this.isDragging = false; this.dragTarget = null; this.showSingleValue = false; this.showMinValue = false; this.showMaxValue = false;
    if (!this.disabled && !this.readonly) { this.dispatchChangeEvent(); document.removeEventListener('mousemove', this.boundHandleMouseMove); document.removeEventListener('mouseup', this.boundHandleMouseUp); }
  }

  private handleSliderClick(e: MouseEvent) {
    if(this.readonly || this.disabled) return;
    if (this.slider && this.step) {
      const sliderWidth = this.slider.offsetWidth; const sliderRect = this.slider.getBoundingClientRect(); let position = (e.clientX - sliderRect.left) / sliderWidth;
      if (this.reverse) position = 1 - position;
      const newValue = position * (this.max - this.min) + this.min; const newValueRounded = Math.round(newValue / this.step) * this.step;
      if(this.snapToMarks){
        if(this.range){ const distanceToMin = Math.abs(newValue - this.displayMinRangeValue); const distanceToMax = Math.abs(newValue - this.displayMaxRangeValue); if (distanceToMin <= distanceToMax) this.dragTarget = 'min'; else this.dragTarget = 'max'; this.handleSnapToMarks(newValue); }
        else { this.dragTarget = null; this.handleSnapToMarks(newValue); }
      } else {
        if (this.range) { const distanceToMin = Math.abs(newValueRounded - this.displayMinRangeValue); const distanceToMax = Math.abs(newValueRounded - this.displayMaxRangeValue); if (distanceToMin <= distanceToMax) this.currentMinRangeValue = Math.max(this.min, Math.min(newValueRounded, this.displayMaxRangeValue - this.step)); else this.currentMaxRangeValue = Math.min(this.max, Math.max(newValueRounded, this.displayMinRangeValue + this.step)); }
        else { this.currentValue = Math.min(this.max, Math.max(this.min, newValueRounded)); }
      }
      this.dispatchChangeEvent();
    }
  }

  private handleVerticalMouseMove(e: MouseEvent) {
    if (this.isDragging && this.slider) {
      const sliderHeight = this.slider.offsetHeight; const sliderRect = this.slider.getBoundingClientRect(); let position = (e.clientY - sliderRect.top) / sliderHeight; if (!this.reverse) position = 1 - position; const newValue = position * (this.max - this.min) + this.min; const newValueRounded = Math.round(newValue / this.step) * this.step;
      if (this.snapToMarks && Object.keys(this.marks).length > 0) this.handleSnapToMarks(newValue);
      else {
        if (this.range) {
          if (this.dragTarget === 'min') { if (newValueRounded > this.currentMaxRangeValue) { const tempValue = this.currentMaxRangeValue; this.currentMaxRangeValue = newValueRounded; this.currentMinRangeValue = tempValue; this.dragTarget = 'max'; this.showMinValue = false; this.showMaxValue = true; } else { this.currentMinRangeValue = Math.max(this.min, newValueRounded); } }
          else if (this.dragTarget === 'max') { if (newValueRounded < this.displayMinRangeValue) { const tempValue = this.displayMinRangeValue; this.currentMinRangeValue = newValueRounded; this.currentMaxRangeValue = tempValue; this.dragTarget = 'min'; this.showMinValue = true; this.showMaxValue = false; } else { this.currentMaxRangeValue = Math.min(this.max, newValueRounded); } }
        } else { this.currentValue = Math.min(this.max, Math.max(this.min, newValueRounded)); }
      }
      // @State changes will trigger re-render
    }
  }

  private handleVerticalSliderClick(e: MouseEvent) {
    if(this.readonly || this.disabled) return;
    if (this.slider && this.step) {
      const sliderHeight = this.slider.offsetHeight;
      const sliderRect = this.slider.getBoundingClientRect();
      let position = (e.clientY - sliderRect.top) / sliderHeight;
      if (!this.reverse) position = 1 - position;
      const newValue = position * (this.max - this.min) + this.min;
      const newValueRounded = Math.round(newValue / this.step) * this.step;
      if(this.snapToMarks){
        if(this.range){ const distanceToMin = Math.abs(newValue - this.displayMinRangeValue); const distanceToMax = Math.abs(newValue - this.displayMaxRangeValue); if (distanceToMin <= distanceToMax) this.dragTarget = 'min'; else this.dragTarget = 'max'; this.handleSnapToMarks(newValue); }
        else { this.dragTarget = null; this.handleSnapToMarks(newValue); }
      } else {
        if (this.range) { const distanceToMin = Math.abs(newValueRounded - this.displayMinRangeValue); const distanceToMax = Math.abs(newValueRounded - this.displayMaxRangeValue); if (distanceToMin <= distanceToMax) this.currentMinRangeValue = Math.max(this.min, Math.min(newValueRounded, this.displayMaxRangeValue - this.step)); else this.currentMaxRangeValue = Math.min(this.max, Math.max(newValueRounded, this.displayMinRangeValue + this.step)); }
        else { this.currentValue = Math.min(this.max, Math.max(this.min, newValueRounded)); }
      }
      // @State changes will trigger re-render
      this.dispatchChangeEvent();
    }
  }

  private handleSnapToMarks(newValue: number) {
    const markValues = this.getMarkValues();
    let closestValue = markValues[0]; let minDistance = Math.abs(newValue - closestValue);
    for (let i = 1; i < markValues.length; i++) { const distance = Math.abs(newValue - markValues[i]); if (distance < minDistance) { minDistance = distance; closestValue = markValues[i]; } }
    if (this.range) {
      if (this.dragTarget === 'min') {
        const validMaxValues = markValues.filter(val => val < this.displayMaxRangeValue);
        if (validMaxValues.length > 0) closestValue = validMaxValues.reduce((prev, curr) => Math.abs(curr - newValue) < Math.abs(prev - newValue) ? curr : prev);
        this.currentMinRangeValue = Math.max(this.min, closestValue);
      } else if (this.dragTarget === 'max') {
        const validMinValues = markValues.filter(val => val > this.displayMinRangeValue);
        if (validMinValues.length > 0) closestValue = validMinValues.reduce((prev, curr) => Math.abs(curr - newValue) < Math.abs(prev - newValue) ? curr : prev);
        this.currentMaxRangeValue = Math.min(this.max, closestValue);
      }
    } else {
      this.currentValue = Math.min(this.max, Math.max(this.min, closestValue));
    }
  }

  private getMarkValues(): number[] {
    const markValues = Object.keys(this.marks).map(key => parseFloat(key)).filter(value => value >= this.min);
    if (!markValues.includes(this.min)) markValues.push(this.min);
    if (!markValues.includes(this.max)) markValues.push(this.max);
    return markValues.sort((a,b) => a-b);
  }

  private dispatchChangeEvent() {
    const detail = this.range ? { min: this.displayMinRangeValue, max: this.displayMaxRangeValue } : { value: this.displayValue };
    this.host.dispatchEvent(new CustomEvent('changed', { detail }));
  }

  render() {
    const normalMinRangeThumbPosition = ((this.displayMinRangeValue - this.min) / (this.max - this.min)) * 100;
    const normalMaxRangeThumbPosition = ((this.displayMaxRangeValue - this.min) / (this.max - this.min)) * 100;
    const minRangeThumbPosition = this.reverse ? 100 - normalMinRangeThumbPosition : normalMinRangeThumbPosition;
    const maxRangeThumbPosition = this.reverse ? 100 - normalMaxRangeThumbPosition : normalMaxRangeThumbPosition;

    if (this.vertical) {
      return (
        <div class="sy-slider-root">
          <div class="slider-label">{this.label}</div>
          <div class="slider-wrapper">
            <div class={{'slider': true, 'slider--disabled': this.disabled, 'slider--range': this.range, 'slider--has-label': this.label.length > 0, 'slider--vertical': true}} onClick={(e) => this.handleVerticalSliderClick(e as MouseEvent)}>
              {this.range ? (
                <div>
                  <div class="slider-track" style={{ height: this.hideTrackFill ? '0' : this.reverse ? `${100 - minRangeThumbPosition}%` : `${minRangeThumbPosition}%`, backgroundColor:'var(--slider-rail-background-enabled)', ...(this.reverse ? { top: '0' } : { bottom: '0' }) }}></div>
                  <div class="slider-thumb" style={{ bottom: `${minRangeThumbPosition}%` }} tabIndex={0} onMouseEnter={(e) => this.handleThumbMouseEnter(e as MouseEvent, 'min')} onMouseLeave={() => this.handleThumbMouseLeave(undefined as any)} onMouseDown={(e) => this.handleThumbMouseDown(e as MouseEvent, 'min')} onKeyDown={(e) => this.handleThumbKeyDown(e as KeyboardEvent, 'min' as any)}>
                    <div class={this.getTooltipClassMap('min')}>
                      {this.formatValue(this.displayMinRangeValue)}
                    </div>
                  </div>

                  <div class="slider-track" style={{ height: this.hideTrackFill ? '0' : `${Math.abs(maxRangeThumbPosition - minRangeThumbPosition)}%`, ...(this.reverse ? { bottom: `${maxRangeThumbPosition}%` } : { bottom: `${minRangeThumbPosition}%` }) }}></div>
                  <div class="slider-thumb" style={{ bottom: `${maxRangeThumbPosition}%` }} tabIndex={0} onMouseEnter={(e) => this.handleThumbMouseEnter(e as MouseEvent, 'max')} onMouseLeave={() => this.handleThumbMouseLeave(undefined as any)} onMouseDown={(e) => this.handleThumbMouseDown(e as MouseEvent, 'max')} onKeyDown={(e) => this.handleThumbKeyDown(e as KeyboardEvent, 'max' as any)}>
                    <div class={this.getTooltipClassMap('max')}>
                      {this.formatValue(this.displayMaxRangeValue)}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div class="slider-track" style={{ height: this.hideTrackFill ? '0' : this.reverse ? `${100 - this.thumbPosition}%` : `${this.thumbPosition}%`, ...(this.reverse ? { top: '0', bottom: 'auto' } : {}) }}></div>
                  <div class="slider-thumb" style={{ bottom: `${this.thumbPosition}%` }} tabIndex={0} onMouseEnter={(e) => this.handleThumbMouseEnter(e as MouseEvent, 'single')} onMouseLeave={() => this.handleThumbMouseLeave(undefined as any)} onMouseDown={(e) => this.handleThumbMouseDown(e as MouseEvent, 'single')} onKeyDown={(e) => this.handleThumbKeyDown(e as KeyboardEvent, 'single' as any)}>
                    <div class={this.getTooltipClassMap('single')}>
                      {this.formatValue(this.currentValue)}
                    </div>
                  </div>
                </div>
              )}
              {!this.hideMarks && Object.keys(this.marks).length > 0 ? this.renderVerticalMarks() : null}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div class="slider-label">{this.label}</div>
        <div class="slider-wrapper">
          <div class={{'slider': true, 'slider--disabled': this.disabled, 'slider--range': this.range, 'slider--has-label': this.label.length > 0}} onClick={(e) => this.handleSliderClick(e as MouseEvent)}>
            {this.range ? (
              <div>
                <div class="slider-track" style={{ width: this.hideTrackFill ? '0' : this.reverse ? `${100 - minRangeThumbPosition}%` : `${minRangeThumbPosition}%`, backgroundColor: 'var(--slider-rail-background-enabled)', ...(this.reverse ? { right: '0' } : {}) }}></div>
                <div class="slider-thumb" style={{ left: `${minRangeThumbPosition}%` }} tabIndex={0} onMouseEnter={(e) => this.handleThumbMouseEnter(e as MouseEvent, 'min')} onMouseLeave={() => this.handleThumbMouseLeave(undefined as any)} onMouseDown={(e) => this.handleThumbMouseDown(e as MouseEvent, 'min')} onKeyDown={(e) => this.handleThumbKeyDown(e as KeyboardEvent, 'min' as any)}>
                  <div class={this.getTooltipClassMap('min')}>
                    {this.formatValue(this.displayMinRangeValue)}
                  </div>
                </div>

                <div class="slider-track" style={{ width: this.hideTrackFill ? '0' : `${Math.abs(maxRangeThumbPosition - minRangeThumbPosition)}%`, ...(this.reverse ? { right: '0' } : {}), ...(this.reverse ? { left: `${maxRangeThumbPosition}%` } : { left: `${minRangeThumbPosition}%` }) }}></div>
                <div class="slider-thumb" style={{ left: `${maxRangeThumbPosition}%` }} tabIndex={0} onMouseEnter={(e) => this.handleThumbMouseEnter(e as MouseEvent, 'max')} onMouseLeave={() => this.handleThumbMouseLeave(undefined as any)} onMouseDown={(e) => this.handleThumbMouseDown(e as MouseEvent, 'max')} onKeyDown={(e) => this.handleThumbKeyDown(e as KeyboardEvent, 'max' as any)}>
                  <div class={this.getTooltipClassMap('max')}>
                    {this.formatValue(this.displayMaxRangeValue)}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div class="slider-track" style={{ width: this.hideTrackFill ? '0' : this.reverse ? `${100 - this.thumbPosition}%` : `${this.thumbPosition}%`, ...(this.reverse ? { right: '0', left: 'auto' } : {}) }}></div>
                <div class="slider-thumb" style={{ left: `${this.thumbPosition}%` }} tabIndex={0} onMouseEnter={(e) => this.handleThumbMouseEnter(e as MouseEvent, 'single')} onMouseLeave={() => this.handleThumbMouseLeave(undefined as any)} onMouseDown={(e) => this.handleThumbMouseDown(e as MouseEvent, 'single')} onKeyDown={(e) => this.handleThumbKeyDown(e as KeyboardEvent, 'single' as any)}>
                  <div class={this.getTooltipClassMap('single')}>
                    {this.formatValue(this.displayValue)}
                  </div>
                </div>
              </div>
            )}
            {!this.hideMarks && Object.keys(this.marks).length > 0 ? this.renderMarks() : null}
          </div>
        </div>
      </div>
    );
  }

  private renderMarks() {
    const validMarkEntries = Object.entries(this.marks).filter(([key]) => parseFloat(key) >= this.min);
    const markValues = validMarkEntries.map(([key]) => parseFloat(key));
    const maxValueInMarks = markValues.includes(this.max);
    const minValueInMarks = markValues.includes(this.min);
    const nodes: any[] = [];
    if (!minValueInMarks) {
      nodes.push(<div class="mark" style={{ left: this.reverse ? '100%' : '0%' }}><span>{this.formatValue(this.min)}</span></div>);
      nodes.push(<div class={`mark-circle ${this.range ? (this.displayMinRangeValue <= this.min ? 'mark-circle--active' : 'mark-circle--inactive') : (this.displayValue <= this.min ? 'mark-circle--active' : 'mark-circle--inactive')}`} style={{ left: this.reverse ? '100%' : '0%' }}></div>);
    }
    for (const [key, value] of validMarkEntries) {
      const position = this.reverse ? 100 - ((parseFloat(key) - this.min) / Math.max((this.max - this.min), 1)) * 100 : ((parseFloat(key) - this.min) / Math.max((this.max - this.min), 1)) * 100;
      const isActive = this.range ? (parseFloat(key) >= this.displayMinRangeValue && parseFloat(key) <= this.displayMaxRangeValue) : this.reverse ? (this.displayValue <= parseFloat(key)) : (this.displayValue >= parseFloat(key));
      nodes.push(<div class="mark" style={{ left: `${position}%` }}><span>{value}</span></div>);
      nodes.push(<div class={{ 'mark-circle': true, [isActive ? 'mark-circle--active' : 'mark-circle--inactive']: true }} style={{ left: `${position}%` }}></div>);
    }
    if (!maxValueInMarks) {
      nodes.push(<div class="mark" style={{ left: this.reverse ? '0%' : '100%' }}><span>{this.formatValue(this.max)}</span></div>);
      nodes.push(<div class={`mark-circle ${this.range ? (this.displayMaxRangeValue >= this.max ? 'mark-circle--active' : 'mark-circle--inactive') : this.reverse ? (this.displayValue <= this.max ? 'mark-circle--active' : 'mark-circle--inactive') : (this.displayValue >= this.max ? 'mark-circle--active' : 'mark-circle--inactive')}`} style={{ left: this.reverse ? '0%' : '100%' }}></div>);
    }
    return nodes;
  }

  private renderVerticalMarks() {
    const validMarkEntries = Object.entries(this.marks).filter(([key]) => parseFloat(key) >= this.min);
    const markValues = validMarkEntries.map(([key]) => parseFloat(key));
    const maxValueInMarks = markValues.includes(this.max);
    const minValueInMarks = markValues.includes(this.min);
    const nodes: any[] = [];
    if (!minValueInMarks) {
      nodes.push(<div class="mark" style={{ bottom: this.reverse ? '100%' : '0%' }}><span>{this.formatValue(this.min)}</span></div>);
      nodes.push(<div class={`mark-circle ${this.range ? (this.displayMinRangeValue <= this.min ? 'mark-circle--active' : 'mark-circle--inactive') : (this.displayValue <= this.min ? 'mark-circle--active' : 'mark-circle--inactive')}`} style={{ bottom: this.reverse ? '100%' : '0%' }}></div>);
    }
    for (const [key, value] of validMarkEntries) {
      const numeric = parseFloat(key);
      const position = this.reverse ? 100 - ((numeric - this.min) / Math.max((this.max - this.min), 1)) * 100 : ((numeric - this.min) / Math.max((this.max - this.min), 1)) * 100;
      const isActive = this.range ? (numeric >= this.displayMinRangeValue && numeric <= this.displayMaxRangeValue) : this.reverse ? (this.displayValue <= numeric) : (this.displayValue >= numeric);
      nodes.push(<div class="mark" style={{ bottom: `${position}%` }}><span>{value}</span></div>);
      nodes.push(<div class={{ 'mark-circle': true, [isActive ? 'mark-circle--active' : 'mark-circle--inactive']: true }} style={{ bottom: `${position}%` }}></div>);
    }
    if (!maxValueInMarks) {
      nodes.push(<div class="mark" style={{ bottom: this.reverse ? '0%' : '100%' }}><span>{this.formatValue(this.max)}</span></div>);
      nodes.push(<div class={`mark-circle ${this.range ? (this.displayMaxRangeValue >= this.max ? 'mark-circle--active' : 'mark-circle--inactive') : this.reverse ? (this.displayValue <= this.max ? 'mark-circle--active' : 'mark-circle--inactive') : (this.displayValue >= this.max ? 'mark-circle--active' : 'mark-circle--inactive')}`} style={{ bottom: this.reverse ? '0%' : '100%' }}></div>);
    }
    return nodes;
  }

}
