import { TreeItemElement } from "./tree-item.element";
import { TreeElement } from "./tree.element";

declare global {
  interface HTMLElementTagNameMap {
    'sy-tree': TreeElement;
    'sy-tree-item': TreeItemElement;
  }
}