import { p as proxyCustomElement, H, c as createEvent, h } from './index.js';
import { f as fnAssignPropFromAlias } from './p-Dlcw8XSW.js';
import { d as defineCustomElement$8 } from './p-DeTd2AfI.js';
import { d as defineCustomElement$7 } from './p-BTJnmsnM.js';
import { d as defineCustomElement$6 } from './p-DA_POXvZ.js';
import { d as defineCustomElement$5 } from './p-BYla455P.js';
import { d as defineCustomElement$4 } from './p-Bls6zSkh.js';
import { d as defineCustomElement$3 } from './p-DXUGU2Bh.js';
import { d as defineCustomElement$2 } from './p-Dx2eAEw1.js';

const syGlobalHeaderCss = "@charset \"UTF-8\";sy-global-header{display:block;width:100%;max-width:100%;min-width:0;box-sizing:border-box;height:var(--header-medium);background-color:var(--globalheader-default-container-background-enabled);border-bottom:1px solid var(--globalheader-default-container-border-enabled);color:var(--text-subtler)}sy-global-header[sticky]{position:sticky;top:0;z-index:1000;box-shadow:var(--header-shadow)}.header-wrapper{display:flex;align-items:center;justify-content:space-between;height:100%;width:100%;min-width:0;padding-right:var(--spacing-small);box-sizing:border-box}.header-title{display:flex;align-items:center;flex-shrink:0;padding-right:var(--spacing-medium)}.header-title .logo{display:block;width:100px;height:44px}.header-title .logo img{display:block;width:100%;height:100%;object-fit:contain}.header-title .appname{height:24px;align-items:center;white-space:nowrap;color:var(--globalheader-default-title-text-enabled);font-family:\"Roboto\";font-size:16px;font-weight:500;line-height:26px;letter-spacing:0.5px;display:flex}.header-title .appname:before{content:\"\";width:1px;display:flex;align-self:center;margin-left:var(--spacing-small);height:18px;border-left:1px solid var(--globalheader-default-divider-border-enabled);margin-right:var(--spacing-small)}.header-tab{display:flex;align-items:center;flex:1 1 0;min-width:0;overflow:hidden}.header-tab [slot=tabs]{display:flex;align-items:center;flex:1 1 auto;min-width:0;overflow:hidden}.header-tab .header-tab-more{display:flex;align-items:center;padding:0 var(--spacing-2xsmall);cursor:pointer;flex-shrink:0}.header-tab .header-tab-more:hover{background-color:var(--surface-hover)}.header-end{display:flex;align-items:center;flex-shrink:0;gap:var(--spacing-3xsmall)}.header-end [slot=actions]{display:flex;align-items:center;gap:var(--spacing-3xsmall)}";

