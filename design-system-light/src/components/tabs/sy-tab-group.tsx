import { Component, Prop, State, h, Element, Event, EventEmitter, Watch, Method, Listen } from '@stencil/core';
import { fnAssignPropFromAlias } from '../../utils/utils';

let tabGroupOverflowMenuSequence = 0;

/**
 * sy-tab-group — tab navigation container.
 *
 * Spec: design-system-specs/components/tabs.yaml
 *
 * Public API (spec-aligned) & legacy aliases:
 *   - `index` (spec)           ↔ `active` (legacy, code-canonical)
 *   - `placement` (spec)       ↔ `position` (legacy, code-canonical)
 *   - `centered` (spec)        ↔ `align="center"` (legacy)
 *   - `add-new-tab` (spec)     ↔ tech-debt (event hook: tabAdded)
 *   - `setActiveTab(i)` (spec) ↔ `setActive(i)` (legacy)
 *   - `tabSelected` event      ↔ `selected` (legacy, emitted alongside)
 *   - `tabClosed` event        ↔ `closed`   (legacy, emitted alongside)
 *
 * Tab integration with sy-global-header: when a header is nested inside the
 * group, the header renders the tab row and handles its own overflow logic —
 * see `updateOverflowTabs` early-return.
 */
@Component({
  tag: 'sy-tab-group',
  styleUrl: 'sy-tab-group.scss',
  shadow: false,
  scoped: true
})
export class SyTabGroup {
  @Element() host!: HTMLSyTabGroupElement;

  @Prop({ mutable: true }) active?: number;
  // NOT reflected. The HTML `align` attribute on the host triggers the
  // user-agent stylesheet cascade (`[align="center"] → text-align: -webkit-center`)
  // which inherits down to the panel content, centering the tab body — exactly
  // what `align` is *not* supposed to control. We accept `align="..."` as input
  // (read once in componentWillLoad / handled by the alias path) and then strip
  // it from the host so nothing in the UA stylesheet can latch onto it.
  @Prop({ mutable: true }) align: 'center' | 'left' = 'left';
  @Prop() disabled = false;
  /**
   * When true, tabs can be reordered by drag-and-drop. The public attribute is
   * `draggable`, but the JS-side prop is named `isDraggable` to avoid
   * shadowing `HTMLElement.prototype.draggable` (which would trigger the
   * Stencil "reserved public name" warning and risk cross-browser surprises).
   */
  @Prop({ attribute: 'draggable' }) isDraggable = false;
  @Prop({ reflect: true, mutable: true }) position: "top" | "bottom" | "left" | "right" = "top";
  @Prop({ reflect: true }) type: "card" | "line" = "line";
  @Prop({ reflect: true }) size: "small" | "medium" | "large" = "medium";
  @Prop() padding: "small" | "medium" | "large" | 'none' = "none";
  @Prop({ mutable: true }) addNewTab: boolean = false;

  @State() dragover: boolean = false;
  @State() private tabMoreAreaSize: number = 48;
  @State() private tabExtraAreaSize: number = 0;
  @State() private overflowTabs: HTMLSyTabElement[] = [];

  private latestActiveIndex: number | undefined;
  private resizeObserver?: ResizeObserver;
  private overflowMenuId = `tab-overflow-menu-${++tabGroupOverflowMenuSequence}`;
  private tabElements: HTMLSyTabElement[] = [];

  @Event() selected!: EventEmitter<any>;
  @Event() closed!: EventEmitter<any>;
  @Event() ordered!: EventEmitter<HTMLSyTabElement[]>;

  // Spec-aligned events (emitted alongside legacy ones).
  @Event({ eventName: 'tabSelected' }) tabSelected!: EventEmitter<{ index: number; value: string }>;
  @Event({ eventName: 'tabClosed' }) tabClosed!: EventEmitter<{ index: number; value: string }>;
  @Event({ eventName: 'tabAdded' }) tabAdded!: EventEmitter<void>;

  // private tabMoreArea!: HTMLDivElement;
  draggedItem: any;
  dragoverkey: any;
  prevDragOverkey: any;
  draggedIndex: any;
  dragoverIndex: any;
  droppedIndex: any;
  isDropped = false;
  isUpdateComplete = false;
  parentRect: DOMRect | undefined;
  private _updateInProgress = false;
  // Tracks whether updateOverflowTabs is mutating tab visibility right now.
  // When true, ResizeObserver callbacks are ignored — otherwise the
  // parent (if auto-sized to children) shrinks/grows as we hide/show tabs
  // in left/right layouts and the observer re-fires updateOverflowTabs in a
  // tight loop, causing visible shaking in Storybook.
  private _suppressResize = false;
  private _resizeRafId: number | null = null;
  private _lastParentSize: { width: number; height: number } = { width: 0, height: 0 };

