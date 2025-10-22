import { CollapsePanelElement } from "./collapse-panel.element";
import { CollapseElement } from "./collapse.element";

declare global {
  interface HTMLElementTagNameMap {
    'sy-collapse': CollapseElement;
    'sy-collapse-panel': CollapsePanelElement;
  }
}
