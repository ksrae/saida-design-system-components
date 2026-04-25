import { p as proxyCustomElement, H, c as createEvent, h } from './index.js';
import { f as fnAssignPropFromAlias } from './p-Dlcw8XSW.js';
import { d as defineCustomElement$6 } from './p-BTJnmsnM.js';
import { d as defineCustomElement$5 } from './p-DA_POXvZ.js';
import { d as defineCustomElement$4 } from './p-Bls6zSkh.js';
import { d as defineCustomElement$3 } from './p-DXUGU2Bh.js';
import { d as defineCustomElement$2 } from './p-Dx2eAEw1.js';

const syTabGroupCss = "@charset \"UTF-8\";.sc-sy-tab-group:root,.sc-sy-tab-group-h{--tabs-navigation-list-background-hover:rgba(255 255 255 / 0.07);--tabs-navigation-list-background-selected:var(--color-white-alpha-14);--tabs-navigation-closable-icon-enabled:var(--color-white-alpha-42);--tabs-navigation-closable-icon-hover:var(--color-white-alpha-97);--tabs-navigation-closable-icon-selected:var(--color-white-alpha-42)}sy-tab-group.sc-sy-tab-group{display:flex;flex-direction:column;width:100%;height:100%;min-height:0;user-select:none;box-sizing:border-box}sy-tab-group.sc-sy-tab-group .top-layout.sc-sy-tab-group,sy-tab-group.sc-sy-tab-group .bottom-layout.sc-sy-tab-group{display:flex;flex-direction:column;height:100%;min-height:0}sy-tab-group.sc-sy-tab-group .bottom-layout.sc-sy-tab-group{flex-direction:column-reverse}sy-tab-group.sc-sy-tab-group .left-layout.sc-sy-tab-group{display:flex;flex-direction:row;height:100%;min-height:0}sy-tab-group.sc-sy-tab-group .right-layout.sc-sy-tab-group{display:flex;flex-direction:row-reverse;height:100%;min-height:0}sy-tab-group.sc-sy-tab-group .tab-group-container.sc-sy-tab-group{position:relative;display:flex;align-items:center;justify-content:space-between;box-sizing:border-box;flex-shrink:0;min-width:0;min-height:0}sy-tab-group.sc-sy-tab-group .tab-group-container.align-center.sc-sy-tab-group{justify-content:center}sy-tab-group.sc-sy-tab-group .tab-group-container.tab-padding-none.sc-sy-tab-group{padding:0}sy-tab-group.sc-sy-tab-group .tab-group-container.tab-padding-small.sc-sy-tab-group{padding:0 var(--spacing-xsmall)}sy-tab-group.sc-sy-tab-group .tab-group-container.tab-padding-medium.sc-sy-tab-group{padding:0 var(--spacing-small)}sy-tab-group.sc-sy-tab-group .tab-group-container.tab-padding-large.sc-sy-tab-group{padding:0 var(--spacing-medium)}sy-tab-group.sc-sy-tab-group .left-layout.sc-sy-tab-group .tab-group-container.sc-sy-tab-group,sy-tab-group.sc-sy-tab-group .right-layout.sc-sy-tab-group .tab-group-container.sc-sy-tab-group{flex-direction:column;align-items:stretch;height:100%}sy-tab-group.sc-sy-tab-group .tabs.sc-sy-tab-group{display:flex;align-items:center;min-width:0;min-height:0;overflow:hidden;flex:1 1 auto}sy-tab-group.sc-sy-tab-group .left-layout.sc-sy-tab-group .tabs.sc-sy-tab-group,sy-tab-group.sc-sy-tab-group .right-layout.sc-sy-tab-group .tabs.sc-sy-tab-group{flex-direction:column;align-items:stretch;flex-shrink:0}sy-tab-group.sc-sy-tab-group .top-layout.sc-sy-tab-group .tab-group-container.sc-sy-tab-group::after{content:\"\";position:absolute;left:0;right:0;bottom:0;border-bottom:var(--border-small) var(--tabs-card-list-border-enabeld)}sy-tab-group.sc-sy-tab-group .bottom-layout.sc-sy-tab-group .tab-group-container.sc-sy-tab-group::after{content:\"\";position:absolute;left:0;right:0;top:0;border-top:var(--border-small) var(--tabs-card-list-border-enabeld)}sy-tab-group.sc-sy-tab-group .left-layout.sc-sy-tab-group .tab-group-container.sc-sy-tab-group::after{content:\"\";position:absolute;top:0;right:0;height:100%;border-right:var(--border-small) var(--tabs-card-list-border-enabeld)}sy-tab-group.sc-sy-tab-group .right-layout.sc-sy-tab-group .tab-group-container.sc-sy-tab-group::after{content:\"\";position:absolute;top:0;left:0;height:100%;border-left:var(--border-small) var(--tabs-card-list-border-enabeld)}sy-tab-group.sc-sy-tab-group [slot=tabs].sc-sy-tab-group{display:flex;align-items:center;flex:1 1 auto;min-width:0;min-height:0;overflow:hidden}sy-tab-group.sc-sy-tab-group .left-layout.sc-sy-tab-group [slot=tabs].sc-sy-tab-group,sy-tab-group.sc-sy-tab-group .right-layout.sc-sy-tab-group [slot=tabs].sc-sy-tab-group{flex-direction:column;align-items:stretch}sy-tab-group.sc-sy-tab-group .contents.sc-sy-tab-group{flex:1 1 auto;min-height:0;min-width:0;overflow:auto}sy-tab-group.sc-sy-tab-group .tab-more.sc-sy-tab-group{position:relative;display:flex;align-items:center;justify-content:center;box-sizing:border-box;flex-shrink:0;cursor:pointer;padding:0 var(--spacing-medium);height:100%}sy-tab-group[size=small].sc-sy-tab-group .tab-more.sc-sy-tab-group{padding:0 var(--spacing-small)}sy-tab-group[size=medium].sc-sy-tab-group .tab-more.sc-sy-tab-group{padding:0 var(--spacing-medium)}sy-tab-group[size=large].sc-sy-tab-group .tab-more.sc-sy-tab-group{padding:0 var(--spacing-large)}sy-tab-group.sc-sy-tab-group .extra-area.sc-sy-tab-group{display:flex;align-items:center;box-sizing:border-box;flex-shrink:0}sy-tab-group.sc-sy-tab-group .tab-add-button.sc-sy-tab-group{display:flex;align-items:center;justify-content:center;padding:0 var(--spacing-2xsmall);cursor:pointer;color:var(--tabs-line-list-icon-enabled, currentColor)}sy-tab-group.sc-sy-tab-group .tab-add-button.sc-sy-tab-group:hover{background-color:var(--tabs-overflow-background-enabled, var(--surface-hover))}sy-tab-group[disabled].sc-sy-tab-group .tabs.sc-sy-tab-group,sy-tab-group[disabled].sc-sy-tab-group .tab-more.sc-sy-tab-group{cursor:auto;color:var(--tabs-line-list-icon-disabled)}sy-tab-group[type=line].sc-sy-tab-group sy-tab[active].sc-sy-tab-group{color:var(--tabs-line-list-text-selected)}sy-tab-group[type=line].sc-sy-tab-group sy-tab.sc-sy-tab-group:hover{color:var(--tabs-line-list-text-hover)}sy-tab-group[type=card].sc-sy-tab-group sy-tab.sc-sy-tab-group{border:0}sy-tab-group[type=navigation].sc-sy-tab-group sy-tab.sc-sy-tab-group{color:var(--tabs-navigation-list-text-enabled);margin:0;border:none}sy-tab-group[type=navigation].sc-sy-tab-group sy-tab.sc-sy-tab-group:hover{background:var(--tabs-navigation-list-background-hover);color:var(--tabs-navigation-list-text-hover)}sy-tab-group[type=navigation].sc-sy-tab-group sy-tab[active].sc-sy-tab-group{background-color:var(--tabs-navigation-list-background-selected);color:var(--tabs-navigation-list-text-selected)}sy-tab-group[size=small].sc-sy-tab-group .top-layout.sc-sy-tab-group .tab-group-container.sc-sy-tab-group,sy-tab-group[size=small].sc-sy-tab-group .bottom-layout.sc-sy-tab-group .tab-group-container.sc-sy-tab-group{height:var(--header-small)}sy-tab-group[size=medium].sc-sy-tab-group .top-layout.sc-sy-tab-group .tab-group-container.sc-sy-tab-group,sy-tab-group[size=medium].sc-sy-tab-group .bottom-layout.sc-sy-tab-group .tab-group-container.sc-sy-tab-group{height:var(--header-medium)}sy-tab-group[size=large].sc-sy-tab-group .top-layout.sc-sy-tab-group .tab-group-container.sc-sy-tab-group,sy-tab-group[size=large].sc-sy-tab-group .bottom-layout.sc-sy-tab-group .tab-group-container.sc-sy-tab-group{height:var(--header-large)}sy-tab-group[position=left].sc-sy-tab-group sy-tab.sc-sy-tab-group,sy-tab-group[position=right].sc-sy-tab-group sy-tab.sc-sy-tab-group{max-width:150px;margin-right:0;width:100%}sy-tab-group[align=center].sc-sy-tab-group sy-tab-content.sc-sy-tab-group{text-align:left}sy-tab-group.sc-sy-tab-group .dragging.sc-sy-tab-group{opacity:0.5}";

