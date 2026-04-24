import { Component, h, Prop, State, Element } from '@stencil/core';

/**
 * sy-card — visual grouping of related content with optional header, body, and footer slots.
 *
 * Spec: design-system-specs/components/card.yaml
 * Anatomy:
 *   .card[.card-backdrop]
 *     ├─ [slot="cover"]    (optional media)
 *     ├─ .card-header-wrapper
 *     │     ├─ sy-icon (collapse chevron, only when collapsible + header present)
 *     │     └─ [slot="header"]
 *     ├─ .card-content[.collapsed]
 *     │     └─ [slot]  (default slot — body)
 *     └─ [slot="footer"]
 *
 * Not a form-associated element.
 */
@Component({
  tag: 'sy-card',
  styleUrl: 'sy-card.scss',
  shadow: false,
})
export class SyCard {
  @Element() el!: HTMLSyCardElement;

  // --- Public Properties (spec: props) ---
  @Prop({ reflect: true }) collapsible: boolean = false;
  @Prop({ reflect: true }) backdrop: boolean = false;
  @Prop() openDelay: number = 0;
  @Prop() closeDelay: number = 0;

  // --- Private State ---
  @State() isCollapsed: boolean = false;
  @State() private hasHeaderSlot: boolean = false;

  private pendingToggleTimer?: number;
  private mutationObserver: MutationObserver | null = null;

  componentWillLoad() {
    this.checkHeaderSlot();
  }

  componentDidLoad() {
    this.checkHeaderSlot();
    this.mutationObserver = new MutationObserver(() => this.checkHeaderSlot());
    this.mutationObserver.observe(this.el, { childList: true, subtree: true });
  }

  disconnectedCallback() {
    if (this.pendingToggleTimer !== undefined) {
      window.clearTimeout(this.pendingToggleTimer);
      this.pendingToggleTimer = undefined;
    }
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = null;
    }
  }

  private checkHeaderSlot = () => {
    this.hasHeaderSlot = !!this.el.querySelector('[slot="header"]');
  };

  private toggle = () => {
    if (this.pendingToggleTimer !== undefined) {
      window.clearTimeout(this.pendingToggleTimer);
      this.pendingToggleTimer = undefined;
    }
    const willCollapse = !this.isCollapsed;
    const delay = willCollapse ? this.closeDelay : this.openDelay;
    if (delay > 0) {
      this.pendingToggleTimer = window.setTimeout(() => {
        this.isCollapsed = willCollapse;
        this.pendingToggleTimer = undefined;
      }, delay);
    } else {
      this.isCollapsed = willCollapse;
    }
  };

  render() {
    const showCollapseIcon = this.collapsible && this.hasHeaderSlot;
    const bodyId = 'card-body';

    return (
      <div
        class={{
          'card': true,
          'card-backdrop': this.backdrop,
        }}
        role="region"
        aria-label="Card"
      >
        <slot name="cover" />
        <div class="card-header-wrapper">
          {showCollapseIcon && (
            <sy-icon
              selectable
              onSelected={this.toggle}
              aria-expanded={!this.isCollapsed ? 'true' : 'false'}
              aria-controls={bodyId}
              aria-label={this.isCollapsed ? 'Expand card' : 'Collapse card'}
            >
              {this.isCollapsed ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                  <path fill="currentColor" d="M303.5 473C312.9 482.4 328.1 482.4 337.4 473L537.4 273C546.8 263.6 546.8 248.4 537.4 239.1C528 229.8 512.8 229.7 503.5 239.1L320.5 422.1L137.5 239.1C128.1 229.7 112.9 229.7 103.6 239.1C94.3 248.5 94.2 263.7 103.6 273L303.6 473z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                  <path fill="currentColor" d="M303.5 167C312.9 157.6 328.1 157.6 337.4 167L537.4 367C546.8 376.4 546.8 391.6 537.4 400.9C528 410.2 512.8 410.3 503.5 400.9L320.5 217.9L137.5 400.9C128.1 410.3 112.9 410.3 103.6 400.9C94.3 391.5 94.2 376.3 103.6 367L303.6 167z" />
                </svg>
              )}
            </sy-icon>
          )}
          <slot name="header" />
        </div>
        <div
          id={bodyId}
          class={{ 'card-content': true, 'collapsed': this.collapsible && this.isCollapsed }}
          aria-hidden={this.collapsible && this.isCollapsed ? 'true' : 'false'}
        >
          <slot />
        </div>
        <slot name="footer" />
      </div>
    );
  }
}
