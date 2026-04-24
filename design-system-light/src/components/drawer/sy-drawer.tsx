import { Component, h, Prop, Element, Watch, Event, EventEmitter, Listen } from '@stencil/core';
import { fnAssignPropFromAlias, fnHasSlotContentByName } from '../../utils/utils';

/**
 * sy-drawer — sliding edge panel for secondary navigation / content.
 *
 * Spec: design-system-specs/components/drawer.yaml
 * Anatomy:
 *   .drawer-wrapper
 *     ├─ .drawer-mask      (backdrop, hidden when maskless=true)
 *     └─ .drawer-container (the sliding panel)
 *           ├─ .drawer-header  (slot="header" + close button)
 *           ├─ .drawer-body    (slot="body")
 *           └─ .drawer-footer  (slot="footer")
 *
 * Spec vs code naming reconciliation (rule 6: document-first, accept legacy aliases):
 *   - spec `placement`    ↔ code `position`
 *   - spec `opened`       ↔ code `open`
 *   - spec `maskClosable` ↔ accepted as attribute, drives backdrop-click close
 *
 * Mounting target (SAIDA extension):
 *   - By default the drawer appends itself to `document.body` so `position: fixed`
 *     resolves against the viewport.
 *   - When the `parentid` attribute is set, the drawer mounts into
 *     `document.getElementById(parentid)` instead and uses `position: absolute`
 *     so it can be scoped inside a specific page region (e.g., split-panel side).
 *     If the target's computed `position` is `static`, the host auto-upgrades it
 *     to `relative` so the drawer's `position: absolute` has a containing block.
 *
 * Not a form-associated element.
 */
@Component({
  tag: 'sy-drawer',
  styleUrl: 'sy-drawer.scss',
  shadow: false,
  scoped: true,
})
export class SyDrawer {
  @Element() host!: HTMLSyDrawerElement;

  // --- Public Properties (code API; spec names accepted as aliases below) ---
  @Prop({ reflect: true }) maskless: boolean = false;
  @Prop({ attribute: 'preventClose', mutable: true, reflect: true }) preventClose: boolean = false;
  @Prop({ reflect: true }) closable: boolean = false;
  @Prop({ mutable: true, reflect: true }) open: boolean = false;
  @Prop({ attribute: 'customSize', mutable: true, reflect: true }) customSize: number = 100;
  @Prop({ mutable: true }) position: 'top' | 'left' | 'right' | 'bottom' = 'right';
  @Prop({ mutable: true }) size: 'small' | 'medium' | 'large' | 'custom' = 'medium';
  /** When true, clicking the backdrop closes the drawer. Spec: `maskClosable`. */
  @Prop({ mutable: true }) maskClosable: boolean = true;
  /** When true, drawer closes on browser history navigation. Spec default: true. */
  @Prop({ mutable: true }) closeOnNavigation: boolean = true;
  /** ID of a parent element that should contain this drawer instead of document.body.
   *  When set, `position: absolute` is used so the drawer is scoped to that region.
   *  When empty (default), the drawer uses `position: fixed` and mounts on document.body. */
  @Prop({ attribute: 'parentid', reflect: true, mutable: true }) parentId: string = '';

  @Event() opened!: EventEmitter<void>;
  @Event() closed!: EventEmitter<void>;

  // Tracks where the drawer was relocated to so disconnectedCallback can clean up
  // correctly regardless of whether we landed in body or in a scoped parent.
  private mountedParent: HTMLElement | null = null;
  private popstateHandler?: () => void;

  constructor() {
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  connectedCallback() {
    document.addEventListener('click', this.handleOutsideClick, true);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.handleOutsideClick, true);
    if (this.popstateHandler) {
      window.removeEventListener('popstate', this.popstateHandler);
      this.popstateHandler = undefined;
    }
    if (this.mountedParent && this.mountedParent.contains(this.host)) {
      this.mountedParent.removeChild(this.host);
    }
    this.mountedParent = null;
  }

  componentWillLoad() {
    // Legacy + spec aliases resolved here so both attribute names work on the host.
    this.preventClose     = fnAssignPropFromAlias<boolean>(this.host, 'prevent-close') ?? this.preventClose;
    this.customSize       = fnAssignPropFromAlias<number>(this.host, 'custom-size') ?? this.customSize;
    this.maskClosable     = fnAssignPropFromAlias<boolean>(this.host, 'mask-closable', 'maskClosable') ?? this.maskClosable;
    this.closeOnNavigation = fnAssignPropFromAlias<boolean>(this.host, 'close-on-navigation', 'closeOnNavigation') ?? this.closeOnNavigation;

    const placement = fnAssignPropFromAlias<'top' | 'left' | 'right' | 'bottom'>(this.host, 'placement');
    if (placement) this.position = placement;

    const openedAttr = fnAssignPropFromAlias<boolean>(this.host, 'opened');
    if (openedAttr !== null && openedAttr !== undefined) this.open = openedAttr;

    // Accept both camelCase `parentId` and kebab-case `parent-id` attribute spellings
    // in addition to the primary all-lowercase `parentid`.
    const parent = fnAssignPropFromAlias<string>(this.host, 'parent-id', 'parentId');
    if (parent) this.parentId = parent;

    if (this.closeOnNavigation) {
      this.popstateHandler = () => { if (this.open) this.open = false; };
      window.addEventListener('popstate', this.popstateHandler);
    }
  }

