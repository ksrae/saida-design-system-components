import { Component, Prop, State, Element, Watch, Method, Event, EventEmitter, h } from '@stencil/core';
import { fnAssignPropFromAlias } from '../../utils/utils';

/**
 * sy-modal — centered modal dialog with optional maximize/drag.
 *
 * Spec: design-system-specs/components/modal.yaml
 *
 * Variants:
 *   - `dialog` — simple centered confirmation/form modal.
 *   - `modal`  — draggable + optionally resizable window with maximize support
 *               via `enableModalMaximize`.
 *
 * Props (spec-aligned + legacy aliases via fnAssignPropFromAlias):
 *   - open, closable, variant
 *   - cancelText ↔ `cancel-text`, okText ↔ `ok-text`
 *   - enableModalMaximize ↔ `enable-modal-maximize`
 *   - hideFooter ↔ `hide-footer`, maskClosable ↔ `mask-closable`
 *   - width (px, 0 = auto), height (px, 0 = auto, `modal` variant)
 *   - top, left (px, '-1' or unset = auto-center)
 *
 * Slots: header, body, footer — each replaces the default when supplied.
 *
 * Methods: setOpen(), setClose(value?), setCancel(value?), setOk(value?),
 * setMaximum() (variant=modal only).
 *
 * Event: closed — { event: 'ok'|'cancel'|'close', value, maximized, position }.
 */
@Component({
  tag: 'sy-modal',
  styleUrl: 'sy-modal.scss',
  shadow: false,
  scoped: true,
})
export class SyModal {
  @Element() host!: HTMLSyModalElement;

  // Props
  @Prop({ attribute: 'cancelText', mutable: true }) cancelText: string = '';
  @Prop() closable: boolean = false;
  @Prop({ attribute: 'enableModalMaximize', mutable: true }) enableModalMaximize: boolean = false;
  @Prop({ attribute: 'hideFooter', mutable: true }) hideFooter: boolean = false;
  @Prop({ attribute: 'maskClosable', mutable: true }) maskClosable: boolean = false;
  @Prop({ attribute: 'okText', mutable: true }) okText: string = '';
  @Prop({ mutable: true }) open: boolean = false;
  @Prop() width: number = 0;
  /** Custom height in pixels (`modal` variant only). 0 = auto. */
  @Prop() height: number = 0;
  @Prop() top: string = '-1';
  @Prop() left: string = '-1';
  @Prop() variant: 'modal' | 'dialog' = 'dialog';

  /** Fires when the modal closes. `detail.event` distinguishes ok / cancel / close. */
  @Event() closed!: EventEmitter<{
    event: 'ok' | 'cancel' | 'close';
    value: any;
    maximized: boolean;
    position: { top: string; left: string };
  }>;

  // State
  @State() maximized: boolean = false;
  @State() isCustomHeader: boolean = false;
  @State() isCustomFooter: boolean = false;
  @State() modalWidth: string = '';

  // Private properties
  private dragging: boolean = false;
  private offsetX: number = 0;
  private offsetY: number = 0;
  private startX: number = 0;
  private startY: number = 0;
  private startWidth: number = 0;
  private startHeight: number = 0;
  private startLeft: number = 0;
  private startTop: number = 0;
  private resizeHandle: DOMTokenList | null = null;
  private addedToBody: boolean = false;
  private scrollsize: number = 15;
  private minWidth: number = 100;
  private minHeight: number = 1;

  connectedCallback() {
    document.addEventListener('keydown', this.handleKeydown);
  }

  componentWillLoad() {
    this.cancelText = fnAssignPropFromAlias(this.host, 'cancel-text') ?? this.cancelText;
    this.enableModalMaximize = fnAssignPropFromAlias(this.host, 'enable-modal-maximize') ?? this.enableModalMaximize;
    this.hideFooter = fnAssignPropFromAlias(this.host, 'hide-footer') ?? this.hideFooter;
    this.maskClosable = fnAssignPropFromAlias(this.host, 'mask-closable') ?? this.maskClosable;
    this.okText = fnAssignPropFromAlias(this.host, 'ok-text') ?? this.okText;

    if (this.top === undefined) {
      this.top = '-1';
    }
    if (this.left === undefined) {
      this.left = '-1';
    }

    // Don't check slots here - wait for after render
  }