const SyGlobalHeader$1 = /*@__PURE__*/ proxyCustomElement(class SyGlobalHeader extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.changed = createEvent(this, "changed");
        this.actionClick = createEvent(this, "actionClick");
        this.selected = createEvent(this, "selected");
    }
    static HEADER_TAB_BUFFER = 16;
    static HEADER_TAB_OVERFLOW_TRIGGER_WIDTH = 48;
    get host() { return this; }
    // --- Public Properties ---
    appTitle = '';
    sticky = false;
    search = false;
    information = false;
    notification = false;
    // --- Private State ---
    overflowTabs = [];
    theme = 'light';
    isCustomLogo = false;
    // --- Events ---
    changed;
    actionClick;
    selected;
    // --- Private ---
    parentTabGroup = null;
    updateInProgress = false;
    resizeObserver = null;
    tabsMutationObserver = null;
    /** Force the host to be `display: block; width: 100%`. Called in both
     *  `componentWillLoad` AND `componentDidRender` because Stencil's scoped CSS was
     *  not reliably matching the host element when nested inside another scoped
     *  component (sy-tab-group). Inline styles bypass all CSS-scoping concerns and
     *  beat any rule specificity, so this is the only approach that guarantees the
     *  header always fills its parent container. Idempotent. */
    enforceHostSizing() {
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
        const showSearch = fnAssignPropFromAlias(this.host, 'show-search', 'showSearch');
        const showHelp = fnAssignPropFromAlias(this.host, 'show-help', 'showHelp');
        const showNotifications = fnAssignPropFromAlias(this.host, 'show-notifications', 'showNotifications');
        if (showSearch !== null && showSearch !== undefined)
            this.search = showSearch;
        if (showHelp !== null && showHelp !== undefined)
            this.information = showHelp;
        if (showNotifications !== null && showNotifications !== undefined)
            this.notification = showNotifications;
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
    get tabs() {
        const tabsSlot = this.host.querySelector('[slot="tabs"]');
        if (!tabsSlot)
            return [];
        const tabElements = Array.from(tabsSlot.querySelectorAll('sy-tab'));
        tabElements.forEach((tab, index) => {
            tab.inHeader = true;
            tab.index = index;
        });
        return tabElements;
    }
    hasNamedSlot(name) {
        return this.host.querySelector(`[slot="${name}"]`) !== null;
    }
    hasSlotLogoContents() {
        const logoSlot = this.host.querySelector('[slot="logo"]');
        return logoSlot !== null && (logoSlot.textContent?.trim() !== '' || logoSlot.children.length > 0);
    }
    getMeasuredWidth(element) {
        if (!element)
            return 0;
        const rect = element.getBoundingClientRect();
        const styles = window.getComputedStyle(element);
        const marginLeft = parseFloat(styles.marginLeft) || 0;
        const marginRight = parseFloat(styles.marginRight) || 0;
        return rect.width + marginLeft + marginRight;
    }
    getAvailableTabsSpace(reserveOverflowTrigger) {
        const headerWrapper = this.host.querySelector('.header-wrapper');
        if (!headerWrapper)
            return 0;
        const headerTitle = this.host.querySelector('.header-title');
        const headerEnd = this.host.querySelector('.header-end');
        const wrapperWidth = this.getMeasuredWidth(headerWrapper);
        const fixedWidth = this.getMeasuredWidth(headerTitle) + this.getMeasuredWidth(headerEnd);
        const reservedOverflowTriggerWidth = reserveOverflowTrigger
            ? SyGlobalHeader.HEADER_TAB_OVERFLOW_TRIGGER_WIDTH
            : 0;
        return Math.max(0, wrapperWidth - fixedWidth - reservedOverflowTriggerWidth - SyGlobalHeader.HEADER_TAB_BUFFER);
    }
    getVisibleTabCount(tabs, availableSpace) {
        if (availableSpace <= 0)
            return 0;
        let accumulatedWidth = 0;
        let visibleTabCount = 0;
        for (const tab of tabs) {
            const tabWidth = this.getMeasuredWidth(tab);
            if (tabWidth === 0)
                continue;
            if (accumulatedWidth + tabWidth > availableSpace) {
                break;
            }
            accumulatedWidth += tabWidth;
            visibleTabCount += 1;
        }
        return visibleTabCount;
    }
    // --- Interaction handlers ---
    handleOverflowMenuButtonClick = (e) => {
        e.stopPropagation();
        setTimeout(() => {
            const menu = this.host.querySelector('sy-menu#header-tab-overflow-menu');
            menu?.setSelectableAllItems?.();
        }, 1);
    };
    handleSearch = (e) => {
        e.stopPropagation();
        this.changed.emit({ value: e.detail.value });
    };
    handleClickInformation = (e) => {
        e.stopPropagation();
        this.actionClick.emit({ type: 'information' });
    };
    handleClickNotification = (e) => {
        e.stopPropagation();
        this.actionClick.emit({ type: 'notification' });
    };
    handleMenuItemSelect = (e) => {
        e.stopPropagation();
        const tabs = this.tabs;
        const selectedTab = tabs.find((t) => t.tabkey === e.detail.value);
        if (!selectedTab || !this.parentTabGroup)
            return;
        // sy-tab-group.setActive is private (not exposed on the custom element
        // proxy). Setting the `active` prop triggers its @Watch('active') which
        // runs setTabs() and activates the matching sy-tab-content. The visible
        // tab row is NOT recomputed here — picking an overflowed item should only
        // swap the content panel, never shift which tabs are on screen.
        this.parentTabGroup.active = selectedTab.index;
        setTimeout(() => {
            const menu = this.host.querySelector('sy-menu#header-tab-overflow-menu');
            menu?.clearSelectedItem?.();
            const selectedMenuItem = e.target;
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
    async updateOverflowTabs() {
        if (this.updateInProgress)
            return;
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
                const visibleTabCountWithoutOverflowTrigger = this.getVisibleTabCount(tabs, availableSpaceWithoutOverflowTrigger);
                if (visibleTabCountWithoutOverflowTrigger < tabs.length) {
                    const visibleTabCount = this.getVisibleTabCount(tabs, this.getAvailableTabsSpace(true));
                    const newOverflowTabs = [];
                    // The visible window is always the first `visibleTabCount` tabs —
                    // never shifted around the active tab. The active tab may sit in the
                    // overflow menu; the menu item's `selected` state reflects that.
                    // Rationale: users found it jarring when picking an item from the
                    // overflow menu caused the tab row to reshuffle (the picked tab
                    // jumped into the row and an earlier tab was ejected). Keeping the
                    // row stable means the menu just swaps the content panel.
                    tabs.forEach((tab, index) => {
                        if (index < visibleTabCount) {
                            tab.style.display = '';
                            tab.style.visibility = 'visible';
                        }
                        else {
                            tab.style.display = 'none';
                            tab.style.visibility = 'hidden';
                            newOverflowTabs.push(tab);
                        }
                    });
                    this.overflowTabs = newOverflowTabs;
                }
                else {
                    this.overflowTabs = [];
                    tabs.forEach(tab => {
                        tab.style.display = '';
                        tab.style.visibility = 'visible';
                    });
                }
            }
            catch (error) {
                console.error('[sy-global-header] updateOverflowTabs error:', error);
            }
            finally {
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
        return (h("div", { key: 'b88d3921232c45f9aa548a1b12c4ce2448dd551b', class: "header-wrapper", role: "banner" }, h("div", { key: 'b2a442199dbe456752a15883f84cecb75e5d4ecf', class: "header-title" }, h("span", { key: '774aa381b88ea8db7443dd9452782b15abaee364', class: "logo", style: { display: this.isCustomLogo ? 'none' : 'block' } }, h("img", { key: '5fe8a353e8bd67839214863d41ab1fdb832f635e', src: logo, width: "100%", height: "100%", alt: "" })), hasLogoSlot && h("slot", { key: '0e161e97de38e1d6eb4ae4d9c341f238554378d9', name: "logo" }), this.appTitle && h("span", { key: '27d6cd589df89215cb93e313ca777d3177783655', class: "appname" }, this.appTitle)), hasTabsSlot && (h("div", { key: 'a70ec6bda326589d8c4ac26f37fa45bb332c850c', class: "header-tab", role: "navigation", "aria-label": "Primary" }, h("slot", { key: 'c439fd446d6aae927353b54103355bc84335eb0e', name: "tabs" }), hasOverflowTabs && (h("div", { key: 'd5844fc469fcefb0057af584c86b923689fb3e76', class: "header-tab-more", onMouseEnter: this.handleOverflowMenuButtonClick, role: "button", "aria-label": "More tabs", tabindex: 0 }, h("sy-icon", { key: '2bd03bc511922ad7c3934f3fda9a1a32cac3ad75', size: "medium" }, h("svg", { key: 'e99898ecaba58b9124a56c08bdaec778bde371fa', xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { key: 'e8f505c76022033961cabb267f84cd48b8914e86', fill: "currentColor", d: "M544 320C544 346.5 522.5 368 496 368C469.5 368 448 346.5 448 320C448 293.5 469.5 272 496 272C522.5 272 544 293.5 544 320zM368 320C368 346.5 346.5 368 320 368C293.5 368 272 346.5 272 320C272 293.5 293.5 272 320 272C346.5 272 368 293.5 368 320zM144 368C117.5 368 96 346.5 96 320C96 293.5 117.5 272 144 272C170.5 272 192 293.5 192 320C192 346.5 170.5 368 144 368z" }))), h("sy-menu", { key: '24d9dc7d9db944e9929179b2df5367e688d46648', position: "bottomRight", id: "header-tab-overflow-menu", onItemSelected: this.handleMenuItemSelect }, this.overflowTabs.map(tab => (h("sy-menu-item", { value: tab.tabkey }, tab.textContent)))))))), h("div", { key: '669183556b53f2c53eb64324234f798a2c712a1a', class: "header-end" }, this.search && (h("sy-input", { key: 'bc6ece967a1fab67a6069dd279c50e901fbc64d3', placeholder: "Help Search", size: "medium", onChanged: this.handleSearch })), this.information && (h("sy-button", { key: '21fed26e7dbd6bdab5113fcfabce0d7b5d1edb46', size: "medium", variant: "borderless", tooltip: "Help", onClick: this.handleClickInformation }, h("sy-icon", { key: 'd3322b8cda053d56b52600f8a37df71f0c0351d5', size: "large", selectable: true }, h("svg", { key: '3918a26e45bc38bda5344edb7959585d6f52014e', xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { key: '157149c58038c80ee0a77431138594cc5ab02fbd', fill: "currentColor", d: "M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM288 224C288 206.3 302.3 192 320 192C337.7 192 352 206.3 352 224C352 241.7 337.7 256 320 256C302.3 256 288 241.7 288 224zM280 288L328 288C341.3 288 352 298.7 352 312L352 400L360 400C373.3 400 384 410.7 384 424C384 437.3 373.3 448 360 448L280 448C266.7 448 256 437.3 256 424C256 410.7 266.7 400 280 400L304 400L304 336L280 336C266.7 336 256 325.3 256 312C256 298.7 266.7 288 280 288z" }))))), this.notification && (h("sy-button", { key: 'd6ed5a36cca08f427ec17c00461543209826698c', size: "medium", variant: "borderless", tooltip: "Notifications", onClick: this.handleClickNotification }, h("sy-icon", { key: '04d02e4ce5b4ff09c5efba3c50c9bacdad22f0fa', size: "large", selectable: true }, h("svg", { key: '7b1597616e77c40eaefe8f9a2e91ca22542ad975', xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { key: 'b38585ff3fb089a1771bf1dcee4bf8b977bfc99f', fill: "currentColor", d: "M320 64C302.3 64 288 78.3 288 96L288 99.2C215 114 160 178.6 160 256L160 277.7C160 325.8 143.6 372.5 113.6 410.1L103.8 422.3C98.7 428.6 96 436.4 96 444.5C96 464.1 111.9 480 131.5 480L508.4 480C528 480 543.9 464.1 543.9 444.5C543.9 436.4 541.2 428.6 536.1 422.3L526.3 410.1C496.4 372.5 480 325.8 480 277.7L480 256C480 178.6 425 114 352 99.2L352 96C352 78.3 337.7 64 320 64zM258 528C265.1 555.6 290.2 576 320 576C349.8 576 374.9 555.6 382 528L258 528z" }))))), hasActionsSlot && h("slot", { key: '22ce05dbff01c0413fdd8c6dc44b3300cccc56a0', name: "actions" }))));
    }
    static get style() { return syGlobalHeaderCss; }
}, [260, "sy-global-header", {
        "appTitle": [1025, "title"],
        "sticky": [516],
        "search": [1028],
        "information": [1028],
        "notification": [1028],
        "overflowTabs": [32],
        "theme": [32],
        "isCustomLogo": [32],
        "updateOverflowTabs": [64]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-global-header", "sy-button", "sy-checkbox", "sy-icon", "sy-input", "sy-menu", "sy-menu-item", "sy-spinner"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-global-header":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyGlobalHeader$1);
            }
            break;
        case "sy-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "sy-checkbox":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "sy-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "sy-input":
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

const SyGlobalHeader = SyGlobalHeader$1;
const defineCustomElement = defineCustomElement$1;

export { SyGlobalHeader, defineCustomElement };
