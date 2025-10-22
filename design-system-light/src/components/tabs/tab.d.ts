import { TabContentElement } from "./tab-content.element";
import { TabGroupElement } from "./tab-group.element";
import { TabElement } from "./tab.element";

declare global {
  interface HTMLElementTagNameMap {
    'sy-tab': TabElement;
    'sy-tab-group': TabGroupElement;
    'sy-tab-content': TabContentElement;
  }
}