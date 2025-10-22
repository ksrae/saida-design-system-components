import { LitElement, html, CSSResultGroup, css, unsafeCSS, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import globalCSS from './styles/card.scss?inline';
import { classMap } from 'lit/directives/class-map.js';
;

@customElement('sy-card')
export class CardElement extends LitElement {
  static styles: CSSResultGroup = css`${unsafeCSS(globalCSS)};`

  @property({ type: Boolean, reflect: true }) collapsible: boolean = false;
  @property({ type: Boolean, reflect: true }) backdrop = false;

  private isCollapsed = false;

  render() {
    return html`
    <div
      class=${classMap({
        card: true,
        'card-backdrop': this.backdrop,
      })}
    >

    ${this.hasNamedSlot('cover') ? html`<slot name="cover"></slot>` : nothing }


  
      ${this.hasNamedSlot('header') ? html`
        <div class="card-header-wrapper">
        ${this.collapsible ? html`
          <sy-icon 
            type="${this.isCollapsed ? 'chevron-down' : 'chevron-up'}"
            selectable
            @selected=${this.toggle}
          ></sy-icon>` : nothing}
          <slot name="header"></slot>
        </div>
      ` : nothing
      }

    <div class=${classMap({
      'card-content': true,
      'collapsed': this.isCollapsed,
    })}>
      <slot></slot>
    </div>

    ${this.hasNamedSlot('footer') ? html`<slot name="footer"></slot>` : nothing }
    
    </div>
  `; 
  }

  private hasNamedSlot(name: string) {
    return this.querySelector(`:scope > [slot="${name}"]`) !== null;
  }

  private toggle() {
    this.isCollapsed = !this.isCollapsed;
    this.requestUpdate();
  }
}


