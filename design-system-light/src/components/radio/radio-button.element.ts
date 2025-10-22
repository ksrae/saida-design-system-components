import { LitElement, html, css, CSSResultGroup, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import globalCSS from '../button/styles/button.scss?inline';


 @customElement('sy-radio-button')
 export class RadioButtonElement extends LitElement {
   static styles: CSSResultGroup = css`${unsafeCSS(globalCSS)}`;

   @property({ type: Boolean }) checked: boolean = false;
   @property({ type: Boolean, reflect: true }) disabled: boolean = false;
   @property({ type: String }) value!: string;

   @state () size: 'small' | 'medium' | 'large' = 'medium';
   @state() variant: 'outlined' | 'solid' = 'outlined'; 
   @state() protected hasFocus = false;
   
   @query('button') radioButton!: HTMLButtonElement;
   
  private handleClick(e: MouseEvent): void {
    if(this.disabled) { return; }
    
    if(!this.checked) {
      this.checked = true;

       this.dispatchEvent(new CustomEvent('selected', {
         detail: this.value,
         bubbles: true,
         composed: true
       }));
     }
  }


  private handleFocus(options?: FocusOptions) {
    this.hasFocus = true;
    this.radioButton?.focus(options);
  }

  private handleBlur() {
    this.hasFocus = false;
    this.radioButton?.blur();
  } 

  render() {
    return html`
    <button
     class=${
        classMap({
          'button--default' : !this.checked,
          'button--secondary': this.checked && this.variant === 'outlined',  
          'button--primary' : this.checked && this.variant === 'solid',
          'button--small': this.size === 'small',
          'button--medium': this.size === 'medium',
          'button--large': this.size === 'large',
          'button--focused': this.hasFocus //focus-style
        })
      }
      value=${this.value}
      ?disabled=${this.disabled}
      @focus=${this.handleFocus}
      @click=${this.handleClick}>
      <slot></slot>
    </button>
    `;
   }
   
}
