import { MenuElement } from "./menu.element";
import { MenuSubElement } from "./menu-sub.element";
import { MenuItemElement } from "./menu-item.element";
import { MenuGroupElement } from "./menu-group.element";


declare global {
  interface HTMLElementTagNameMap {
    'sy-menu': MenuElement;
    'sy-menu-sub': MenuSubElement;
    'sy-menu-item': MenuItemElement;
    'sy-menu-group': MenuGroupElement;
  }
}
