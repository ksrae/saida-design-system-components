import { Component, Prop, State, h, Element, Watch, Method, Event, EventEmitter } from '@stencil/core';

/**
 * sy-menu — portaled dropdown menu triggered by a parent element.
 *
 * Spec: design-system-specs/components/menu.yaml
 *
 * Children: sy-menu-item (leaf), sy-menu-sub (nested submenu), sy-menu-group
 * (labeled section). The menu is portaled to escape clipping and re-positioned
 * on window scroll/resize.
 *
 * Props: open, disabled, checkable, loading, position (4 corners),
 * trigger (click | hover | contextmenu), direction (left | right for submenus).
 * Events: opened (boolean), itemSelected, itemChecked.
 */
@Component({
	tag: 'sy-menu',
	styleUrl: 'sy-menu.scss',
	scoped: true,
	shadow: false,
})
export class SyMenu {
	@Element() host!: HTMLSyMenuElement;

	private isMouseOverParent = false;
	private openTimer: any;
	private closeTimer: any;
	private parentDom: any;
	private originalParent: any;
	private nextSibling: any;
	private isDropdown = false;
	private DefaultOpendelay = 0;
	private DefaultClosedelay = 75;
	private width!: number;
	private height!: number;
	private mouseX!: number;
	private mouseY!: number;
	private isUpdatingOpenState = false;
	private isClosing = false;
	private isReparenting = false;
	private dropdownElement: HTMLSyDropdownElement | null = null;

	@Prop({ reflect: true, mutable: true }) open: boolean = false;
	@Prop({ reflect: true }) checkable: boolean = false;
	@Prop({ mutable: true }) position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' = 'bottomLeft';
	@Prop({ mutable: true }) trigger: 'click' | 'hover' | 'contextmenu' = 'hover';
	@Prop() direction: 'left' | 'right' = 'right';
	@Prop({ mutable: true }) disabled: boolean = false;
	/** Spinner overlay while items are being fetched (spec-aligned). */
	@Prop({ reflect: true }) loading: boolean = false;

	@State() opendelay: number = this.DefaultOpendelay;
	@State() closedelay: number = this.DefaultClosedelay;

	@Event() opened!: EventEmitter<boolean>;
	@Event() itemSelected!: EventEmitter<any>;
	@Event() itemChecked!: EventEmitter<any>;

	constructor() {
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
		if (this.isReparenting) return;

		window.removeEventListener('resize', this.updateMenuPosition, true);
		window.removeEventListener('scroll', this.updateMenuPosition, true);
		document.removeEventListener('click', this.handleDocumentClick, true);
		this.removeParentEvents();
		this.removeMenuEventListeners();

		if (this.openTimer) clearTimeout(this.openTimer);
		if (this.closeTimer) clearTimeout(this.closeTimer);

	}

	render() {
		return (
			<ul
				role="menu"
				aria-busy={this.loading ? 'true' : 'false'}
				class={{ 'menu-list': true, 'menu-list--loading': this.loading }}
				onMouseEnter={this.handleMouseEnter}
				onMouseLeave={this.handleMouseLeave}
			>
				<slot onSlotchange={this.handleSlotChange}></slot>
				{this.loading && (
					<li class="menu-loading" aria-disabled="true">
						<sy-spinner size="small"></sy-spinner>
					</li>
				)}
			</ul>
		);
	}

	private handleSlotChange = () => {
		this.setCheckableAllItems();
		this.syncSubMenus();
		this.openIfParentHovered();

		if (this.open) {
			requestAnimationFrame(() => this.updateMenuPosition());
		}
	};

	@Watch('trigger')
	watchTrigger() {
		this.addEvent();
	}

	@Watch('disabled')
	watchDisabled(newVal: boolean) {
		this.addEvent();
		// When a currently-open dropdown/menu becomes disabled, close it
		// immediately so the UI doesn't present an interactive menu that
		// the user can't actually use.
		if (newVal && this.open) {
			this.hideMenu();
		}
	}

	@Watch('checkable')
	watchCheckable() {
		this.setCheckableAllItems();
	}

	@Watch('loading')
	watchLoading() {
		if (this.open) {
			requestAnimationFrame(() => this.updateMenuPosition());
		}
	}

	@Watch('open')
	watchOpen(newVal: boolean) {
		if (this.isUpdatingOpenState) return;

		if (!this.isDropdown) {
			if (newVal) {
				this.showMenu();
			} else {
				this.hideMenu();
			}
		}
	}

	@Method()
	async setOpen() {
		if (this.disabled) return;
		this.removeAllMenus();
		this.showMenu();
		this.opened.emit(true);
	}

	@Method()
	async setClose() {
		this.hideMenu();
		this.opened.emit(false);
	}

	@Method()
	async toggle() {
		const isOpen = this.open && this.host.style.display !== 'none';
		if (isOpen) {
			await this.setClose();
		} else {
			await this.setOpen();
		}
	}

	@Method()
	async close() {
		await this.setClose();
	}

