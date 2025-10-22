import { StepElement } from "./step.element";
import { StepsElement } from "./steps.element";

declare global {
  interface HTMLElementTagNameMap {
    'sy-steps': StepsElement;
    'sy-step': StepElement;
  }
}