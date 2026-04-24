import { Component, h, Prop, State, Element, Watch, Listen, Event, EventEmitter, Method } from '@stencil/core';
import { fnAssignPropFromAlias } from '../../utils/utils';

const DEBOUNCE_TIME = 50;

/**
 * sy-inline-message — contextual feedback anchored to a triggering element.
 *
 * Spec: design-system-specs/components/inline-message.yaml
 *
 * Anatomy:
 *   .inline-massage-container
 *     ├─ sy-icon             (variant icon, toggleable via `icon`)
 *     └─ .inline-group
 *          ├─ <slot>          (message text)
 *          └─ .inline-message-button-area  (action slot or btnLabel-driven button)
 *
 * Legacy aliases (accepted via fnAssignPropFromAlias so older markup keeps working):
 *   - spec `icon`        ↔ legacy `show-icon` / `showIcon`
 *   - spec `placement`   ↔ legacy `position`
 *   - spec `action`      ↔ legacy `btn-label`/`btnLabel` (boolean toggle + label string stays usable)
 *   - spec variant `informational` ↔ legacy `info`
 *
 * Not form-associated. Positioning auto-switches axis when there's not enough
 * space on the preferred side.
 */
@Component({
  tag: 'sy-inline-message',
  styleUrl: 'sy-inline-message.scss',
  scoped: true,
  shadow: false,
})
export class SyInlineMessage {
  @Element() host!: HTMLSyInlineMessageElement;

  // --- Public Properties ---
  @Prop({ reflect: true, mutable: true }) variant: 'informational' | 'info' | 'success' | 'warning' | 'error' = 'informational';
  @Prop() message: string = 'Inline message';
  @Prop({ mutable: true }) icon: boolean = true;
  @Prop({ attribute: 'showIcon', mutable: true }) showIcon?: boolean;
  @Prop({ mutable: true }) action: boolean = false;
  @Prop({ reflect: true, mutable: true }) open: boolean = false;
  @Prop() trigger: 'click' | 'focusout' = 'click';
  @Prop({ attribute: 'btnLabel', mutable: true }) btnLabel: string = '';
  @Prop({ mutable: true }) placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
  // Legacy alias for `placement`. Exposed as a @Prop (not just a read-once alias)
  // so runtime attribute changes from storybook controls propagate via @Watch.
  @Prop({ mutable: true }) position?: 'top' | 'bottom' | 'left' | 'right';
  @Prop() sticky: boolean = false;

  // --- Internal State ---
  @State() private iconType: string = '';

  // --- Events (camelCase to match Stencil convention; listener must use matching camelCase) ---
  @Event() actionClick!: EventEmitter<MouseEvent>;
  @Event() btnClick!: EventEmitter<MouseEvent>; // legacy alias
  @Event() dismiss!: EventEmitter<void>;

  // --- Private ---
  private parentDom!: HTMLElement | null;
  private addedToBody = false;
  private timeId: any;

  // --- Lifecycle ---

  componentWillLoad() {
    // Legacy attribute aliases that aren't already @Prop-backed.
    const showHyphen = fnAssignPropFromAlias<boolean>(this.host, 'show-icon');
    if (showHyphen !== null && showHyphen !== undefined) this.showIcon = showHyphen;
    // `showIcon` prop (if set) overrides the `icon` default.
    if (this.showIcon !== undefined) this.icon = this.showIcon;

    const btnLabelAlias = fnAssignPropFromAlias<string>(this.host, 'btn-label');
    if (btnLabelAlias !== null && btnLabelAlias !== undefined) this.btnLabel = btnLabelAlias;

    // Sync legacy `position` → canonical `placement` on first render.
    if (this.position) this.placement = this.position;

    // `info` is a legacy alias for `informational` — normalize early so downstream
    // logic only has to deal with the canonical value.
    if ((this.variant as string) === 'info') {
      this.variant = 'informational';
    }

    this.updateIconType(this.variant);
  }

