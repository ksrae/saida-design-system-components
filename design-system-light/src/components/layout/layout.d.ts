import { ContentElement } from "./content.element";
import { FooterElement } from "./footer.element";
import { HeaderElement } from "./header.element";
import { LayoutElement } from "./layout.element";
import { SiderElement } from "./sider.element";

export { ContentElement, FooterElement, HeaderElement, LayoutElement, SiderElement };
declare global {
  interface HTMLElementTagNameMap {
    'sy-layout': LayoutElement;
    'sy-header': HeaderElement;
    'sy-content': ContentElement;
    'sy-footer': FooterElement;
    'sy-sider': SiderElement;
  }
}
