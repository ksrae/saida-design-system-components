import { ModelessElement } from "./modeless.element";

declare global {
  interface HTMLElementTagNameMap {
    'sy-modeless': ModelessElement;
  }
}