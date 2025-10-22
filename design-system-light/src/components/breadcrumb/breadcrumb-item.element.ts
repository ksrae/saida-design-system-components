import { LitElement, html, CSSResultGroup, css, unsafeCSS, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import globalCSS from './styles/breadcrumb.scss?inline';
import { classMap } from 'lit/directives/class-map.js';
import '../icon/icon.element';

@customElement('sy-breadcrumb-item')
export class BreadcrumbItemElement extends LitElement {
  static styles: CSSResultGroup = css`${unsafeCSS(globalCSS)};`

  @property({ type: Boolean }) active = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) separator!: 'slash' | 'arrow';
  
  @state() protected hasFocus! : boolean;
  @state() parentSeparator: 'slash' | 'arrow' = 'slash';
  @state() isLast: boolean = false;
  @query('slot') item!: HTMLAnchorElement;

  render() {
    return html`
      <span
       class=${classMap({
        'breadcrumb--item' : true,
        'breadcrumb--item-focused': this.hasFocus,
        'breadcrumb--item-current': !this.disabled && this.active,
        'breadcrumb--item-disabled': this.disabled,
      })}
      @focus=${this.handleFocus}
      @mouseenter=${this.handleFocus}
      @blur=${this.handleBlur}
      @mouseleave=${this.handleBlur}
      @click=${this.handleClick}>
      <slot></slot>
      </span>
      ${!this.isLast ? 
        html `<span class="separator">
       ${this.separator === 'slash' || (!this.separator && this.parentSeparator === 'slash') ? html `
        <sy-icon size="xsmall">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M433.5 303C442.9 312.4 442.9 327.6 433.5 336.9L273.5 497C264.1 506.4 248.9 506.4 239.6 497C230.3 487.6 230.2 472.4 239.6 463.1L382.6 320.1L239.6 177.1C230.2 167.7 230.2 152.5 239.6 143.2C249 133.9 264.2 133.8 273.5 143.2L433.5 303.2z"/></svg>
        </sy-icon>`: html `
        <sy-icon size="xsmall">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M468.1 67.3C479.5 74 483.4 88.7 476.7 100.1L204.7 564.1C198 575.5 183.3 579.4 171.9 572.7C160.5 566 156.6 551.3 163.3 539.9L435.3 75.9C442 64.4 456.7 60.6 468.1 67.3z"/></svg>
        </sy-icon>`} 
      </span>`
      : nothing }
    `
  }

  private handleFocus(options?: FocusOptions) {
    if(!this.disabled) {
      this.hasFocus = true;
      this.item.focus(options);
    }
  }

  private handleBlur() {
    if(!this.disabled) {
      this.hasFocus = false;
      this.item.blur();
    }
  } 

  private handleClick() {
    if(!this.disabled) {
      this.dispatchEvent(new CustomEvent('selected', {
        detail: this,
        bubbles: true,
        composed: true
      }));
    }
  }
}
