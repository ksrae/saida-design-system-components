import { html } from 'lit';
import '../progress-bar.element';

export interface ProgressBarProps {
  hidePercent: boolean;
  indeterminate: boolean;
  percent: number;
  segment: string;
  status: 'default' | 'error' | 'complete';
  valuePosition: 'progress-left' | 'progress-center' | 'progress-right' | 'center' | 'left' | 'right';
  tooltipTitle: string;
 }

/**
 * Primary UI component for user interaction
 */
export const ProgressBar = ({hidePercent, indeterminate, percent, segment, status, tooltipTitle, valuePosition}: ProgressBarProps) => {
  return html`
  <sy-progress-bar
    ?hidePercent=${hidePercent}
    ?indeterminate=${indeterminate}
    percent=${percent}
    segment=${segment}
    status=${status}
    tooltipTitle=${tooltipTitle}
    valuePosition=${valuePosition}>
</sy-progress-bar>`;
};

export const ProgressBarHidepercent = (args: {hidePercent: boolean}) => {
  return html`
  <sy-progress-bar ?hidePercent=${args.hidePercent} percent="30"></sy-progress-bar>   
  `;
}

export const ProgressBarIndeterminate = (args: {indeterminate: boolean}) => {
  return html`
  <sy-progress-bar ?indeterminate=${args.indeterminate} percent="30"></sy-progress-bar>   
  `;
}

// export const ProgressBarMax = () => {
//   return html`
//   <h3>Default(Max=100)</h3>
//     <sy-progress-bar percent="30"></sy-progress-bar> 
//   <br/><br/>
//    <h3>Max = 50</h3>
//     <sy-progress-bar percent="30" max="50"></sy-progress-bar>   
//   <br/><br/>
//   `;
// }

// export const ProgressBarMin = () => {
//   return html`
//   <h3>Default(Min=0)</h3>
//     <sy-progress-bar percent="30"></sy-progress-bar> 
//   <br/><br/>
//    <h3>Min = 50</h3>
//     <sy-progress-bar percent="30" min="50"></sy-progress-bar>   
//   <br/><br/>
//   `;
// }

export const ProgressBarPercent = (args: {percent: number}) => {
  return html`
    <sy-progress-bar percent=${args.percent}></sy-progress-bar> 
  `;
}

export const ProgressBarSegment = (args: {segment: string, percent: number}) => { 
  return html`
<!--
* Default Example value of segment 
[
  {"percent": 50, "status": "default"}, 
  {"percent": 75, "status": "error"}, 
  {"percent": 100, "status": "complete"},   
]
-->
    <div>
      <sy-progress-bar id="progressbarSegment" segment=${args.segment} percent=${args.percent}></sy-progress-bar>
    </div>
  `;
}

export const ProgressBarStatus = (args: {status: 'default' | 'error' | 'complete'}) => {
  return html`
  <sy-progress-bar status=${args.status} percent="60"></sy-progress-bar>   
  `;
}

export const ProgressBarTooltipTitle = (args: {tooltipTitle: string}) => {
  return html`
  <sy-progress-bar tooltipTitle=${args.tooltipTitle} percent="60"></sy-progress-bar>   
  `;
}

export const ProgressBarValuePosition = (args: {valuePosition: 'progress-left' | 'progress-center' | 'progress-right' | 'center' | 'left' | 'right', percent: number}) => {
  return html`
    <sy-progress-bar valuePosition=${args.valuePosition} percent=${args.percent}></sy-progress-bar>   
  `;
  
}