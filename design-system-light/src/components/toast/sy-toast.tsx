import { Component, Prop, Method, Element, h } from '@stencil/core';
import { fnAssignPropFromAlias } from '../../utils/utils';

export interface ToastOptions {
  position?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  closable?: boolean;
  duration?: number;
  iconSlot?: string | HTMLElement;
  headerSlot?: string | HTMLElement;
  bodySlot?: string | HTMLElement;
  footerSlot?: string | HTMLElement;
}

@Component({
  tag: 'sy-toast',
  styleUrl: 'sy-toast.scss',
  scoped: true,
  shadow: false,
})
export class SyToast {
  @Element() host: HTMLSyToastElement;

  @Prop({ attribute: 'latestTop', mutable: true }) latestTop: boolean = false;
  @Prop() duration: number = 3000;

  componentWillLoad() {
    this.latestTop = fnAssignPropFromAlias(this.host, 'latest-top') ?? this.latestTop;
  }

  private createSlotElement(content: string | HTMLElement, slotName: string): HTMLElement {
    const slotElement = document.createElement('div');
    slotElement.setAttribute('slot', slotName);
    if (typeof content === 'string') {
      slotElement.innerHTML = content;
    } else {
      slotElement.appendChild(content.cloneNode(true));
    }
    return slotElement;
  }

  @Method()
  async createToast(
    variant: 'neutral' | 'success' | 'error' | 'info' | 'warning',
    option?: ToastOptions
  ) {
    const toastItem = document.createElement('sy-toast-item') as HTMLSyToastItemElement;

    toastItem.variant = variant ?? 'neutral';
    toastItem.position = option?.position ?? 'bottomRight';
    // sy-toast-item의 duration prop에 값을 명시적으로 전달합니다.
    toastItem.duration = option?.duration ?? this.duration;
    toastItem.closable = option?.closable ?? false;
    toastItem.latestTop = this.latestTop;

    if (option?.iconSlot) toastItem.appendChild(this.createSlotElement(option.iconSlot, 'icon'));
    if (option?.headerSlot) toastItem.appendChild(this.createSlotElement(option.headerSlot, 'header'));
    if (option?.bodySlot) toastItem.appendChild(this.createSlotElement(option.bodySlot, 'body'));
    if (option?.footerSlot) toastItem.appendChild(this.createSlotElement(option.footerSlot, 'footer'));

    document.body.appendChild(toastItem);

    // [핵심 수정]
    // 1. 'sy-toast-item' 커스텀 엘리먼트가 브라우저에 완전히 정의될 때까지 기다립니다.
    await customElements.whenDefined('sy-toast-item');

    // 2. 다음 프레임에 toastItem의 'show()' 메소드를 직접 호출하여 타이머와 애니메이션을 시작합니다.
    requestAnimationFrame(() => {
        toastItem.show();
    });
  }

  @Method() async createNeutralToast(option?: ToastOptions) { this.createToast('neutral', option); }
  @Method() async createSuccessToast(option?: ToastOptions) { this.createToast('success', option); }
  @Method() async createErrorToast(option?: ToastOptions) { this.createToast('error', option); }
  @Method() async createInfoToast(option?: ToastOptions) { this.createToast('info', option); }
  @Method() async createWarningToast(option?: ToastOptions) { this.createToast('warning', option); }

  @Method()
  async closeToast(toastItemElement: HTMLSyToastItemElement) {
    if (toastItemElement && typeof toastItemElement.close === 'function') {
        toastItemElement.close();
    }
  }

  render() {
    return (
      <div style={{ display: 'none' }}>
        <slot name="icon"></slot>
        <slot name="header"></slot>
        <slot name="body"></slot>
        <slot name="footer"></slot>
      </div>
    );
  }
}
