import { InputElement } from "./input.element";

declare global {
  interface HTMLElementTagNameMap {
    'sy-input': InputElement;
  }
}
