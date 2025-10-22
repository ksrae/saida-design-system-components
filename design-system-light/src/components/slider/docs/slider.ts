import { html } from 'lit';
import '../slider.element';

export interface SilderProps {
  min: number;
  max: number;
  label: string;
  hideTrackFill: boolean;
  step: number;
  value: number;
  disabled: boolean;
  readonly: boolean;
  marks: { [key: number]: string };
  snapToMarks: boolean;
  hideMarks: boolean;
  showTooltip: 'always' | 'default' | 'never';
  tooltipPlacement: 'top' | 'bottom' | 'left' | 'right';
  range: boolean;
  rangeValue: number[];
  reverse: boolean;
  vertical: boolean;
  changed: (e: CustomEvent) => void;
}

export const Slider = ({ min, max, label, snapToMarks, hideTrackFill, step, showTooltip, hideMarks, tooltipPlacement, value, disabled, readonly, reverse, marks, range, rangeValue, vertical }: SilderProps) => {
  return html`
    <sy-slider style="height: 300px;"
      min=${min} 
      max=${max} 
      label=${label}
      ?hideTrackFill=${hideTrackFill}
      step=${step} 
      value=${value} 
      ?disabled=${disabled} 
      ?readonly=${readonly}
      .marks=${marks}
      ?snapToMarks=${snapToMarks}
      ?hideMarks=${hideMarks}
      showTooltip=${showTooltip}
      tooltipPlacement=${tooltipPlacement}
      ?range=${range}
      .rangeValue=${rangeValue}
      ?reverse=${reverse}
      ?vertical=${vertical}>
    </sy-slider>
  `;
};

export const SliderDiabled = (args: {disabled: boolean}) => {
  return html `
  <sy-slider ?disabled=${args.disabled}></sy-slider>
  `
};


export const SliderHideTrackFill = (args: {hideTrackFill: boolean}) => {
  return html `
  <sy-slider ?hideTrackFill=${args.hideTrackFill} value="50"></sy-slider>
  `
};

export const SliderLabel = (args: {label: string}) => {
  return html `
  <sy-slider label=${args.label}></sy-slider>
  `
};

export const SliderHideMarks = (args: {hideMarks: boolean}) => {
  return html `
  <sy-slider id="sliderHideMarksExample" ?hideMarks=${args.hideMarks}></sy-slider>

  <script>
    (() => {
      const markValue = {
        0: '0',
        25: '25',
        50: '50',
        75: '75',
        100: '100'
      }
      const slider = document.querySelector('sy-slider#sliderHideMarksExample');
      slider.marks = markValue;   
    })();
  </script>
  `
};

export const SliderMarks = () => {
  return html `
  <sy-slider id="sliderMarksExample"></sy-slider>
  
  <script>
    (() => {
      const markValue = {
        0: '0',
        25: '25',
        50: '50',
        75: '75',
        100: '100'
      }
      const slider = document.querySelector('sy-slider#sliderMarksExample');
      slider.marks = markValue;   
    })();
  </script>
  `
};

export const SliderMax = (args: {max: number}) => {
  return html `
  <sy-slider max=${args.max}></sy-slider>
  `
};

export const SliderMin = (args: {min: number}) => { 
  return html `
  <sy-slider min=${args.min}></sy-slider>
  `
};

export const SliderRange = (args: {range: boolean}) => {
  return html `
  <sy-slider id="sliderRange" ?range=${args.range}></sy-slider>
   <script>
      (() => {
        let rangeValue = [10, 50];
        document.querySelector('#sliderRange').rangeValue = rangeValue;
      })();
    </script>
  `
};

export const SliderRangeValue = () => {
  return html`
  <sy-slider id="sliderRangeValue" range></sy-slider>
    <script>
      (() => {
        let rangeValue = [30, 60];
        document.querySelector('#sliderRangeValue').rangeValue = rangeValue;
      })();
    </script>
  `;
};

export const SliderReadonly = (args: {readonly: boolean}) => {
  return html `
  <sy-slider ?readonly=${args.readonly} value="50"></sy-slider>
  `
};

export const SliderReverse = (args: {reverse: boolean}) => {
  return html `
  <sy-slider ?reverse=${args.reverse} value="50"></sy-slider>
  `
};


export const SliderShowTooltip = (args: {showTooltip: 'always' | 'default' | 'never'}) => {
  return html `
  <sy-slider showTooltip=${args.showTooltip} value="50"></sy-slider>
  `
};

export const SliderSnapToMarks = (args: {snapToMarks: boolean}) => {
  return html `
  <sy-slider id="snapToMarks" ?snapToMarks=${args.snapToMarks}></sy-slider>
  <script>
    (() => {
      let marks = {0: '0', 25: '25', 50: '50', 75: '75', 100: '100'};
      document.querySelector('#snapToMarks').marks = marks;
    })();
  </script>
  `
};

export const SliderRangeSnapToMarks = (args: {snapToMarks: boolean }) => {
  return html `
  <sy-slider id="snapToMarksRange" ?snapToMarks=${args.snapToMarks} range></sy-slider>
  <script>
    (() => {
      let marks = {0: '0', 25: '25', 50: '50', 75: '75', 100: '100'};
      document.querySelector('#snapToMarksRange').marks = marks;
      document.querySelector('#snapToMarksRange').rangeValue = [25, 75];
    })();
  </script>
  `
};

export const SliderStep = (args: {step: number, min: number, max: number, value: number}) => { 
  return html `
  <sy-slider step=${args.step} min=${args.min} max=${args.max} value=${args.value}></sy-slider>
  ` 
};

export const TooltipPlacement = (args: {tooltipPlacement: 'top' | 'bottom'}) => {
  return html `
  <sy-slider tooltipPlacement=${args.tooltipPlacement} value="50"></sy-slider>
  `
};

export const TooltipValue = (args: {value: number}) => {  
  return html `
  <sy-slider value=${args.value}></sy-slider>
  `
};

export const VerticalSlider = (args: {vertical: boolean}) => {
  return html `
  <sy-slider style="height: 300px;" ?vertical=${args.vertical}></sy-slider>
  `
};

export const SliderChangedEvent = () => {
  return html `
  <sy-slider 
    .marks=${{0: '0', 25: '25', 50: '50', 75: '75', 100: '100'}}
    value="50"
    @changed=${(e: CustomEvent) => {
    const result = document.querySelector('#sliderChangeResult');
    result!.textContent = 'Value : ' + e.detail.value;
  }} value="50"></sy-slider>
  <p id="sliderChangeResult"></p>
  `
};

export const SliderRangeChangedEvent = () => {
  return html `
  <sy-slider style="height: 300px;"
    .marks=${{0: '0', 25: '25', 50: '50', 75: '75', 100: '100'}}
    range
    vertical
    rangeValue="[25, 75]"
    @changed=${(e: CustomEvent) => {
    const result1 = document.querySelector('#sliderMinChangeResult');
    const result2 = document.querySelector('#sliderMaxChangeResult');
    result1!.textContent = 'Min : ' + e.detail.min;
    result2!.textContent = 'Max : ' + e.detail.max;
  }} value="50"></sy-slider>
  <p id="sliderMinChangeResult"></p>
  <p id="sliderMaxChangeResult"></p>
  `
};