  componentDidLoad() {
    // Set up MutationObserver to watch for slot changes
    this.setupSlotObserver();

    // Initial check after a short delay to ensure DOM is ready
    setTimeout(() => {
      this.updateSlotContents();
    }, 10);
  }

  private slotObserver: MutationObserver | null = null;

  private setupSlotObserver() {
    if (typeof window !== 'undefined' && this.host) {
      this.slotObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList' || mutation.type === 'attributes') {
            this.updateSlotContents();
          }
        });
      });

      this.slotObserver.observe(this.host, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['slot']
      });
    }
  }

  private updateSlotContents() {
    this.isCustomFooter = this.hasSlotContents('footer');
    this.isCustomHeader = this.hasSlotContents('header');
  }

  @Watch('open')
  handleOpenChange() {
    if (this.open) {
      this.setOpen();
    } else {
      this.removeModal();
    }
  }

  @Watch('width')
  handleWidthChange() {
    this.modalWidth = this.width > 0 ? `${this.width}px` : 'auto';
  }

  @Watch('height')
  handleHeightChange() {
    if (this.variant !== 'modal') return;
    const container = this.host.querySelector('.modal-container') as HTMLElement | null;
    if (!container) return;
    container.style.height = this.height > 0 ? `${this.height}px` : 'auto';
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this.handleKeydown);
    this.removeModal();

    // Clean up MutationObserver
    if (this.slotObserver) {
      this.slotObserver.disconnect();
      this.slotObserver = null;
    }
  }

  // Public methods
  @Method()
  async setOpen() {
    if (!this.open) {
      this.open = true;
    }
    this.appendToRoot();

    // Use setTimeout to ensure DOM is ready
    setTimeout(() => {
      this.setModalPosition();
      // Re-check slot contents when modal opens
      this.updateSlotContents();
    }, 0);
  }

  @Method()
  async setClose(value?: any) {
    this.closeModal('close', value);
  }

  @Method()
  async setCancel(value?: any) {
    this.closeModal('cancel', value);
  }

  @Method()
  async setOk(value?: any) {
    this.closeModal('ok', value);
  }

  @Method()
  async setMaximum() {
    if (this.variant === 'modal' && this.enableModalMaximize) {
      this.maximized = !this.maximized;

      const modalContainer = this.host.querySelector('.modal-container') as HTMLElement;
      if (modalContainer) {
        if (this.maximized) {
          // Save original position and size
          this.startLeft = modalContainer.offsetLeft;
          this.startTop = modalContainer.offsetTop;
          this.startWidth = modalContainer.offsetWidth;

          // Set maximized state
          modalContainer.style.left = '0';
          modalContainer.style.top = '0';
          this.modalWidth = '100%';
          modalContainer.style.height = '100%';
        } else {
          // Restore original size and position
          modalContainer.style.left = `${this.startLeft}px`;
          modalContainer.style.top = `${this.startTop}px`;
          this.modalWidth = `${this.startWidth}px`;
          modalContainer.style.height = 'auto';
        }
      }
    }
  }

  private appendToRoot = () => {
    if (this.host.isConnected && !this.addedToBody) {
      document.body.appendChild(this.host);
      this.addedToBody = true;

      const hasHeaderText = this.hasSlotContents('header');
      this.isCustomHeader = hasHeaderText;

      const hasFooterText = this.hasSlotContents('footer');
      this.isCustomFooter = hasFooterText;
    }
  }

  private setModalPosition() {
    const modalContainer = this.host.querySelector('.modal-container') as HTMLElement;
    if (!modalContainer) return;

    const modalWidth = modalContainer.offsetWidth;
    const modalHeight = modalContainer.offsetHeight;

    const topValue = this.parsePosition(this.top);
    const leftValue = this.parsePosition(this.left);

    if (leftValue !== -1 && topValue !== -1) {
      modalContainer.style.left = `${leftValue}px`;
      modalContainer.style.top = `${topValue}px`;
    } else {
      const left = Math.max(0, (window.innerWidth - modalWidth) / 2);
      const top = Math.max(0, (window.innerHeight - modalHeight) / 2);
      modalContainer.style.left = `${left}px`;
      modalContainer.style.top = `${top}px`;
    }
  }

  private parsePosition(value: string): number {
    if (value === undefined || value === 'undefined' || value === '' || value === null) {
      return -1;
    }

    const numValue = Number(value);
    return isNaN(numValue) ? -1 : numValue;
  }

  private removeModal = () => {
    if (this.host.isConnected && this.addedToBody) {
      try {
        document.body.removeChild(this.host);
        this.open = false;
        this.addedToBody = false;
      } catch (err: any) {
        // console.log({err});
      }
    }
  }

  private handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (this.closable) {
        this.closeModal('close');
      }
    }
  }

  private handleWrapperClick = (e: any) => {
    if (this.variant === 'modal' && this.resizeHandle) {
      this.resizeHandle = null;
      return;
    }

    if (this.maskClosable) {
      const modalContainer = this.host.querySelector('.modal-container');

      if (modalContainer && modalContainer.contains(e.target as Node)) {
        return;
      }

      e.preventDefault();
      this.closeModal('close');
    }
  }

  private handleMaximized = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    this.setMaximum();
  }

  private handleClose = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    this.closeModal('close');
  }

  private handleCancel = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    this.closeModal('cancel');
  }

  private handleOk = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    this.closeModal('ok');
  }

  private closeModal(eventName: 'ok' | 'cancel' | 'close', value?: any) {
    this.setEvent(eventName, value);
    this.removeModal();
  }

  private setEvent(eventName: 'ok' | 'cancel' | 'close', value?: any) {
    const modalContainer = this.host.querySelector('.modal-container') as HTMLElement;
    let position = { top: '0', left: '0' };

    if (modalContainer) {
      position = {
        top: modalContainer.style.top || '0',
        left: modalContainer.style.left || '0'
      };
    }

    this.closed.emit({
      event: eventName,
      value: value ?? '',
      maximized: this.maximized,
      position,
    });
  }

  private onMouseDown = (event: MouseEvent) => {
    event.preventDefault();

    if (this.variant === 'modal' && !this.maximized) {
      const modalContainer = this.host.querySelector('.modal-container') as HTMLElement;

      this.startX = event.clientX;
      this.startY = event.clientY;
      this.offsetX = modalContainer.offsetLeft;
      this.offsetY = modalContainer.offsetTop;

      this.dragging = true;
      window.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('mouseup', this.onMouseUp);
    }
  }

  private onMouseMove = (event: MouseEvent) => {
    if (this.dragging) {
      const modalContainer = this.host.querySelector('.modal-container') as HTMLElement;

      const left = this.offsetX + (event.clientX - this.startX);
      const top = this.offsetY + (event.clientY - this.startY);

      const maxLeft = window.innerWidth - modalContainer.offsetWidth;
      const maxTop = window.innerHeight - modalContainer.offsetHeight;

      const offsetLeft = Math.max(0, Math.min(maxLeft, left));
      const offsetTop = Math.max(0, Math.min(maxTop, top));

      const isOverflow = this.hasOverflow(modalContainer);

      modalContainer.style.left = `${isOverflow.height ? Math.max(0, offsetLeft - this.scrollsize) : offsetLeft}px`;
      modalContainer.style.top = `${isOverflow.width ? Math.max(0, offsetTop - this.scrollsize) : offsetTop}px`;
    }
  }

  private hasOverflow(_element: any) {
    const isWidthOverflow = document.body.scrollWidth > window.innerWidth;
    const isHeightOverflow = document.body.scrollHeight > window.innerHeight;
    return { width: isWidthOverflow, height: isHeightOverflow };
  }

  private onMouseUp = () => {
    this.dragging = false;
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  }

  private onResizeStart = (event: MouseEvent) => {
    if (this.variant !== 'modal' || (this.variant === 'modal' && this.maximized)) return;

    const target = event.target as HTMLElement;
    if (!target.classList.contains('resize-handle')) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    this.startX = event.clientX;
    this.startY = event.clientY;

    const modalContainer = this.host.querySelector('.modal-container') as HTMLElement;
    this.startWidth = modalContainer.offsetWidth;
    this.startHeight = modalContainer.offsetHeight;
    this.startLeft = modalContainer.offsetLeft;
    this.startTop = modalContainer.offsetTop;

    this.resizeHandle = target.classList;

    window.addEventListener('mousemove', this.onResize);
    window.addEventListener('mouseup', this.onResizeEnd);
  }

  private onResize = (event: MouseEvent) => {
    if (this.resizeHandle === null) return;

    const dx = event.clientX - this.startX;
    const dy = event.clientY - this.startY;

    const modalContainer = this.host.querySelector('.modal-container') as HTMLElement;

    let newWidth = this.startWidth;
    let newHeight = this.startHeight;
    let newLeft = this.startLeft;
    let newTop = this.startTop;

    if (this.resizeHandle.contains('bottom-right')) {
      newWidth = this.startWidth + dx;
      newHeight = this.startHeight + dy;
    } else if (this.resizeHandle.contains('bottom-left')) {
      newWidth = this.startWidth - dx;
      newHeight = this.startHeight + dy;
      newLeft = this.startLeft + dx;
    } else if (this.resizeHandle.contains('top-right')) {
      newWidth = this.startWidth + dx;
      newHeight = this.startHeight - dy;
      newTop = this.startTop + dy;
    } else if (this.resizeHandle.contains('top-left')) {
      newWidth = this.startWidth - dx;
      newHeight = this.startHeight - dy;
      newLeft = this.startLeft + dx;
      newTop = this.startTop + dy;
    } else if (this.resizeHandle.contains('top')) {
      newHeight = this.startHeight - dy;
      newTop = this.startTop + dy;
    } else if (this.resizeHandle.contains('bottom')) {
      newHeight = this.startHeight + dy;
    } else if (this.resizeHandle.contains('left')) {
      newWidth = this.startWidth - dx;
      newLeft = this.startLeft + dx;
    } else if (this.resizeHandle.contains('right')) {
      newWidth = this.startWidth + dx;
    }

    const finalWidth = Math.max(newWidth, this.minWidth);
    const finalHeight = Math.max(newHeight, this.minHeight);

    if (finalWidth !== newWidth) {
      if (this.resizeHandle.contains('left') || this.resizeHandle.contains('top-left') || this.resizeHandle.contains('bottom-left')) {
        newLeft = this.startLeft - (finalWidth - this.startWidth);
      }
    }

    if (finalHeight !== newHeight) {
      if (this.resizeHandle.contains('top') || this.resizeHandle.contains('top-left') || this.resizeHandle.contains('top-right')) {
        newTop = this.startTop - (finalHeight - this.startHeight);
      }
    }

    modalContainer.style.width = `${finalWidth}px`;
    modalContainer.style.height = `${finalHeight}px`;
    modalContainer.style.left = `${newLeft}px`;
    modalContainer.style.top = `${newTop}px`;
  }

  private onResizeEnd = () => {
    window.removeEventListener('mousemove', this.onResize);
    window.removeEventListener('mouseup', this.onResizeEnd);
  }

  private hasSlotContents(slot: 'header' | 'footer'): boolean {
    // For Light DOM, check if there are elements with slot attribute
    const slottedElements = this.host.querySelectorAll(`[slot="${slot}"]`);

    if (slottedElements.length === 0) {
      // console.log(`Slot "${slot}" is empty`);
      return false;
    }

    // Check if any slotted element has meaningful content
    const hasContent = Array.from(slottedElements).some(element => {
      // Skip empty elements
      if (!element.textContent?.trim() && element.children.length === 0) {
        return false;
      }

      // Check if element has children with actual content (recursive)
      const hasChildrenWithContent = Array.from(element.children).some(child => {
        // Recursively check nested children
        if (child.children.length > 0) {
          return Array.from(child.children).some(grandChild =>
            grandChild.textContent?.trim() !== '' || grandChild.children.length > 0
          );
        }
        return child.textContent?.trim() !== '';
      });

      // Check if element itself has meaningful text content
      const hasText = element.textContent?.trim() !== '';

      // Check if element has meaningful attributes (excluding slot attribute)
      const meaningfulAttrs = Array.from(element.attributes).filter(attr =>
        attr.name !== 'slot' && attr.value.trim() !== ''
      );

      const result = hasChildrenWithContent || hasText || meaningfulAttrs.length > 0;

      return result;
    });

    return hasContent;
  }

  render() {
    const maximizeIcon = this.maximized ?
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M256 120C256 106.7 245.3 96 232 96C218.7 96 208 106.7 208 120L208 208L120 208C106.7 208 96 218.7 96 232C96 245.3 106.7 256 120 256L232 256C245.3 256 256 245.3 256 232L256 120zM120 384C106.7 384 96 394.7 96 408C96 421.3 106.7 432 120 432L208 432L208 520C208 533.3 218.7 544 232 544C245.3 544 256 533.3 256 520L256 408C256 394.7 245.3 384 232 384L120 384zM432 120C432 106.7 421.3 96 408 96C394.7 96 384 106.7 384 120L384 232C384 245.3 394.7 256 408 256L520 256C533.3 256 544 245.3 544 232C544 218.7 533.3 208 520 208L432 208L432 120zM408 384C394.7 384 384 394.7 384 408L384 520C384 533.3 394.7 544 408 544C421.3 544 432 533.3 432 520L432 432L520 432C533.3 432 544 421.3 544 408C544 394.7 533.3 384 520 384L408 384z"/></svg>' :
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M232 96C245.3 96 256 106.7 256 120C256 133.3 245.3 144 232 144L144 144L144 232C144 245.3 133.3 256 120 256C106.7 256 96 245.3 96 232L96 120C96 106.7 106.7 96 120 96L232 96zM96 408C96 394.7 106.7 384 120 384C133.3 384 144 394.7 144 408L144 496L232 496C245.3 496 256 506.7 256 520C256 533.3 245.3 544 232 544L120 544C106.7 544 96 533.3 96 520L96 408zM520 96C533.3 96 544 106.7 544 120L544 232C544 245.3 533.3 256 520 256C506.7 256 496 245.3 496 232L496 144L408 144C394.7 144 384 133.3 384 120C384 106.7 394.7 96 408 96L520 96zM496 408C496 394.7 506.7 384 520 384C533.3 384 544 394.7 544 408L544 520C544 533.3 533.3 544 520 544L408 544C394.7 544 384 533.3 384 520C384 506.7 394.7 496 408 496L496 496L496 408z"/></svg>';

    const closeIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M135.5 169C126.1 159.6 126.1 144.4 135.5 135.1C144.9 125.8 160.1 125.7 169.4 135.1L320.4 286.1L471.4 135.1C480.8 125.7 496 125.7 505.3 135.1C514.6 144.5 514.7 159.7 505.3 169L354.3 320L505.3 471C514.7 480.4 514.7 495.6 505.3 504.9C495.9 514.2 480.7 514.3 471.4 504.9L320.4 353.9L169.4 504.9C160 514.3 144.8 514.3 135.5 504.9C126.2 495.5 126.1 480.3 135.5 471L286.5 320L135.5 169z"/></svg>';

    return (
      <div
        class={{
          'modal-wrapper': true,
          'modal-wrapper--open': this.open,
          'modal-wrapper--maximize': this.maximized && this.variant === 'modal',
          'mask': true,
        }}
        onClick={this.handleWrapperClick}
      >
        <div
          class="modal-container"
          style={{ width: this.modalWidth }}
          onClick={(e: Event) => e.stopPropagation()}
        >
          <div
            class={{
              'modal-header': true,
              'draggable': this.variant === 'modal',
            }}
            onMouseDown={this.onMouseDown}
          >
            <div class="header-title">
              <slot name="header"></slot>
              {!this.isCustomHeader && 'Modal'}
            </div>
            <div class="header-button-container">
              {this.variant === 'modal' && this.enableModalMaximize ? (
                <sy-icon
                  size="large"
                  onClick={this.handleMaximized}
                  svgMarkup={maximizeIcon}
                />
              ) : null}

              {this.closable ? (
                <sy-icon
                  size="large"
                  onClick={this.handleClose}
                  svgMarkup={closeIcon}
                />
              ) : null}
            </div>
          </div>

          <div class="modal-body">
            <slot name="body"></slot>
          </div>

          <div
            class={{
              'modal-footer': true,
              'hidden': this.hideFooter,
            }}
          >
            <slot name="footer"></slot>
            {!this.isCustomFooter ? (
              <div class="footer-button-container">
                <sy-button
                  size="medium"
                  onClick={this.handleCancel}
                >
                  {this.cancelText || 'Cancel'}
                </sy-button>
                <sy-button
                  size="medium"
                  variant="primary"
                  onClick={this.handleOk}
                >
                  {this.okText || 'Ok'}
                </sy-button>
              </div>
            ) : null}
          </div>

          {this.variant === 'modal' ? (
            <div>
              <div class="resize-handle bottom-right" onMouseDown={this.onResizeStart}></div>
              <div class="resize-handle bottom-left" onMouseDown={this.onResizeStart}></div>
              <div class="resize-handle top-right" onMouseDown={this.onResizeStart}></div>
              <div class="resize-handle top-left" onMouseDown={this.onResizeStart}></div>
              <div class="resize-handle top" onMouseDown={this.onResizeStart}></div>
              <div class="resize-handle bottom" onMouseDown={this.onResizeStart}></div>
              <div class="resize-handle left" onMouseDown={this.onResizeStart}></div>
              <div class="resize-handle right" onMouseDown={this.onResizeStart}></div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

/*
Modal Component Usage Examples:

1. Basic Modal:
<sy-modal
  open={true}
  closable={true}
  cancelText="취소"
  okText="확인"
  onClosed={(e) => console.log('Modal closed:', e.detail)}
>
  <div slot="header">Modal Title</div>
  <div slot="body">
    <p>This is the modal content.</p>
  </div>
</sy-modal>

2. Draggable Modal:
<sy-modal
  variant="modal"
  open={true}
  closable={true}
  enableModalMaximize={true}
  maskClosable={true}
  width={600}
  top="100"
  left="200"
>
  <div slot="header">Draggable Modal</div>
  <div slot="body">
    <p>This modal can be dragged and resized.</p>
  </div>
</sy-modal>

3. Modal with Custom Footer:
<sy-modal
  open={true}
  closable={true}
  hideFooter={false}
>
  <div slot="header">Custom Footer Modal</div>
  <div slot="body">
    <p>Modal with custom footer content.</p>
  </div>
  <div slot="footer">
    <sy-button variant="secondary">Custom Button</sy-button>
  </div>
</sy-modal>

4. Programmatic Control:
const modal = document.querySelector('sy-modal');
await modal.setOpen();        // Open modal
await modal.setClose();       // Close modal
await modal.setMaximum();     // Toggle maximize
await modal.setCancel('test'); // Trigger cancel with value
await modal.setOk('result');  // Trigger ok with value

5. Event Handling:
<sy-modal
  open={true}
  onClosed={(e) => {
    console.log('Modal closed with:', e.detail.event);
    console.log('Return value:', e.detail.value);
    console.log('Position:', e.detail.position);
    console.log('Maximized:', e.detail.maximized);
  }}
>
  <div slot="body">Content</div>
</sy-modal>

Features:
- Light DOM with scoped styles
- Draggable and resizable (modal variant only)
- Maximizable (modal variant only)
- Keyboard support (ESC to close)
- Mask click to close (configurable)
- Custom positioning
- Slot-based content (header, body, footer)
- Event-driven architecture
- TypeScript support
*/
