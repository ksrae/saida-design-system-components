import { Component, h, Prop, State, Event, EventEmitter, Method, forceUpdate, Element } from '@stencil/core';
import { fnAssignPropFromAlias } from '../../utils/utils';

/**
 * sy-breadcrumb-item — a single link in a breadcrumb trail.
 *
 * Spec: design-system-specs/components/breadcrumb.yaml (child component)
 *
 * Accessibility:
 *   - Renders `role="link"` and is keyboard-focusable (Enter/Space fire `selected`).
 *   - The active (current page) item carries `aria-current="page"` and is not focusable.
 *   - Disabled items carry `aria-disabled="true"` and are not focusable.
 *   - Separator icons are decorative (`aria-hidden="true"`).
 */
@Component({
  tag: 'sy-breadcrumb-item',
  styleUrl: 'sy-breadcrumb.scss',
  shadow: false,
  scoped: true,
})
export class SyBreadcrumbItem {
  @Element() host!: HTMLSyBreadcrumbItemElement;

  // --- Public Properties ---
  @Prop({ reflect: true }) active: boolean = false;
  @Prop({ reflect: true }) disabled: boolean = false;
  /** Per-item override of the parent breadcrumb's separator choice. */
  @Prop() separator?: 'slash' | 'arrow';
  /** Set by the parent `sy-breadcrumb` to inherit its separator. */
  @Prop({ attribute: 'parentSeparator', mutable: true }) parentSeparator: 'slash' | 'arrow' = 'slash';
  /** Set by the parent `sy-breadcrumb`. When true, no trailing separator is rendered. */
  @Prop({ mutable: true }) isLast: boolean = false;

  @State() private hasFocus: boolean = false;

  @Event({
    eventName: 'selected',
    composed: true,
    bubbles: true,
  })
  selected!: EventEmitter<HTMLSyBreadcrumbItemElement>;

  componentWillLoad() {
    this.parentSeparator =
      fnAssignPropFromAlias<'slash' | 'arrow'>(this.host, 'parent-separator') ?? this.parentSeparator;
  }

  /** Public so that the parent breadcrumb can re-trigger a render after updating props. */
  @Method()
  async forceUpdate() {
    forceUpdate(this);
  }

  // --- Interaction ---
  private isInteractive(): boolean {
    return !this.disabled && !this.active;
  }

  private emitSelected() {
    if (!this.isInteractive()) return;
    this.selected.emit(this.host);
  }

  private handleFocus = () => { if (this.isInteractive()) this.hasFocus = true; };
  private handleBlur  = () => { this.hasFocus = false; };

  private handleClick = () => { this.emitSelected(); };

  private handleKeydown = (e: KeyboardEvent) => {
    if (!this.isInteractive()) return;
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      this.emitSelected();
    }
  };

  render() {
    const finalSeparator = this.separator || this.parentSeparator;

    const arrowIcon =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M433.5 303C442.9 312.4 442.9 327.6 433.5 336.9L273.5 497C264.1 506.4 248.9 506.4 239.6 497C230.3 487.6 230.2 472.4 239.6 463.1L382.6 320.1L239.6 177.1C230.2 167.7 230.2 152.5 239.6 143.2C249 133.9 264.2 133.8 273.5 143.2L433.5 303.2z"/></svg>';
    const slashIcon =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M468.1 67.3C479.5 74 483.4 88.7 476.7 100.1L204.7 564.1C198 575.5 183.3 579.4 171.9 572.7C160.5 566 156.6 551.3 163.3 539.9L435.3 75.9C442 64.4 456.7 60.6 468.1 67.3z"/></svg>';

    const interactive = this.isInteractive();

    return [
      <span
        class={{
          'breadcrumb--item': true,
          'breadcrumb--item-focused': this.hasFocus,
          'breadcrumb--item-current': !this.disabled && this.active,
          'breadcrumb--item-disabled': this.disabled,
        }}
        role="link"
        tabindex={interactive ? 0 : -1}
        aria-current={this.active ? 'page' : null}
        aria-disabled={this.disabled ? 'true' : null}
        onFocus={this.handleFocus}
        onMouseEnter={this.handleFocus}
        onBlur={this.handleBlur}
        onMouseLeave={this.handleBlur}
        onClick={this.handleClick}
        onKeyDown={this.handleKeydown}
      >
        <slot />
      </span>,
      !this.isLast && (
        <span class="separator" aria-hidden="true">
          <sy-icon size="xsmall" svgMarkup={finalSeparator === 'arrow' ? arrowIcon : slashIcon}></sy-icon>
        </span>
      ),
    ];
  }
}
