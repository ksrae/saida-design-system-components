import { LitElement, html, CSSResultGroup, PropertyValues, css, unsafeCSS } from 'lit';
import { customElement, property } from "lit/decorators.js";
import {classMap} from 'lit/directives/class-map.js';
import globalCSS from './styles/divider.scss?inline';

@customElement('sy-divider')
export class DividerElement extends LitElement {
  static styles: CSSResultGroup = css`${unsafeCSS(globalCSS)};`

  @property({ type: String, reflect: true }) type: 'horizontal' | 'vertical'  = 'horizontal';
  // @property({ type: String }) thickness: 'small' = 'small';
  
  connectedCallback() {
   super.connectedCallback();
   this.setAttribute('role', 'separator');
  }


  // update(changeProperties:PropertyValues) {
  //   super.update(changeProperties);
  // }
  
  render() {
    return html`
    <div class=${
        classMap({
          'horizontal' : this.type === 'horizontal',
          'vertical': this.type === 'vertical',
          'divider--small':true
        })
      }></div>`
    }

}