  componentDidLoad() {
    // When `open=true` is set via attribute at mount, @Watch('open') does NOT fire for the
    // initial value — Stencil only dispatches watch callbacks for subsequent prop changes.
    // Without this, the host element stays inside its original parent, and `position:fixed`
    // resolves against any transformed ancestor so the drawer only covers that area.
    if (this.open) {
      this.mountToTarget();
      this.opened.emit();
    }
  }

  @Watch('open')
  handleOpenChange(newValue: boolean) {
    if (newValue) {
      this.mountToTarget();
      this.opened.emit();
    } else {
      this.host.removeAttribute('open');
      this.closed.emit();
    }
  }

  @Watch('parentId')
  handleParentIdChange() {
    // If the scoping target changes while open, relocate the host. Otherwise wait
    // until the next open to mount into the new target.
    if (this.open) this.mountToTarget();
  }

  @Listen('keydown', { target: 'document' })
  handleDocumentKeydown(e: KeyboardEvent) {
    if (!this.open) return;
    if (e.key === 'Escape') {
      if (this.preventClose) {
        this.pulse();
      } else {
        this.open = false;
      }
    }
  }

  /** Resolve the mounting target based on parentId, moving the host there if needed. */
  private mountToTarget() {
    const target = this.resolveMountTarget();
    if (this.mountedParent === target && target.contains(this.host)) return;

    // If the host is currently mounted somewhere else, leave it there — appendChild
    // will move it. We just need to make sure our bookkeeping stays accurate.
    target.appendChild(this.host);
    this.mountedParent = target;

    // When scoped to a non-body parent, ensure that parent provides a positioning
    // context for our `position: absolute` host.
    if (target !== document.body) {
      const computed = window.getComputedStyle(target);
      if (computed.position === 'static') {
        target.style.position = 'relative';
      }
    }
  }

  /** `parentid` → matching element, else `document.body`. Falls back to body on miss. */
  private resolveMountTarget(): HTMLElement {
    if (this.parentId) {
      const el = document.getElementById(this.parentId);
      if (el) return el;
      console.warn(`sy-drawer: parentid="${this.parentId}" did not match any element; falling back to document.body.`);
    }
    return document.body;
  }

  private pulse() {
    const container = this.host.querySelector('.drawer-container');
    if (!container) return;
    container.classList.remove('drawer--pulse');
    // force reflow then re-add class to restart the animation
    void (container as HTMLElement).offsetWidth;
    container.classList.add('drawer--pulse');
  }

  private handleOutsideClick(event: MouseEvent) {
    if (!this.open) return;
    if (this.preventClose || !this.maskClosable) return;
    const container = this.host.querySelector('.drawer-container');
    const path = event.composedPath();
    if (container && !path.includes(container)) {
      this.open = false;
    }
  }

  private handleMaskClick() {
    if (this.preventClose) { this.pulse(); return; }
    if (!this.maskClosable) return;
    this.open = false;
  }

  private handleCloseButtonClick() {
    if (this.preventClose) { this.pulse(); return; }
    this.open = false;
  }

  private getCustomSizeStyles() {
    if (this.size !== 'custom') return {};
    switch (this.position) {
      case 'left':
      case 'right':  return { width: `${this.customSize}px` };
      case 'top':
      case 'bottom': return { height: `${this.customSize}px` };
      default:       return {};
    }
  }

  render() {
    const hasHeader = fnHasSlotContentByName(this.host, 'header');
    const hasFooter = fnHasSlotContentByName(this.host, 'footer');

    const containerClasses: Record<string, boolean> = {
      'drawer-container': true,
      [this.position]: true,
      [this.size]: this.size !== 'custom',
    };

    return (
      <div
        class="drawer-wrapper"
        role="dialog"
        aria-modal="true"
        aria-hidden={this.open ? 'false' : 'true'}
      >
        {!this.maskless && (
          <div class="drawer-mask" onClick={() => this.handleMaskClick()}></div>
        )}
        <div class={containerClasses} style={this.getCustomSizeStyles()}>
          {(this.closable || hasHeader) && (
            <div class="drawer-header">
              <div class="drawer-header-content">
                <slot name="header" />
              </div>
              {this.closable && (
                <div class="drawer-header-button-container">
                  <sy-icon
                    selectable
                    size="large"
                    aria-label="Close drawer"
                    onClick={() => this.handleCloseButtonClick()}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M135.5 169C126.1 159.6 126.1 144.4 135.5 135.1C144.9 125.8 160.1 125.7 169.4 135.1L320.4 286.1L471.4 135.1C480.8 125.7 496 125.7 505.3 135.1C514.6 144.5 514.7 159.7 505.3 169L354.3 320L505.3 471C514.7 480.4 514.7 495.6 505.3 504.9C495.9 514.2 480.7 514.3 471.4 504.9L320.4 353.9L169.4 504.9C160 514.3 144.8 514.3 135.5 504.9C126.2 495.5 126.1 480.3 135.5 471L286.5 320L135.5 169z" /></svg>
                  </sy-icon>
                </div>
              )}
            </div>
          )}
          <div class="drawer-body">
            <slot name="body" />
          </div>
          {hasFooter && (
            <div class="drawer-footer">
              <slot name="footer" />
            </div>
          )}
        </div>
      </div>
    );
  }
}
