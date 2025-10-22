import { LitElement, css, html} from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('sy-sider')
export class SiderElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      flex: none;
    }
  `;

  @property({ type: String }) size: 'small' | 'medium' | 'large' | string = 'medium';

  async firstUpdated() {
    await this.updateComplete;
    this.setSize();
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if(changedProperties.has('size')) {
      this.setSize();
    }
  }

  render() {
    return html`<slot></slot>`;
  }

  private getSizeValue(): {type: string, value: string} {  
    if (this.size === 'small' || this.size === 'medium' || this.size === 'large') {
      return {type: 'class', value: this.size};
    } else if (this.size === '0' || this.size === '0px') {
      return {type: 'style', value: '1px'};
    }
    return {type: 'style', value: isNaN(Number(this.size)) ? this.size : `${this.size}px`};
  }

  private setSize() {
    const {type, value} = this.getSizeValue();
    this.classList.remove('small', 'medium', 'large');
    if (type === 'class') {
      this.classList.add(value);
    } else {
      this.style.width = value;
    }
  }
}