  @Listen('selected')
  handleTabSelected(e: CustomEvent) {
    if (e.target && (e.target as HTMLElement).tagName === 'SY-TAB') {
      this.handleTabSelect(e);
    }
  }

  @Listen('closed')
  handleTabClosed(e: CustomEvent) {
    if (e.target && (e.target as HTMLElement).tagName === 'SY-TAB') {
      this.handleTabClose(e);
    }
  }

  connectedCallback() {
    this.updateParentRect();
  }

  componentWillLoad() {
    // Strip the host `align` attribute BEFORE first paint so the UA
    // stylesheet's `[align=...]` cascade (which inherits text-align down to
    // the panel content) never gets a target to match. The prop value still
    // drives the rendered `.align-center` / `.align-left` classes on the
    // tab-group-container internally — we just don't want the legacy HTML
    // attribute sitting on the host.
    const alignAttr = this.host.getAttribute('align');
    if (alignAttr === 'center' || alignAttr === 'left') {
      this.align = alignAttr;
    }
    if (alignAttr !== null) this.host.removeAttribute('align');

    // Accept spec-aligned attribute aliases without breaking legacy markup.
    const placementAlias = fnAssignPropFromAlias<'top' | 'bottom' | 'left' | 'right'>(this.host, 'placement');
    if (placementAlias) this.position = placementAlias;

    const indexAlias = fnAssignPropFromAlias<number>(this.host, 'index');
    if (indexAlias !== null && indexAlias !== undefined && this.active === undefined) {
      this.active = indexAlias;
    }

    const centered = fnAssignPropFromAlias<boolean>(this.host, 'centered');
    if (centered) this.align = 'center';

    const addNewTabAlias = fnAssignPropFromAlias<boolean>(this.host, 'add-new-tab', 'addNewTab');
    if (addNewTabAlias !== null && addNewTabAlias !== undefined) this.addNewTab = addNewTabAlias;

    // Take a snapshot of the sy-tab / sy-tab-content children the caller
    // provided (flat or inside slot wrappers). We'll physically move them
    // into the rendered containers in componentDidLoad. This bypasses
    // Stencil's scoped-slot emulation entirely — which is what was leaving
    // the tabs unstyled and stacking vertically regardless of how we
    // decorated the [slot="tabs"] wrapper.
    this.collectSlottedChildren();
  }

  /** Pending tab elements captured from light-DOM before first render. */
  private pendingTabs: HTMLSyTabElement[] = [];
  /** Pending tab-content elements captured from light-DOM before first render. */
  private pendingContents: HTMLSyTabContentElement[] = [];

  private collectSlottedChildren() {
    const host = this.host;
    // If a global-header is nested inside the group the header owns the tab
    // row — leave any tabs alone in that case. But we still need to collect
    // and mount sy-tab-content children so the active tab's content shows.
    const hasGlobalHeaderChild = host.querySelector('sy-global-header') !== null;

    // Collect by querySelectorAll so we pick up tabs/contents regardless of
    // how the caller wrapped them — direct children, [slot="tabs"] wrappers,
    // story-template's `.sb-story-wrapper` multi-child shim, etc. Exclude
    // anything inside a nested sy-global-header (the header owns its row).
    const allTabs = Array.from(host.querySelectorAll('sy-tab')) as HTMLSyTabElement[];
    const allContents = Array.from(host.querySelectorAll('sy-tab-content')) as HTMLSyTabContentElement[];

    const tabs = hasGlobalHeaderChild
      ? []
      : allTabs.filter((t) => !t.closest('sy-global-header') && t.getAttribute('slot') !== 'extra');
    const contents = allContents.filter((c) => !c.closest('sy-global-header'));

    this.pendingTabs = tabs;
    this.pendingContents = contents;

    // Pull captured nodes out of wherever they currently sit so the upcoming
    // render starts from a clean slate; mountCapturedChildren puts them
    // back in the proper containers after first render.
    tabs.forEach((t) => t.parentElement?.removeChild(t));
    contents.forEach((c) => c.parentElement?.removeChild(c));

    // Remove leftover wrappers that fed children into us so they can't
    // resurface as direct host children rendered by the default <slot/>.
    // Targets: explicit `[slot="tabs"]` / `[slot="contents"]` wrappers, and
    // the story-template `.sb-story-wrapper` multi-child shim.
    Array.from(host.children).forEach((child) => {
      const slot = child.getAttribute('slot');
      const isStoryWrapper = (child as HTMLElement).classList?.contains('sb-story-wrapper');
      if (slot === 'tabs' && !hasGlobalHeaderChild) {
        host.removeChild(child);
      } else if (slot === 'contents') {
        host.removeChild(child);
      } else if (isStoryWrapper && child.children.length === 0) {
        host.removeChild(child);
      }
    });
  }

