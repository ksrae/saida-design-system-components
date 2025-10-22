import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('sy-content')
export class ContentElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      flex: 1;
      min-height: 0; /* flex-grow가 제대로 작동하도록 */
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}
