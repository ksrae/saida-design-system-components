import { Component, Prop, State, h, Element, Event, EventEmitter, Method } from '@stencil/core';
import { fnAssignPropFromAlias } from '../../utils/utils';

/**
 * sy-global-header — persistent top-of-page navigation bar.
 *
 * Spec: design-system-specs/components/global-header.yaml
 *
 * Anatomy:
 *   .header-wrapper
 *     ├─ .header-title   (logo slot + app title)
 *     ├─ .header-tab     ([slot="tabs"] + overflow menu when tabs don't fit)
 *     └─ .header-end     (search + information + notification + [slot="actions"])
 *
 * Tab integration — IMPORTANT, do not break:
 *   - When used inside <sy-tab-group>, the header discovers the parent group in
 *     componentWillLoad and uses it to:
 *       (a) mark each slotted <sy-tab> with `inHeader=true` and its `index`,
 *       (b) delegate activation to `parent.setActive(index)` when a tab is picked
 *           from the overflow menu,
 *       (c) trigger the parent's own `updateOverflowTabs` after mount.
 *   - The tab strip uses a ResizeObserver on `.header-tab` to recompute overflow
 *     when the header's available width changes (e.g., window resize, side-panel
 *     toggle). Missing/stale targets are defended against so we never throw.
 *
 * Spec vs legacy naming (rule 6: document-first, accept legacy aliases):
 *   - spec `show-help`          ↔ legacy `information`
 *   - spec `show-notifications` ↔ legacy `notification`
 *   - spec `show-search`        ↔ legacy `search`
 *   - spec `title`              ↔ legacy `title` (attribute) / `appTitle` (JS property)
 * The legacy names stay as the code-canonical props (storybook stories depend on
 * them); spec-aligned attributes are resolved via `fnAssignPropFromAlias`.
 *
 * Not a form-associated element.
 */
@Component({
  tag: 'sy-global-header',
  styleUrl: 'sy-global-header.scss',
  shadow: false,
})
export class SyGlobalHeader {
  private static readonly HEADER_TAB_BUFFER = 16;
  private static readonly HEADER_TAB_OVERFLOW_TRIGGER_WIDTH = 48;

  @Element() host!: HTMLSyGlobalHeaderElement;

  // --- Public Properties ---
  @Prop({ attribute: 'title', mutable: true }) appTitle: string = '';
  @Prop({ reflect: true }) sticky: boolean = false;
  @Prop({ mutable: true }) search: boolean = false;
  @Prop({ mutable: true }) information: boolean = false;
  @Prop({ mutable: true }) notification: boolean = false;

  // --- Private State ---
  @State() overflowTabs: any[] = [];
  @State() theme: 'light' | 'dark' = 'light';
  @State() isCustomLogo: boolean = false;

  // --- Events ---
  @Event() changed!: EventEmitter;
  @Event({ eventName: 'actionClick' }) actionClick!: EventEmitter;
  @Event() selected!: EventEmitter;

  // --- Private ---
  private parentTabGroup: any | null = null;
  private updateInProgress: boolean = false;
  private resizeObserver: ResizeObserver | null = null;
  private tabsMutationObserver: MutationObserver | null = null;

  /** Force the host to be `display: block; width: 100%`. Called in both
   *  `componentWillLoad` AND `componentDidRender` because Stencil's scoped CSS was
   *  not reliably matching the host element when nested inside another scoped
   *  component (sy-tab-group). Inline styles bypass all CSS-scoping concerns and
   *  beat any rule specificity, so this is the only approach that guarantees the
   *  header always fills its parent container. Idempotent. */
  private enforceHostSizing() {
    this.host.style.display = 'block';
    this.host.style.width = '100%';
    this.host.style.maxWidth = '100%';
    this.host.style.minWidth = '0';
    this.host.style.boxSizing = 'border-box';
  }

  componentWillLoad() {
    this.parentTabGroup = this.host.closest('sy-tab-group');
    this.enforceHostSizing();

    // Accept spec-aligned attribute aliases. Legacy names remain the canonical props
    // so existing storybook/arg stories keep working; spec attributes just flow in here.
    const showSearch        = fnAssignPropFromAlias<boolean>(this.host, 'show-search', 'showSearch');
    const showHelp          = fnAssignPropFromAlias<boolean>(this.host, 'show-help', 'showHelp');
    const showNotifications = fnAssignPropFromAlias<boolean>(this.host, 'show-notifications', 'showNotifications');
    if (showSearch        !== null && showSearch        !== undefined) this.search       = showSearch;
    if (showHelp          !== null && showHelp          !== undefined) this.information  = showHelp;
    if (showNotifications !== null && showNotifications !== undefined) this.notification = showNotifications;
  }