  private mountCapturedChildren() {
    const tabsContainer = this.host.querySelector('.tabs') as HTMLElement | null;
    const contentsContainer = this.host.querySelector('.contents') as HTMLElement | null;

    if (tabsContainer && this.pendingTabs.length) {
      const isVertical = this.position === 'left' || this.position === 'right';
      // Force the rendered tabs container into the correct axis via inline
      // styles so nothing — scope-class misses, cascade order, specificity
      // — can push the tabs back into a column at top/bottom.
      tabsContainer.style.display = 'flex';
      tabsContainer.style.flexDirection = isVertical ? 'column' : 'row';
      tabsContainer.style.alignItems = isVertical ? 'stretch' : 'center';
      tabsContainer.style.justifyContent = this.align === 'center' ? 'center' : 'flex-start';
      tabsContainer.style.flex = '1 1 auto';
      tabsContainer.style.minWidth = '0';
      tabsContainer.style.minHeight = '0';
      tabsContainer.style.overflow = 'hidden';

      this.pendingTabs.forEach((tab) => {
        tab.style.display = 'inline-flex';
        tab.style.flex = '0 0 auto';
        tabsContainer.appendChild(tab);
      });
      this.pendingTabs = [];
    }

    if (contentsContainer && this.pendingContents.length) {
      contentsContainer.style.display = 'block';
      contentsContainer.style.flex = '1 1 auto';
      contentsContainer.style.minHeight = '0';
      this.pendingContents.forEach((c) => contentsContainer.appendChild(c));
      this.pendingContents = [];
    }
  }

  /** Re-flow layout when `position` changes at runtime or after any render. */
  private reapplyTabsAxis() {
    const tabsContainer = this.host.querySelector('.tabs') as HTMLElement | null;
    if (!tabsContainer) return;
    const isVertical = this.position === 'left' || this.position === 'right';
    tabsContainer.style.display = 'flex';
    tabsContainer.style.flexDirection = isVertical ? 'column' : 'row';
    tabsContainer.style.alignItems = isVertical ? 'stretch' : 'center';
    tabsContainer.style.justifyContent = this.align === 'center' ? 'center' : 'flex-start';
    tabsContainer.style.flex = '1 1 auto';
    tabsContainer.style.minWidth = '0';
    tabsContainer.style.minHeight = '0';
    tabsContainer.style.overflow = 'hidden';
  }

  componentDidRender() {
    // Re-assert the inline flex layout on .tabs after every render so any
    // subsequent VDOM reconciliation can't flip it back to the default
    // block display.
    this.reapplyTabsAxis();
    // Also re-append tabs if VDOM reconciliation pulled them out.
    this.remountIfMissing();
  }

  /**
   * Walk the current `.tabs` container; if any tab we previously mounted
   * is no longer inside it (VDOM reconciliation can pull them out), append
   * it back. Cheap no-op when nothing drifted.
   */
  private remountIfMissing() {
    const tabsContainer = this.host.querySelector('.tabs') as HTMLElement | null;
    if (!tabsContainer) return;
    this.tabElements.forEach((tab) => {
      if (tab && tab.parentElement !== tabsContainer) {
        tab.style.display = 'inline-flex';
        tab.style.flex = '0 0 auto';
        tabsContainer.appendChild(tab);
      }
    });
  }

  componentDidLoad() {
    // Physically mount the captured tabs/contents into the rendered
    // containers FIRST. Must happen before refreshTabs so refreshTabs can
    // find them with its normal queries.
    this.mountCapturedChildren();

    this.isUpdateComplete = true;
    this.refreshTabs();

    if (this.isDraggable && !this.disabled) {
      this.enableDragAndDrop();
    }

    this.setTabs();
    this.setActive(this.active);

    // Add resize observer to handle parent size changes
    requestAnimationFrame(() => {
      this.updateParentRect();
      this.updateOverflowTabs();
    });

    // Observe parent element resize
    if (this.host.parentElement) {
      this.resizeObserver = new ResizeObserver((entries) => {
        // Ignore echoes from our own DOM mutations (hiding/showing tabs in
        // left/right layouts can shrink an auto-sized parent and re-fire
        // this observer, producing a visible shake).
        if (this._suppressResize) return;
        const entry = entries[0];
        if (!entry) return;
        const { width, height } = entry.contentRect;
        const isVertical = this.position === 'left' || this.position === 'right';
        const last = this._lastParentSize;
        const lastRelevant = isVertical ? last.height : last.width;
        const newRelevant = isVertical ? height : width;
        // Sub-pixel jitter is meaningless for overflow math.
        if (Math.abs(newRelevant - lastRelevant) < 1) return;
        this._lastParentSize = { width, height };
        // Coalesce bursts into a single update per frame.
        if (this._resizeRafId !== null) cancelAnimationFrame(this._resizeRafId);
        this._resizeRafId = requestAnimationFrame(() => {
          this._resizeRafId = null;
          this.updateParentRect();
          this.updateOverflowTabs();
        });
      });
      this.resizeObserver.observe(this.host.parentElement);
    }
  }

