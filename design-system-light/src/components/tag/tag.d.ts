import { TagElement } from "./tag.element";

declare global {
  interface HTMLElementTagNameMap {
    'sy-tag': TagElement;
  }
}