import { p as proxyCustomElement, H, c as createEvent, h } from './index.js';
import { d as defineCustomElement$1 } from './p-Dx2eAEw1.js';

const syMenuCss = "@charset \"UTF-8\";.sc-sy-menu:root,.sc-sy-menu-h{display:none;position:absolute;left:-9999px;top:-9999px;z-index:var(--z-index-dropdown, var(--z-index-menu));margin:0px;padding:0px;background-color:var(--menu-dropdownmenu-background-enabled);box-shadow:var(--box-shadow);font-family:\"Roboto\";font-size:14px;font-weight:400;line-height:22px;text-decoration:none;text-transform:none;letter-spacing:0.25px;border-radius:var(--border-radius-medium)}.sc-sy-menu:root.closing,.closing.sc-sy-menu-h{transition:none !important;animation:none !important}[open].sc-sy-menu-h{display:block}[open][style*=\"display: none\"].sc-sy-menu-h{display:none !important}a.sc-sy-menu ul.sc-sy-menu{list-style-type:none;padding:0;margin:0;cursor:pointer}ul.sc-sy-menu{position:relative;width:max-content;min-width:max-content;padding:var(--spacing-3xsmall) 0;margin:0px;list-style:none}.menu-loading.sc-sy-menu{width:100%;min-width:max-content;min-height:calc(var(--component-medium) - var(--spacing-xsmall));display:flex;align-items:center;justify-content:center;padding:var(--spacing-3xsmall) var(--spacing-xsmall);box-sizing:border-box;background-color:var(--menu-dropdownmenu-background-enabled);pointer-events:none}";