  disconnectedCallback() {
    this.disableDragAndDrop();

    // Cleanup resize observer
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this._resizeRafId !== null) {
      cancelAnimationFrame(this._resizeRafId);
      this._resizeRafId = null;
    }
  }

  @Watch('disabled')
  @Watch('active')
  watchDisabledOrActive() {
    if (this.isUpdateComplete) {
      this.setActive(this.active);

      const menu = this.getOverflowMenu();
      if(menu) {
        menu.disabled = this.disabled;
      }
    }
  }

  @Watch('type')
  @Watch('size')
  watchTypeOrSize() {
    if (this.isUpdateComplete) {
      this.updateTabs();
    }
  }

  @Watch('isDraggable')
  watchDraggable() {
    if (this.isUpdateComplete) {
      if (this.isDraggable && !this.disabled) {
        this.enableDragAndDrop();
      } else {
        this.disableDragAndDrop();
      }
    }
  }

  @Watch('position')
  watchPosition() {
    if (this.isUpdateComplete) {
      this.updateOverflowTabs();
      const tabs = this.refreshTabs();
      for (const tab of tabs) {
        tab.position = this.position;
      }
      // Flip the inline flex-direction on the rendered .tabs container
      // when switching between horizontal (top/bottom) and vertical
      // (left/right) layouts.
      this.reapplyTabsAxis();
    }
  }

  @Watch('align')
  watchAlign() {
    if (this.isUpdateComplete) {
      this.reapplyTabsAxis();
    }
  }

  @Method()
  async closeTab(nameOrIndex: string | number) {
    const tabs = this.refreshTabs();
    const tab =
      typeof nameOrIndex === 'number'
        ? tabs[nameOrIndex]
        : tabs.find((currentTab: HTMLSyTabElement) => currentTab.tabkey === nameOrIndex);
    if (tab) {
      await tab.setClose();
      this.removeTab(tab.tabkey);
    }
  }

  /** Programmatically select a tab by index (spec-aligned API). */
  @Method()
  async setActiveTab(index: number): Promise<void> {
    this.setActive(index);
  }

  /** Get the index of the currently selected tab (spec-aligned API). */
  @Method()
  async getActiveTab(): Promise<number | undefined> {
    return this.active;
  }

  private renderHeader() {
    const tabClasses = {
      tabs: true,
      [this.position]: true
    };

    const menuClasses = {
      'tab-more': true,
      'overflow-menu-button': true,
      disabled: this.disabled
    };

    return [
      <div class={tabClasses}>
        <slot name="tabs" />
      </div>,
      <div class="extra-area">
        <slot name="extra" />
        {this.addNewTab && (
          <div
            class="tab-add-button"
            role="button"
            aria-label="Add tab"
            tabindex={0}
            onClick={() => this.tabAdded.emit()}
          >
            <sy-icon size="medium">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <path fill="currentColor" d="M344 152C344 138.7 333.3 128 320 128C306.7 128 296 138.7 296 152L296 296L152 296C138.7 296 128 306.7 128 320C128 333.3 138.7 344 152 344L296 344L296 488C296 501.3 306.7 512 320 512C333.3 512 344 501.3 344 488L344 344L488 344C501.3 344 512 333.3 512 320C512 306.7 501.3 296 488 296L344 296L344 152z"/>
              </svg>
            </sy-icon>
          </div>
        )}
      </div>,
      this.overflowTabs.length ? (
        <div
          class={menuClasses}
          onMouseEnter={this.handleOverflowMenuButtonClick.bind(this)}
        >
          <sy-icon size="medium">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path fill="currentColor" d="M544 320C544 346.5 522.5 368 496 368C469.5 368 448 346.5 448 320C448 293.5 469.5 272 496 272C522.5 272 544 293.5 544 320zM368 320C368 346.5 346.5 368 320 368C293.5 368 272 346.5 272 320C272 293.5 293.5 272 320 272C346.5 272 368 293.5 368 320zM144 368C117.5 368 96 346.5 96 320C96 293.5 117.5 272 144 272C170.5 272 192 293.5 192 320C192 346.5 170.5 368 144 368z"/>
            </svg>
          </sy-icon>
          <sy-menu
            disabled={this.disabled}
            position="bottomRight"
            id={this.overflowMenuId}
            onItemSelected={this.handleMenuSelect.bind(this)}
          >
            {this.overflowTabs.map(tab => {
              const slotContent = this.getTabSlotContent(tab);
              return (
                <sy-menu-item value={tab.tabkey}>
                  {slotContent.map(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                      // Element 노드는 outerHTML 사용
                      return <span innerHTML={(node as Element).outerHTML}></span>;
                    } else if (node.nodeType === Node.TEXT_NODE) {
                      // 텍스트 노드는 textContent 사용
                      return node.textContent;
                    }
                    return null;
                  })}
                </sy-menu-item>
              );
            })}
          </sy-menu>
        </div>
      ) : null
    ];
  }

  render() {
    // Common usage nests a sy-global-header INSIDE a sy-tab-group so the
    // header renders the tab row. In that case the tab-group should NOT
    // render its own tab container (which would duplicate the tab row
    // and make the overflow calculation fight with the header's).
    // The original code used `closest('sy-global-header')` which looks for
    // an ancestor and was therefore always false — use `querySelector` for
    // descendants instead.
    const hasGlobalHeaderChild = this.host.querySelector('sy-global-header') !== null;

    const layoutClasses = {
      "top-layout": this.position === "top",
      "bottom-layout": this.position === "bottom",
      "left-layout": this.position === "left",
      "right-layout": this.position === "right"
    };

    const containerClasses = {
      "tab-group-container": true,
      "align-center": this.align === "center",
      "align-left": this.align === "left",
      "tab-padding-small": this.padding === "small",
      "tab-padding-medium": this.padding === "medium",
      "tab-padding-large": this.padding === "large",
      "tab-padding-none": this.padding === "none"
    };

    return (
      <div class={layoutClasses}>
        <slot />
        {!hasGlobalHeaderChild && (
          <div class={containerClasses}>
            {this.renderHeader()}
          </div>
        )}

        <div class="contents">
          <slot name="contents" />
        </div>
      </div>
    );
  }

  private get tabs(): HTMLSyTabElement[] {
    return this.tabElements;
  }

  private refreshTabs(): HTMLSyTabElement[] {
    // Tabs live inside the rendered `.tabs` container after
    // mountCapturedChildren has run. Fall back to the legacy `[slot="tabs"]`
    // wrapper for the global-header case (header owns that slot).
    const tabContainer =
      (this.host.querySelector('.tabs') as HTMLElement) ||
      (this.host.querySelector('[slot="tabs"]') as HTMLElement);

    if (tabContainer) {
      this.tabElements = Array.from(tabContainer.querySelectorAll('sy-tab'))
        .filter((tab) => tab.getAttribute('slot') !== 'extra') as HTMLSyTabElement[];
    } else {
      this.tabElements = [];
    }

    return this.tabElements;
  }

  private getTabContents(): HTMLSyTabContentElement[] {
    const contentContainer =
      (this.host.querySelector('.contents') as HTMLElement) ||
      (this.host.querySelector('[slot="contents"]') as HTMLElement);
    if (contentContainer) {
      return Array.from(contentContainer.querySelectorAll('sy-tab-content')) as HTMLSyTabContentElement[];
    }
    return [];
  }

  private getOverflowMenu(): HTMLSyMenuElement | null {
    return document.getElementById(this.overflowMenuId) as unknown as HTMLSyMenuElement | null;
  }

  /**
   * sy-tab의 실제 표시 컨텐츠(slot 내용)만 추출
   */
  private getTabSlotContent(tab: HTMLSyTabElement): Node[] {
    // sy-tab의 직접 자식 노드들을 가져옴 (이것이 slot에 들어가는 내용)
    const slotContent: Node[] = [];
    for (let i = 0; i < tab.childNodes.length; i++) {
      const node = tab.childNodes[i];
      // 텍스트 노드이거나 Element 노드인 경우만 추가
      if (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ELEMENT_NODE) {
        slotContent.push(node.cloneNode(true));
      }
    }
    return slotContent;
  }

  private updateParentRect() {
    if (this.host.parentElement) {
      this.parentRect = this.host.parentElement.getBoundingClientRect();
    }
  }

  private handleOverflowMenuButtonClick(e: Event) {
    e.stopPropagation();
    setTimeout(() => {
      const menu = this.getOverflowMenu();
      menu?.setSelectableAllItems();
    }, 1);
  }

  private setTabs() {
    const tabs = this.refreshTabs();
    const tabContents = this.getTabContents();

    tabs.forEach((tab: HTMLSyTabElement, index: number) => {
      tab.index = index;
      tab.parentDisabled = this.disabled;
      tab.type = this.type;
      tab.size = this.size;
      tab.position = this.position;

      if (tab.active && !this.disabled && !tab.currentDisabledStatus) {
        this.latestActiveIndex = index;
      }
      tab.active = this.disabled ? false : (!tab.currentDisabledStatus && index === this.active);
    });

    tabContents.forEach((content: HTMLSyTabContentElement) => {
      const contentName = content.getAttribute("name");
      const activatedTab = tabs.find((tab: HTMLSyTabElement) => tab.index === this.active);
      content.active = contentName === activatedTab?.getAttribute("tabkey");
      content.disabled = this.disabled;
    });
  }

  private setActive(activeIndex?: number) {
    const tabs = this.refreshTabs();

    if (this.disabled) {
      if (this.active !== undefined) {
        this.latestActiveIndex = this.active;
      }
      this.active = undefined;
    } else {
      if (activeIndex !== undefined && !tabs[activeIndex]?.currentDisabledStatus) {
        this.active = activeIndex;
      } else if (this.latestActiveIndex !== undefined && !tabs[this.latestActiveIndex]?.currentDisabledStatus) {
        this.active = this.latestActiveIndex;
      } else {
        this.active = this.findNextEnabledTab(0);
      }
    }
    this.setTabs();
  }

  private updateTabs() {
    const tabs = this.refreshTabs();
    const tabContents = this.getTabContents();

    if (tabs.length && tabContents) {
      tabs.forEach((tab: HTMLSyTabElement, _index: number) => {
        tab.parentDisabled = this.disabled;
        tab.type = this.type;
        tab.size = this.size;
        tab.position = this.position;
      });
    }
  }

