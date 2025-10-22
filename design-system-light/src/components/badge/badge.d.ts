import { BadgeElement } from "./badge.element";

declare global {
  interface HTMLElementTagNameMap {
    'sy-badge': BadgeElement;
  }
}