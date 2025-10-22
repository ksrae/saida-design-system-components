import { LitElement, html, CSSResultGroup, css, unsafeCSS, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import globalCSS from './styles/menu-group.scss?inline';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../icon/icon.element';

@customElement('sy-menu-group')
export class MenuGroupElement extends LitElement {
static styles: CSSResultGroup = css`${unsafeCSS(globalCSS)};`
  @property({ type: String }) title: string = '';
  
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
