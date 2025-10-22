import { LitElement, html, CSSResultGroup, css, unsafeCSS, nothing } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import globalCSS from './styles/switch.scss?inline';

@customElement('sy-switch')
export class SwitchElement extends LitElement {
  static styles: CSSResultGroup = css`${unsafeCSS(globalCSS)};`

  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) label!: string;
  @property({ type: Boolean }) loading = false;
  @property({ type: Boolean }) readonly = false;
  @property({ type: String }) size: 'small' | 'medium' = 'medium';

  @state() private internalDisabled = false;
  

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('loading') || changedProperties.has('disabled')) {
      if (this.loading) {
        this.internalDisabled = true;
      } else {
        this.internalDisabled = this.disabled;
      }
    }
  }

  render() {
    return html`
      <div
        class=${classMap({
          switch: true,
          on: this.checked,
          readonly: this.readonly,
          disabled: this.internalDisabled,
          'switch--small': this.size === 'small',
          'switch--medium': this.size === 'medium',
        })}
        @click=${this.handleClick}
        @mouseover=${this.handleHover}
        @mouseout=${this.handleHover}
      >
        <div class="handle">
          ${this.loading ? html`<div class="loader"></div>` : ''}
        </div>
      </div>
       <span class="switch-label">${this.label ?? nothing}</span>
    `;
  }

  private handleClick() {
    if (this.internalDisabled || this.readonly) {
      return;
    }

    this.checked = !this.checked;

    this.dispatchEvent(new CustomEvent('changed', {
      detail: this.checked,
      bubbles: true,
      composed: true
    }));
  }

  private handleHover(event: MouseEvent) {
    if (this.internalDisabled) {
      return;
    }

    // this.dispatchEvent(new CustomEvent('hover', {
    //   detail: {
    //     readonly: this.readonly,
    //     disabled: this.internalDisabled,
    //     checked: this.checked,
    //     hovering: event.type === 'mouseover'
    //   }
    // }));
  }
}
