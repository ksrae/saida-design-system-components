import { LitElement, html, CSSResultGroup, css, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import globalCSS from './styles/radio.scss?inline';

@customElement('sy-radio')
export class RadioElement extends LitElement {
  static styles: CSSResultGroup = css`${unsafeCSS(globalCSS)};`

  @property({ type: Boolean, reflect: true }) checked: boolean = false;
  @property({ type: Boolean, reflect: true }) disabled: boolean = false;
  @property({ type: Boolean, reflect: true }) readonly: boolean = false;
  @property({ type: String }) value: string = '';

  @query('input') input!: HTMLInputElement;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('keydown', this.handleKeydown);
  }

  disconnectedCallback(): void {
    this.removeEventListener('keydown', this.handleKeydown);
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has('checked')) {
      this.input.checked = this.checked;
    }
  }

  render() {
    return html`
      <label @click=${this.handleLabelClick}>
        <input
          type="radio"
          .value=${this.value}
          ?disabled=${this.disabled}
          ?checked=${this.checked}
          @click=${this.onClick}
        />
        <span class="radio-checkmark" tabindex=0></span>
        <slot></slot>
      </label>
    `;
  }


  private handleKeydown(e: KeyboardEvent) {
    if(this.disabled || this.readonly) { return ; }
    
    if(!this.checked)  {
      if (e.code === 'Enter' || e.code === 'Space') {
        this.setChecked();
      }
    }
  }

  private handleLabelClick(e: MouseEvent): void {
    // Do not handle input click event here
    if(e.target === this.input) return;
    this.onClick(e);
  } 

  private onClick(e: MouseEvent): void {
    if(this.disabled || this.readonly) {  
      this.input.checked = this.checked;
      return; 
    }

    if(!this.checked) {
      this.setChecked();
    }
  }

  private setChecked() {
    this.checked = true;
    
    this.dispatchEvent(new CustomEvent('selected', {
      detail: this.value,
      bubbles: true,
      composed: true
    }));
  }
}
