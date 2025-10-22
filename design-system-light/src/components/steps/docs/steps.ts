import { html } from "lit";
import "../steps.element";
import "../step.element";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

export interface StepsProps {
  current: number;
  clickable: boolean;
  complete: boolean;
  size: "small" | "medium";
  startIndex: number;
  type: "horizontal" | "vertical";
  slotContent: any;
  selected?: () => any;
}

export interface StepProps {
  description: string;
  disabled: boolean;
  loading: boolean;
  status: 'finish' | 'current' | 'wait' | 'error' | 'none',
  slotContent: any;
}

/**
 * Primary UI component for user interaction
 */
export const Steps = ({ current, clickable, complete, size, startIndex, type, slotContent }: StepsProps) => {
  return html`
    <sy-steps
      current=${current}
      ?clickable=${clickable}
      ?complete=${complete}
      size=${size}
      startIndex=${startIndex}
      type=${type}>
      
      <sy-step>Step1</sy-step>
      <sy-step>Step2</sy-step>
      <sy-step>Step3</sy-step>
      <sy-step>Step4</sy-step>
    </sy-steps>
  `;
};

export const Step = ({ description, disabled, loading, status, slotContent }: StepProps) => {
  return html`
    <sy-step description=${description} ?disabled=${disabled} ?loading=${loading} status=${status}>
      <span>Step1</span>
    </sy-step>
  `;
};

export const StepsCurrent = (args: {current: number}) => {
  return html`
    <sy-steps current=${args.current}>
      <sy-step>Step1</sy-step>
      <sy-step>Step2</sy-step>
      <sy-step>Step3</sy-step>
      <sy-step>Step4</sy-step>
    </sy-steps>
  `;
};

export const StepsClickable = (args: {clickable: boolean}) => {
  return html`
    <h3>Clickable</h3>
    <sy-steps ?clickable=${args.clickable} id="clickableStep">
      <sy-step>Step1</sy-step>
      <sy-step>Step2</sy-step>
      <sy-step>Step3</sy-step>
      <sy-step>Step4</sy-step>
    </sy-steps>
    <p id="clickableStepResult">Please click any step.</p>
    <script>
      (() => {
        const clickableStep = document.getElementById("clickableStep");
        const clickableStepResult = document.getElementById(
          "clickableStepResult"
        );
        clickableStep.addEventListener("selected", function (e) {
          clickableStepResult.innerText = e.detail.index + " is selected";
        });
      })();
    </script>
  `;
};

export const StepsComplete = (args: {complete: boolean}) => {
  return html`
    <sy-steps ?complete=${args.complete}>
      <sy-step>Step1</sy-step>
      <sy-step>Step2</sy-step>
      <sy-step>Step3</sy-step>
      <sy-step>Step4</sy-step>
    </sy-steps>
  `;
};

export const StepsSize = (args: {size: "small" | "medium"}) => {
  return html`
    <sy-steps size=${args.size}>
      <sy-step>Step1</sy-step>
      <sy-step>Step2</sy-step>
      <sy-step>Step3</sy-step>
      <sy-step>Step4</sy-step>
    </sy-steps>
  `;
};

export const StepsStartIndex = (args: {startIndex: number, current: number}) => {
  return html`
    <sy-steps startIndex=${args.startIndex} current=${args.current}>
      <sy-step>Step1</sy-step>
      <sy-step>Step2</sy-step>
      <sy-step>Step3</sy-step>
      <sy-step>Step4</sy-step>
    </sy-steps>
  `;
};

export const StepsType = (args: {type: "horizontal" | "vertical"}) => {
  return html`
    <sy-steps type=${args.type}>
      <sy-step>Step1</sy-step>
      <sy-step>Step2</sy-step>
      <sy-step>Step3</sy-step>
      <sy-step>Step4</sy-step>
    </sy-steps>
  `;
};

export const StepDescription = (args: {description: string}) => {
  return html`
    <sy-steps clickable>
      <sy-step description=${args.description}>Step 1</sy-step>
    </sy-steps>
  `;
};

export const StepDisabled = (args: {disabled: boolean}) => {
  return html`
    <sy-steps clickable>
      <sy-step ?disabled=${args.disabled}>Step 1</sy-step>
    </sy-steps>
  `;
};

export const StepLoading = (args: {loading: boolean}) => {
  return html`
    <sy-steps>
      <sy-step ?loading=${args.loading}>Step 1</sy-step>
    </sy-steps>
  `;
};

export const StepStatus = (args: {status: 'finish' | 'current' | 'wait' | 'error' | 'none'}) => {
  return html`
    <sy-steps>
      <sy-step status=${args.status}>Step 1</sy-step>
    </sy-steps>
  `;
};

export const StepSelected = () => {
  return html`
    <h3>Step selected</h3>
    <sy-steps clickable id="stepsSelection">
      <sy-step>Step1</sy-step>
      <sy-step>Step2</sy-step>
      <sy-step>Step3</sy-step>
      <sy-step>Step4</sy-step>
    </sy-steps>

    <p id="stepSelectionResult"></p>

    <script>
      (() => {
        const elem = document.querySelector("#stepsSelection");
        const result = document.querySelector("#stepSelectionResult");

        const handleSelected = (e) => {
          result.textContent = "Selected Step is " + e.detail.index;
        };

        elem.addEventListener("selected", handleSelected);
      })();
    </script>
  `;
};
