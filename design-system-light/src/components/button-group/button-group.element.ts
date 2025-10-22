import { LitElement, html, CSSResultGroup, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ButtonElement } from '../button/button.element';
import globalCSS from './styles/button-group.scss?inline';

const BUTTON = 'SY-BUTTON';

@customElement('sy-button-group')
export class ButtonGroupElement extends LitElement {
  static styles: CSSResultGroup = css`${unsafeCSS(globalCSS)};`
  @property({ type: Boolean }) vertical = false;
  
  async firstUpdated() {
    await this.updateComplete;
    this.setButtonClasses();
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has('vertical')) {
      this.setButtonClasses();
    }
  }

  render() {
    return html`
      <div class=${classMap({
        'button-group': true,
        'button-group--vertical': this.vertical,
      })}>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
  }

  private handleSlotChange() {
    this.setButtonClasses();
  }

  private setButtonClasses() {
    const buttons = Array.from(this.children).filter(child => child.tagName === BUTTON) as ButtonElement[];
    
    if (!buttons.length) return;

    // First remove all first and last properties
    buttons.forEach((button: ButtonElement) => {
      button.vertical = this.vertical;
      button.first = false;
      button.last = false;
      button.buttonGroup = true;
    });

    // Add properties to first and last buttons
    if (buttons.length > 0) {
      buttons[0].first = true;
      buttons[buttons.length - 1].last = true;
    }
  }
}
