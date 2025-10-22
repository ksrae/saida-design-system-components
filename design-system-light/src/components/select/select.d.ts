import { OptionElement } from "./select-option.element";
import { SelectElement } from "./select.element";

declare global {
  interface HTMLElementTagNameMap {
    'sy-select': SelectElement;
    'sy-option': OptionElement;
  }
}
