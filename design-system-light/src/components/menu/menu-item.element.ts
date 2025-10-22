import { LitElement, html, CSSResultGroup, css, unsafeCSS, nothing } from 'lit';
import globalCSS from './styles/menu-item.scss?inline';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import '../checkbox/checkbox.element';

@customElement('sy-menu-item')
export class MenuItemElement extends LitElement {
  static styles: CSSResultGroup = css`${unsafeCSS(globalCSS)};`
  @property({ type: Boolean }) disabled: boolean = false;
  @property({ type: String }) value: string = '';
  // @property({ type: Boolean, reflect: true }) selectable: boolean = false;
  // @property({ type: Boolean, reflect: true }) checkable: boolean = false;
  @property({ type: Boolean, reflect: true }) select: boolean = false;
  @state() selectable: boolean = false;
  @state() checkable: boolean = false;
  // @state() selected: boolean = false;
  @state() checked: boolean = false;
  @state() private sanitizedSlotContent: string = '';

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has('checkable')) {
      this.selectable = this.checkable;
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
        tabIndex="0"
        class=${classMap({
          'menu-item--selected': this.selectable && this.select,
        })}
        ?disabled=${this.disabled}
        @click=${this.onClick}
        title=${this.sanitizedSlotContent}>
        ${this.checkable ?
          html`<sy-checkbox ?checked=${this.checked} @changed=${this.handleCheckbox}><slot @slotchange=${this.handleSlotChange}></slot></sy-checkbox>` :
          html`<slot @slotchange=${this.handleSlotChange}></slot>`
        }
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

  private onClick(e: any) {
    e.preventDefault();
    if(this.disabled) return;

    // If the click target is inside the slot content (not the li or checkbox), 
    // don't trigger menu item selection
    const clickedElement = e.target as HTMLElement;
    const liElement = this.shadowRoot?.querySelector('li');
    const slotElement = this.shadowRoot?.querySelector('slot');
    
    // Check if the clicked element is inside the slot content
    const slotNodes = slotElement?.assignedNodes() || [];
    const isInsideSlot = slotNodes.some(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        return (node as Element).contains(clickedElement);
      }
      return false;
    });

    // If clicked inside slot content (not on li itself or checkbox), don't close menu
    if (isInsideSlot && clickedElement !== liElement) {
      e.stopPropagation();
      return;
    }

    if(this.checkable) {
      this.checked = !this.checked;
      this.select = !this.select;
      this.setCheckedEvent();
    } else {
      this.select = true;
      this.setSelectedEvent();
    }
  }

  private handleCheckbox(e: CustomEvent) {
    e.preventDefault();
    e.stopPropagation(); // Prevent this from bubbling up to the menu item click handler

    // 오히려 checkbox에서 이벤트를 받아오면 안된다.
    // checkbox에서 리턴이 들어오는 결과를 다시 반영하면 다시 반복된다.
    // console.log('handleCheckbox', e.detail);
    // this.selected = e.detail.checked;
    // this.checked = e.detail.checked;
    // this.#setCheckedEvent();
  }

  private setSelectedEvent() {
    // get slot value as text
    const slot = this.shadowRoot?.querySelector('slot');
    const assignedNodes = slot?.assignedNodes() || [];
    
    const slotValue = assignedNodes
      .filter(node => node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE)
      .map(node => node.textContent)
      .join('');
  
    this.dispatchEvent(new CustomEvent('itemSelected', {
      detail: {value: this.value, label: slotValue},
      bubbles: true,
      composed: true
    }));
  }
  
  private setCheckedEvent() {
    // get slot value as text
    const slot = this.shadowRoot?.querySelector('slot');
    const assignedNodes = slot?.assignedNodes() || [];
    
    const slotValue = assignedNodes
      .filter(node => node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE)
      .map(node => node.textContent)
      .join('');

    this.dispatchEvent(new CustomEvent('itemChecked', {
      detail: {value: this.value, label: slotValue, checked: this.checked},
      bubbles: true,
      composed: true
    }));
  }
}
