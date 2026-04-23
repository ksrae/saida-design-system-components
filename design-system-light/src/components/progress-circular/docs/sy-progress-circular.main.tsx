import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { Components } from '../../../components';

export interface SyProgressCircularProps extends Components.SyProgressCircular {}

export const ProgressCircular = ({ percent, segment, status, hideText, size, tooltipTitle, indeterminate }: SyProgressCircularProps) => html`
  <sy-progress-circular
    .percent=${percent}
    segment=${ifDefined(segment)}
    status=${ifDefined(status)}
    .hideText=${hideText}
    size=${ifDefined(size)}
    .tooltipTitle=${tooltipTitle}
    ?indeterminate=${!!indeterminate}>
  </sy-progress-circular>
`;

export const ProgressCircularPercent = (args: { percent: number }) => html`<sy-progress-circular .percent=${args.percent}></sy-progress-circular>`;
export const ProgressCircularSegment = (args: { segment: string }) => html`<sy-progress-circular segment=${ifDefined(args.segment)} .percent=${60}></sy-progress-circular>`;
export const ProgressCircularStatus = (args: { status: 'default' | 'error' | 'complete' }) => html`<sy-progress-circular status=${ifDefined(args.status)} .percent=${60}></sy-progress-circular>`;
export const ProgressCircularHideText = (args: { hideText: boolean }) => html`<sy-progress-circular .hideText=${args.hideText} .percent=${60}></sy-progress-circular>`;
export const ProgressCircularSize = (args: { size: 'small' | 'medium' | 'large' }) => html`<sy-progress-circular size=${ifDefined(args.size)} .percent=${60}></sy-progress-circular>`;
export const ProgressCircularTooltipTitle = (args: { tooltipTitle: string }) => html`<sy-progress-circular .tooltipTitle=${args.tooltipTitle} .percent=${60}></sy-progress-circular>`;
export const ProgressCircularIndeterminate = (args: { indeterminate: boolean }) => html`<sy-progress-circular ?indeterminate=${!!args.indeterminate}></sy-progress-circular>`;
