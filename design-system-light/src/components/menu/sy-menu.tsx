
import { Component, Prop, State, h, Element, Watch, Method } from '@stencil/core';

@Component({
	tag: 'sy-menu',
	styleUrl: 'sy-menu.scss',
	scoped: true,
	shadow: false,
})
export class SyMenu {
	@Element() host!: HTMLSyMenuElement;

	private addedToBody = false; // 상태 변수 추가
	private isMouseOverParent = false;
	private openTimer: any;
	private closeTimer: any;
	private parentDom: any;
	private isDropdown = false;
	private DISPLAY_INTERVAL = 5;
	private DefaultOpendelay = 0;
	private DefaultClosedelay = 75;
	private width!: number;
	private height!: number;
	private mouseX!: number;
	private mouseY!: number;

	@Prop({ reflect: true, mutable: true }) open: boolean = false;
	@Prop({ reflect: true }) checkable: boolean = false;

	@Prop() position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' = 'bottomLeft';
	@Prop() trigger: 'click' | 'hover' | 'contextmenu' = 'hover';
	@Prop() direction: 'left' | 'right' = 'right';

	@State() disabled: boolean = false;
	@State() opendelay: number = this.DefaultOpendelay;
	@State() closedelay: number = this.DefaultClosedelay;

	constructor() {
		this.updateMenuPosition = this.updateMenuPosition.bind(this);
	}



	connectedCallback() {
		window.addEventListener('scroll', this.updateMenuPosition, true);
		window.addEventListener('resize', this.updateMenuPosition, true);
	}

	componentDidLoad() {
		this.parentDom = this.host.parentElement;
		this.setDropdown();
		if (this.open) {
			this.appendToRoot();
		}
		this.setCheckableAllItems();
		this.addEvent();

		// forward child events
		this.host.addEventListener('itemSelected', this.itemSelectedEvent as EventListener);
		this.host.addEventListener('itemChecked', this.itemCheckedEvent as EventListener);
	}

	disconnectedCallback() {
		// 컴포넌트가 document.body에서 제거되어야 하는 경우
		if (this.addedToBody) {
			window.removeEventListener('resize', this.updateMenuPosition);
			window.removeEventListener('scroll', this.updateMenuPosition);
			document.removeEventListener('click', this.handleDocumentClick);

			this.removeMenu();
			if (this.openTimer) clearTimeout(this.openTimer);
			if (this.closeTimer) clearTimeout(this.closeTimer);
		}

		// remove forwarded listeners
		this.host.removeEventListener('itemSelected', this.itemSelectedEvent as EventListener);
		this.host.removeEventListener('itemChecked', this.itemCheckedEvent as EventListener);
	}

	render() {
		return (
			<ul onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
				<slot></slot>
			</ul>
		);
	}

	@Watch('trigger')
	watchTrigger() {
		if (this.isDropdown) {
			this.trigger = this.parentDom?.trigger ? this.parentDom.trigger : 'click';
		}
		this.addEvent();
	}

	@Watch('checkable')
	watchCheckable() {
		this.setCheckableAllItems();
	}

	@Watch('open')
	watchOpen(newVal: boolean) {
		if (!this.isDropdown) {
			if (newVal) {
				this.appendToRoot();
			} else {
				this.removeMenu();
			}
		}
	}

	private setDropdown() {
		this.isDropdown = this.parentDom?.nodeName?.toLowerCase() === 'sy-dropdown';
		if (this.isDropdown) {
			this.position = this.parentDom?.position;
			this.trigger = this.parentDom?.trigger;
			this.disabled = this.parentDom?.disabled;
			this.parentDom.addEventListener('keydown', this.handleDropdownKeydown as EventListener);
		}
	}

	private handleDropdownKeydown = (e: KeyboardEvent) => {
		if (e.code === 'Enter') {
			e.preventDefault();
			if (this.open) {
				this.removeMenu();
			} else {
				this.appendToRoot();
			}
		}
	};

