import { LitElement, html, css } from "lit";
import { property, customElement } from "lit/decorators.js";

@customElement("sy-tab-content")
export class TabContentElement extends LitElement {
  @property({ type: Boolean, reflect: true }) active = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String, reflect: true }) name!: string;
  
  static styles = css`
    :host {
      display: none;
    }
    :host([active]) {
      display: block;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}
