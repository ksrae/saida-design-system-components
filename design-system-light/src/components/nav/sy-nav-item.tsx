import { Component, Prop, State, h, Element, Watch, Method } from '@stencil/core';
import { HTMLSyNavSubElement } from './sy-nav-sub';
import { HTMLSyNavGroupElement } from './sy-nav-group';

export interface SyNavItemProps {
  value?: string;
  disabled?: boolean;
  depth?: number;
}

export interface HTMLSyNavItemElement extends HTMLElement {
  value?: string;
  active?: boolean;
  setActive?: (active: boolean) => Promise<void>;
  parentDisabled?: boolean;
  groupItem?: boolean;
}

/**
 * sy-nav-item (Stencil port, light DOM, scoped)
 * - Navigation item component
 * - Manages active state and depth calculation
 */
@Component({
  tag: 'sy-nav-item',
  styleUrl: 'sy-nav-item.scss',
  scoped: true,
  shadow: false,
})
export class SyNavItem {
  @Element() host!: HTMLElement;

  @Prop() value: string = '';
  @Prop({ reflect: true }) disabled: boolean = false;
  @Prop({ reflect: true, mutable: true }) depth: number = 0;

  @State() active: boolean = false;
  @State() groupItem: boolean = false;
  @State() parentDisabled: boolean = false;
  @State() private sanitizedSlotContent: string = '';

  private receiveDisabled = false;

  connectedCallback() {
    // Calculate depth based on parent element
    this.calculateDepth();
    
    if (this.disabled) {
      this.receiveDisabled = false;
    } else {
      this.receiveDisabled = true;
    }
  }

  componentWillLoad() {
    // initialize sanitized slot content before first render to avoid extra re-renders
    this.handleSlotChange();
  }

  @Watch('parentDisabled')
  watchParentDisabled(newValue: boolean) {
    if (this.receiveDisabled) {
      this.disabled = newValue;
    }
  }

  private calculateDepth() {
    const parent = this.host.parentElement;
    if (!parent) return;
    
    const parentTagName = parent.tagName.toLowerCase();
    
    if (parentTagName === 'sy-nav') {
      this.depth = 0;
    } else if (parentTagName === 'sy-nav-sub') {
      const parentSub = parent as HTMLSyNavSubElement;
      this.depth = (parentSub.depth || 0) + 1;
    } else if (parentTagName === 'sy-nav-group') {
      const parentGroup = parent as HTMLSyNavGroupElement;
      this.depth = parentGroup.depth || 0;
    }
  }

  private sanitizeHtml(content: string): string {
    if (!content) return '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    return tempDiv.innerText.trim();
  }

  private handleSlotChange = () => {
    // Light DOM에서 slot content 추출
    const textContent = this.host.textContent || '';
    this.sanitizedSlotContent = this.sanitizeHtml(textContent);
  }

  @Method()
  public async setActive(active: boolean) {
    this.active = active;
  }

  private onClick = () => {
    if (this.disabled) return;

    this.active = true;

    const selectedEvent = new CustomEvent('selected', {
      detail: this.value,
      bubbles: true,
      composed: true,
    });
    this.host.dispatchEvent(selectedEvent);
  };

  render() {
    const classes = {
      'nav-item': true,
      'active': this.active,
      'group-list': this.groupItem,
      'disabled': this.disabled,
    };

    return (
      <li
        class={classes}
        tabIndex={this.disabled ? -1 : 0}
        title={this.sanitizedSlotContent}
        onClick={this.onClick}
      >
        <slot onSlotchange={this.handleSlotChange}></slot>
      </li>
    );
  }
}