	private addEvent() {
		const parent = this.parentDom;
		if (parent) {
			if (this.trigger === 'hover' && !this.disabled) {
				parent.removeEventListener('click', this.parentClick);
				parent.removeEventListener('contextmenu', this.parentContextMenu);

				parent.addEventListener('mouseenter', this.parentMouseEnter);
				parent.addEventListener('mouseleave', this.parentMouseLeave);
			} else if (this.trigger === 'click' && !this.disabled) {
				parent.removeEventListener('mouseenter', this.parentMouseEnter);
				parent.removeEventListener('mouseleave', this.parentMouseLeave);
				parent.removeEventListener('contextmenu', this.parentContextMenu);
				parent.addEventListener('click', this.parentClick);
			} else if (this.trigger === 'contextmenu' && !this.disabled) {
				parent.removeEventListener('mouseenter', this.parentMouseEnter);
				parent.removeEventListener('mouseleave', this.parentMouseLeave);
				parent.removeEventListener('click', this.parentClick);

				parent.addEventListener('contextmenu', this.parentContextMenu);
			}
			document.addEventListener('click', this.handleDocumentClick);
		}
	}

	private appendToRoot() {
		if (this.host.parentNode !== document.body) {
			this.openTimer = setTimeout(() => {
							document.body.appendChild(this.host);
							this.addedToBody = true;
							this.open = true;
							this.updateMenuPosition();
			}, this.opendelay);
		}
	}

	private removeMenu() {
		try {
			if (this.host.parentNode === document.body) {
				document.body.removeChild(this.host);
			}
			this.addedToBody = false;
			this.open = false;
		} catch (err: any) {
			// ignore
		}
	}

	private removeAllPopover() {
				const popover = (document.querySelector('sy-popover') as unknown) as HTMLSyPopoverElement | null;
				if (popover) {
					popover.open = false;
				}

				const popConfirm = (document.querySelector('sy-popconfirm') as unknown) as HTMLSyPopconfirmElement | null;
				if (popConfirm) {
					popConfirm.setClose?.();
				}

				const inlineMessage = (document.querySelector('sy-inline-message') as unknown) as HTMLSyInlineMessageElement | null;
				if (inlineMessage) {
					inlineMessage.open = false;
				}

				const tooltip = (document.querySelector('sy-tooltip') as unknown) as HTMLSyTooltipElement | null;
				if (tooltip) {
					tooltip.open = false;
				}
	}

	private removeAllMenus() {
				const menuList = document.querySelectorAll('sy-menu') as NodeListOf<HTMLSyMenuElement>;
				menuList.forEach(menu => {
					(menu as any).delayedMenuClose?.();
				});
	}

	@Method()
	async delayedMenuClose() {
		if (this.closeTimer) clearTimeout(this.closeTimer);
		this.closeTimer = setTimeout(() => {
			if (!this.isMouseOverParent) {
				this.removeMenu();
				this.removeAllPopover();
			}
		}, this.closedelay);

		this.host.dispatchEvent(new CustomEvent('opened', {
			detail: false,
			bubbles: true,
			composed: true,
		}));
	};

	private parentMouseEnter = () => {
		if (this.disabled) { return; }
		this.isMouseOverParent = true;
		if (this.closeTimer) clearTimeout(this.closeTimer);
		this.removeAllMenus();
		this.appendToRoot();

		this.host.dispatchEvent(new CustomEvent('opened', {
			detail: true,
			bubbles: true,
			composed: true,
		}));
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
		event.stopPropagation();
		if (this.disabled) { return; }
		if (this.open) {
			this.removeMenu();

			this.host.dispatchEvent(new CustomEvent('opened', {
				detail: false,
				bubbles: true,
				composed: true,
			}));
		} else {
			this.removeAllMenus();
			if (this.closeTimer) clearTimeout(this.closeTimer);
			this.appendToRoot();

			this.host.dispatchEvent(new CustomEvent('opened', {
				detail: true,
				bubbles: true,
				composed: true,
			}));
		}
	};

	private parentContextMenu = (event: MouseEvent) => {
		event.preventDefault();
		event.stopPropagation();

		if (this.disabled) { return; }

		if (this.closeTimer) clearTimeout(this.closeTimer);
		this.appendToRoot();

		this.mouseX = event.clientX;
		this.mouseY = event.clientY;

		this.updateMenuPosition();
	};

	private handleDocumentClick = (event: any) => {
		const isInMenu = this.host.contains(event.target as Node);
		const isParent = this.parentDom?.contains(event.target as Node);

		if (!isInMenu && !isParent) {
			this.removeMenu();
		}
	};

