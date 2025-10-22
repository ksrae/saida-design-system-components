import { CheckboxElement } from "./checkbox.element";

declare global {
  interface HTMLElementTagNameMap {
    'sy-checkbox': CheckboxElement;
  }
}