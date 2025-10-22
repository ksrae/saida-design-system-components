import { LitElement, html, css, CSSResultGroup, unsafeCSS, nothing} from "lit";
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import globalCSS from "./styles/nav-sub.scss?inline";
import "../icon/icon.element";
import { NavItemElement } from "./nav-item.element";
import { NavElement } from "./nav.element";
import { NavGroupElement } from "./nav-group.element";

const SUBNAV = 'SY-NAV-SUB';
const GROUPNAV = 'SY-NAV-GROUP';
const NAVITEM = 'SY-NAV-ITEM';

@customElement('sy-nav-sub')
export class NavSubElement extends LitElement {
  static styles: CSSResultGroup = css`
  ${unsafeCSS(globalCSS)};
  `;
  @property({ type: String }) title: string = '';
  @property({ type: String }) value: string = '';
  @property({ type: Boolean }) open: boolean = false;
  @property({ type: Boolean, reflect: true }) disabled: boolean = false;
  
  // do not open to document
  @property({ type: Number, reflect: true }) depth: number = 0;

  @state() parentDisabled: boolean = false;
  @state() active: boolean = false;
  @state() trigger: 'click' | 'hover' = 'click';
  @state() groupItem: boolean = false;

  private receiveDisabled = false;
  private hasChild = false;

  
  async firstUpdated() {
    await this.updateComplete;
  
    this.updateTrigger();
    
    const noDepths = this.parentElement instanceof NavElement;
    const parentSubNav = this.parentElement instanceof NavSubElement;
    const parentGroupNav = this.parentElement instanceof NavGroupElement;
    
    if(noDepths) {
      this.depth = 0;
    } else if (parentSubNav) {
      this.depth = this.parentElement?.depth + 1;
    } else if (parentGroupNav) {
      this.depth = this.parentElement?.depth;
    }


    // handle enter key down event
    this.addEventListener("keydown", this.handleKeydown.bind(this));
  }

  public setTrigger() {
    if(this.open) {
      this.setClose();
    } else {
      this.setOpen();
    }
  }

  public setOpen() {
    if(this.disabled) return;

    this.open = true;
    this.active = true;
    this.requestUpdate();
    this.eventEmitter();
  }

  public setClose() {
    if(this.disabled) return;
    
    const children = Array.from(this.children);

    children?.forEach(child => {
      if(child.tagName === SUBNAV) {
        (child as any).setClose();
      }
    });
    this.open = false;
    this.active = true;
    this.requestUpdate();
    this.eventEmitter();
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('trigger')) {
      this.updateTrigger();
    } else if (changedProperties.has('parentDisabled')  && this.receiveDisabled) {
      this.disabled = this.parentDisabled;
    } else if(changedProperties.has('disabled')) {
      this.sendDisabled();
    }
  }

  private sendDisabled() {
    this.querySelectorAll('sy-nav-sub, sy-nav-item').forEach(element => {
      if (element instanceof NavSubElement) {
        element.parentDisabled = this.disabled;
      } else if(element instanceof NavItemElement) {
        element.parentDisabled = this.disabled;
      }
    });
  }

  private updateTrigger() {
    if(this.trigger === 'hover') {
      this.addEventListener('mouseenter', this.openOnMouseEnter);
      this.addEventListener('mouseleave', this.closeOnMouseLeave);
      this.removeEventListener('click', this.toggleOnClick);

    } else {
      this.removeEventListener('mouseenter', this.openOnMouseEnter);
      this.removeEventListener('mouseleave', this.closeOnMouseLeave);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    if(this.trigger === 'hover') {
      this.removeEventListener('mouseenter', this.openOnMouseEnter);
      this.removeEventListener('mouseleave', this.closeOnMouseLeave);
    }

    window.removeEventListener("keydown", this.handleKeydown);
  }

    
  private sanitizeHtml(content: string): string {
    if (!content) return '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    return tempDiv.innerText.trim();
  }

  render() {
    const toggleIconSvg = this.hasChild ? 
      (this.open ? 
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M303.5 207C312.9 197.6 328.1 197.6 337.4 207L497.4 367C506.8 376.4 506.8 391.6 497.4 400.9C488 410.2 472.8 410.3 463.5 400.9L320.5 257.9L177.5 400.9C168.1 410.3 152.9 410.3 143.6 400.9C134.3 391.5 134.2 376.3 143.6 367L303.6 207z"></path></svg>` : 
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M337.5 433C328.1 442.4 312.9 442.4 303.6 433L143.5 273C134.1 263.6 134.1 248.4 143.5 239.1C152.9 229.8 168.1 229.7 177.4 239.1L320.4 382.1L463.4 239.1C472.8 229.7 488 229.7 497.3 239.1C506.6 248.5 506.7 263.7 497.3 273L337.3 433z"></path></svg>`
      ) : '';

    return html`
        <div class=${classMap({
          'submenu-title': true,
          'active': this.active,
          'open': this.open && this.hasChild,
          'close': !this.open && this.hasChild,
          'group-list': this.groupItem
        })} 
        tabindex="0"
        value=${this.value}
        title=${this.sanitizeHtml(this.title)}
        @click=${this.toggleOnClick}
      >
        <span class="title">${unsafeHTML(this.title)}</span>
        
        ${toggleIconSvg ? html`
          <span class="toggle-icon">
            <sy-icon>${unsafeHTML(toggleIconSvg)}</sy-icon>
          </span>` : nothing}
      </div>
      <ul class=${classMap({
        submenu: true,
        open: this.open
      })}>
        <slot @slotchange="${this.handleSlotChange}"></slot>
      </ul>
    `;
  }

  private toggleOnClick() {
    if (this.trigger === 'click') {
      this.setTrigger();
    }
  }

  private openOnMouseEnter() {
    if (this.trigger !== 'click') {
      this.setOpen();
    }
  }

  private closeOnMouseLeave() {
    if (this.trigger !== 'click') {
      this.setClose();
    }
  }

  private handleKeydown(e: KeyboardEvent) {
    e.stopPropagation();
    if (e.code === "Enter" && e.target === this) {
      if(this.open){
        this.setClose(); 
      } else {
        this.setOpen();
      }
    }
  }
  
  private handleSlotChange() {
    const children = Array.from(this.children).filter(child => {
      if(child.tagName === SUBNAV || child.tagName === NAVITEM || child.tagName === GROUPNAV) {
        return true;
      }
      return false;
    });

    this.hasChild = children && children.length > 0;
    this.requestUpdate();
  }

  private eventEmitter() {
    if(this.value) {
      this.dispatchEvent(new CustomEvent('selected', {
        detail: this.value,
        bubbles: true,
        composed: true
      }));
    }
  }
}
