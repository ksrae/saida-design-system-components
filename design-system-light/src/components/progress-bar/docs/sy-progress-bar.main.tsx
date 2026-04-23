import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { Components } from '../../../components';

export interface SyProgressBarProps extends Components.SyProgressBar {}

export const ProgressBar = ({ indeterminate, percent, status, valuePosition, hidePercent, segment, tooltipTitle }: SyProgressBarProps) => html`
  <sy-progress-bar
    ?indeterminate=${!!indeterminate}
    .percent=${percent}
    status=${ifDefined(status)}
    .valuePosition=${valuePosition}
    .hidePercent=${hidePercent}
    segment=${ifDefined(segment)}
    .tooltipTitle=${tooltipTitle}>
  </sy-progress-bar>
`;

export const ProgressBarIndeterminate = (args: { indeterminate: boolean }) => html`
  <sy-progress-bar ?indeterminate=${!!args.indeterminate} .percent=${30}></sy-progress-bar>
`;

export const ProgressBarPercent = (args: { percent: number }) => html`
  <sy-progress-bar .percent=${args.percent}></sy-progress-bar>
`;

export const ProgressBarStatus = (args: { status: 'default' | 'error' | 'complete' }) => html`
  <sy-progress-bar status=${ifDefined(args.status)} .percent=${50}></sy-progress-bar>
`;

export const ProgressBarValuePosition = (args: { valuePosition: 'progress-left' | 'progress-center' | 'progress-right' | 'center' | 'left' | 'right' }) => html`
  <sy-progress-bar .valuePosition=${args.valuePosition} .percent=${50}></sy-progress-bar>
`;

export const ProgressBarHidePercent = (args: { hidePercent: boolean }) => html`
  <sy-progress-bar .hidePercent=${args.hidePercent} .percent=${50}></sy-progress-bar>
`;

export const ProgressBarSegment = (args: { segment: string }) => html`
  <sy-progress-bar segment=${ifDefined(args.segment)} .percent=${50}></sy-progress-bar>
`;

export const ProgressBarTooltipTitle = (args: { tooltipTitle: string }) => html`
  <sy-progress-bar .tooltipTitle=${args.tooltipTitle} .percent=${50}></sy-progress-bar>
`;
