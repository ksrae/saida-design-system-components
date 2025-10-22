import { ProgressBarElement } from "./progress-bar.element";

declare global {
  interface HTMLElementTagNameMap {
    'sy-progress-bar': ProgressBarElement;
  }
}