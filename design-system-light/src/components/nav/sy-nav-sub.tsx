import { Component, Prop, State, h, Element, Watch, Method } from '@stencil/core';
import { HTMLSyNavItemElement } from './sy-nav-item';
import { HTMLSyNavGroupElement } from './sy-nav-group';

export interface SyNavSubProps {
  title?: string;
  value?: string;
  open?: boolean;
  disabled?: boolean;
  depth?: number;
}

export interface HTMLSyNavSubElement extends HTMLElement {
  value?: string;
  active?: boolean;
  setActive?: (active: boolean) => Promise<void>;
  parentDisabled?: boolean;
  depth?: number;
  setClose?: () => void;
  groupItem?: boolean;
}

const SUBNAV = 'SY-NAV-SUB';
const GROUPNAV = 'SY-NAV-GROUP';
const NAVITEM = 'SY-NAV-ITEM';

/**
 * sy-nav-sub (Stencil port, light DOM, scoped)
 * - Navigation submenu component with collapsible functionality
 * - Supports click and hover triggers
 */
@Component({
  tag: 'sy-nav-sub',
  styleUrl: 'sy-nav-sub.scss',
  scoped: true,
  shadow: false,
})
export class SyNavSub {
  @Element() host!: HTMLElement;

  @Prop() title: string = '';
  @Prop() value: string = '';
  @Prop({ mutable: true }) open: boolean = false;
  @Prop({ reflect: true }) disabled: boolean = false;
  @Prop({ reflect: true, mutable: true }) depth: number = 0;

  @State() parentDisabled: boolean = false;
  @State() active: boolean = false;
  @State() trigger: 'click' | 'hover' = 'click';
  @State() groupItem: boolean = false;

  private receiveDisabled = false;
  private hasChild = false;
  private keydownHandler?: (e: KeyboardEvent) => void;

  connectedCallback() {
    this.calculateDepth();
    this.updateTrigger();
    
    if (this.disabled) {
      this.receiveDisabled = false;
    } else {
      this.receiveDisabled = true;
    }

    // Handle enter key down event
    this.keydownHandler = this.handleKeydown.bind(this);
    this.host.addEventListener('keydown', this.keydownHandler);
  }

  componentDidLoad() {
    this.handleSlotChange();
    this.sendDisabled();
  }

  disconnectedCallback() {
    if (this.trigger === 'hover') {
      this.host.removeEventListener('mouseenter', this.openOnMouseEnter);
      this.host.removeEventListener('mouseleave', this.closeOnMouseLeave);
    }
    
    if (this.keydownHandler) {
      this.host.removeEventListener('keydown', this.keydownHandler);
    }
  }

  @Watch('trigger')
  watchTrigger() {
    this.updateTrigger();
  }

  @Watch('parentDisabled')
  watchParentDisabled(newValue: boolean) {
    if (this.receiveDisabled) {
      this.disabled = newValue;
    }
  }

  @Watch('disabled')
  watchDisabled() {
    this.sendDisabled();
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

  private sendDisabled() {
    const elements = this.host.querySelectorAll('sy-nav-sub, sy-nav-item');
    elements.forEach((element) => {
      if (element.tagName.toUpperCase() === 'SY-NAV-SUB') {
        (element as HTMLSyNavSubElement).parentDisabled = this.disabled;
      } else if (element.tagName.toUpperCase() === 'SY-NAV-ITEM') {
        (element as HTMLSyNavItemElement).parentDisabled = this.disabled;
      }
    });
  }

  private updateTrigger() {
    if (this.trigger === 'hover') {
      this.host.addEventListener('mouseenter', this.openOnMouseEnter);
      this.host.addEventListener('mouseleave', this.closeOnMouseLeave);
    } else {
      this.host.removeEventListener('mouseenter', this.openOnMouseEnter);
      this.host.removeEventListener('mouseleave', this.closeOnMouseLeave);
    }
  }

  public setTrigger() {
    if (this.open) {
      this.setClose();
    } else {
      this.setOpen();
    }
  }

  public setOpen() {
    if (this.disabled) return;

    this.open = true;
    this.active = true;
    this.eventEmitter();
  }

  public setClose() {
    if (this.disabled) return;
    
    const children = Array.from(this.host.children);
    children?.forEach(child => {
      if (child.tagName.toUpperCase() === SUBNAV) {
        const childSub = child as HTMLSyNavSubElement;
        childSub.setClose?.();
      }
    });
    
    this.open = false;
    this.active = true;
    this.eventEmitter();
  }

  private sanitizeHtml(content: string): string {
    if (!content) return '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    return tempDiv.innerText.trim();
  }

  private toggleOnClick = () => {
    if (this.trigger === 'click') {
      this.setTrigger();
    }
  };

  private openOnMouseEnter = () => {
    if (this.trigger !== 'click') {
      this.setOpen();
    }
  };

  private closeOnMouseLeave = () => {
    if (this.trigger !== 'click') {
      this.setClose();
    }
  };

  private handleKeydown(e: KeyboardEvent) {
    e.stopPropagation();
    if (e.code === 'Enter' && e.target === this.host) {
      if (this.open) {
        this.setClose();
      } else {
        this.setOpen();
      }
    }
  }

  private handleSlotChange = () => {
    const children = Array.from(this.host.children).filter(child => {
      const tagName = child.tagName.toUpperCase();
      return tagName === SUBNAV || tagName === NAVITEM || tagName === GROUPNAV;
    });

    this.hasChild = children && children.length > 0;
  };

  @Method()
  public async setActive(active: boolean) {
    this.active = active;
  }

  private eventEmitter() {
    if (this.value) {
      const selectedEvent = new CustomEvent('selected', {
        detail: this.value,
        bubbles: true,
        composed: true,
      });
      this.host.dispatchEvent(selectedEvent);
    }
  }

  render() {
    const toggleIconSvg = this.hasChild ? 
      (this.open ? 
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M303.5 207C312.9 197.6 328.1 197.6 337.4 207L497.4 367C506.8 376.4 506.8 391.6 497.4 400.9C488 410.2 472.8 410.3 463.5 400.9L320.5 257.9L177.5 400.9C168.1 410.3 152.9 410.3 143.6 400.9C134.3 391.5 134.2 376.3 143.6 367L303.6 207z"></path></svg>` : 
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M337.5 433C328.1 442.4 312.9 442.4 303.6 433L143.5 273C134.1 263.6 134.1 248.4 143.5 239.1C152.9 229.8 168.1 229.7 177.4 239.1L320.4 382.1L463.4 239.1C472.8 229.7 488 229.7 497.3 239.1C506.6 248.5 506.7 263.7 497.3 273L337.3 433z"></path></svg>`
      ) : '';

    const titleClasses = {
      'submenu-title': true,
      'active': this.active,
      'open': this.open && this.hasChild,
      'close': !this.open && this.hasChild,
      'group-list': this.groupItem,
    };

    const submenuClasses = {
      'submenu': true,
      'open': this.open,
    };

    return (
      <div>
        <div
          class={titleClasses}
          tabIndex={0}
          title={this.sanitizeHtml(this.title)}
          onClick={this.toggleOnClick}
        >
          <span class="title" innerHTML={this.title}></span>
          
          {toggleIconSvg && (
            <span class="toggle-icon">
              <sy-icon innerHTML={toggleIconSvg}></sy-icon>
            </span>
          )}
        </div>
        <ul class={submenuClasses}>
          <slot onSlotchange={this.handleSlotChange}></slot>
        </ul>
      </div>
    );
  }
}
