import { TextareaElement } from "./textarea.element";

declare global {
  interface HTMLElementTagNameMap {
    'sy-textarea': TextareaElement;
  }
}