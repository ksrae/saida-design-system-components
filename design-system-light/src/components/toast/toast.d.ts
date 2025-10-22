import { ToastItemElement } from "./toast-item.element";
import { ToastElement } from "./toast.element";

declare global {
  interface HTMLElementTagNameMap {
    'sy-toast-message': ToastElement;
    'sy-toast-message-item': ToastItemElement;
  }
}