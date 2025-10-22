import { LitElement, html, css, CSSResultGroup, unsafeCSS} from "lit";
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import globalCSS from "./styles/nav-item.scss?inline";
import { NavSubElement } from "./nav-sub.element";
import { NavElement } from "./nav.element";
import { NavGroupElement } from "./nav-group.element";

const NAV = 'sy-nav';
const NAVSUB = 'sy-nav-sub';

@customElement('sy-nav-item')
export class NavItemElement extends LitElement {
  static styles: CSSResultGroup = css`
  ${unsafeCSS(globalCSS)};
  `;  
  @property({ type: String }) value: string = '';
  @property({ type: Boolean, reflect: true }) disabled: boolean = false;

  // do not open to document
  @property({ type: Number, reflect: true }) depth: number = 0;

  @state() active: boolean = false;
  @state() groupItem: boolean = false;
  @state() parentDisabled: boolean = false;
  @state() private sanitizedSlotContent: string = '';

  private receiveDisabled = false;

  connectedCallback() {
    super.connectedCallback();
  }
  
  async firstUpdated() {
    await this.updateComplete;

    const noDepths = this.parentElement instanceof NavElement;
    const parentSubNav = this.parentElement instanceof NavSubElement;
    const parentGroup = this.parentElement instanceof NavGroupElement;
    
    if(noDepths) {
      this.depth = 0;
    } else if (parentSubNav){
      this.depth = this.parentElement?.depth + 1;
    } else if (parentGroup) {
      this.depth = this.parentElement?.depth;
    }

    if(this.disabled){
      this.receiveDisabled = false;
    } else {
      this.receiveDisabled = true;
    }
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('parentDisabled') && this.receiveDisabled) {
      this.disabled = this.parentDisabled;
    }
  }   

  private sanitizeHtml(content: string): string {
    if (!content) return '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    return tempDiv.innerText.trim();
  }

  render() {
    return html`
      <li 
        class=${classMap({
          'active': this.active,
          'group-list': this.groupItem
        })}
        tabIndex="0"
        ?disabled=${this.disabled}
        title=${this.sanitizedSlotContent}
        @click=${this.onClick}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </li>
    `;
  }
 
  private handleSlotChange() {
    const slot = this.shadowRoot?.querySelector('slot');
    const assignedNodes = slot?.assignedNodes() || [];

    this.sanitizedSlotContent = assignedNodes
      .filter(node => node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE)
      .map(node => node.textContent)
      .join('');

    this.sanitizedSlotContent = this.sanitizeHtml(this.sanitizedSlotContent);
  }

  private onClick() {
    if (this.disabled) return;

    this.active = true;

    this.dispatchEvent(new CustomEvent('selected', {
      detail: this.value,
      bubbles: true,
      composed: true
    }));
  }
}