	private rememberOriginalParent() {
		if (this.originalParent || !this.host.parentElement || this.host.parentElement === document.body) return;
		this.parentDom = this.host.parentElement;
		this.originalParent = this.host.parentElement;
		this.nextSibling = this.host.nextSibling;
	}

	private removeParentEvents() {
		const parent = this.parentDom;
		if (!parent) return;
		parent.removeEventListener('mouseenter', this.parentMouseEnter);
		parent.removeEventListener('mouseleave', this.parentMouseLeave);
		parent.removeEventListener('click', this.parentClick);
		parent.removeEventListener('contextmenu', this.parentContextMenu);
	}

	private addMenuEventListeners() {
		this.removeMenuEventListeners();
		this.host.addEventListener('itemSelected', this.itemSelectedHandler);
		this.host.addEventListener('itemChecked', this.itemCheckedHandler);
		this.host.addEventListener('click', this.handleMenuItemClick, true);
		this.dropdownElement?.addEventListener('keydown', this.handleDropdownKeydown);
	}

	private removeMenuEventListeners() {
		this.host.removeEventListener('itemSelected', this.itemSelectedHandler);
		this.host.removeEventListener('itemChecked', this.itemCheckedHandler);
		this.host.removeEventListener('click', this.handleMenuItemClick, true);
		this.dropdownElement?.removeEventListener('keydown', this.handleDropdownKeydown);
	}

	private setDropdown() {
		const dropdownElement = this.host.closest('sy-dropdown') as HTMLSyDropdownElement;
		this.dropdownElement = dropdownElement ?? null;
		this.isDropdown = !!dropdownElement;
		if (this.isDropdown && dropdownElement) {
			this.position = dropdownElement.position;
			this.trigger = dropdownElement.trigger;
			this.disabled = dropdownElement.disabled;
		}
	}

	private handleDropdownKeydown = (e: KeyboardEvent) => {
		if (e.code === 'Enter') {
			e.preventDefault();
			if (this.open) {
				this.hideMenu();
			} else {
				this.showMenu();
			}
		}
	};

	private addEvent() {
		const parent = this.parentDom;
		if (parent) {
			this.removeParentEvents();

			if (this.trigger === 'hover' && !this.disabled) {
				parent.addEventListener('mouseenter', this.parentMouseEnter);
				parent.addEventListener('mouseleave', this.parentMouseLeave);
			} else if (this.trigger === 'click' && !this.disabled) {
				parent.addEventListener('click', this.parentClick);
			} else if (this.trigger === 'contextmenu' && !this.disabled) {
				parent.addEventListener('contextmenu', this.parentContextMenu);
			}
		}
		this.syncSubMenus();
		this.openIfParentHovered();
	}

	private openIfParentHovered() {
		if (this.trigger !== 'hover' || this.disabled || this.open || this.isClosing || !this.parentDom?.matches?.(':hover')) return;
		requestAnimationFrame(() => {
			if (this.trigger === 'hover' && !this.disabled && !this.open && !this.isClosing && this.parentDom?.matches?.(':hover')) {
				this.parentMouseEnter();
			}
		});
	}

	private syncSubMenus() {
		const submenuTrigger = this.trigger === 'click' ? 'click' : 'hover';
		const subMenus = Array.from(this.host.querySelectorAll('sy-menu-sub')) as HTMLSyMenuSubElement[];
		subMenus.forEach((subMenu) => {
			(subMenu as any).trigger = submenuTrigger;
		});
	}

	private showMenu() {
		if ((this.open && this.host.parentNode === document.body && this.host.style.display !== 'none') || this.isClosing) {
			return;
		}

		this.rememberOriginalParent();
		this.addEvent();
		this.addMenuEventListeners();

		// 플래그 리셋
		this.isClosing = false;

		document.removeEventListener('click', this.handleDocumentClick, true);

		if (this.openTimer) clearTimeout(this.openTimer);

		this.openTimer = setTimeout(() => {
			if (this.host.parentNode !== document.body) {
				this.isReparenting = true;
				try {
					document.body.appendChild(this.host);
				} finally {
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

	private hideMenu() {
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
					} else {
						this.originalParent.appendChild(this.host);
					}
				} finally {
					this.isReparenting = false;
				}
			}
			this.host.classList.remove('closing');
			this.isClosing = false;
		}, 100);
	}

	private removeAllPopover() {
		const popover = document.querySelector('sy-popover') as HTMLSyPopoverElement | null;
		if (popover) {
			popover.open = false;
		}

		const popConfirm = document.querySelector('sy-popconfirm') as HTMLSyPopconfirmElement | null;
		if (popConfirm) {
			popConfirm.setClose?.();
		}

		const inlineMessage = document.querySelector('sy-inline-message') as HTMLSyInlineMessageElement | null;
		if (inlineMessage) {
			inlineMessage.open = false;
		}

		const tooltip = document.querySelector('sy-tooltip') as HTMLSyTooltipElement | null;
		if (tooltip) {
			tooltip.open = false;
		}
	}

	private removeAllMenus() {
		const menusInBody = Array.from(document.body.children).filter(
			el => el.tagName.toLowerCase() === 'sy-menu'
		) as HTMLSyMenuElement[];

		menusInBody.forEach(menu => {
			if (menu !== this.host) {
				menu.open = false;
			}
		});
	}

