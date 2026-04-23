import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { Components } from '../../../components';

export interface SyStepsProps extends Components.SySteps { slot?: any; }
export interface SyStepProps extends Components.SyStep { slot?: any; }

const defaultSteps = html`
  <sy-step>Step 1</sy-step>
  <sy-step>Step 2</sy-step>
  <sy-step>Step 3</sy-step>
`;

export const Steps = (a: SyStepsProps) => html`
  <sy-steps
    .current=${a.current}
    .startIndex=${a.startIndex}
    ?clickable=${!!a.clickable}
    ?complete=${!!a.complete}
    type=${ifDefined(a.type)}
    size=${ifDefined(a.size)}
  >${defaultSteps}</sy-steps>
`;

export const Step = (a: SyStepProps) => html`
  <sy-steps>
    <sy-step
      ?disabled=${!!a.disabled}
      ?loading=${!!a.loading}
      ?small=${!!a.small}
      ?clickable=${!!a.clickable}
      ?lastStep=${!!a.lastStep}
      .index=${a.index}
      .current=${a.current}
      .parentStatus=${a.parentStatus}
      .currentStatus=${a.currentStatus}
      description=${ifDefined(a.description)}
      status=${ifDefined(a.status)}
      size=${ifDefined(a.size)}
      type=${ifDefined(a.type)}
    >Step</sy-step>
  </sy-steps>
`;

export const StepsCurrent    = (a: { current: number })    => html`<sy-steps .current=${a.current}>${defaultSteps}</sy-steps>`;
export const StepsClickable  = (a: { clickable: boolean }) => html`<sy-steps ?clickable=${!!a.clickable}>${defaultSteps}</sy-steps>`;
export const StepsComplete   = (a: { complete: boolean })  => html`<sy-steps ?complete=${!!a.complete}>${defaultSteps}</sy-steps>`;
export const StepsType       = (a: { type: 'horizontal' | 'vertical' }) => html`<sy-steps type=${ifDefined(a.type)}>${defaultSteps}</sy-steps>`;
export const StepsSize       = (a: { size: 'small' | 'medium' }) => html`<sy-steps size=${ifDefined(a.size)}>${defaultSteps}</sy-steps>`;
export const StepsStartIndex = (a: { startIndex: number }) => html`<sy-steps .startIndex=${a.startIndex}>${defaultSteps}</sy-steps>`;

export const StepDescription   = (a: { description: string })   => html`<sy-steps><sy-step description=${ifDefined(a.description)}>Step</sy-step></sy-steps>`;
export const StepDisabled      = (a: { disabled: boolean })     => html`<sy-steps><sy-step ?disabled=${!!a.disabled}>Step</sy-step></sy-steps>`;
export const StepLoading       = (a: { loading: boolean })      => html`<sy-steps><sy-step ?loading=${!!a.loading}>Step</sy-step></sy-steps>`;
export const StepStatus        = (a: { status: string })        => html`<sy-steps><sy-step status=${ifDefined(a.status)}>Step</sy-step></sy-steps>`;
export const StepSmall         = (a: { small: boolean })        => html`<sy-steps><sy-step ?small=${!!a.small}>Step</sy-step></sy-steps>`;
export const StepClickable     = (a: { clickable: boolean })    => html`<sy-steps><sy-step ?clickable=${!!a.clickable}>Step</sy-step></sy-steps>`;
export const StepIndex         = (a: { index: number })         => html`<sy-steps><sy-step .index=${a.index}>Step</sy-step></sy-steps>`;
export const StepCurrent       = (a: { current: number })       => html`<sy-steps><sy-step .current=${a.current}>Step</sy-step></sy-steps>`;
export const StepSize          = (a: { size: 'small' | 'medium' }) => html`<sy-steps><sy-step size=${ifDefined(a.size)}>Step</sy-step></sy-steps>`;
export const StepParentStatus  = (a: { parentStatus: string })  => html`<sy-steps><sy-step .parentStatus=${a.parentStatus}>Step</sy-step></sy-steps>`;
export const StepCurrentStatus = (a: { currentStatus: string }) => html`<sy-steps><sy-step .currentStatus=${a.currentStatus}>Step</sy-step></sy-steps>`;
export const StepType          = (a: { type: 'horizontal' | 'vertical' }) => html`<sy-steps><sy-step type=${ifDefined(a.type)}>Step</sy-step></sy-steps>`;
export const StepLastStep      = (a: { lastStep: boolean })     => html`<sy-steps><sy-step ?lastStep=${!!a.lastStep}>Step</sy-step></sy-steps>`;