  componentDidRender() {
    // Re-apply on every render cycle — guarantees nothing from the scoping
    // layer or VDOM reconciliation has overridden the host inline styles.
    this.enforceHostSizing();
  }

  componentDidLoad() {
    this.isCustomLogo = this.hasSlotLogoContents();
    this.enforceHostSizing();

    // Observe the tab strip's width so overflow recomputes when the header
    // gets squeezed (side panels, modals, etc.).
    // IMPORTANT: the class in render is `.header-tab` (singular). Older code
    // queried `.header-tabs` and silently did nothing — don't regress that.
    const tabsContainer = this.host.querySelector('.header-tab');
    if (tabsContainer) {
      this.resizeObserver = new ResizeObserver(() => this.updateOverflowTabs());
      this.resizeObserver.observe(tabsContainer);
    }

    // Observe the user's [slot="tabs"] wrapper for added/removed tabs. ResizeObserver
    // alone doesn't fire when tabs are inserted (the .header-tab container width is
    // driven by its flex allocation, not by child count), so without this a dynamic
    // tab list would never re-trigger the overflow calculation.
    const tabsSlot = this.host.querySelector('[slot="tabs"]');
    if (tabsSlot) {
      this.tabsMutationObserver = new MutationObserver(() => this.updateOverflowTabs());
      this.tabsMutationObserver.observe(tabsSlot, { childList: true, subtree: true });
    }

    // Initial overflow pass + notify parent tab-group so it can recalculate too.
    setTimeout(() => {
      this.updateOverflowTabs();
      if (this.parentTabGroup && typeof this.parentTabGroup.updateOverflowTabs === 'function') {
        this.parentTabGroup.updateOverflowTabs();
      }
    }, 100);
  }

  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    if (this.tabsMutationObserver) {
      this.tabsMutationObserver.disconnect();
      this.tabsMutationObserver = null;
    }
  }

  // --- Helpers ---

  /** Collect slotted <sy-tab> children and tag them with `inHeader`/`index`. */
  private get tabs() {
    const tabsSlot = this.host.querySelector('[slot="tabs"]');
    if (!tabsSlot) return [] as any[];
    const tabElements = Array.from(tabsSlot.querySelectorAll('sy-tab')) as any[];
    tabElements.forEach((tab, index) => {
      tab.inHeader = true;
      tab.index = index;
    });
    return tabElements;
  }

  private hasNamedSlot(name: string): boolean {
    return this.host.querySelector(`[slot="${name}"]`) !== null;
  }

  private hasSlotLogoContents(): boolean {
    const logoSlot = this.host.querySelector('[slot="logo"]');
    return logoSlot !== null && (logoSlot.textContent?.trim() !== '' || logoSlot.children.length > 0);
  }

  private getMeasuredWidth(element: Element | null): number {
    if (!element) return 0;

    const rect = (element as HTMLElement).getBoundingClientRect();
    const styles = window.getComputedStyle(element as HTMLElement);
    const marginLeft = parseFloat(styles.marginLeft) || 0;
    const marginRight = parseFloat(styles.marginRight) || 0;

    return rect.width + marginLeft + marginRight;
  }

  private getAvailableTabsSpace(reserveOverflowTrigger: boolean): number {
    const headerWrapper = this.host.querySelector('.header-wrapper');
    if (!headerWrapper) return 0;

    const headerTitle = this.host.querySelector('.header-title');
    const headerEnd = this.host.querySelector('.header-end');

    const wrapperWidth = this.getMeasuredWidth(headerWrapper);
    const fixedWidth = this.getMeasuredWidth(headerTitle) + this.getMeasuredWidth(headerEnd);
    const reservedOverflowTriggerWidth = reserveOverflowTrigger
      ? SyGlobalHeader.HEADER_TAB_OVERFLOW_TRIGGER_WIDTH
      : 0;

    return Math.max(
      0,
      wrapperWidth - fixedWidth - reservedOverflowTriggerWidth - SyGlobalHeader.HEADER_TAB_BUFFER,
    );
  }

  private getVisibleTabCount(tabs: any[], availableSpace: number): number {
    if (availableSpace <= 0) return 0;

    let accumulatedWidth = 0;
    let visibleTabCount = 0;

    for (const tab of tabs) {
      const tabWidth = this.getMeasuredWidth(tab);
      if (tabWidth === 0) continue;

      if (accumulatedWidth + tabWidth > availableSpace) {
        break;
      }

      accumulatedWidth += tabWidth;
      visibleTabCount += 1;
    }

    return visibleTabCount;
  }

  // --- Interaction handlers ---

  private handleOverflowMenuButtonClick = (e: Event) => {
    e.stopPropagation();
    setTimeout(() => {
      const menu = this.host.querySelector('sy-menu#header-tab-overflow-menu') as any;
      menu?.setSelectableAllItems?.();
    }, 1);
  };

  private handleSearch = (e: CustomEvent) => {
    e.stopPropagation();
    this.changed.emit({ value: e.detail.value });
  };

  private handleClickInformation = (e: Event) => {
    e.stopPropagation();
    this.actionClick.emit({ type: 'information' });
  };

  private handleClickNotification = (e: Event) => {
    e.stopPropagation();
    this.actionClick.emit({ type: 'notification' });
  };

  private handleMenuItemSelect = (e: CustomEvent) => {
    e.stopPropagation();

    const tabs = this.tabs;
    const selectedTab = tabs.find((t: any) => t.tabkey === e.detail.value);
    if (!selectedTab || !this.parentTabGroup) return;

    // sy-tab-group.setActive is private (not exposed on the custom element
    // proxy). Setting the `active` prop triggers its @Watch('active') which
    // runs setTabs() and activates the matching sy-tab-content. The visible
    // tab row is NOT recomputed here — picking an overflowed item should only
    // swap the content panel, never shift which tabs are on screen.
    this.parentTabGroup.active = selectedTab.index;

    setTimeout(() => {
      const menu = this.host.querySelector('sy-menu#header-tab-overflow-menu') as any;
      menu?.clearSelectedItem?.();

      const selectedMenuItem = e.target as any;
      if (selectedMenuItem) {
        selectedMenuItem.setAttribute('selected', '');
        selectedMenuItem.select = true;
      }
    }, 1);

    this.selected.emit({
      tabkey: selectedTab.tabkey,
      index: selectedTab.index,
    });
  };

  /**
   * Public method — also used internally. Computes which tabs fit in the available
   * width and stashes the rest in `overflowTabs` (rendered via the ··· menu).
   * Re-entrancy guard via `updateInProgress` because both the ResizeObserver and
   * explicit calls can trigger this in rapid succession.
   */
  @Method()
  async updateOverflowTabs() {
    if (this.updateInProgress) return;
    this.updateInProgress = true;

    const tabs = this.tabs;
    if (!tabs.length) {
      this.updateInProgress = false;
      return;
    }

    // Show every tab so measurements reflect the natural layout.
    tabs.forEach(tab => {
      tab.style.display = '';
      tab.style.visibility = 'visible';
    });

    requestAnimationFrame(() => {
      try {
        const headerWrapper = this.host.querySelector('.header-wrapper');
        if (!headerWrapper) {
          this.updateInProgress = false;
          return;
        }

        const availableSpaceWithoutOverflowTrigger = this.getAvailableTabsSpace(false);
        const visibleTabCountWithoutOverflowTrigger = this.getVisibleTabCount(
          tabs,
          availableSpaceWithoutOverflowTrigger,
        );

        if (visibleTabCountWithoutOverflowTrigger < tabs.length) {
          const visibleTabCount = this.getVisibleTabCount(
            tabs,
            this.getAvailableTabsSpace(true),
          );
          const newOverflowTabs: any[] = [];

          // The visible window is always the first `visibleTabCount` tabs —
          // never shifted around the active tab. The active tab may sit in the
          // overflow menu; the menu item's `selected` state reflects that.
          // Rationale: users found it jarring when picking an item from the
          // overflow menu caused the tab row to reshuffle (the picked tab
          // jumped into the row and an earlier tab was ejected). Keeping the
          // row stable means the menu just swaps the content panel.
          tabs.forEach((tab: any, index: number) => {
            if (index < visibleTabCount) {
              tab.style.display = '';
              tab.style.visibility = 'visible';
            } else {
              tab.style.display = 'none';
              tab.style.visibility = 'hidden';
              newOverflowTabs.push(tab);
            }
          });

          this.overflowTabs = newOverflowTabs;
        } else {
          this.overflowTabs = [];
          tabs.forEach(tab => {
            tab.style.display = '';
            tab.style.visibility = 'visible';
          });
        }
      } catch (error) {
        console.error('[sy-global-header] updateOverflowTabs error:', error);
      } finally {
        this.updateInProgress = false;
      }
    });
  }

  render() {
    const logo = '../../assets/style/images/test.png';
    const hasOverflowTabs = this.overflowTabs.length > 0;
    const hasTabsSlot = this.hasNamedSlot('tabs');
    const hasActionsSlot = this.hasNamedSlot('actions');
    const hasLogoSlot = this.hasNamedSlot('logo');

    return (
      <div class="header-wrapper" role="banner">
        <div class="header-title">
          <span
            class="logo"
            style={{ display: this.isCustomLogo ? 'none' : 'block' }}
          >
            <img src={logo} width="100%" height="100%" alt="" />
          </span>
          {hasLogoSlot && <slot name="logo" />}
          {this.appTitle && <span class="appname">{this.appTitle}</span>}
        </div>

        {hasTabsSlot && (
          <div class="header-tab" role="navigation" aria-label="Primary">
            <slot name="tabs" />
            {hasOverflowTabs && (
              <div
                class="header-tab-more"
                onMouseEnter={this.handleOverflowMenuButtonClick}
                role="button"
                aria-label="More tabs"
                tabindex={0}
              >
                <sy-icon size="medium">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path fill="currentColor" d="M544 320C544 346.5 522.5 368 496 368C469.5 368 448 346.5 448 320C448 293.5 469.5 272 496 272C522.5 272 544 293.5 544 320zM368 320C368 346.5 346.5 368 320 368C293.5 368 272 346.5 272 320C272 293.5 293.5 272 320 272C346.5 272 368 293.5 368 320zM144 368C117.5 368 96 346.5 96 320C96 293.5 117.5 272 144 272C170.5 272 192 293.5 192 320C192 346.5 170.5 368 144 368z" />
                  </svg>
                </sy-icon>
                <sy-menu
                  position="bottomRight"
                  id="header-tab-overflow-menu"
                  onItemSelected={this.handleMenuItemSelect}
                >
                  {this.overflowTabs.map(tab => (
                    <sy-menu-item value={tab.tabkey}>{tab.textContent}</sy-menu-item>
                  ))}
                </sy-menu>
              </div>
            )}
          </div>
        )}

        <div class="header-end">
          {this.search && (
            <sy-input
              placeholder="Help Search"
              size="medium"
              onChanged={this.handleSearch}
            />
          )}

          {this.information && (
            <sy-button
              size="medium"
              variant="borderless"
              tooltip="Help"
              onClick={this.handleClickInformation}
            >
              <sy-icon size="large" selectable>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                  <path fill="currentColor" d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM288 224C288 206.3 302.3 192 320 192C337.7 192 352 206.3 352 224C352 241.7 337.7 256 320 256C302.3 256 288 241.7 288 224zM280 288L328 288C341.3 288 352 298.7 352 312L352 400L360 400C373.3 400 384 410.7 384 424C384 437.3 373.3 448 360 448L280 448C266.7 448 256 437.3 256 424C256 410.7 266.7 400 280 400L304 400L304 336L280 336C266.7 336 256 325.3 256 312C256 298.7 266.7 288 280 288z" />
                </svg>
              </sy-icon>
            </sy-button>
          )}

          {this.notification && (
            <sy-button
              size="medium"
              variant="borderless"
              tooltip="Notifications"
              onClick={this.handleClickNotification}
            >
              <sy-icon size="large" selectable>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                  <path fill="currentColor" d="M320 64C302.3 64 288 78.3 288 96L288 99.2C215 114 160 178.6 160 256L160 277.7C160 325.8 143.6 372.5 113.6 410.1L103.8 422.3C98.7 428.6 96 436.4 96 444.5C96 464.1 111.9 480 131.5 480L508.4 480C528 480 543.9 464.1 543.9 444.5C543.9 436.4 541.2 428.6 536.1 422.3L526.3 410.1C496.4 372.5 480 325.8 480 277.7L480 256C480 178.6 425 114 352 99.2L352 96C352 78.3 337.7 64 320 64zM258 528C265.1 555.6 290.2 576 320 576C349.8 576 374.9 555.6 382 528L258 528z" />
                </svg>
              </sy-icon>
            </sy-button>
          )}

          {hasActionsSlot && <slot name="actions" />}
        </div>
      </div>
    );
  }
}