let tabGroupOverflowMenuSequence = 0;
const SyTabGroup$1 = /*@__PURE__*/ proxyCustomElement(class SyTabGroup extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.selected = createEvent(this, "selected");
        this.closed = createEvent(this, "closed");
        this.ordered = createEvent(this, "ordered");
        this.tabSelected = createEvent(this, "tabSelected");
        this.tabClosed = createEvent(this, "tabClosed");
        this.tabAdded = createEvent(this, "tabAdded");
    }
    get host() { return this; }
    active;
    align = 'left';
    disabled = false;
    isdraggable = false;
    position = "top";
    type = "line";
    size = "medium";
    padding = "none";
    addNewTab = false;
    dragover = false;
    tabMoreAreaSize = 48;
    tabExtraAreaSize = 0;
    overflowTabs = [];
    latestActiveIndex;
    resizeObserver;
    overflowMenuId = `tab-overflow-menu-${++tabGroupOverflowMenuSequence}`;
    tabElements = [];
    selected;
    closed;
    ordered;
    // Spec-aligned events (emitted alongside legacy ones).
    tabSelected;
    tabClosed;
    tabAdded;
    // private tabMoreArea!: HTMLDivElement;
    draggedItem;
    dragoverkey;
    prevDragOverkey;
    draggedIndex;
    dragoverIndex;
    droppedIndex;
    isDropped = false;
    isUpdateComplete = false;
    parentRect;
    _updateInProgress = false;
    handleTabSelected(e) {
        if (e.target && e.target.tagName === 'SY-TAB') {
            this.handleTabSelect(e);
        }
    }
    handleTabClosed(e) {
        if (e.target && e.target.tagName === 'SY-TAB') {
            this.handleTabClose(e);
        }
    }
    connectedCallback() {
        this.updateParentRect();
    }
    componentWillLoad() {
        // Accept spec-aligned attribute aliases without breaking legacy markup.
        const placementAlias = fnAssignPropFromAlias(this.host, 'placement');
        if (placementAlias)
            this.position = placementAlias;
        const indexAlias = fnAssignPropFromAlias(this.host, 'index');
        if (indexAlias !== null && indexAlias !== undefined && this.active === undefined) {
            this.active = indexAlias;
        }
        const centered = fnAssignPropFromAlias(this.host, 'centered');
        if (centered)
            this.align = 'center';
        const addNewTabAlias = fnAssignPropFromAlias(this.host, 'add-new-tab', 'addNewTab');
        if (addNewTabAlias !== null && addNewTabAlias !== undefined)
            this.addNewTab = addNewTabAlias;
        // Take a snapshot of the sy-tab / sy-tab-content children the caller
        // provided (flat or inside slot wrappers). We'll physically move them
        // into the rendered containers in componentDidLoad. This bypasses
        // Stencil's scoped-slot emulation entirely — which is what was leaving
        // the tabs unstyled and stacking vertically regardless of how we
        // decorated the [slot="tabs"] wrapper.
        this.collectSlottedChildren();
    }
    /** Pending tab elements captured from light-DOM before first render. */
    pendingTabs = [];
    /** Pending tab-content elements captured from light-DOM before first render. */
    pendingContents = [];
    collectSlottedChildren() {
        const host = this.host;
        // If a global-header is nested inside the group the header owns the tab
        // row — leave any tabs alone in that case. But we still need to collect
        // and mount sy-tab-content children so the active tab's content shows.
        const hasGlobalHeaderChild = host.querySelector('sy-global-header') !== null;
        const tabs = [];
        const contents = [];
        const walk = (root) => {
            Array.from(root.children).forEach((child) => {
                const tag = child.tagName;
                // Skip anything inside the header — its tabs/contents are managed there.
                if (tag === 'SY-GLOBAL-HEADER')
                    return;
                if (tag === 'SY-TAB' && child.getAttribute('slot') !== 'extra') {
                    if (!hasGlobalHeaderChild)
                        tabs.push(child);
                }
                else if (tag === 'SY-TAB-CONTENT') {
                    contents.push(child);
                }
                else if (child.getAttribute('slot') === 'tabs' || child.getAttribute('slot') === 'contents') {
                    // Descend into user-provided slot wrappers.
                    walk(child);
                }
            });
        };
        walk(host);
        this.pendingTabs = tabs;
        this.pendingContents = contents;
        // Remove any empty slot wrappers the user left around so we don't end
        // up with stray div.slot="tabs" nodes fighting with our rendered .tabs.
        Array.from(host.children).forEach((child) => {
            const slot = child.getAttribute('slot');
            if (slot === 'tabs' && !hasGlobalHeaderChild) {
                host.removeChild(child);
            }
            else if (slot === 'contents') {
                host.removeChild(child);
            }
        });
        // Also remove now-orphan tabs/contents that were captured — we'll
        // reinsert them into the rendered containers after first render.
        tabs.forEach((t) => t.parentElement?.removeChild(t));
        contents.forEach((c) => c.parentElement?.removeChild(c));
    }
    mountCapturedChildren() {
        const tabsContainer = this.host.querySelector('.tabs');
        const contentsContainer = this.host.querySelector('.contents');
        if (tabsContainer && this.pendingTabs.length) {
            const isVertical = this.position === 'left' || this.position === 'right';
            // Force the rendered tabs container into the correct axis via inline
            // styles so nothing — scope-class misses, cascade order, specificity
            // — can push the tabs back into a column at top/bottom.
            tabsContainer.style.display = 'flex';
            tabsContainer.style.flexDirection = isVertical ? 'column' : 'row';
            tabsContainer.style.alignItems = isVertical ? 'stretch' : 'center';
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
    reapplyTabsAxis() {
        const tabsContainer = this.host.querySelector('.tabs');
        if (!tabsContainer)
            return;
        const isVertical = this.position === 'left' || this.position === 'right';
        tabsContainer.style.display = 'flex';
        tabsContainer.style.flexDirection = isVertical ? 'column' : 'row';
        tabsContainer.style.alignItems = isVertical ? 'stretch' : 'center';
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
    remountIfMissing() {
        const tabsContainer = this.host.querySelector('.tabs');
        if (!tabsContainer)
            return;
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
        if (this.isdraggable && !this.disabled) {
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
            this.resizeObserver = new ResizeObserver(() => {
                this.updateParentRect();
                this.updateOverflowTabs();
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
    }
    watchDisabledOrActive() {
        if (this.isUpdateComplete) {
            this.setActive(this.active);
            const menu = this.getOverflowMenu();
            if (menu) {
                menu.disabled = this.disabled;
            }
        }
    }
    watchTypeOrSize() {
        if (this.isUpdateComplete) {
            this.updateTabs();
        }
    }
    watchDraggable() {
        if (this.isUpdateComplete) {
            if (this.isdraggable && !this.disabled) {
                this.enableDragAndDrop();
            }
            else {
                this.disableDragAndDrop();
            }
        }
    }
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
    async closeTab(nameOrIndex) {
        const tabs = this.refreshTabs();
        const tab = typeof nameOrIndex === 'number'
            ? tabs[nameOrIndex]
            : tabs.find((currentTab) => currentTab.tabkey === nameOrIndex);
        if (tab) {
            await tab.setClose();
            this.removeTab(tab.tabkey);
        }
    }
    /** Programmatically select a tab by index (spec-aligned API). */
    async setActiveTab(index) {
        this.setActive(index);
    }
    /** Get the index of the currently selected tab (spec-aligned API). */
    async getActiveTab() {
        return this.active;
    }
    renderHeader() {
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
            h("div", { class: tabClasses }, h("slot", { name: "tabs" })),
            h("div", { class: "extra-area" }, h("slot", { name: "extra" }), this.addNewTab && (h("div", { class: "tab-add-button", role: "button", "aria-label": "Add tab", tabindex: 0, onClick: () => this.tabAdded.emit() }, h("sy-icon", { size: "medium" }, h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { fill: "currentColor", d: "M344 152C344 138.7 333.3 128 320 128C306.7 128 296 138.7 296 152L296 296L152 296C138.7 296 128 306.7 128 320C128 333.3 138.7 344 152 344L296 344L296 488C296 501.3 306.7 512 320 512C333.3 512 344 501.3 344 488L344 344L488 344C501.3 344 512 333.3 512 320C512 306.7 501.3 296 488 296L344 296L344 152z" })))))),
            this.overflowTabs.length ? (h("div", { class: menuClasses, onMouseEnter: this.handleOverflowMenuButtonClick.bind(this) }, h("sy-icon", { size: "medium" }, h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { fill: "currentColor", d: "M544 320C544 346.5 522.5 368 496 368C469.5 368 448 346.5 448 320C448 293.5 469.5 272 496 272C522.5 272 544 293.5 544 320zM368 320C368 346.5 346.5 368 320 368C293.5 368 272 346.5 272 320C272 293.5 293.5 272 320 272C346.5 272 368 293.5 368 320zM144 368C117.5 368 96 346.5 96 320C96 293.5 117.5 272 144 272C170.5 272 192 293.5 192 320C192 346.5 170.5 368 144 368z" }))), h("sy-menu", { disabled: this.disabled, position: "bottomRight", id: this.overflowMenuId, onItemSelected: this.handleMenuSelect.bind(this) }, this.overflowTabs.map(tab => {
                const slotContent = this.getTabSlotContent(tab);
                return (h("sy-menu-item", { value: tab.tabkey }, slotContent.map(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Element 노드는 outerHTML 사용
                        return h("span", { innerHTML: node.outerHTML });
                    }
                    else if (node.nodeType === Node.TEXT_NODE) {
                        // 텍스트 노드는 textContent 사용
                        return node.textContent;
                    }
                    return null;
                })));
            })))) : null
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
        return (h("div", { key: '92358342c6ffd9983e5f7a72913510d5e98a65d9', class: layoutClasses }, h("slot", { key: '70b40a7aa4fada29c05c103d5df8aa8e51bc250e' }), !hasGlobalHeaderChild && (h("div", { key: '827d6fb3013e80961d3a68653af2ccc274846fa1', class: containerClasses }, this.renderHeader())), h("div", { key: '5772e756b08cf12e0e5976af97ec1e1df4663063', class: "contents" }, h("slot", { key: 'f138139aba93c84e5cdd6c93194824f2d70ca4b6', name: "contents" }))));
    }
    get tabs() {
        return this.tabElements;
    }
    refreshTabs() {
        // Tabs live inside the rendered `.tabs` container after
        // mountCapturedChildren has run. Fall back to the legacy `[slot="tabs"]`
        // wrapper for the global-header case (header owns that slot).
        const tabContainer = this.host.querySelector('.tabs') ||
            this.host.querySelector('[slot="tabs"]');
        if (tabContainer) {
            this.tabElements = Array.from(tabContainer.querySelectorAll('sy-tab'))
                .filter((tab) => tab.getAttribute('slot') !== 'extra');
        }
        else {
            this.tabElements = [];
        }
        return this.tabElements;
    }
    getTabContents() {
        const contentContainer = this.host.querySelector('.contents') ||
            this.host.querySelector('[slot="contents"]');
        if (contentContainer) {
            return Array.from(contentContainer.querySelectorAll('sy-tab-content'));
        }
        return [];
    }
    getOverflowMenu() {
        return document.getElementById(this.overflowMenuId);
    }
    /**
     * sy-tab의 실제 표시 컨텐츠(slot 내용)만 추출
     */
    getTabSlotContent(tab) {
        // sy-tab의 직접 자식 노드들을 가져옴 (이것이 slot에 들어가는 내용)
        const slotContent = [];
        for (let i = 0; i < tab.childNodes.length; i++) {
            const node = tab.childNodes[i];
            // 텍스트 노드이거나 Element 노드인 경우만 추가
            if (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ELEMENT_NODE) {
                slotContent.push(node.cloneNode(true));
            }
        }
        return slotContent;
    }
    updateParentRect() {
        if (this.host.parentElement) {
            this.parentRect = this.host.parentElement.getBoundingClientRect();
        }
    }
    handleOverflowMenuButtonClick(e) {
        e.stopPropagation();
        setTimeout(() => {
            const menu = this.getOverflowMenu();
            menu?.setSelectableAllItems();
        }, 1);
    }
    setTabs() {
        const tabs = this.refreshTabs();
        const tabContents = this.getTabContents();
        tabs.forEach((tab, index) => {
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
        tabContents.forEach((content) => {
            const contentName = content.getAttribute("name");
            const activatedTab = tabs.find((tab) => tab.index === this.active);
            content.active = contentName === activatedTab?.getAttribute("tabkey");
            content.disabled = this.disabled;
        });
    }
    setActive(activeIndex) {
        const tabs = this.refreshTabs();
        if (this.disabled) {
            if (this.active !== undefined) {
                this.latestActiveIndex = this.active;
            }
            this.active = undefined;
        }
        else {
            if (activeIndex !== undefined && !tabs[activeIndex]?.currentDisabledStatus) {
                this.active = activeIndex;
            }
            else if (this.latestActiveIndex !== undefined && !tabs[this.latestActiveIndex]?.currentDisabledStatus) {
                this.active = this.latestActiveIndex;
            }
            else {
                this.active = this.findNextEnabledTab(0);
            }
        }
        this.setTabs();
    }
    updateTabs() {
        const tabs = this.refreshTabs();
        const tabContents = this.getTabContents();
        if (tabs.length && tabContents) {
            tabs.forEach((tab, _index) => {
                tab.parentDisabled = this.disabled;
                tab.type = this.type;
                tab.size = this.size;
                tab.position = this.position;
            });
        }
    }
    updateOverflowTabs() {
        const tabs = this.refreshTabs();
        // When sy-tab-group wraps a sy-global-header, the header renders the
        // tab row and owns overflow handling — delegate to it and bail out so
        // the two components don't fight over `tab.style.display`.
        const headerChild = this.host.querySelector('sy-global-header');
        if (headerChild) {
            headerChild.updateOverflowTabs?.();
            return;
        }
        if (this._updateInProgress)
            return;
        this._updateInProgress = true;
        if (!tabs.length || !this.parentRect) {
            this._updateInProgress = false;
            return;
        }
        // 모든 탭을 보이도록 초기화
        tabs.forEach((tab) => {
            tab.style.display = 'flex';
        });
        // tab-more 크기를 48px로 하드코딩
        this.tabMoreAreaSize = 48;
        requestAnimationFrame(() => {
            try {
                // light DOM에서 extra-area 찾기
                const tabExtraArea = this.host.querySelector(".extra-area");
                const tabExtraRect = tabExtraArea?.getBoundingClientRect();
                this.tabExtraAreaSize = tabExtraRect ?
                    (this.position === 'top' || this.position === 'bottom') ?
                        tabExtraRect.width :
                        tabExtraRect.height
                    : 0;
                // 사용 가능한 총 공간 계산
                const availableSpace = (this.position === 'top' || this.position === 'bottom') ?
                    this.parentRect.width - this.tabExtraAreaSize - this.tabMoreAreaSize :
                    this.parentRect.height - this.tabExtraAreaSize - this.tabMoreAreaSize;
                let accumulatedWidth = 0;
                let overflowIndex = -1;
                // 탭 크기 계산 및 오버플로우 지점 찾기
                for (let i = 0; i < tabs.length; i++) {
                    const tab = tabs[i];
                    const tabRect = tab.getBoundingClientRect();
                    const tabWidth = (this.position === 'top' || this.position === 'bottom') ?
                        tabRect.width : tabRect.height;
                    const styles = window.getComputedStyle(tab);
                    const margin = (this.position === 'top' || this.position === 'bottom') ?
                        parseFloat(styles.marginRight) :
                        parseFloat(styles.marginBottom);
                    const totalWidth = tabWidth + margin;
                    if (accumulatedWidth + totalWidth > availableSpace) {
                        overflowIndex = i;
                        break;
                    }
                    else {
                        accumulatedWidth += totalWidth;
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
                    tabs.forEach((tab, index) => {
                        if (index >= startIndex && index < startIndex + visibleTabCount) {
                            tab.style.display = 'flex';
                        }
                        else {
                            tab.style.display = 'none';
                            this.overflowTabs = [...this.overflowTabs, tab];
                        }
                    });
                }
                else {
                    // 오버플로우가 없는 경우 - 모든 탭 표시
                    this.overflowTabs = [];
                    tabs.forEach(tab => {
                        tab.style.display = 'flex';
                    });
                }
                const menu = this.getOverflowMenu();
                menu?.clearSelectedItem();
            }
            finally {
                this._updateInProgress = false;
            }
        });
    }
    findNextEnabledTab(startIndex) {
        for (let i = startIndex; i < this.tabs.length; i++) {
            if (!this.tabs[i].disabled) {
                return this.tabs[i].index;
            }
        }
        return undefined;
    }
    findPreviousEnabledTab(startIndex) {
        for (let i = startIndex; i >= 0; i--) {
            if (!this.tabs[i].disabled) {
                return i;
            }
        }
        return undefined;
    }
    handleTabSelect(e) {
        e.stopPropagation();
        this.active = e.detail.index;
        this.selected.emit(e.detail);
        this.tabSelected.emit({ index: e.detail.index, value: e.detail.tabkey });
    }
    handleTabClose(e) {
        e.stopPropagation();
        if (!e.detail.isManualClose) {
            const tabs = this.refreshTabs();
            const closedTab = tabs.find((tab) => tab.index === e.detail.index);
            this.removeTab(e.detail.tabkey);
            if (closedTab && this.active === closedTab.index) {
                const nextActiveIndex = this.findNextEnabledTab(closedTab.index);
                const prevActiveIndex = this.findPreviousEnabledTab(closedTab.index - 1);
                if (nextActiveIndex !== undefined) {
                    this.setActive(closedTab.index);
                }
                else if (nextActiveIndex === undefined && prevActiveIndex !== undefined) {
                    this.setActive(prevActiveIndex);
                }
                else {
                    this.setActive();
                }
            }
        }
        this.closeEvent(e);
    }
    handleMenuSelect(e) {
        e.stopPropagation();
        if (!this.disabled) {
            const tabs = this.refreshTabs();
            const activeTab = tabs.find((tab) => tab.tabkey === e.detail.value);
            if (activeTab) {
                this.setActive(activeTab.index);
                setTimeout(() => {
                    const menu = this.getOverflowMenu();
                    menu?.clearSelectedItem();
                    const selectedMenuItem = e.target;
                    if (selectedMenuItem) {
                        selectedMenuItem.select = true;
                        this.updateOverflowTabs();
                    }
                }, 1);
                this.selected.emit({ tabkey: activeTab.tabkey, index: activeTab.index });
                this.tabSelected.emit({ index: activeTab.index, value: activeTab.tabkey });
            }
        }
    }
    removeTab(key) {
        const tabs = this.refreshTabs();
        const tabContents = this.getTabContents();
        const tabIndex = tabs.findIndex((tab) => tab.tabkey === key);
        if (tabIndex >= 0) {
            tabs[tabIndex]?.remove();
            const contentToRemove = tabContents.find(content => content.getAttribute("name") === key);
            contentToRemove?.remove();
            this.refreshTabs();
            this.setTabs();
            if (this.active === tabIndex) {
                this.setActive(this.findNextEnabledTab(tabIndex));
            }
            else if (this.active > tabIndex) {
                this.active--;
                this.setTabs();
            }
            setTimeout(() => {
                this.updateOverflowTabs();
            }, 0);
        }
    }
    enableDragAndDrop() {
        const tabs = this.refreshTabs();
        tabs.forEach((tab) => {
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
    disableDragAndDrop() {
        const tabs = this.refreshTabs();
        tabs.forEach((tab) => {
            tab.draggable = false;
            tab.removeEventListener("dragstart", this.handleDragStart);
            tab.removeEventListener("dragover", this.handleDragOver);
            tab.removeEventListener("drop", this.handleDrop);
            tab.removeEventListener("dragend", this.handleDragEnd);
        });
    }
    handleDragStart = (e) => {
        this.draggedItem = e.target;
        this.isDropped = false;
        this.draggedIndex = this.draggedItem.index;
    };
    handleDragOver = (e) => {
        e.preventDefault();
        const target = e.currentTarget;
        this.dragoverkey = target.tabkey;
        if (this.dragoverkey === this.prevDragOverkey) {
            return;
        }
        else {
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
    handleDrop = (e) => {
        e.preventDefault();
        this.isDropped = true;
        this.handleDragEnd(e);
    };
    handleDragEnd = (_e) => {
        this.clearDragOverClasses();
    };
    clearDragOverClasses() {
        this.tabs.forEach((tab) => {
            tab.removeAttribute('dragover');
        });
    }
    reorderTabs(draggedIndex, droppedIndex) {
        if (draggedIndex === droppedIndex)
            return;
        const tabsArray = Array.from(this.refreshTabs());
        const draggedTab = tabsArray[draggedIndex];
        tabsArray.splice(draggedIndex, 1);
        tabsArray.splice(droppedIndex, 0, draggedTab);
        tabsArray.forEach((tab, index) => {
            tab.index = index;
            if (tab.tabkey === this.draggedItem.tabkey) {
                this.draggedIndex = index;
            }
        });
        const parentElement = draggedTab.parentElement;
        tabsArray.forEach((tab) => {
            parentElement.appendChild(tab);
        });
        if (this.active !== undefined) {
            if (this.active === draggedIndex) {
                this.active = droppedIndex;
            }
            else if (this.active > draggedIndex && this.active <= droppedIndex) {
                this.active--;
            }
            else if (this.active < draggedIndex && this.active >= droppedIndex) {
                this.active++;
            }
        }
        this.setTabs();
        this.reorderedEvent(tabsArray);
    }
    reorderedEvent(tabsArray) {
        this.ordered.emit(tabsArray);
    }
    closeEvent(e) {
        this.closed.emit(e.detail);
        this.tabClosed.emit({ index: e.detail.index, value: e.detail.tabkey });
    }
    static get watchers() { return {
        "disabled": ["watchDisabledOrActive"],
        "active": ["watchDisabledOrActive"],
        "type": ["watchTypeOrSize"],
        "size": ["watchTypeOrSize"],
        "isdraggable": ["watchDraggable"],
        "position": ["watchPosition"]
    }; }
    static get style() { return syTabGroupCss; }
}, [262, "sy-tab-group", {
        "active": [1026],
        "align": [1537],
        "disabled": [4],
        "isdraggable": [4, "draggable"],
        "position": [1537],
        "type": [513],
        "size": [513],
        "padding": [1],
        "addNewTab": [1028, "add-new-tab"],
        "dragover": [32],
        "tabMoreAreaSize": [32],
        "tabExtraAreaSize": [32],
        "overflowTabs": [32],
        "closeTab": [64],
        "setActiveTab": [64],
        "getActiveTab": [64]
    }, [[0, "selected", "handleTabSelected"], [0, "closed", "handleTabClosed"]], {
        "disabled": ["watchDisabledOrActive"],
        "active": ["watchDisabledOrActive"],
        "type": ["watchTypeOrSize"],
        "size": ["watchTypeOrSize"],
        "isdraggable": ["watchDraggable"],
        "position": ["watchPosition"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-tab-group", "sy-checkbox", "sy-icon", "sy-menu", "sy-menu-item", "sy-spinner"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-tab-group":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyTabGroup$1);
            }
            break;
        case "sy-checkbox":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "sy-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "sy-menu":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "sy-menu-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "sy-spinner":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const SyTabGroup = SyTabGroup$1;
const defineCustomElement = defineCustomElement$1;

export { SyTabGroup, defineCustomElement };