private updateOverflowTabs() {
    const tabs = this.refreshTabs();
  // When sy-tab-group wraps a sy-global-header, the header renders the
  // tab row and owns overflow handling — delegate to it and bail out so
  // the two components don't fight over `tab.style.display`.
  const headerChild = this.host.querySelector('sy-global-header') as any;
  if (headerChild) {
    headerChild.updateOverflowTabs?.();
    return;
  }

  if (this._updateInProgress) return;
  this._updateInProgress = true;
  // Suppress ResizeObserver echoes triggered by the display mutations below.
  this._suppressResize = true;

  if (!tabs.length) {
    this._updateInProgress = false;
    this._suppressResize = false;
    return;
  }

  // 모든 탭을 보이도록 초기화
  tabs.forEach((tab: HTMLSyTabElement) => {
    tab.style.display = 'flex';
  });

  // tab-more 크기를 48px로 하드코딩
  this.tabMoreAreaSize = 48;

  requestAnimationFrame(() => {
    try {
      const isHorizontal = this.position === 'top' || this.position === 'bottom';

      // Measure the host directly. The host is `width:100%` / `height:100%`
      // of its parent, so this captures the actual available space — and
      // unlike the previous `parentRect` path it works when the parent has
      // `display: contents` (e.g. Storybook's sb-story-wrapper for
      // multi-child stories), where parent.getBoundingClientRect() can
      // collapse to 0×0 and push every tab into the overflow menu.
      const hostRect = this.host.getBoundingClientRect();
      const totalSpace = isHorizontal ? hostRect.width : hostRect.height;

      // Host hasn't been sized yet (typically pre-layout). Don't hide any
      // tabs — wait for the ResizeObserver to fire with a real size.
      if (totalSpace <= 0) {
        this.overflowTabs = [];
        tabs.forEach((tab) => { tab.style.display = 'flex'; });
        return;
      }

      const tabExtraArea = this.host.querySelector(".extra-area") as HTMLElement;
      const tabExtraRect = tabExtraArea?.getBoundingClientRect();
      this.tabExtraAreaSize = tabExtraRect
        ? (isHorizontal ? tabExtraRect.width : tabExtraRect.height)
        : 0;

      // Pre-measure every tab once.
      const tabSizes = tabs.map((tab) => {
        const r = tab.getBoundingClientRect();
        const styles = window.getComputedStyle(tab);
        const margin = isHorizontal
          ? parseFloat(styles.marginRight)
          : parseFloat(styles.marginBottom);
        return (isHorizontal ? r.width : r.height) + margin;
      });

      const baseSpace = totalSpace - this.tabExtraAreaSize;
      const totalTabSize = tabSizes.reduce((a, b) => a + b, 0);

      // First pass: do all tabs fit without reserving room for the
      // more-menu? If yes, no overflow — show every tab and skip the
      // menu reservation entirely. Otherwise reserve `tabMoreAreaSize` and
      // recompute which tabs fit alongside the menu.
      let overflowIndex = -1;
      if (totalTabSize > baseSpace) {
        const availableSpace = baseSpace - this.tabMoreAreaSize;
        let accumulated = 0;
        for (let i = 0; i < tabs.length; i++) {
          if (accumulated + tabSizes[i] > availableSpace) {
            overflowIndex = i;
            break;
          }
          accumulated += tabSizes[i];
        }
      }

      // 오버플로우가 발생한 경우
      if (overflowIndex > -1) {
        const visibleTabCount = overflowIndex;
        this.overflowTabs = [];

        // activeTab기준으로 보여지는 tab의 범위를 계산
        const active = this.active || 0;
        let startIndex = 0;

        // activeTab이 앞부분에 있는 경우 첫 번째부터 보여줌
        if (active < Math.floor(visibleTabCount / 2)) {
          startIndex = 0;
        }
        // activeTab이 끝부분에 있는 경우 마지막 visibleTabCount개 보여줌
        else if (active >= tabs.length - Math.ceil(visibleTabCount / 2)) {
          startIndex = Math.max(0, tabs.length - visibleTabCount);
        }
        // activeTab이 중간에 있는 경우 활성 탭을 중심으로 보여줌
        else {
          startIndex = Math.max(0, active - Math.floor(visibleTabCount / 2));
        }

        tabs.forEach((tab: HTMLSyTabElement, index: number) => {
          if (index >= startIndex && index < startIndex + visibleTabCount) {
            tab.style.display = 'flex';
          } else {
            tab.style.display = 'none';
            this.overflowTabs = [...this.overflowTabs, tab];
          }
        });
      } else {
        // 오버플로우가 없는 경우 - 모든 탭 표시
        this.overflowTabs = [];
        tabs.forEach(tab => {
          tab.style.display = 'flex';
        });
      }

      const menu = this.getOverflowMenu();
      menu?.clearSelectedItem();
    } finally {
      this._updateInProgress = false;
      // Hold the suppression for two more frames so the ResizeObserver
      // entries the browser queues from this frame's display:none mutations
      // are dropped before we resume listening.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this._suppressResize = false;
        });
      });
    }
  });
}

  private findNextEnabledTab(startIndex: number): number | undefined {
    for (let i = startIndex; i < this.tabs.length; i++) {
      if (!this.tabs[i].disabled) {
        return this.tabs[i].index;
      }
    }
    return undefined;
  }

  private findPreviousEnabledTab(startIndex: number): number | undefined {
    for (let i = startIndex; i >= 0; i--) {
      if (!this.tabs[i].disabled) {
        return i;
      }
    }
    return undefined;
  }

  private handleTabSelect(e: any) {
    e.stopPropagation();
    this.active = e.detail.index;
    this.selected.emit(e.detail);
    this.tabSelected.emit({ index: e.detail.index, value: e.detail.tabkey });
  }

  private handleTabClose(e: any) {
    e.stopPropagation();
    if (!e.detail.isManualClose) {
      const tabs = this.refreshTabs();
      const closedTab = tabs.find((tab: HTMLSyTabElement) => tab.index === e.detail.index);
      this.removeTab(e.detail.tabkey);

      if (closedTab && this.active === closedTab.index) {
        const nextActiveIndex = this.findNextEnabledTab(closedTab.index);
        const prevActiveIndex = this.findPreviousEnabledTab(closedTab.index - 1);

        if(nextActiveIndex !== undefined) {
          this.setActive(closedTab.index);
        } else if(nextActiveIndex === undefined && prevActiveIndex !== undefined) {
          this.setActive(prevActiveIndex);
        } else {
          this.setActive();
        }
      }
    }
    this.closeEvent(e);
  }

  private handleMenuSelect(e: CustomEvent) {
    e.stopPropagation();
    if (!this.disabled) {
      const tabs = this.refreshTabs();
      const activeTab = tabs.find((tab: HTMLSyTabElement) => tab.tabkey === e.detail.value);
      if(activeTab) {
        this.setActive(activeTab.index);
        setTimeout(() => {
          const menu = this.getOverflowMenu();
          menu?.clearSelectedItem();
          const selectedMenuItem = e.target as HTMLSyMenuItemElement;
          if(selectedMenuItem) {
            selectedMenuItem.select = true;
            this.updateOverflowTabs();
          }
        }, 1);
        this.selected.emit({ tabkey: activeTab.tabkey, index: activeTab.index });
        this.tabSelected.emit({ index: activeTab.index, value: activeTab.tabkey });
      }
    }
  }

  private removeTab(key: string) {
    const tabs = this.refreshTabs();
    const tabContents = this.getTabContents();
    const tabIndex = tabs.findIndex((tab: HTMLSyTabElement) => tab.tabkey === key);

    if (tabIndex >= 0) {
      tabs[tabIndex]?.remove();
      const contentToRemove = tabContents.find(content => content.getAttribute("name") === key);
      contentToRemove?.remove();

      this.refreshTabs();
      this.setTabs();

      if (this.active === tabIndex) {
        this.setActive(this.findNextEnabledTab(tabIndex));
      } else if ((this.active as number) > tabIndex) {
        (this.active as number)--;
        this.setTabs();
      }

      setTimeout(() => {
        this.updateOverflowTabs();
      }, 0);
    }
  }

  private enableDragAndDrop() {
    const tabs = this.refreshTabs();
    tabs.forEach((tab: HTMLSyTabElement) => {
      tab.draggable = true;
      tab.removeEventListener("dragstart", this.handleDragStart);
      tab.removeEventListener("dragover", this.handleDragOver);
      tab.removeEventListener("drop", this.handleDrop);
      tab.removeEventListener("dragend", this.handleDragEnd);
      tab.addEventListener("dragstart", this.handleDragStart);
      tab.addEventListener("dragover", this.handleDragOver);
      tab.addEventListener("drop", this.handleDrop);
      tab.addEventListener("dragend", this.handleDragEnd);
    });
    this.updateOverflowTabs();
  }

  private disableDragAndDrop() {
    const tabs = this.refreshTabs();
    tabs.forEach((tab: HTMLSyTabElement) => {
      tab.draggable = false;
      tab.removeEventListener("dragstart", this.handleDragStart);
      tab.removeEventListener("dragover", this.handleDragOver);
      tab.removeEventListener("drop", this.handleDrop);
      tab.removeEventListener("dragend", this.handleDragEnd);
    });
  }

  private handleDragStart = (e: DragEvent) => {
    this.draggedItem = e.target;
    this.isDropped = false;
    this.draggedIndex = this.draggedItem.index;
  }

  private handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    const target = e.currentTarget as HTMLSyTabElement;
    this.dragoverkey = target.tabkey;

    if(this.dragoverkey === this.prevDragOverkey) {
      return;
    } else {
      this.prevDragOverkey = this.dragoverkey;

      if (this.dragoverkey === this.draggedItem.tabkey) {
        return;
      }
    }

    this.clearDragOverClasses();
    target.setAttribute('dragover', 'true');
    this.dragoverIndex = target.index;

    if (this.dragoverIndex !== undefined && this.draggedIndex !== undefined) {
        this.reorderTabs(this.draggedIndex, this.dragoverIndex);
    }
  };

  private handleDrop = (e: DragEvent) => {
    e.preventDefault();
    this.isDropped = true;
    this.handleDragEnd(e);
  }

  private handleDragEnd = (_e: DragEvent) => {
    this.clearDragOverClasses();
  };

  private clearDragOverClasses() {
    this.tabs.forEach((tab: HTMLSyTabElement) => {
      tab.removeAttribute('dragover');
    });
  }

  private reorderTabs(draggedIndex: number, droppedIndex: number) {
    if (draggedIndex === droppedIndex) return;

    const tabsArray = Array.from(this.refreshTabs());
    const draggedTab = tabsArray[draggedIndex] as HTMLSyTabElement;

    tabsArray.splice(draggedIndex, 1);
    tabsArray.splice(droppedIndex, 0, draggedTab);

    tabsArray.forEach((tab: HTMLSyTabElement, index: number) => {
      tab.index = index;
      if(tab.tabkey === this.draggedItem.tabkey) {
        this.draggedIndex = index;
      }
    });

    const parentElement = draggedTab.parentElement;
    tabsArray.forEach((tab: HTMLSyTabElement) => {
      parentElement!.appendChild(tab);
    });

    if(this.active !== undefined) {
      if (this.active === draggedIndex) {
        this.active = droppedIndex;
      } else if (this.active > draggedIndex && this.active <= droppedIndex) {
        this.active--;
      } else if (this.active < draggedIndex && this.active >= droppedIndex) {
        this.active++;
      }
    }

    this.setTabs();
    this.reorderedEvent(tabsArray);
  }

  private reorderedEvent(tabsArray: HTMLSyTabElement[]) {
    this.ordered.emit(tabsArray);
  }

  private closeEvent(e: any) {
    this.closed.emit(e.detail);
    this.tabClosed.emit({ index: e.detail.index, value: e.detail.tabkey });
  }
}
