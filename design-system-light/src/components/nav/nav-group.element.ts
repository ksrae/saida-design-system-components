import { LitElement, html, css, CSSResultGroup, unsafeCSS, nothing} from "lit";
import { customElement, property } from 'lit/decorators.js';
import globalCSS from "./styles/nav-group.scss?inline";
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../icon/icon.element';
import { NavElement } from "./nav.element";
import { NavSubElement } from "./nav-sub.element";
import { NavItemElement } from "./nav-item.element";

@customElement('sy-nav-group')
export class NavGroupElement extends LitElement {
  static styles: CSSResultGroup = css`${unsafeCSS(globalCSS)};`;    
  @property({ type: String }) title: string = '';

  // do not open to document
  @property({ type: Number, reflect: true }) depth: number = 0;

  async firstUpdated() {
    await this.updateComplete;

    const noDepths = this.parentElement instanceof NavElement;
    const parentSubNav = this.parentElement instanceof NavSubElement;
    const parentGroup = this.parentElement instanceof NavGroupElement;
    
    if(noDepths) {
      this.depth = 0;
    } else if (parentSubNav){
      this.depth = this.parentElement?.depth + 1;
    } else if (parentGroup) {
      this.depth = this.parentElement?.depth + 1;
    }

    const navItems = this.querySelectorAll('sy-nav-item') as NodeListOf<NavItemElement>;
    if(navItems.length > 0) {
      navItems.forEach((item: NavItemElement) => {
        item.groupItem = true;
      });
    }


    const navSubs = this.querySelectorAll('sy-nav-sub') as NodeListOf<NavSubElement>;
    if(navSubs.length > 0) {
      navSubs.forEach((sub: NavSubElement) => {
        sub.groupItem = true;
      });
    }    
  }
  
  private sanitizeHtml(content: string): string {
    if (!content) return '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    return tempDiv.innerText.trim();
  }

  render() {
    return html`
      <div 
        class="group-title"
        title=${this.sanitizeHtml(this.title)}>
          ${unsafeHTML(this.title)}
      </div>
      <div class="group-content">
        <slot></slot>
      </div>
    `;
  }
}
