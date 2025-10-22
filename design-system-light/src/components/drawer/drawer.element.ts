import { LitElement, html, css,  CSSResultGroup, unsafeCSS, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import "../divider/divider.element";
import "../icon/icon.element";
import globalCSS from "./styles/drawer.scss?inline";

@customElement('sy-drawer')
export class DrawerElement extends LitElement {
  static styles: CSSResultGroup = css`
  ${unsafeCSS(globalCSS)};
  `;  
  @property({ type: Boolean }) maskless: boolean = false;
  @property({ type: Boolean }) preventClose: boolean = false;
  @property({ type: String }) position: 'top' | 'left' | 'right' | 'bottom' = 'right';
  @property({ type: String }) size: 'small' | 'medium' | 'large' | 'custom' = 'medium';
  @property({ type: Boolean }) closable: boolean = false;
  @property({ type: Boolean, reflect: true }) open: boolean = false;
  @property({ type: Number }) customSize: number = 100;

  private addedToBody = false;
  private firstRenderCompleted = false;
  
  constructor() {
    super();
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    // passive: true로 성능 최적화
    document.addEventListener("click", this.handleOutsideClick, true);
  }

  async firstUpdated() {
    await this.updateComplete;
    this.firstRenderCompleted = true;
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has('open')) {
      if (this.open) {
        this.appendToRoot();
        // Set a timeout to allow the drawer to render before accepting outside clicks
      } else {
        this.closeDrawer();
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this.handleOutsideClick, true);
  }

  render() {
    const hasHeaderContent = this.hasSlotContent('header');
    const hasFooterContent = this.hasSlotContent('footer');

    return html`
      <div class="drawer-wrapper">
        ${!this.maskless
          ? html`<div
              class="drawer-mask"
              @click="${this.onMaskClick}"
            ></div>`
          : nothing}
        <div
          class="${classMap({
            "drawer-container": true,
            [this.position]: true,
            "small": this.size === 'small',
            "large": this.size === 'large',
            "medium": this.size === 'medium',
          })}"
          style="${this.customSizeStyles()}"
        >
          ${this.closable || (!this.closable && hasHeaderContent)
            ? html`
              <div class="drawer-header">
                <div class="${classMap({
                  "drawer-header-content": true,
                  [this.position]: true,
                })}">
                  <slot name="header"></slot>
                </div>
                ${this.closable
                  ? html`
                      <div class="${classMap({
                        'drawer-header-button-container': true,
                        [this.position]: true,
                      })}">
                      <sy-icon selectable size="large" @selected=${this.closeDrawer}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M135.5 169C126.1 159.6 126.1 144.4 135.5 135.1C144.9 125.8 160.1 125.7 169.4 135.1L320.4 286.1L471.4 135.1C480.8 125.7 496 125.7 505.3 135.1C514.6 144.5 514.7 159.7 505.3 169L354.3 320L505.3 471C514.7 480.4 514.7 495.6 505.3 504.9C495.9 514.2 480.7 514.3 471.4 504.9L320.4 353.9L169.4 504.9C160 514.3 144.8 514.3 135.5 504.9C126.2 495.5 126.1 480.3 135.5 471L286.5 320L135.5 169z"/></svg>
                      </sy-icon>                        
                      </div>
                    `
                  : nothing}
              </div>
            `
            : nothing}


          <div class="drawer-body">
            <slot name="body"></slot>
          </div>


          ${hasFooterContent ? html`
            <div class="drawer-footer">
              <slot name="footer"></slot>
            </div>
          `: nothing}


        </div>
      </div>
    `;
  }

  private handleOutsideClick(e: MouseEvent) {
    // Ignore if outside clicks are not enabled or if it's the first render
    if (this.preventClose || !this.firstRenderCompleted) {
      return;
    }

    // Get the drawer container
    let container = this.shadowRoot?.querySelector('.drawer-container') as HTMLElement;
    
    // Check if the click is outside the drawer and the drawer's host element
    const isOutsideDrawer = 
      this.open && 
      this.addedToBody && 
      !container?.contains(e.target as Node) && 
      !this.contains(e.target as Node);

    if (isOutsideDrawer) {
      // Use requestAnimationFrame to ensure this runs after other potential click handlers
      requestAnimationFrame(() => {
        this.open = false;
      });
    }
  }

  private appendToRoot() {
    if (!this.addedToBody) {
      document.body.appendChild(this);
      this.addedToBody = true;
    }

    this.dispatchEvent(
      new CustomEvent('opened', {
        detail: this,
        bubbles: true,
        composed: true,
        cancelable: false,
      })
    );
  }

  private hasSlotContent(slotName: string): boolean {
    const slot = this.querySelector(`[slot="${slotName}"]`);
    return slot !== null;
  }

  private customSizeStyles() {
    if (this.size === 'custom') {
      switch (this.position) {
        case 'left':
        case 'right':
          return `width: ${this.customSize}px; height: 100%;`;
        case 'top':
        case 'bottom':
          return `height: ${this.customSize}px; width: 100%;`;
        default:
          return '';
      }
    }
    return '';
  }


  private removeDrawer() {
    if (this.isConnected && this.addedToBody) {
      try {
        this.open = false;
        this.addedToBody = false;
        // document.body.removeChild(this);

      } catch (err: any) {
        console.error(err);
      }
    }
  }

  private closeDrawer() {
    this.removeDrawer();

    this.dispatchEvent(
      new CustomEvent('closed', {
        detail: this,
        bubbles: true,
        composed: true,
        cancelable: false,
      })
    );
  }

  private onMaskClick() {
    if (!this.preventClose) {
      this.closeDrawer();
    }
  }
}
