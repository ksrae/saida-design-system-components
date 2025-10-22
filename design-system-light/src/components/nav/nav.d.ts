import { NavElement } from "./nav.element";
import { NavSubElement } from "./nav-sub.element";
import { NavItemElement } from "./nav-item.element";
import { NavGroupElement } from "./nav-group.element";


declare global {
  interface HTMLElementTagNameMap {
    'sy-nav': NavElement;
    'sy-nav-sub': NavSubElement;
    'sy-nav-item': NavItemElement;
    'sy-nav-group': NavGroupElement;
  }
}
