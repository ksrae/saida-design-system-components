import { Component, Prop, State, h, Element, Watch } from '@stencil/core';

@Component({
  tag: 'sy-menu-item',
  shadow: false,
  scoped: true,
  styleUrl: 'sy-menu-item.scss',
})
export class SyMenuItem {
  @Element() host!: HTMLSyMenuItemElement;

  @Prop({ reflect: true }) disabled: boolean = false;
  @Prop() value: string = '';
  @Prop({ reflect: true, mutable: true }) select: boolean = false;

  @Prop({ reflect: true, mutable: true }) selectable: boolean = false;
  @Prop({ reflect: true, mutable: true }) checkable: boolean = false;
  @State() checked: boolean = false;
  @State() private sanitizedSlotContent: string = '';

  componentWillLoad() {
    // keep initial state in sync
    this.selectable = !!this.checkable;
    // initialize slot text before first render to avoid extra re-renders
    this.handleSlotChange();
  }

  @Watch('checkable')
  watchCheckable() {
    // when parent sets checkable, ensure selectable follows
    this.selectable = !!this.checkable;
  }

  // componentDidLoad removed to prevent setting state after first render

  // keep behavior: when checkable changes externally, ensure selectable sync
  // Stencil doesn't provide updated(changedProperties) directly; consumers should set props appropriately

  private sanitizeHtml(content: string): string {
    if (!content) return '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    return tempDiv.innerText.trim();
  }

  private handleSlotChange = () => {
    const slot = this.host.querySelector('slot');
    const assignedNodes = (slot as HTMLSlotElement | null)?.assignedNodes() || [];

    let text = assignedNodes
      .filter(node => node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE)
      .map(node => node.textContent)
      .join('');

    this.sanitizedSlotContent = this.sanitizeHtml(text || '');
  };

  private onClick = (e: Event) => {
    const ev = e as MouseEvent & { target: HTMLElement };
    e.preventDefault();
    if (this.disabled) return;

    const clickedElement = ev.target as HTMLElement;
    const liElement = this.host.querySelector('li');
    const slotElement = this.host.querySelector('slot');

    const slotNodes = (slotElement as HTMLSlotElement | null)?.assignedNodes() || [];
    const isInsideSlot = slotNodes.some(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        return (node as Element).contains(clickedElement);
      }
      return false;
    });

    if (isInsideSlot && clickedElement !== liElement) {
      e.stopPropagation();
      return;
    }

    if (this.checkable) {
      this.checked = !this.checked;
      this.select = !this.select;
      // prevent native click from bubbling to parent triggers
      ev.stopPropagation();
      this.setCheckedEvent();
    } else {
      this.select = true;
      // prevent native click from bubbling to parent triggers
      ev.stopPropagation();
      this.setSelectedEvent();
    }
  };

  // checkbox emits changed handled in original lit code; we keep a placeholder
  private handleCheckbox = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
  };

  private getSlotValueText(): string {
    const slot = this.host.querySelector('slot');
    const assignedNodes = (slot as HTMLSlotElement | null)?.assignedNodes() || [];
    return assignedNodes
      .filter(node => node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE)
      .map(node => node.textContent)
      .join('');
  }

  private setSelectedEvent() {
    const slotValue = this.getSlotValueText();
    this.host.dispatchEvent(new CustomEvent('itemSelected', {
      detail: { value: this.value, label: slotValue },
      bubbles: true,
      composed: true,
    }));
  }

  private setCheckedEvent() {
    const slotValue = this.getSlotValueText();
    this.host.dispatchEvent(new CustomEvent('itemChecked', {
      detail: { value: this.value, label: slotValue, checked: this.checked },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    console.log('[MENU-ITEM render] checkable:', this.checkable, 'checked:', this.checked);
    const liClass = {
      'menu-item--selected': this.selectable && this.select,
    };

    return (
      <li
        tabIndex={0}
        class={Object.keys(liClass).filter(k => (liClass as any)[k]).join(' ')}
        aria-disabled={this.disabled ? 'true' : 'false'}
        onClick={this.onClick}
        title={this.sanitizedSlotContent}
      >
        {this.checkable ? (
          <sy-checkbox checked={this.checked} onChanged={this.handleCheckbox}>
            <slot onSlotchange={this.handleSlotChange}></slot>
          </sy-checkbox>
        ) : (
          <slot onSlotchange={this.handleSlotChange}></slot>
        )}
      </li>
    );
  }
}
