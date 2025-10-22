import { TooltipElement } from "./tooltip.element";

declare global {
  interface HTMLElementTagNameMap {
    'sy-tooltip': TooltipElement;
  }
}