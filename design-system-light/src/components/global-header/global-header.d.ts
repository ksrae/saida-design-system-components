import { GlobalHeaderElement } from "./global-header.element";

declare global {
  interface HTMLElementTagNameMap {
    'sy-global-header': GlobalHeaderElement;
  }
}