const SyMenu = /*@__PURE__*/ proxyCustomElement(class SyMenu extends H {
    get host() { return this; }
    isMouseOverParent = false;
    openTimer;
    closeTimer;
    parentDom;
    originalParent;
    nextSibling;
    isDropdown = false;
    DefaultOpendelay = 0;
    DefaultClosedelay = 75;
    width;
    height;
    mouseX;
    mouseY;
    isUpdatingOpenState = false;
    isClosing = false;
    isReparenting = false;
    dropdownElement = null;
    open = false;
    checkable = false;
    position = 'bottomLeft';
    trigger = 'hover';
    direction = 'right';
    disabled = false;
    /** Spinner overlay while items are being fetched (spec-aligned). */
    loading = false;
    opendelay = this.DefaultOpendelay;
    closedelay = this.DefaultClosedelay;
    opened;
    itemSelected;
    itemChecked;
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.opened = createEvent(this, "opened");
        this.itemSelected = createEvent(this, "itemSelected");
        this.itemChecked = createEvent(this, "itemChecked");
        this.updateMenuPosition = this.updateMenuPosition.bind(this);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
        this.parentMouseEnter = this.parentMouseEnter.bind(this);
        this.parentMouseLeave = this.parentMouseLeave.bind(this);
        this.parentClick = this.parentClick.bind(this);
        this.parentContextMenu = this.parentContextMenu.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.itemSelectedHandler = this.itemSelectedHandler.bind(this);
        this.itemCheckedHandler = this.itemCheckedHandler.bind(this);
        this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    }
    connectedCallback() {
        this.rememberOriginalParent();
        window.addEventListener('scroll', this.updateMenuPosition, true);
        window.addEventListener('resize', this.updateMenuPosition, true);
        this.addEvent();
        this.addMenuEventListeners();
    }
    componentWillLoad() {
        this.rememberOriginalParent();
        this.setDropdown();
    }
    componentDidLoad() {
        if (this.open) {
            this.showMenu();
        }
        this.setCheckableAllItems();
        this.addEvent();
        this.addMenuEventListeners();
        this.openIfParentHovered();
    }
    disconnectedCallback() {
        if (this.isReparenting)
            return;
        window.removeEventListener('resize', this.updateMenuPosition, true);
        window.removeEventListener('scroll', this.updateMenuPosition, true);
        document.removeEventListener('click', this.handleDocumentClick, true);
        this.removeParentEvents();
        this.removeMenuEventListeners();
        if (this.openTimer)
            clearTimeout(this.openTimer);
        if (this.closeTimer)
            clearTimeout(this.closeTimer);
    }
    render() {
        return (h("ul", { key: '8dd5b0364b00e730e42dbf5890a53549c5b11564', role: "menu", "aria-busy": this.loading ? 'true' : 'false', class: { 'menu-list': true, 'menu-list--loading': this.loading }, onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave }, h("slot", { key: '15e1a629f94fb38e919b951d09510849dfe62b6a', onSlotchange: this.handleSlotChange }), this.loading && (h("li", { key: '3d94bda6b372cdf0d916dc41e38bf2ee4fbc63f9', class: "menu-loading", "aria-disabled": "true" }, h("sy-spinner", { key: 'b3321d66ecfdc6fc3a7ffb390066e85114c4e3a6', size: "small" })))));
    }
    handleSlotChange = () => {
        this.setCheckableAllItems();
        this.syncSubMenus();
        this.openIfParentHovered();
        if (this.open) {
            requestAnimationFrame(() => this.updateMenuPosition());
        }
    };
    watchTrigger() {
        this.addEvent();
    }
    watchDisabled(newVal) {
        this.addEvent();
        // When a currently-open dropdown/menu becomes disabled, close it
        // immediately so the UI doesn't present an interactive menu that
        // the user can't actually use.
        if (newVal && this.open) {
            this.hideMenu();
        }
    }
    watchCheckable() {
        this.setCheckableAllItems();
    }
    watchLoading() {
        if (this.open) {
            requestAnimationFrame(() => this.updateMenuPosition());
        }
    }
    watchOpen(newVal) {
        if (this.isUpdatingOpenState)
            return;
        if (!this.isDropdown) {
            if (newVal) {
                this.showMenu();
            }
            else {
                this.hideMenu();
            }
        }
    }
    async setOpen() {
        if (this.disabled)
            return;
        this.removeAllMenus();
        this.showMenu();
        this.opened.emit(true);
    }
    async setClose() {
        this.hideMenu();
        this.opened.emit(false);
    }
    async toggle() {
        const isOpen = this.open && this.host.style.display !== 'none';
        if (isOpen) {
            await this.setClose();
        }
        else {
            await this.setOpen();
        }
    }
    async close() {
        await this.setClose();
    }
    rememberOriginalParent() {
        if (this.originalParent || !this.host.parentElement || this.host.parentElement === document.body)
            return;
        this.parentDom = this.host.parentElement;
        this.originalParent = this.host.parentElement;
        this.nextSibling = this.host.nextSibling;
    }
    removeParentEvents() {
        const parent = this.parentDom;
        if (!parent)
            return;
        parent.removeEventListener('mouseenter', this.parentMouseEnter);
        parent.removeEventListener('mouseleave', this.parentMouseLeave);
        parent.removeEventListener('click', this.parentClick);
        parent.removeEventListener('contextmenu', this.parentContextMenu);
    }
    addMenuEventListeners() {
        this.removeMenuEventListeners();
        this.host.addEventListener('itemSelected', this.itemSelectedHandler);
        this.host.addEventListener('itemChecked', this.itemCheckedHandler);
        this.host.addEventListener('click', this.handleMenuItemClick, true);
        this.dropdownElement?.addEventListener('keydown', this.handleDropdownKeydown);
    }
    removeMenuEventListeners() {
        this.host.removeEventListener('itemSelected', this.itemSelectedHandler);
        this.host.removeEventListener('itemChecked', this.itemCheckedHandler);
        this.host.removeEventListener('click', this.handleMenuItemClick, true);
        this.dropdownElement?.removeEventListener('keydown', this.handleDropdownKeydown);
    }
    setDropdown() {
        const dropdownElement = this.host.closest('sy-dropdown');
        this.dropdownElement = dropdownElement ?? null;
        this.isDropdown = !!dropdownElement;
        if (this.isDropdown && dropdownElement) {
            this.position = dropdownElement.position;
            this.trigger = dropdownElement.trigger;
            this.disabled = dropdownElement.disabled;
        }
    }
    handleDropdownKeydown = (e) => {
        if (e.code === 'Enter') {
            e.preventDefault();
            if (this.open) {
                this.hideMenu();
            }
            else {
                this.showMenu();
            }
        }
    };
    addEvent() {
        const parent = this.parentDom;
        if (parent) {
            this.removeParentEvents();
            if (this.trigger === 'hover' && !this.disabled) {
                parent.addEventListener('mouseenter', this.parentMouseEnter);
                parent.addEventListener('mouseleave', this.parentMouseLeave);
            }
            else if (this.trigger === 'click' && !this.disabled) {
                parent.addEventListener('click', this.parentClick);
            }
            else if (this.trigger === 'contextmenu' && !this.disabled) {
                parent.addEventListener('contextmenu', this.parentContextMenu);
            }
        }
        this.syncSubMenus();
        this.openIfParentHovered();
    }
    openIfParentHovered() {
        if (this.trigger !== 'hover' || this.disabled || this.open || this.isClosing || !this.parentDom?.matches?.(':hover'))
            return;
        requestAnimationFrame(() => {
            if (this.trigger === 'hover' && !this.disabled && !this.open && !this.isClosing && this.parentDom?.matches?.(':hover')) {
                this.parentMouseEnter();
            }
        });
    }
    syncSubMenus() {
        const submenuTrigger = this.trigger === 'click' ? 'click' : 'hover';
        const subMenus = Array.from(this.host.querySelectorAll('sy-menu-sub'));
        subMenus.forEach((subMenu) => {
            subMenu.trigger = submenuTrigger;
        });
    }
    showMenu() {
        if ((this.open && this.host.parentNode === document.body && this.host.style.display !== 'none') || this.isClosing) {
            return;
        }
        this.rememberOriginalParent();
        this.addEvent();
        this.addMenuEventListeners();
        // 플래그 리셋
        this.isClosing = false;
        document.removeEventListener('click', this.handleDocumentClick, true);
        if (this.openTimer)
            clearTimeout(this.openTimer);
        this.openTimer = setTimeout(() => {
            if (this.host.parentNode !== document.body) {
                this.isReparenting = true;
                try {
                    document.body.appendChild(this.host);
                }
                finally {
                    this.isReparenting = false;
                }
            }
            this.host.style.removeProperty('display');
            this.host.style.visibility = 'visible';
            this.host.classList.remove('closing');
            this.isUpdatingOpenState = true;
            this.open = true;
            this.isUpdatingOpenState = false;
            // requestAnimationFrame을 사용하여 DOM 렌더링 후 위치 계산
            requestAnimationFrame(() => {
                this.updateMenuPosition();
            });
            setTimeout(() => {
                document.addEventListener('click', this.handleDocumentClick, true);
            }, 50);
        }, this.opendelay);
    }
    hideMenu() {
        if (this.isClosing || !this.open) {
            return;
        }
        this.isClosing = true;
        if (this.openTimer) {
            clearTimeout(this.openTimer);
            this.openTimer = null;
        }
        if (this.closeTimer) {
            clearTimeout(this.closeTimer);
            this.closeTimer = null;
        }
        document.removeEventListener('click', this.handleDocumentClick, true);
        this.host.classList.add('closing');
        this.host.style.display = 'none';
        this.isUpdatingOpenState = true;
        this.open = false;
        this.isUpdatingOpenState = false;
        // 원래 위치로 복원
        setTimeout(() => {
            if (this.originalParent && this.host.parentNode === document.body) {
                this.isReparenting = true;
                try {
                    if (this.nextSibling) {
                        this.originalParent.insertBefore(this.host, this.nextSibling);
                    }
                    else {
                        this.originalParent.appendChild(this.host);
                    }
                }
                finally {
                    this.isReparenting = false;
                }
            }
            this.host.classList.remove('closing');
            this.isClosing = false;
        }, 100);
    }
    removeAllPopover() {
        const popover = document.querySelector('sy-popover');
        if (popover) {
            popover.open = false;
        }
        const popConfirm = document.querySelector('sy-popconfirm');
        if (popConfirm) {
            popConfirm.setClose?.();
        }
        const inlineMessage = document.querySelector('sy-inline-message');
        if (inlineMessage) {
            inlineMessage.open = false;
        }
        const tooltip = document.querySelector('sy-tooltip');
        if (tooltip) {
            tooltip.open = false;
        }
    }
    removeAllMenus() {
        const menusInBody = Array.from(document.body.children).filter(el => el.tagName.toLowerCase() === 'sy-menu');
        menusInBody.forEach(menu => {
            if (menu !== this.host) {
                menu.open = false;
            }
        });
    }
    async delayedMenuClose() {
        if (this.closeTimer) {
            clearTimeout(this.closeTimer);
        }
        this.closeTimer = setTimeout(() => {
            if (!this.open)
                return;
            if (!this.isMouseOverParent) {
                this.hideMenu();
                this.removeAllPopover();
            }
        }, this.closedelay);
        this.opened.emit(false);
    }
    parentMouseEnter = () => {
        if (this.disabled)
            return;
        this.isMouseOverParent = true;
        if (this.closeTimer)
            clearTimeout(this.closeTimer);
        this.removeAllMenus();
        this.showMenu();
        this.opened.emit(true);
    };
    parentMouseLeave = () => {
        this.isMouseOverParent = false;
        this.delayedMenuClose();
    };
    handleMouseEnter = () => {
        if (this.trigger === 'hover') {
            if (this.closeTimer)
                clearTimeout(this.closeTimer);
        }
    };
    handleMouseLeave = () => {
        if (this.trigger === 'hover') {
            this.delayedMenuClose();
        }
    };
    parentClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (this.disabled || this.isClosing)
            return;
        const isOpen = this.open && this.host.style.display !== 'none';
        if (isOpen) {
            this.hideMenu();
            this.opened.emit(false);
        }
        else {
            this.removeAllMenus();
            setTimeout(() => {
                this.showMenu();
                this.opened.emit(true);
            }, 10);
        }
    };
    parentContextMenu = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (this.disabled)
            return;
        if (this.closeTimer)
            clearTimeout(this.closeTimer);
        this.removeAllMenus();
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        this.showMenu();
        this.opened.emit(true);
    };
    // 메뉴 아이템 클릭 직접 처리
    handleMenuItemClick = (event) => {
        if (this.disabled || this.loading)
            return;
        const clickedMenuItem = event.target?.closest('sy-menu-item');
        if (clickedMenuItem && this.host.contains(clickedMenuItem)) {
            // checkable이 아니면 무조건 닫기
            if (!this.checkable) {
                // 작은 딜레이로 이벤트 처리 후 닫기
                setTimeout(() => {
                    this.hideMenu();
                }, 50);
            }
        }
    };
    handleDocumentClick = (event) => {
        if (this.isClosing)
            return;
        // 부모 요소 클릭은 무시
        const isParent = this.parentDom?.contains(event.target);
        if (isParent && this.trigger === 'click') {
            return;
        }
        // 메뉴 밖 클릭 시 닫기
        const isInMenu = this.host.contains(event.target);
        if (!isInMenu) {
            this.hideMenu();
        }
    };
    updateMenuPosition(e) {
        if (!this.parentDom || !(this.parentDom instanceof H))
            return;
        const parentRect = this.parentDom.getBoundingClientRect();
        const rect = this.host.getBoundingClientRect();
        // 메뉴의 실제 크기 가져오기
        const menuWidth = rect.width > 0 ? rect.width : this.width;
        const menuHeight = rect.height > 0 ? rect.height : this.height;
        // 크기 저장
        if (rect.width > 0 && rect.height > 0) {
            this.width = rect.width;
            this.height = rect.height;
        }
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        const scrollTop = document.documentElement.scrollTop;
        const scrollLeft = document.documentElement.scrollLeft;
        if (this.trigger === 'contextmenu') {
            if (e) {
                this.hideMenu();
                return;
            }
            let left = this.mouseX + scrollLeft;
            let top = this.mouseY + scrollTop;
            if (this.mouseX + menuWidth > viewportWidth) {
                left = this.mouseX - menuWidth + scrollLeft;
            }
            if (this.mouseY + menuHeight > viewportHeight) {
                top = this.mouseY - menuHeight + scrollTop;
            }
            this.host.style.left = `${left}px`;
            this.host.style.top = `${top}px`;
        }
        else {
            let left = 0;
            let top = 0;
            if (this.position === 'bottomLeft') {
                // Bottom Left - 기본 동작 (부모 아래, 왼쪽 정렬)
                top = parentRect.bottom + scrollTop;
                left = parentRect.left + scrollLeft;
                // 화면 아래로 넘어가면 위로
                if (parentRect.bottom + menuHeight > viewportHeight && parentRect.top - menuHeight >= 0) {
                    top = parentRect.top - menuHeight + scrollTop;
                }
            }
            else if (this.position === 'bottomRight') {
                // Bottom Right - 부모 아래, 오른쪽 정렬
                top = parentRect.bottom + scrollTop;
                left = parentRect.right - menuWidth + scrollLeft;
                // 화면 아래로 넘어가면 위로
                if (parentRect.bottom + menuHeight > viewportHeight && parentRect.top - menuHeight >= 0) {
                    top = parentRect.top - menuHeight + scrollTop;
                }
            }
            else if (this.position === 'topLeft') {
                // Top Left - 부모 위, 왼쪽 정렬
                top = parentRect.top - menuHeight + scrollTop;
                left = parentRect.left + scrollLeft;
                // 화면 위로 넘어가면 아래로
                if (parentRect.top - menuHeight < 0 && parentRect.bottom + menuHeight <= viewportHeight) {
                    top = parentRect.bottom + scrollTop;
                }
            }
            else if (this.position === 'topRight') {
                // Top Right - 부모 위, 오른쪽 정렬
                top = parentRect.top - menuHeight + scrollTop;
                left = parentRect.right - menuWidth + scrollLeft;
                // 화면 위로 넘어가면 아래로
                if (parentRect.top - menuHeight < 0 && parentRect.bottom + menuHeight <= viewportHeight) {
                    top = parentRect.bottom + scrollTop;
                }
            }
            this.host.style.left = `${left}px`;
            this.host.style.top = `${top}px`;
        }
        this.host.style.width = `${menuWidth}px`;
    }
    async setSelectableAllItems() {
        const items = Array.from(this.host.querySelectorAll('sy-menu-item'));
        if (items.length) {
            items.forEach((item) => item.selectable = true);
        }
    }
    async clearSelectedItem() {
        const itemsClear = Array.from(this.host.querySelectorAll('sy-menu-item'));
        if (itemsClear.length) {
            itemsClear.forEach((item) => item.select = false);
        }
    }
    setCheckableAllItems() {
        const itemsCheck = Array.from(this.host.querySelectorAll('sy-menu-item'));
        if (itemsCheck.length) {
            itemsCheck.forEach((item) => {
                item.checkable = this.checkable;
            });
        }
    }
    // Event handlers - 이벤트 전달만 담당
    itemSelectedHandler = (e) => {
        const customEvent = e;
        if (customEvent.target === this.host)
            return;
        customEvent.stopPropagation();
        this.itemSelected.emit(customEvent.detail);
        // 닫기는 handleMenuItemClick에서 처리
    };
    itemCheckedHandler = (e) => {
        const customEvent = e;
        if (customEvent.target === this.host)
            return;
        customEvent.stopPropagation();
        this.itemChecked.emit(customEvent.detail);
        // checkable 메뉴는 열린 상태 유지
    };
    static get watchers() { return {
        "trigger": ["watchTrigger"],
        "disabled": ["watchDisabled"],
        "checkable": ["watchCheckable"],
        "loading": ["watchLoading"],
        "open": ["watchOpen"]
    }; }
    static get style() { return syMenuCss; }
}, [262, "sy-menu", {
        "open": [1540],
        "checkable": [516],
        "position": [1025],
        "trigger": [1025],
        "direction": [1],
        "disabled": [1028],
        "loading": [516],
        "opendelay": [32],
        "closedelay": [32],
        "setOpen": [64],
        "setClose": [64],
        "toggle": [64],
        "close": [64],
        "delayedMenuClose": [64],
        "setSelectableAllItems": [64],
        "clearSelectedItem": [64]
    }, undefined, {
        "trigger": ["watchTrigger"],
        "disabled": ["watchDisabled"],
        "checkable": ["watchCheckable"],
        "loading": ["watchLoading"],
        "open": ["watchOpen"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-menu", "sy-spinner"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-menu":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyMenu);
            }
            break;
        case "sy-spinner":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { SyMenu as S, defineCustomElement as d };
