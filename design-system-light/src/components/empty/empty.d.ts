import { EmptyElement } from "./empty.element";

declare global {
  interface HTMLElementTagNameMap {
    'sy-empty': EmptyElement;
  }
}
