import { ModalElement } from "./modal.element";

declare global {
  interface HTMLElementTagNameMap {
    'sy-modal': ModalElement;
  }
}