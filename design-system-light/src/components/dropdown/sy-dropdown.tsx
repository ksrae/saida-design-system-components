import { Component, Prop, Event, EventEmitter, h, Element, Watch, Listen } from '@stencil/core';

/**
 * sy-dropdown — trigger that reveals a list of options (hosted `<sy-menu>`).
 *
 * Spec: design-system-specs/components/dropdown.yaml
 * Anatomy:
 *   .dropdown--container  (role="button", opens the menu)
 *     ├─ .dropdown--header ([slot="title"] trigger label)
 *     ├─ sy-icon (chevron / angle-down)
 *     └─ <slot> (sy-menu as the actual menu)
 *
 * The menu's `itemSelected` bubbles up; dropdown re-emits it as a typed `selected` event.
 * Not a form-associated element.
 */
@Component({
  tag: 'sy-dropdown',
  styleUrl: 'sy-dropdown.scss',
  scoped: true,
  shadow: false,
})
export class SyDropdown {
  @Element() host!: HTMLSyDropdownElement;

  private menu: HTMLSyMenuElement | null = null;
  private selectedEventHandler: ((e: Event) => void) | null = null;

  // --- Public Properties (spec: props) ---
  @Prop({ reflect: true }) borderless: boolean = false;
  @Prop({ reflect: true }) disabled: boolean = false;
  @Prop({ reflect: true }) position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' = 'bottomLeft';
  @Prop({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';
  @Prop({ reflect: true }) trigger: 'hover' | 'click' = 'click';
  @Prop() tooltip: string = '';

  // --- Events (spec: api.events.selected) ---
  @Event() selected!: EventEmitter<any>;

  // --- Lifecycle ---
  componentWillLoad() {
    this.selectedEventHandler = this.handleItemSelected.bind(this);
  }

  componentDidLoad() {
    this.setMenu();
  }

  disconnectedCallback() {
    if (this.menu && this.selectedEventHandler) {
      this.menu.removeEventListener('itemSelected', this.selectedEventHandler);
    }
  }

  @Watch('trigger')
  watchTrigger() {
    if (this.menu) this.menu.trigger = this.trigger;
  }

  @Watch('position')
  watchPosition() {
    if (this.menu) this.menu.position = this.position;
  }

  @Watch('disabled')
  watchDisabled() {
    if (this.menu) (this.menu as any).disabled = this.disabled;
  }

  @Listen('keydown')
  handleKeydown(e: KeyboardEvent) {
    if (this.disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      // Don't hijack Enter/Space when the user is interacting with a menu item.
      const target = e.composedPath()[0] as HTMLElement | undefined;
      if (target && target.closest?.('sy-menu-item')) return;
      e.preventDefault();
      (this.menu as any)?.toggle?.();
    } else if (e.key === 'Escape') {
      (this.menu as any)?.close?.();
    }
  }

  private setMenu() {
    const newMenu = this.host.querySelector('sy-menu') as HTMLSyMenuElement | null;

    if (this.menu && this.menu !== newMenu && this.selectedEventHandler) {
      this.menu.removeEventListener('itemSelected', this.selectedEventHandler);
    }

    this.menu = newMenu || null;

    if (this.menu && this.selectedEventHandler) {
      this.menu.removeEventListener('itemSelected', this.selectedEventHandler);
      this.menu.addEventListener('itemSelected', this.selectedEventHandler);
    } else if (!this.menu) {
      console.warn('[sy-dropdown] No <sy-menu> child found — dropdown has no options to show.');
    }
  }

  private handleItemSelected(e: Event) {
    e.stopPropagation();

    if (this.menu?.clearSelectedItem) {
      this.menu.clearSelectedItem();
    }

    const selectedMenuItem = (e.target as HTMLSyMenuItemElement | null);
    if (selectedMenuItem) {
      selectedMenuItem.select = true;
    }

    const detail = (e as CustomEvent).detail;
    this.selected.emit(detail);
  }

  render() {
    const containerClasses = {
      'dropdown--container': true,
      'borderless': this.borderless,
      'dropdown--small': this.size === 'small',
      'dropdown--medium': this.size === 'medium',
      'dropdown--large': this.size === 'large',
    };

    return (
      <div
        class={containerClasses}
        tabindex={this.disabled ? -1 : 0}
        role="button"
        aria-haspopup="menu"
        aria-disabled={this.disabled ? 'true' : undefined}
        title={this.tooltip || undefined}
      >
        <div class="dropdown--header">
          <slot name="title"></slot>
        </div>
        <sy-icon size={this.size}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path fill="currentColor" d="M337.5 433C328.1 442.4 312.9 442.4 303.6 433L143.5 273C134.1 263.6 134.1 248.4 143.5 239.1C152.9 229.8 168.1 229.7 177.4 239.1L320.4 382.1L463.4 239.1C472.8 229.7 488 229.7 497.3 239.1C506.6 248.5 506.7 263.7 497.3 273L337.3 433z" />
          </svg>
        </sy-icon>
        <slot></slot>
      </div>
    );
  }
}
