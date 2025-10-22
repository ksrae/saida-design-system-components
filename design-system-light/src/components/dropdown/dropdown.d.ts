import { DropdownElement } from "./dropdown.element";

declare global {
  interface HTMLElementTagNameMap {
    'sy-dropdown': DropdownElement;
  }
}