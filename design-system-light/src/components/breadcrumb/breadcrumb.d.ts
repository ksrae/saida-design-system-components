import { BreadcrumbItemElement } from "./breadcrumb-item.element";
import { BreadcrumbElement } from "./breadcrumb.element";

declare global {
  interface HTMLElementTagNameMap {
    'sy-breadcrumb': BreadcrumbElement;
    'sy-breadcrumb-item': BreadcrumbItemElement;
  } 
  // 이렇게 하면 별도 선언 없이 global로 인식됨
  interface GlobalEventHandlersEventMap {
    'selected': CustomEvent;
  }
}