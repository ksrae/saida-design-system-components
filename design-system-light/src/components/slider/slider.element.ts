import { LitElement, html, css, unsafeCSS, CSSResultGroup, nothing, PropertyValues } from 'lit';
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from 'lit/directives/class-map.js';
import globalCSS from './styles/slider.scss?inline';
// import verticalCSS from '../slider-vertical/styles/slider-vertical.scss?inline';

@customElement('sy-slider')
export class SliderElement extends LitElement {

  static styles: CSSResultGroup = css`${
    unsafeCSS(globalCSS)
  };`;
  
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number }) step = 1;
  @property({ type: Number }) value = 0;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) readonly = false;
  @property({ type: String }) showTooltip: 'default' | 'always' | 'never' = 'default';
  @property({ type: String }) tooltipPlacement: 'top' | 'bottom' | 'right' | 'left' = 'top';
  @property({ type: Object }) marks: { [key: number]: string } = {};
  @property({ type: Boolean }) hideMarks = false;
  @property({ type: Boolean }) range = false;
  @property({ type: Array }) rangeValue: number[] = [];
  @property({ type: Boolean }) reverse = false;
  @property({ type: String }) label = '';   
  @property({ type: Boolean }) hideTrackFill = false;
  @property({ type: Boolean }) snapToMarks = false;
  @property({ type: Boolean, reflect: true }) vertical = false; 

  @query('.slider') slider!: HTMLDivElement;

  @state() private thumbPosition!: number;
  @state() private showMinValue = false;
  @state() private showMaxValue = false;
  @state() private showSingleValue = false;

  private currentMinRangeValue!: number;
  private currentMaxRangeValue!: number;

  private currentValue: number = this.value;
  private dragTarget: 'min' | 'max' | 'single' | null = null;
  private isDragging : boolean = false;
  private valueScale: number = 0;

  async firstUpdated() {
    await this.updateComplete;   
    this.calValueScale();

    if(this.rangeValue.length >= 2) {
      this.currentMinRangeValue = this.rangeValue[0];
      this.currentMaxRangeValue = this.rangeValue[1];
    }
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if(changedProperties.has('min') || changedProperties.has('max')) {
      if(this.min > this.max) {
        this.min = this.max;
      }
    }
    if(changedProperties.has('value')){
      this.currentValue = this.value;
      this.requestUpdate();
    } 
    if (changedProperties.has('rangeValue')) {
      this.currentMinRangeValue = this.rangeValue[0];
      this.currentMaxRangeValue = this.rangeValue[1];
      this.requestUpdate();
    } 
    if(changedProperties.has('step')){
      this.calValueScale();
    } 
  }
   
  render() {
    const normalThumbPosition = this.max === this.min ? 100 : ((this.displayValue - this.min) / (this.max - this.min)) * 100;
    this.thumbPosition = this.reverse ? 100 - normalThumbPosition : normalThumbPosition;
    
    const normalMinRangeThumbPosition = ((this.displayMinRangeValue - this.min) / (this.max - this.min)) * 100;
    const normalMaxRangeThumbPosition = ((this.displayMaxRangeValue - this.min) / (this.max - this.min)) * 100;
    const minRangeThumbPosition = this.reverse ? 100 - normalMinRangeThumbPosition : normalMinRangeThumbPosition;
    const maxRangeThumbPosition = this.reverse ? 100 - normalMaxRangeThumbPosition : normalMaxRangeThumbPosition;

    // vertical slider  
    if(this.vertical){

      return html`
        <div class="slider-label">${this.label}</div>
        <div class="slider-wrapper">
         <div class=${classMap({
            "slider": true,
            "slider--disabled": this.disabled,
            "slider--range": this.range,
            'slider--has-label': this.label.length > 0,
            "slider--vertical": true
            })
          }
            @click=${this.handleVerticalSliderClick}
          >
            ${this.range
              ? html`                  
                <div class="slider-track" style="
                  height: ${this.hideTrackFill ? '0' : this.reverse ? 100 - minRangeThumbPosition : minRangeThumbPosition}%; 
                  background-color:var(--slider-rail-background-enabled);
                  ${this.reverse ? 'top: 0;' : 'bottom: 0;'}
                "></div>
              </div>
                <div class="slider-thumb" style="bottom: ${minRangeThumbPosition}%" tabindex="0"                       
                    @mouseenter=${(e: MouseEvent) => this.handleThumbMouseEnter(e, 'min')}
                    @mouseleave=${this.handleThumbMouseLeave}
                    @mousedown=${(e: MouseEvent) => this.handleThumbMouseDown(e, 'min')}
                    @keydown=${(e: KeyboardEvent) => this.handleThumbKeyDown(e, 'min')}>
                  <div class=${this.getTooltipClassMap('min')}>
                    ${this.formatValue(this.displayMinRangeValue)}
                  </div>
                </div>
                  
                
                <div class="slider-track" 
                    style="height: ${this.hideTrackFill ? '0' : Math.abs(maxRangeThumbPosition - minRangeThumbPosition)}%; 
                    ${this.reverse ? 
                      `bottom: ${maxRangeThumbPosition}%;` : 
                      `bottom: ${minRangeThumbPosition}%;`};">
                </div>
                <div class="slider-thumb" style="bottom: ${maxRangeThumbPosition}%" tabindex="0"
                    @mouseenter=${(e: MouseEvent) => this.handleThumbMouseEnter(e, 'max')}
                    @mouseleave=${this.handleThumbMouseLeave}
                    @mousedown=${(e: MouseEvent) => this.handleThumbMouseDown(e, 'max')}
                    @keydown=${(e: KeyboardEvent) => this.handleThumbKeyDown(e, 'max')}>
                  <div class=${this.getTooltipClassMap('max')}>
                    ${this.formatValue(this.displayMaxRangeValue)}
                  </div>
                </div>
              `
              :
              html`
                <div class="slider-track" 
                style="height: ${this.hideTrackFill ? '0' : this.reverse ? 100-this.thumbPosition : this.thumbPosition}%;
                  ${this.reverse ? 'top: 0; bottom: auto;' : ''}
                "></div>
                <div class="slider-thumb" style="bottom: ${this.thumbPosition}%" tabindex="0"
                    @mouseenter=${(e: MouseEvent) => this.handleThumbMouseEnter(e, 'single')}
                    @mouseleave=${this.handleThumbMouseLeave}
                    @mousedown=${(e: MouseEvent) => this.handleThumbMouseDown(e, 'single')}
                    @keydown=${(e: KeyboardEvent) => this.handleThumbKeyDown(e, 'single')}>
                  <div class=${this.getTooltipClassMap('single')}>
                    ${this.formatValue(this.currentValue)}
                  </div>
                </div>
              `}
          ${!this.hideMarks && Object.keys(this.marks).length > 0
            ? html`${this.renderVerticalMarks()}` : nothing
           }
            
          </div>
        </div>`;
    } 

    // horizontal slider
    else {
      return html`
       <div class="slider-label">${this.label}</div>
       <div class="slider-wrapper">
        <div
          class=${classMap({
            "slider": true,
            "slider--disabled": this.disabled,
            "slider--range": this.range,
            'slider--has-label': this.label.length > 0,
          })}
           @click=${this.handleSliderClick}
        >
          ${this.range
            ? html`
              <div class="slider-track" 
                style="width: ${this.hideTrackFill ? '0' : this.reverse ? 100 - minRangeThumbPosition : minRangeThumbPosition }%;
                  background-color:var(--slider-rail-background-enabled); 
                  ${this.reverse ?  'right: 0;' : ''}">
               </div>
              <div class="slider-thumb" style="left: ${minRangeThumbPosition}%" tabindex="0"                       
                  @mouseenter=${(e: MouseEvent) => this.handleThumbMouseEnter(e, 'min')}
                  @mouseleave=${this.handleThumbMouseLeave}
                  @mousedown=${(e: MouseEvent) => this.handleThumbMouseDown(e, 'min')}
                  @keydown=${(e: KeyboardEvent) => this.handleThumbKeyDown(e, 'min')}>
                <div class=${this.getTooltipClassMap('min')}>
                  ${this.formatValue(this.displayMinRangeValue)}
                </div>
              </div>

              <div class="slider-track" 
                style="width: ${this.hideTrackFill ? '0' : Math.abs(maxRangeThumbPosition-minRangeThumbPosition)}%; 
                ${this.reverse ?  'right: 0;' : ''}
                ${this.reverse ? `left: ${maxRangeThumbPosition}%` : `left: ${minRangeThumbPosition}%`};">     
              </div>
              <div class="slider-thumb" style="left: ${maxRangeThumbPosition}%" tabindex="0"
                  @mouseenter=${(e: MouseEvent) => this.handleThumbMouseEnter(e, 'max')}
                  @mouseleave=${this.handleThumbMouseLeave}
                  @mousedown=${(e: MouseEvent) => this.handleThumbMouseDown(e, 'max')}
                  @keydown=${(e: KeyboardEvent) => this.handleThumbKeyDown(e, 'max')}>
                  <div class=${this.getTooltipClassMap('max')}>
                    ${this.formatValue(this.displayMaxRangeValue)}
                </div>
              </div>
            `
            : html`
              <div class="slider-track" 
               style="width: ${this.hideTrackFill ? '0' : this.reverse ? 100-this.thumbPosition : this.thumbPosition}%;
                  ${this.reverse ?  'right: 0; left: auto;' : ''}"></div>
                <div class="slider-thumb" style="left: ${this.thumbPosition}%" tabindex="0"
                  @mouseenter=${(e: MouseEvent) => this.handleThumbMouseEnter(e, 'single')}
                  @mouseleave=${this.handleThumbMouseLeave}
                  @mousedown=${(e: MouseEvent) => this.handleThumbMouseDown(e, 'single')}
                  @keydown=${(e: KeyboardEvent) => this.handleThumbKeyDown(e, 'single')}>
                <div class=${this.getTooltipClassMap('single')}>
                  ${this.formatValue(this.displayValue)}
                </div>
              </div>
            `
          }
          ${!this.hideMarks && Object.keys(this.marks).length > 0
            ? html`${this.renderMarks()}` : nothing
           }
          </div>
        </div>
      `;
      // <div class="slider-help-text">${this.helpText}</div>
    }
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

  private boundHandleMouseMove!: (e: MouseEvent) => void;
  private boundHandleMouseUp!: (e: MouseEvent) => void;
  
  private renderMarks() {
    const validMarkEntries = Object.entries(this.marks)
      .filter(([key]) => parseFloat(key) >= this.min);
    
    const markValues = validMarkEntries.map(([key]) => parseFloat(key));
    const maxValueInMarks = markValues.includes(this.max);
    const minValueInMarks = markValues.includes(this.min);
  
    return html `
      ${!minValueInMarks ? html`
        <div class="mark" style="left:${this.reverse ? '100%' : '0%'};">
          <span>${this.formatValue(this.min)}</span>
        </div>
        <div class="mark-circle ${this.range 
          ? (this.displayMinRangeValue <= this.min ? 'mark-circle--active' : 'mark-circle--inactive')
          : (this.displayValue <= this.min ? 'mark-circle--active' : 'mark-circle--inactive')}" 
             style="left:${this.reverse ? '100%' : '0%'};">
        </div>
      ` : nothing}
      
      ${validMarkEntries.map(([key, value]) => {
        // 위치 계산 - reverse일 때 반전
        const position = this.reverse
          ? 100 - ((parseFloat(key) - this.min) / Math.max((this.max - this.min), 1)) * 100
          : ((parseFloat(key) - this.min) / Math.max((this.max - this.min), 1)) * 100;
  
        const isActive = this.range 
          ? (parseFloat(key) >= this.displayMinRangeValue && parseFloat(key) <= this.displayMaxRangeValue)
          : this.reverse 
            ? (this.displayValue <= parseFloat(key)) 
            : (this.displayValue >= parseFloat(key));
        
        return html`
          <div class="mark" style="left:${position}%;">
            <span>${value}</span>
          </div>
          <div class="mark-circle ${isActive ? 'mark-circle--active' : 'mark-circle--inactive'}" 
               style="left:${position}%;">
          </div>
        `;
      })}
      
      ${!maxValueInMarks ? html`
        <div class="mark" style="left:${this.reverse ? '0%' : '100%'};">
          <span>${this.formatValue(this.max)}</span>
        </div>
        <div class="mark-circle ${this.range 
          ? (this.displayMaxRangeValue >= this.max ? 'mark-circle--active' : 'mark-circle--inactive')
          : this.reverse
            ? (this.displayValue <= this.max ? 'mark-circle--active' : 'mark-circle--inactive')
            : (this.displayValue >= this.max ? 'mark-circle--active' : 'mark-circle--inactive')}" 
             style="left:${this.reverse ? '0%' : '100%'};">
        </div>
      ` : nothing}
    `;
  }

  private renderVerticalMarks() {
    const validMarkEntries = Object.entries(this.marks)
      .filter(([key]) => parseFloat(key) >= this.min);
    
    const markValues = validMarkEntries.map(([key]) => parseFloat(key));
    const maxValueInMarks = markValues.includes(this.max);
    const minValueInMarks = markValues.includes(this.min);
  
    return html `
      ${!minValueInMarks ? html`
        <div class="mark" style="bottom:${this.reverse ? '100%' : '0%'};">
          <span>${this.formatValue(this.min)}</span>
        </div>
        <div class="mark-circle ${this.range 
          ? (this.displayMinRangeValue <= this.min ? 'mark-circle--active' : 'mark-circle--inactive')
          : (this.displayValue <= this.min ? 'mark-circle--active' : 'mark-circle--inactive')}" 
             style="bottom:${this.reverse ? '100%' : '0%'};">
        </div>
      ` : nothing}
      
      ${validMarkEntries.map(([key, value]) => {
        // 위치 계산 - reverse일 때 반전
        const position = this.reverse
          ? 100 - ((parseFloat(key) - this.min) / Math.max((this.max - this.min), 1)) * 100
          : ((parseFloat(key) - this.min) / Math.max((this.max - this.min), 1)) * 100;
  
        const isActive = this.range 
          ? (parseFloat(key) >= this.displayMinRangeValue && parseFloat(key) <= this.displayMaxRangeValue)
          : this.reverse 
            ? (this.displayValue <= parseFloat(key)) 
            : (this.displayValue >= parseFloat(key));
        
        return html`
          <div class="mark" style="bottom:${position}%;">
            <span>${value}</span>
          </div>
          <div class="mark-circle ${isActive ? 'mark-circle--active' : 'mark-circle--inactive'}" 
               style="bottom:${position}%;">
          </div>
        `;
      })}
      
      ${!maxValueInMarks ? html`
        <div class="mark" style="bottom:${this.reverse ? '0%' : '100%'};">
          <span>${this.formatValue(this.max)}</span>
        </div>
        <div class="mark-circle ${this.range 
          ? (this.displayMaxRangeValue >= this.max ? 'mark-circle--active' : 'mark-circle--inactive')
          : this.reverse
            ? (this.displayValue <= this.max ? 'mark-circle--active' : 'mark-circle--inactive')
            : (this.displayValue >= this.max ? 'mark-circle--active' : 'mark-circle--inactive')}" 
             style="bottom:${this.reverse ? '0%' : '100%'};">
        </div>
      ` : nothing}
    `;
  }

  private getMarkValues(): number[] {
    const markValues = Object.keys(this.marks)
    .map(key => parseFloat(key))
    .filter(value => value >= this.min);
    
    // Add min value if it's not already included in marks
    if (!markValues.includes(this.min)) {
      markValues.push(this.min);
    }
    
    // Add max value if it's not already included in marks
    if (!markValues.includes(this.max)) {
      markValues.push(this.max);
    }
    
    // Sort values to ensure they're in ascending order
    return markValues.sort((a, b) => a - b);
  }

  private formatValue(value: number): string {
    if (value === undefined || value === null) return "0"; 
    if (value === 0) return "0";
    return 6 < this.valueScale 
      ? value.toExponential(0) 
      : value.toFixed(this.valueScale);
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

    const placementClass = {
      left: 'left',
      bottom: 'bottom',
      right: 'right',
      top: 'top'
    }[this.tooltipPlacement] || 'top';
 
    return `current-value  ${placementClass} ${isVisible ? 'visible' : ''}`;
  }

  // display tooltip corrensponding to the step scale
  private calValueScale() {
    const match = this.step.toString().match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    
    if (!match) {
      // integer
      this.valueScale = 0;
    } else if (match[2]) {
      // ex: 1e-8
      this.valueScale = Math.max(0, (match[1] ? match[1].length : 0) - parseInt(match[2], 10));
    } else {
      // float
      this.valueScale = match[1] ? match[1].length : 0;
    }
  }

  private handleThumbMouseEnter(e:MouseEvent, type: 'min' | 'max' | 'single' ) {
    if(this.showTooltip === 'default' && !this.disabled) {
      if(type === 'min') {
        this.showMinValue = true;
      } else if(type === 'max') {
        this.showMaxValue = true;
      } else {
        this.showSingleValue = true;
      }
    }
  }

  private handleThumbMouseLeave(e:MouseEvent) {
    if(!this.isDragging && this.showTooltip === 'default'){
      this.showMaxValue = false;
      this.showMinValue = false;
      this.showSingleValue = false;
    }    
  }

  private handleThumbMouseDown(e: MouseEvent, type: 'min' | 'max' | 'single') {
    e.preventDefault(); 
    (e.currentTarget as HTMLElement).focus();
    if (!this.disabled && !this.readonly) {
      this.isDragging = true;
      this.dragTarget = type;

      if(this.vertical){
        this.boundHandleMouseMove = this.handleVerticalMouseMove.bind(this);
        this.boundHandleMouseUp = this.handleMouseUp.bind(this);
      } else {
        this.boundHandleMouseMove = this.handleMouseMove.bind(this);
        this.boundHandleMouseUp = this.handleMouseUp.bind(this);
      }
      document.addEventListener('mousemove', this.boundHandleMouseMove);
      document.addEventListener('mouseup', this.boundHandleMouseUp);
    }
  }  private handleVerticalMouseMove(e: MouseEvent) {
    if (this.isDragging && this.slider) {
      const sliderHeight = this.slider.offsetHeight;
      const sliderRect = this.slider.getBoundingClientRect();
      let position = (e.clientY - sliderRect.top) / sliderHeight;
      
      if (!this.reverse) {
        position = 1 - position;
      }
      
      const newValue = position * (this.max - this.min) + this.min;
      const newValueRounded = Math.round(newValue / this.step) * this.step;
      
      if (this.snapToMarks && Object.keys(this.marks).length > 0) {
        this.handleSnapToMarks(newValue);
      } 
      else {
        if(this.range) {
          if (this.dragTarget === 'min') {
            if (newValueRounded > this.currentMaxRangeValue) {
              const tempValue = this.currentMaxRangeValue;
              this.currentMaxRangeValue = newValueRounded;
              this.currentMinRangeValue = tempValue;
              this.dragTarget = 'max';
              this.showMinValue = false;
              this.showMaxValue = true;
            } else {
              this.currentMinRangeValue = Math.max(this.min, newValueRounded);
            }
          } else if (this.dragTarget === 'max') {
            if (newValueRounded < this.displayMinRangeValue) {
              const tempValue = this.displayMinRangeValue;
              this.currentMinRangeValue = newValueRounded;
              this.currentMaxRangeValue = tempValue;
              this.dragTarget = 'min';
              this.showMinValue = true;
              this.showMaxValue = false;
            } else {
              this.currentMaxRangeValue = Math.min(this.max, newValueRounded);
            }
          }
        }
        else {
          this.currentValue = this.max < newValueRounded ? this.max : this.min > newValueRounded ? this.min : newValueRounded;

        }
      }
      this.requestUpdate();
    }
  }
  

  private handleMouseMove(e: MouseEvent) {
    if (this.isDragging && this.slider) {
      const sliderWidth = this.slider!.offsetWidth;
      const sliderRect = this.slider!.getBoundingClientRect();
      let position = (e.clientX - sliderRect.left) / sliderWidth;

      // reverse가 true일 때 위치 반전
      if (this.reverse) {
        position = 1 - position;
      }

      const newValue = position * (this.max - this.min) + this.min;
      const newValueRounded = Math.round(newValue / this.step) * this.step;
        // snapToMarks 
        if (this.snapToMarks && Object.keys(this.marks).length > 0) {
          this.handleSnapToMarks(newValue);
        } 
        else {
          // range slider
          if(this.range) {
            if (this.dragTarget === 'min') {
              // If min thumb would exceed max value
              if (newValueRounded > this.currentMaxRangeValue) {
                // Swap the thumbs - min becomes max
                const tempValue = this.currentMaxRangeValue;
                this.currentMaxRangeValue = newValueRounded;
                this.currentMinRangeValue = tempValue;
                // Switch the drag target to 'max' 
                this.dragTarget = 'max';
                this.showMinValue = false;
                this.showMaxValue = true;
              } else {
                this.currentMinRangeValue = Math.max(this.min, newValueRounded);
              }
            } else if (this.dragTarget === 'max') {
              // If max thumb would go below min value
              if (newValueRounded < this.displayMinRangeValue) {
                const tempValue = this.displayMinRangeValue;
                this.currentMinRangeValue = newValueRounded;
                this.currentMaxRangeValue = tempValue;
                this.dragTarget = 'min';
                this.showMinValue = true;
                this.showMaxValue = false;
              } else {
                this.currentMaxRangeValue = Math.min(this.max, newValueRounded);
              }
            }
          }
          // single slider  
          else {
            this.currentValue = newValueRounded;
          }
      }
      this.requestUpdate();
    }
  }

  // snap to marks
  private handleSnapToMarks(newValue: number) {
    const markValues = this.getMarkValues();
    
    // find closest mark 
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
        // The minimum value must be less than the maximum value. 
        const validMaxValues = markValues.filter(val => val < this.displayMaxRangeValue);
        if (validMaxValues.length > 0) {
          // Find the closest possible mark value.
          closestValue = validMaxValues.reduce((prev, curr) => 
            Math.abs(curr - newValue) < Math.abs(prev - newValue) ? curr : prev
          );
        }
        this.currentMinRangeValue = Math.max(this.min, closestValue);
      } else if (this.dragTarget === 'max') {
        // The maximum value must be larger than the minimum value.
        const validMinValues = markValues.filter(val => val > this.displayMinRangeValue);
        if (validMinValues.length > 0) {
          // Find the closest possible mark value.
          closestValue = validMinValues.reduce((prev, curr) => 
            Math.abs(curr - newValue) < Math.abs(prev - newValue) ? curr : prev
          );
        }
        this.currentMaxRangeValue = Math.min(this.max, closestValue);
      }
    } else {
      this.currentValue = Math.min(this.max, Math.max(this.min, closestValue));
    }
     
  }

  private handleMouseUp(e: any) {
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

  // handling keyboard event 
  private handleThumbKeyDown(e: KeyboardEvent, type: 'min' | 'max' | 'single') {
    if (e.key === 'Tab') {
      return;  // for focus management
    }
    e.preventDefault();
    if(!this.disabled && !this.readonly){
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      const isDecrease = e.key === 'ArrowLeft' || e.key === 'ArrowDown';
  
      // snapToMarks true && mark values exist
      if (this.snapToMarks) {
        const markValues = this.getMarkValues();
        
        if (this.range) {
          const isMin = type === 'min';
          const currentValue = isMin ? this.displayMinRangeValue : this.displayMaxRangeValue;
          
          //decrease
          if (isDecrease) {
            // Find the largest mark value that is smaller than the current value
            const prevMarkValue = markValues
              .filter(mark => mark < currentValue)
              .pop();
            
            if (prevMarkValue !== undefined) {
              if (isMin) {
                this.currentMinRangeValue = Math.max(this.min, prevMarkValue);
              } else {
                this.currentMaxRangeValue = Math.max(this.displayMinRangeValue, prevMarkValue);
              }
            }
          } 
          // increase
          else {
            // Find the smallest mark value that is larger than the current value
            const nextMarkValue = markValues
              .filter(mark => isMin ? 
                (mark > currentValue && mark <= this.displayMaxRangeValue) : 
                (mark > currentValue))
              .shift();

            if (nextMarkValue !== undefined) {
              if (isMin) {
                this.currentMinRangeValue = Math.min(this.displayMaxRangeValue, nextMarkValue);
              } else {
                this.currentMaxRangeValue = Math.min(this.max, nextMarkValue);
              }
            }
          }
        } 
        // single slider  
        else {
          //decrease
          if (isDecrease) {
            const prevMarkValue = markValues
              .filter(mark => mark < this.displayValue)
              .pop();
            
            if (prevMarkValue !== undefined) {
              this.currentValue = Math.max(this.min, prevMarkValue);
            }
          } 
          // increase
          else {
            const nextMarkValue = markValues
              .filter(mark => mark > this.displayValue)
              .shift();
            
            if (nextMarkValue !== undefined) {
              this.currentValue = Math.min(this.max, nextMarkValue);
            }
          }
        }
      } 
      // not snap to mark 
      else {
        // range slider
        if (this.range) {
          const isMin = type === 'min';
          const currentValue = isMin ? this.displayMinRangeValue : this.displayMaxRangeValue;
          const limit = isMin
            ? { min: this.min, max: this.displayMaxRangeValue }
            : { min: this.displayMinRangeValue, max: this.max };
            
          const newValue = isDecrease
            ? Math.max(limit.min, currentValue - this.step)
            : Math.min(limit.max, currentValue + this.step);
            
          if (isMin) {
            this.currentMinRangeValue = newValue;
          } else {
            this.currentMaxRangeValue = newValue;
          }
        }
        // single slider 
        else {
          this.currentValue = isDecrease
            ? Math.max(this.min, this.displayValue - this.step)
            : Math.min(this.max, this.displayValue + this.step);
        }
      }
        // calculate thumb
        const value = this.range 
          ? (type === 'min' ? this.displayMinRangeValue : this.displayMaxRangeValue) 
          : this.displayValue;
        this.thumbPosition = ((value - this.min) / (this.max - this.min)) * 100;
        
        this.requestUpdate();
        this.dispatchChangeEvent();
      }
    }
  }

  private handleSliderClick(e: MouseEvent) {    
    if(this.readonly || this.disabled){
      return;
    }
    if (this.slider && this.step) {
      const sliderWidth = this.slider.offsetWidth;
      const sliderRect = this.slider.getBoundingClientRect();
      let position = (e.clientX - sliderRect.left) / sliderWidth;
      
      // reverse가 true일 때 위치 반전
      if (this.reverse) {
        position = 1 - position;
      }
      const newValue = position * (this.max - this.min) + this.min;
      const newValueRounded = Math.round(newValue / this.step) * this.step;

      if(this.snapToMarks){ 
        // range
        if(this.range){
        // Determine which thumb (min or max) should move based on which is closer to click point
        const distanceToMin = Math.abs(newValue - this.displayMinRangeValue);
        const distanceToMax = Math.abs(newValue - this.displayMaxRangeValue);
        
        if (distanceToMin <= distanceToMax) {
          this.dragTarget = 'min';
        } else {
          this.dragTarget = 'max';
        }     
        this.handleSnapToMarks(newValue);
      }
        // single
        else {
          this.dragTarget = null;
          this.handleSnapToMarks(newValue);
        }
      } 
      // not snap to marks
      else {
      if (this.range) {
        const distanceToMin = Math.abs(newValueRounded - this.displayMinRangeValue);
        const distanceToMax = Math.abs(newValueRounded - this.displayMaxRangeValue);

        if (distanceToMin <= distanceToMax) {
          this.currentMinRangeValue = Math.max(this.min, Math.min(newValueRounded, this.displayMaxRangeValue - this.step));
        } else {
          this.currentMaxRangeValue = Math.min(this.max, Math.max(newValueRounded, this.displayMinRangeValue + this.step));
        }
      } else {
        this.currentValue = Math.min(this.max, Math.max(this.min, newValueRounded));
      }
    }
      this.requestUpdate();
      this.dispatchChangeEvent();
    }
  }

  private handleVerticalSliderClick(e: MouseEvent) {    
    if(this.readonly || this.disabled){
      return;
    }    if (this.slider && this.step) {
      const sliderHeight = this.slider.offsetHeight;
      const sliderRect = this.slider.getBoundingClientRect();
      
      // 기본적으로 수직 슬라이더는 아래가 0, 위가 max
      let position = (e.clientY - sliderRect.top) / sliderHeight;
      
      // 기본 방향과 reverse 옵션에 따라 position 조정
      if (!this.reverse) {
        position = 1 - position; // 일반 방향으로 변환 (아래→위로 증가)
      }
      
      const newValue = position * (this.max - this.min) + this.min;
      const newValueRounded = Math.round(newValue / this.step) * this.step;

      if(this.snapToMarks){ 
        if(this.range){
          const distanceToMin = Math.abs(newValue - this.displayMinRangeValue);
          const distanceToMax = Math.abs(newValue - this.displayMaxRangeValue);
          
          if (distanceToMin <= distanceToMax) {
            this.dragTarget = 'min';
          } else {
            this.dragTarget = 'max';
          }     
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

          if (distanceToMin <= distanceToMax) {
            this.currentMinRangeValue = Math.max(this.min, Math.min(newValueRounded, this.displayMaxRangeValue - this.step));
          } else {
            this.currentMaxRangeValue = Math.min(this.max, Math.max(newValueRounded, this.displayMinRangeValue + this.step));
          }
        } else {
          this.currentValue = Math.min(this.max, Math.max(this.min, newValueRounded));
        }
      }
      this.requestUpdate();
      this.dispatchChangeEvent();
    }
  }

  dispatchChangeEvent() {
    this.dispatchEvent(new CustomEvent('changed', {
      detail: this.range 
        ? { min: this.displayMinRangeValue, max: this.displayMaxRangeValue } 
        : { value: this.displayValue }
    }));
  }
  

}

