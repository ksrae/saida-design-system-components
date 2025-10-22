import { LitElement, html, CSSResultGroup, css, unsafeCSS, PropertyValueMap } from "lit";
import { customElement, property, state } from 'lit/decorators.js';
import { ToastItemElement } from './toast-item.element';
import globalCSS from "./styles/toast.scss?inline";
import "../icon/icon.element";

@customElement('sy-toast-message')
export class ToastElement extends LitElement {
  static styles: CSSResultGroup = css`
    ${unsafeCSS(globalCSS)};
  `;  
  @property({ type: Boolean }) latestTop = false;
  @state() defaultDuration = 3000;

async firstUpdated() {
  await this.updateComplete;
}

// updated(changedProperties: Map<string | number | symbol, unknown>): void {
//   if(changedProperties.has('hoverIndex')) {
  // position?: 'topLeft' | 'top' | 'topRight' | 'bottomLeft' | 'bottom' | 'bottomRight', 
  public createToast(
    variant: 'neutral' | 'success' | 'error' | 'info' | 'warning',
    option?: {
      position?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight', 
      closable?: boolean, 
      duration?: number, 
      iconSlot?: string | HTMLElement,
      headerSlot?: string | HTMLElement, 
      bodySlot?: string | HTMLElement, 
      footerSlot?: string | HTMLElement
    }
  ) {
    const toastItem = document.createElement('sy-toast-message-item') as any;
    toastItem.setAttribute('variant', variant ?? 'neutral');
    toastItem.setAttribute('position', option?.position ?? 'bottomRight');
    toastItem.setAttribute('open', '');

    toastItem.duration = option?.duration ?? this.defaultDuration;
    toastItem.closable = option?.closable ?? false;
    toastItem.latestTop = this.latestTop;

      // 슬롯에서 직접 내용 가져오기
    const iconSlot = (this.shadowRoot?.querySelector('slot[name="icon"]') as any)?.assignedNodes()[0];
    const headerSlot = (this.shadowRoot?.querySelector('slot[name="header"]') as any)?.assignedNodes()[0];
    const bodySlot = (this.shadowRoot?.querySelector('slot[name="body"]') as any)?.assignedNodes()[0];
    const footerSlot = (this.shadowRoot?.querySelector('slot[name="footer"]') as any)?.assignedNodes()[0];

    // Slot content creation and cloning
    if(option?.iconSlot) {
      const iconSlot = this.createSlotElement(option.iconSlot, 'icon');
      toastItem.appendChild(iconSlot);
    } else if(iconSlot) {
      toastItem.appendChild(iconSlot.cloneNode(true));
    }

    if(option?.headerSlot) {
      const headerSlot = this.createSlotElement(option.headerSlot, 'header');
      toastItem.appendChild(headerSlot);
    } else if(headerSlot) {
      toastItem.appendChild(headerSlot.cloneNode(true));
    }

    if(option?.bodySlot) {
      const bodySlot = this.createSlotElement(option.bodySlot, 'body');
      toastItem.appendChild(bodySlot);
    } else if(bodySlot) {
      toastItem.appendChild(bodySlot.cloneNode(true));
    }

    if(option?.footerSlot) {
      const footerSlot = this.createSlotElement(option.footerSlot, 'footer');
      toastItem.appendChild(footerSlot);
    } else if(footerSlot) {
      toastItem.appendChild(footerSlot.cloneNode(true));
    }
    document.body.appendChild(toastItem);
  }

  private createSlotElement(content: string | HTMLElement, slotName: string): HTMLElement {
    const slotElement = document.createElement('div');
    slotElement.setAttribute('slot', slotName);
    
    if (typeof content === 'string') {
      slotElement.innerHTML = content;
    } else {
      slotElement.appendChild(content);
    }
    
    return slotElement;
  }

  public createNeutralToast(option?: {
    position?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight', 
    closable?: boolean, 
    duration?: number, 
    iconSlot?: string | HTMLElement,
    headerSlot?: string | HTMLElement, 
    bodySlot?: string | HTMLElement, 
    footerSlot?: string | HTMLElement
  }) {
    this.createToast('neutral', option);
  }

  public createSuccessToast(option?: {
    position?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight',
    closable?: boolean, 
    duration?: number, 
    iconSlot?: string | HTMLElement,
    headerSlot?: string | HTMLElement, 
    bodySlot?: string | HTMLElement, 
    footerSlot?: string | HTMLElement
  }) {
    this.createToast('success', option);
  }

  public createErrorToast(option?: {
    position?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight',
    closable?: boolean, 
    duration?: number, 
    iconSlot?: string | HTMLElement,
    headerSlot?: string | HTMLElement, 
    bodySlot?: string | HTMLElement, 
    footerSlot?: string | HTMLElement
  }) {
    this.createToast('error', option);
  }

  public createInfoToast(option?: {
    position?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight',
    closable?: boolean, 
    duration?: number, 
    iconSlot?: string | HTMLElement,
    headerSlot?: string | HTMLElement, 
    bodySlot?: string | HTMLElement, 
    footerSlot?: string | HTMLElement
  }) {
    this.createToast('info', option);
  }

  public createWarningToast(option?: {
    position?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight',
    closable?: boolean, 
    duration?: number, 
    iconSlot?: string | HTMLElement,
    headerSlot?: string | HTMLElement, 
    bodySlot?: string | HTMLElement, 
    footerSlot?: string | HTMLElement
  }) {
    this.createToast('warning', option);
  }

  public closeToast(toastItemElement: ToastItemElement) {
    toastItemElement.remove(); // 간단하게 제거
    // notification.close();
  }

  render() {
    return html`
      <slot name="icon"></slot>
      <slot name="header"></slot>
      <slot name="body"></slot>
      <slot name="footer"></slot>
    `;
  }
}

// <sy-notifications></sy-notifications>  
// <button id="aaa">Create Notification</button>
// <script>
//   let index = 0;
//   const notifications = document.querySelector('sy-notifications');
//   const aaa = document.querySelector('#aaa');
//   aaa.addEventListener('click', () => {
    
//     notifications.createBlank({
//       header: 'Notification Header' + (index++).toString(),
//       body: 'Notification Body',
//       latestontop: false,
//     });
//   });
// </script>