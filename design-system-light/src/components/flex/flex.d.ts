import { FlexElement } from "./flex.element";

declare global {
  interface HTMLElementTagNameMap {
    'sy-flex': FlexElement;
  }
}
