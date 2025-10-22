import { CardElement } from "./card.element";

declare global {
  interface HTMLElementTagNameMap {
    'sy-card': CardElement;
  }
}