	private updateMenuPosition(e?: any) {
		if (this.parentDom && this.parentDom instanceof HTMLElement) {
			this.host.style.visibility = 'hidden';

			setTimeout(() => {
				const parentRect = this.parentDom.getBoundingClientRect();
				const rect = this.host.getBoundingClientRect();

				if (rect.width > 0 && rect.height) {
					this.width = rect.width;
					this.height = rect.height;
				}

				const viewportHeight = window.innerHeight;
				const viewportWidth = window.innerWidth;
				const scrollTop = document.documentElement.scrollTop;
				const scrollLeft = document.documentElement.scrollLeft;

				if (this.trigger === 'contextmenu') {
					if (e) {
						this.removeMenu();
					}

					this.host.style.left = `${this.mouseX + scrollLeft}px`;
					this.host.style.top = `${this.mouseY + scrollTop}px`;

					if (this.mouseX + this.width > viewportWidth + scrollLeft) {
						this.host.style.left = `${viewportWidth - this.width - scrollLeft}px`;
					}
					if (this.mouseY + this.height > viewportHeight + scrollTop) {
						this.host.style.top = `${viewportHeight - this.height - scrollTop - 16}px`;
					}
				} else {
					if (this.position.indexOf('bottom') === 0) {
						if (parentRect.bottom + this.height > viewportHeight && (parentRect.top - this.height) >= 0) {
							this.host.style.top = `${parentRect.top - this.height + scrollTop}px`;
						} else {
							this.host.style.top = `${parentRect.bottom + scrollTop}px`;
						}

						if (this.position.indexOf('Left') > -1) {
							this.host.style.left = `${parentRect.left + scrollLeft}px`;
						} else if (this.position.indexOf('Right') > -1) {
							this.host.style.left = `${parentRect.right - this.width + scrollLeft}px`;
						} else {
							this.host.style.left = `${(parentRect.left + (parentRect.width - this.width) / 2) + scrollLeft}px`;
						}
					} else if (this.position.indexOf('right') === 0) {
						if (parentRect.right + this.width > viewportWidth && (parentRect.left - this.width) >= 0) {
							this.host.style.left = `${parentRect.left - this.width + scrollLeft}px`;
							this.direction = 'left';
						} else {
							this.host.style.left = `${parentRect.right + scrollLeft}px`;
							this.direction = 'right';
						}

						this.host.style.top = `${parentRect.top + scrollTop}px`;
					} else if (this.position.indexOf('top') === 0) {
						if (parentRect.top - this.height < 0 && (parentRect.bottom + this.height) <= viewportHeight) {
							this.host.style.top = `${parentRect.bottom + scrollTop}px`;
						} else {
							this.host.style.top = `${parentRect.top - this.height + scrollTop}px`;
						}

						if (this.position.indexOf('Left') > -1) {
							this.host.style.left = `${parentRect.left + scrollLeft}px`;
						} else if (this.position.indexOf('Right') > -1) {
							this.host.style.left = `${parentRect.right - this.width + scrollLeft}px`;
						} else {
							this.host.style.left = `${(parentRect.left + (parentRect.width - this.width) / 2) + scrollLeft}px`;
						}
					}
				}

				this.host.style.width = `${this.width}px`;
				this.host.style.visibility = 'visible';
			}, this.DISPLAY_INTERVAL);
		}
	}

	// dropdown calls this function for setting selectable to all items.
	@Method()
	async setSelectableAllItems() {
				const items = Array.from(this.host.children).filter((item): item is HTMLSyMenuItemElement => (item as HTMLElement).tagName.toLowerCase() === 'sy-menu-item');
				if (items.length) {
					items.forEach((item) => item.selectable = true);
				}
	}

	// dropdown calls this function for clear selected to all items.
	@Method()
	async clearSelectedItem() {
				const itemsClear = Array.from(this.host.children).filter((item): item is HTMLSyMenuItemElement => (item as HTMLElement).tagName.toLowerCase() === 'sy-menu-item');
				if (itemsClear.length) {
					itemsClear.forEach((item) => item.select = false);
				}
	}

	private setCheckableAllItems() {
				const itemsCheck = Array.from(this.host.children).filter((item): item is HTMLSyMenuItemElement => (item as HTMLElement).tagName.toLowerCase() === 'sy-menu-item');
				if (itemsCheck.length) {
					itemsCheck.forEach((item) => item.checkable = this.checkable);
				}
	}

		private itemSelectedEvent = (_e: any) => {
			this.delayedMenuClose();
		};
		private itemCheckedEvent = (_e: any) => {
			// placeholder for future behavior
		};
}
