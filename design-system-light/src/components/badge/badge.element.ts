import { LitElement, html, css, CSSResultGroup, unsafeCSS, PropertyValues, nothing} from "lit";
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import globalCSS from "./styles/badge.scss?inline";

@customElement('sy-badge')
export class BadgeElement extends LitElement {
  static styles: CSSResultGroup = css`${unsafeCSS(globalCSS)};`;

  @property({ type: Boolean }) dot = false;
  @property({ type: Boolean }) hidden = false;
  @property({ type: Number }) overflowCount = Infinity;
  @property({ type: String }) position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' = 'topRight';
  @property({ type: String }) size: 'small' | 'medium' = 'medium';
  @property({ type: Boolean }) standalone = false; 
  @property({ type: Number }) value = 0;
  @property({ type: String }) variant: 'red' | 'yellow' | 'green' | 'blue' | 'gray' = 'red';
  
  @state() private isOverflow: boolean = false;
  @state() private displayValue!: string;


  async firstUpdated() {
    await this.updateComplete;
    const slot = this.shadowRoot?.querySelector('slot');
    const assignedNodes = slot?.assignedNodes()?.filter(node => node.nodeType === Node.ELEMENT_NODE);
    if(assignedNodes && assignedNodes?.length > 1) {
      slot!.replaceWith(assignedNodes[0]);
    }
  }
    
  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has('dot') || changedProperties.has('value') || changedProperties.has('max') || changedProperties.has('overflowCount')) {
      this.setValue();
    }
  }

  render() {
    return html`
      <div class="container">
      ${!this.standalone ? html`<slot></slot>` : nothing } 
        <div class="${classMap({
          badge: true,
          dot: this.dot,
          visible: !this.hidden,
          standalone : this.standalone,
          'badge-over' : this.displayValue?.length >= 2,
          
          'badge-red': this.variant === 'red',
          'badge-yellow': this.variant === 'yellow',
          'badge-green': this.variant === 'green',
          'badge-blue': this.variant === 'blue',
          'badge-gray': this.variant === 'gray',
          [this.size]: true,
          [this.position]: !this.standalone,
        })}">
          ${this.displayValue}
        </div>
      </div>
  `;
  }
  
  private setValue() {
    const integer = Math.floor(this.value);
    this.isOverflow = this.overflowCount !== Infinity && integer > this.overflowCount;
    this.displayValue = this.dot ? '' : this.overflowCount !== Infinity && integer > this.overflowCount ? `${this.overflowCount}+` : `${integer}`;
  }
}