	@Method()
	async delayedMenuClose() {
		if (this.closeTimer) {
			clearTimeout(this.closeTimer);
		}

		this.closeTimer = setTimeout(() => {
			if (!this.open) return;

			if (!this.isMouseOverParent) {
				this.hideMenu();
				this.removeAllPopover();
			}
		}, this.closedelay);

		this.opened.emit(false);
	}

	private parentMouseEnter = () => {
		if (this.disabled) return;
		this.isMouseOverParent = true;
		if (this.closeTimer) clearTimeout(this.closeTimer);
		this.removeAllMenus();
		this.showMenu();
		this.opened.emit(true);
	};

	private parentMouseLeave = () => {
		this.isMouseOverParent = false;
		this.delayedMenuClose();
	};

	private handleMouseEnter = () => {
		if (this.trigger === 'hover') {
			if (this.closeTimer) clearTimeout(this.closeTimer);
		}
	};

	private handleMouseLeave = () => {
		if (this.trigger === 'hover') {
			this.delayedMenuClose();
		}
	};

	private parentClick = (event: any) => {
		event.preventDefault();
		event.stopPropagation();

		if (this.disabled || this.isClosing) return;

		const isOpen = this.open && this.host.style.display !== 'none';

		if (isOpen) {
			this.hideMenu();
			this.opened.emit(false);
		} else {
			this.removeAllMenus();
			setTimeout(() => {
				this.showMenu();
				this.opened.emit(true);
			}, 10);
		}
	};

	private parentContextMenu = (event: MouseEvent) => {
		event.preventDefault();
		event.stopPropagation();

		if (this.disabled) return;

		if (this.closeTimer) clearTimeout(this.closeTimer);
		this.removeAllMenus();

		this.mouseX = event.clientX;
		this.mouseY = event.clientY;

		this.showMenu();
		this.opened.emit(true);
	};

	// 메뉴 아이템 클릭 직접 처리
	private handleMenuItemClick = (event: any) => {
		if (this.disabled || this.loading) return;

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

	private handleDocumentClick = (event: any) => {
		if (this.isClosing) return;

		// 부모 요소 클릭은 무시
		const isParent = this.parentDom?.contains(event.target as Node);
		if (isParent && this.trigger === 'click') {
			return;
		}

		// 메뉴 밖 클릭 시 닫기
		const isInMenu = this.host.contains(event.target as Node);
		if (!isInMenu) {
			this.hideMenu();
		}
	};

	private updateMenuPosition(e?: any) {
		if (!this.parentDom || !(this.parentDom instanceof HTMLElement)) return;

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
		} else {
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
			} else if (this.position === 'bottomRight') {
				// Bottom Right - 부모 아래, 오른쪽 정렬
				top = parentRect.bottom + scrollTop;
				left = parentRect.right - menuWidth + scrollLeft;

				// 화면 아래로 넘어가면 위로
				if (parentRect.bottom + menuHeight > viewportHeight && parentRect.top - menuHeight >= 0) {
					top = parentRect.top - menuHeight + scrollTop;
				}
			} else if (this.position === 'topLeft') {
				// Top Left - 부모 위, 왼쪽 정렬
				top = parentRect.top - menuHeight + scrollTop;
				left = parentRect.left + scrollLeft;

				// 화면 위로 넘어가면 아래로
				if (parentRect.top - menuHeight < 0 && parentRect.bottom + menuHeight <= viewportHeight) {
					top = parentRect.bottom + scrollTop;
				}
			} else if (this.position === 'topRight') {
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

	@Method()
	async setSelectableAllItems() {
		const items = Array.from(this.host.querySelectorAll('sy-menu-item')) as HTMLSyMenuItemElement[];
		if (items.length) {
			items.forEach((item) => item.selectable = true);
		}
	}

	@Method()
	async clearSelectedItem() {
		const itemsClear = Array.from(this.host.querySelectorAll('sy-menu-item')) as HTMLSyMenuItemElement[];
		if (itemsClear.length) {
			itemsClear.forEach((item) => item.select = false);
		}
	}

	private setCheckableAllItems() {
		const itemsCheck = Array.from(this.host.querySelectorAll('sy-menu-item')) as HTMLSyMenuItemElement[];
		if (itemsCheck.length) {
			itemsCheck.forEach((item) => {
				item.checkable = this.checkable;
			});
		}
	}

	// Event handlers - 이벤트 전달만 담당
	private itemSelectedHandler = (e: Event) => {
		const customEvent = e as CustomEvent;
		if (customEvent.target === this.host) return;
		customEvent.stopPropagation();
		this.itemSelected.emit(customEvent.detail);
		// 닫기는 handleMenuItemClick에서 처리
	};

	private itemCheckedHandler = (e: Event) => {
		const customEvent = e as CustomEvent;
		if (customEvent.target === this.host) return;
		customEvent.stopPropagation();
		this.itemChecked.emit(customEvent.detail);
		// checkable 메뉴는 열린 상태 유지
	};
}
