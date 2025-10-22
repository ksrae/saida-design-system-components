import { LitElement, html, css,  unsafeCSS, CSSResultGroup } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import globalCSS from './styles/autocomplete.scss?inline';
import { classMap } from 'lit/directives/class-map.js';
import '../empty/empty.element';
import '../spinner/spinner.element';

@customElement('sy-autocomplete-option')
export class AutocompleteOptionElement extends LitElement {
  static styles: CSSResultGroup = css`${unsafeCSS(globalCSS)};`

  @property({ type: Array }) source: string[] = [];
  @property({ type: Boolean }) loading: boolean = false;
  @state() activeIndex: number = -1;

  @state() hoverIndex!: number;
  
  // must be public
  // @state() selected: number = -1;

  async firstUpdated() {
    await this.updateComplete;
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if(changedProperties.has('hoverIndex')) {
      this.activeIndex = this.hoverIndex;
      this.dispatchEvent(
        new CustomEvent('activeChanged', {
          detail: this.activeIndex,
          bubbles: true,
          composed: true,
          cancelable: false,
        })
      );
    } else if(changedProperties.has('source')) {
      this.activeIndex = this.source.length > 0 ? 0 : -1;
    } 
  }

  render() {
    return html`
      <div class=${classMap({
        "autocomplete-option-container": true,
      })}
      >
      ${this.loading ? html`<sy-spinner></sy-spinner>` : html`
        ${this.source && this.source.length > 0 ? html `
          ${repeat(this.source, (item) => item, (value, index) => 
            html`
              <div class=${classMap({
                  "option--list": true,
                  "option--active": this.activeIndex === index,
                  // "option--selected": this.selected === index
                })}
                @mousedown=${(e: Event) => this.handleMouseDown(e, index)}
                @mouseenter=${() => this.handleMouseEnter(index)}
              >
              <div class="option--list-inner">${value}</div>
              </div>`
          )}`: html `
          <sy-empty></sy-empty>
          `
        }` 
      }
      </div>`;
  }
  

  setEvent(index: number) {
    this.eventEmitter(this.source[index]);
  }

  private handleMouseEnter(index:number) {
    this.hoverIndex = index;
    
    this.dispatchEvent(
        new CustomEvent('activeChanged', {
          detail: this.hoverIndex,
          bubbles: true,
          composed: true,
          cancelable: false,
        })
      );
  }

  private handleMouseDown(e: Event, index: number) {
    // this.selected = index;
    this.activeIndex = index;
    this.dispatchEvent(
        new CustomEvent('activeChanged', {
          detail: this.activeIndex,
          bubbles: true,
          composed: true,
          cancelable: false,
        })
      );
    const target = e.target as HTMLElement;
    const selectedValue = target.innerText;
    if (selectedValue) {
      this.eventEmitter(selectedValue);
    }
  }

  private eventEmitter(value: string) {
    this.dispatchEvent(
      new CustomEvent('selected', {
        detail: value,
        bubbles: true,
        composed: true,
        cancelable: false,
      })
    );
  }
}
