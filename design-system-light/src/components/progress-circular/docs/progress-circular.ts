import { html } from 'lit';
import '../progress-circular.element';

export interface ProgressCircularProps {
  status: 'default' | 'error' | 'complete';
  // fontColor: 'white' | 'black';
  hideText: boolean;
  indeterminate: boolean;
  percent: number;
  segment: string;
  size: 'small' | 'medium' | 'large';
  // thick: 'small' | 'medium' | 'large';
  tooltipTitle: string;
 }

/**
 * Primary UI component for user interaction
 */
export const ProgressCircular = ({status, hideText, indeterminate, percent, segment, size, tooltipTitle}: ProgressCircularProps) => {
  return html`
  <sy-progress-circular
    status=${status}
    ?hideText=${hideText}
    ?indeterminate=${indeterminate}
    percent=${percent}
    segment=${segment}
    size=${size}
    tooltipTitle=${tooltipTitle}>
    </sy-progress-circular>`;
};

export const ProgressCircularStatus = (args: {status: 'default' | 'error' | 'complete'}) => {
  return html`
  <sy-progress-circular status=${args.status} percent="30"></sy-progress-circular>
  `;
}

// export const ProgressCircularFontColor = (args: {fontColor: 'white' | 'black'}) => {
//   return html`
//   <sy-progress-circular fontColor=${args.fontColor} percent="30"></sy-progress-circular>
//   `;
// }

export const ProgressCircularHideText = (args: {hideText: boolean}) => {
  return html`
  <sy-progress-circular ?hideText=${args.hideText} percent="30"></sy-progress-circular>
  `;
}

export const ProgressCircularIndeterminate = (args: {indeterminate: boolean}) => {
  return html`
  <sy-progress-circular ?indeterminate=${args.indeterminate}></sy-progress-circular>
  `;
}

export const ProgressCircularPercent = (args: {percent: number}) => {
  return html`
  <sy-progress-circular percent=${args.percent}></sy-progress-circular>
  `;
};

export const ProgressCircularSegment = (args: {segment: string, percent: number}) => {
  return html`
   <sy-progress-circular .segment=${args.segment} percent=${args.percent}></sy-progress-circular>
  `;
 }

export const ProgressCircularSize = (args: {size: 'small' | 'medium' | 'large'}) => {
  return html`
  <sy-progress-circular size=${args.size} percent="30"></sy-progress-circular>
  `;
}

export const ProgressCircularTooltipTitle = (args: {tooltipTitle: string}) => {
  return html`
   <sy-progress-circular percent="50" tooltipTitle=${args.tooltipTitle}></sy-progress-circular>
  `;
 }