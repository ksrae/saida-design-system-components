import { ButtonElement } from "./button.element";

declare global {
  interface HTMLElementTagNameMap {
    'sy-button': ButtonElement;
  }
}