  connectedCallback() {
    document.addEventListener('click', this.handleOutsideClick, true);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.handleOutsideClick, true);
    window.removeEventListener('scroll', this.debounceUpdate, true);
    window.removeEventListener('resize', this.debounceUpdate, true);
    this.removeInlineMsg();
  }

  componentDidLoad() {
    this.parentDom = this.host.parentElement;

    if (this.open) {
      this.appendToRoot();
    } else {
      this.host.style.visibility = 'hidden';
    }

    this.addEvent();
  }

  // --- Watchers ---

  @Watch('variant')
  handleVariantChange(newValue: string) {
    if (newValue === 'info') {
      this.variant = 'informational';
      return;
    }
    this.updateIconType(newValue);
  }

  @Watch('trigger')
  handleTriggerChange() {
    this.addEvent();
  }

  @Watch('open')
  handleOpenChange(newValue: boolean) {
    if (newValue) {
      this.appendToRoot();
    } else {
      this.removeInlineMsg();
      this.dismiss.emit();
    }
  }

  @Watch('position')
  handlePositionChange(newValue?: 'top' | 'bottom' | 'left' | 'right') {
    if (newValue) this.placement = newValue;
  }

  @Watch('showIcon')
  handleShowIconChange(newValue?: boolean) {
    // `showIcon` is the legacy input; `icon` is the canonical flag used in render.
    if (newValue !== undefined) this.icon = newValue;
  }

  @Listen('scroll', { target: 'window', capture: true })
  @Listen('resize', { target: 'window', capture: true })
  handleWindowActivity() {
    this.debounceUpdate();
  }

  // --- Public Methods ---

  /** Programmatically show the inline message. */
  @Method()
  async show(): Promise<void> {
    this.open = true;
  }

  /** Programmatically hide the inline message. */
  @Method()
  async hide(): Promise<void> {
    this.open = false;
  }

  // --- Private ---

  private updateIconType(variantValue: string) {
    switch (variantValue) {
      case 'success':
        this.iconType = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM404.4 276.7L324.4 404.7C320.2 411.4 313 415.6 305.1 416C297.2 416.4 289.6 412.8 284.9 406.4L236.9 342.4C228.9 331.8 231.1 316.8 241.7 308.8C252.3 300.8 267.3 303 275.3 313.6L302.3 349.6L363.7 251.3C370.7 240.1 385.5 236.6 396.8 243.7C408.1 250.8 411.5 265.5 404.4 276.8z"/></svg>';
        break;
      case 'warning':
        this.iconType = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M320 64C334.7 64 348.2 72.1 355.2 85L571.2 485C577.9 497.4 577.6 512.4 570.4 524.5C563.2 536.6 550.1 544 536 544L104 544C89.9 544 76.9 536.6 69.6 524.5C62.3 512.4 62.1 497.4 68.8 485L284.8 85C291.8 72.1 305.3 64 320 64zM320 232C306.7 232 296 242.7 296 256L296 368C296 381.3 306.7 392 320 392C333.3 392 344 381.3 344 368L344 256C344 242.7 333.3 232 320 232zM346.7 448C347.3 438.1 342.4 428.7 333.9 423.5C325.4 418.4 314.7 418.4 306.2 423.5C297.7 428.7 292.8 438.1 293.4 448C292.8 457.9 297.7 467.3 306.2 472.5C314.7 477.6 325.4 477.6 333.9 472.5C342.4 467.3 347.3 457.9 346.7 448z"/></svg>';
        break;
      case 'error':
        this.iconType = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM231 231C240.4 221.6 255.6 221.6 264.9 231L319.9 286L374.9 231C384.3 221.6 399.5 221.6 408.8 231C418.1 240.4 418.2 255.6 408.8 264.9L353.8 319.9L408.8 374.9C418.2 384.3 418.2 399.5 408.8 408.8C399.4 418.1 384.2 418.2 374.9 408.8L319.9 353.8L264.9 408.8C255.5 418.2 240.3 418.2 231 408.8C221.7 399.4 221.6 384.2 231 374.9L286 319.9L231 264.9C221.6 255.5 221.6 240.3 231 231z"/></svg>';
        break;
      case 'informational':
      case 'info':
      default:
        this.iconType = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM288 224C288 206.3 302.3 192 320 192C337.7 192 352 206.3 352 224C352 241.7 337.7 256 320 256C302.3 256 288 241.7 288 224zM280 288L328 288C341.3 288 352 298.7 352 312L352 400L360 400C373.3 400 384 410.7 384 424C384 437.3 373.3 448 360 448L280 448C266.7 448 256 437.3 256 424C256 410.7 266.7 400 280 400L304 400L304 336L280 336C266.7 336 256 325.3 256 312C256 298.7 266.7 288 280 288z"/></svg>';
        break;
    }
  }

  private appendToRoot = () => {
    if (this.parentDom !== document.body) {
      // Pre-position before appending so the element never paints at body's
      // (0,0) for the 50ms debounce window. visibility stays hidden until
      // updateInlineMsg finishes its measurement pass.
      this.host.style.position = 'absolute';
      this.host.style.visibility = 'hidden';
      if (this.parentDom) {
        const rect = this.parentDom.getBoundingClientRect();
        this.host.style.top = `${window.scrollY + rect.bottom}px`;
        this.host.style.left = `${window.scrollX + rect.left}px`;
      }
      document.body.appendChild(this.host);
      this.addedToBody = true;
      // Run measurement synchronously (via rAF) on first append — skip the
      // 50ms debounce so the user doesn't see the unstyled intermediate.
      this.updateInlineMsg();
    }
  };

  private removeInlineMsg = () => {
    this.host.style.visibility = 'hidden';
    if (this.host.isConnected && this.addedToBody) {
      try {
        document.body.removeChild(this.host);
        this.addedToBody = false;
      } catch {
        /* already removed */
      }
    }
  };

  private addEvent = () => {
    const parent = this.parentDom;
    if (!parent) return;

    parent.removeEventListener('focusout', this.parentFocusOut);
    parent.removeEventListener('focus', this.parentFocus);
    parent.removeEventListener('click', this.parentClick);

    if (this.trigger === 'click') {
      parent.addEventListener('click', this.parentClick);
    } else if (this.trigger === 'focusout') {
      parent.addEventListener('focusout', this.parentFocusOut);
      parent.addEventListener('focus', this.parentFocus);
    }
  };

  private debounceUpdate = () => {
    if (this.timeId) clearTimeout(this.timeId);
    this.timeId = setTimeout(() => this.updateInlineMsg(), DEBOUNCE_TIME);
  };

  private updateInlineMsg = () => {
    if (!this.addedToBody || this.parentDom === document.body || !this.parentDom) return;

    if (!this.sticky && !this.isParentInView()) {
      this.host.style.visibility = 'hidden';
      return;
    }

    const parentRect = this.parentDom.getBoundingClientRect();

    // Keep the element hidden while we measure it — no off-screen `-9999px`
    // teleport. `visibility: hidden` preserves layout dimensions, so
    // getBoundingClientRect still returns correct sizes. Combined with the
    // `:host { position: absolute }` default, the element stays out of flow
    // and can't cause the page to shift.
    this.host.style.display = 'block';
    this.host.style.position = 'absolute';
    this.host.style.visibility = 'hidden';

    requestAnimationFrame(() => {
      const inlineMsgRect = this.host.getBoundingClientRect();
      const location = this.setLocation(parentRect, inlineMsgRect);

      const leftSpace = parentRect.left - inlineMsgRect.width;
      const rightSpace = window.innerWidth - (parentRect.right + inlineMsgRect.width);
      const topSpace = parentRect.top - inlineMsgRect.height;
      const bottomSpace = window.innerHeight - (parentRect.bottom + inlineMsgRect.height);

      let replace = this.placement;
      if (this.placement === 'left' && leftSpace < 0 && rightSpace > 0) replace = 'right';
      else if (this.placement === 'right' && rightSpace < 0 && leftSpace > 0) replace = 'left';
      else if (this.placement === 'top' && topSpace < 0 && bottomSpace > 0) replace = 'bottom';
      else if (this.placement === 'bottom' && bottomSpace < 0 && topSpace > 0) replace = 'top';

      const inlineMsgLocation = location[replace];
      this.host.style.top = `${inlineMsgLocation.top}px`;
      this.host.style.left = `${inlineMsgLocation.left}px`;

      this.adjustForScreenBounds(inlineMsgRect);
      // Flip to visible in the same frame as the final position so the user
      // never sees an intermediate coordinate.
      this.host.style.visibility = 'visible';
    });
  };

  private adjustForScreenBounds = (inlineMsgRect: DOMRect): boolean => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    let adjusted = false;

    const currentLeft = parseFloat(this.host.style.left);
    const currentTop = parseFloat(this.host.style.top);

    if (currentLeft < window.scrollX) {
      this.host.style.left = `${window.scrollX}px`;
      adjusted = true;
    } else if (currentLeft + inlineMsgRect.width > window.scrollX + viewportWidth) {
      this.host.style.left = `${window.scrollX + viewportWidth - inlineMsgRect.width}px`;
      adjusted = true;
    }

    if (currentTop < window.scrollY) {
      this.host.style.top = `${window.scrollY}px`;
      adjusted = true;
    } else if (currentTop + inlineMsgRect.height > window.scrollY + viewportHeight) {
      this.host.style.top = `${window.scrollY + viewportHeight - inlineMsgRect.height}px`;
      adjusted = true;
    }

    return adjusted;
  };

  private handleOutsideClick = (event: MouseEvent) => {
    const isInMsg = this.host.contains(event.target as Node);
    const isParent = this.parentDom?.contains(event.target as Node);
    if (this.trigger === 'click' && !isInMsg && !isParent) {
      this.open = false;
    }
  };

  private parentClick = (event: MouseEvent) => {
    event.preventDefault();
    this.open = !this.open;
  };

  private parentFocusOut = (event: FocusEvent) => {
    event.preventDefault();
    if (!this.open) this.open = true;
  };

  private parentFocus = (event: FocusEvent) => {
    event.preventDefault();
    if (this.open) this.open = false;
  };

  private setLocation = (parentRect: DOMRect, inlineMsgRect: DOMRect) => {
    const style = window.getComputedStyle(this.host);
    const paddingTop = parseFloat(style.paddingTop) || 0;

    return {
      top: {
        top: window.scrollY + parentRect.top - inlineMsgRect.height - paddingTop,
        left: window.scrollX + parentRect.left + (parentRect.width - inlineMsgRect.width) / 2,
      },
      bottom: {
        top: window.scrollY + parentRect.bottom,
        left: window.scrollX + parentRect.left + (parentRect.width - inlineMsgRect.width) / 2,
      },
      left: {
        top: window.scrollY + parentRect.top + (parentRect.height - inlineMsgRect.height) / 2,
        left: window.scrollX + parentRect.left - inlineMsgRect.width,
      },
      right: {
        top: window.scrollY + parentRect.top + (parentRect.height - inlineMsgRect.height) / 2,
        left: window.scrollX + parentRect.right,
      },
    };
  };

  private isParentInView(): boolean {
    if (!this.parentDom) return false;
    const rect = this.parentDom.getBoundingClientRect();
    return (
      rect.top < window.innerHeight &&
      rect.bottom > 0 &&
      rect.left < window.innerWidth &&
      rect.right > 0
    );
  }

  private handleActionClick = (e: MouseEvent) => {
    e.preventDefault();
    this.actionClick.emit(e);
    this.btnClick.emit(e); // legacy alias
  };

  render() {
    // Live-region role: errors/warnings announce assertively, info/success politely.
    const liveRole = (this.variant === 'error' || this.variant === 'warning') ? 'alert' : 'status';
    const ariaLive = (this.variant === 'error' || this.variant === 'warning') ? 'assertive' : 'polite';

    const hasActionSlot = this.host.querySelector('[slot="action"]') !== null;
    const showActionArea = hasActionSlot || this.btnLabel.trim().length > 0;

    // Class keeps the legacy `info` token too so existing CSS selectors still match.
    const variantClass = this.variant === 'informational' ? 'info informational' : this.variant;

    return (
      <div
        class={{
          'inline-massage-container': true,
          [variantClass]: true,
          [this.placement]: true,
        }}
        role={liveRole}
        aria-live={ariaLive}
      >
        {this.icon && (
          <sy-icon size="xlarge" class="messege-icon" svgMarkup={this.iconType}></sy-icon>
        )}
        <div class="inline-group">
          <span class="inline-message">{this.message}</span>
          {showActionArea && (
            <div class="inline-message-button-area">
              {hasActionSlot ? (
                <slot name="action" />
              ) : (
                <sy-button class="inline-message-action" onClick={this.handleActionClick} size="small">
                  {this.btnLabel.trim()}
                </sy-button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
