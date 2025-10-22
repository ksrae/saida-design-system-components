
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
	private isUpdatingOpenState = false; // Guard to prevent infinite loops
	private suppressOpen = false; // Prevent immediate reopen after closing

	@Prop({ reflect: true, mutable: true }) open: boolean = false;
	@Prop({ reflect: true }) checkable: boolean = false;

	@Prop({ mutable: true }) position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' = 'bottomLeft';
	@Prop({ mutable: true }) trigger: 'click' | 'hover' | 'contextmenu' = 'hover';
	@Prop() direction: 'left' | 'right' = 'right';
	@Prop({ mutable: true }) disabled: boolean = false;

	@State() opendelay: number = this.DefaultOpendelay;
	@State() closedelay: number = this.DefaultClosedelay;

	constructor() {
		this.updateMenuPosition = this.updateMenuPosition.bind(this);
	}



	connectedCallback() {
		window.addEventListener('scroll', this.updateMenuPosition, true);
		window.addEventListener('resize', this.updateMenuPosition, true);
	}

	componentWillLoad() {
		this.parentDom = this.host.parentElement;
		this.setDropdown();
	}

	componentDidLoad() {
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
		this.addEvent();
	}


	@Watch('disabled')
	watchDisabled() {
		this.addEvent();
	}

	@Watch('checkable')
	watchCheckable() {
		this.setCheckableAllItems();
	}

	@Watch('open')
	watchOpen(newVal: boolean) {
		if (this.isUpdatingOpenState) {
			return;
		}
		
		if (!this.isDropdown) {
			if (newVal) {
				this.appendToRoot();
			} else {
				this.removeMenu();
			}
		} 

	}

	private setDropdown() {
		const dropdownElement = this.host.closest('sy-dropdown');
		this.isDropdown = !!dropdownElement;
		if (this.isDropdown) {
			this.position = dropdownElement?.position;
			this.trigger = dropdownElement?.trigger;
			this.disabled = dropdownElement?.disabled;
			dropdownElement.addEventListener('keydown', this.handleDropdownKeydown as EventListener);
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
		}
	}

	private appendToRoot() {
		// don't reopen immediately after a selection closed the menu
		if (this.suppressOpen) {
			console.log('[MENU appendToRoot] suppressed open due to recent selection');
			return;
		}
		if (this.host.parentNode !== document.body) {
			// Remove any existing listener first to prevent duplicates
			document.removeEventListener('click', this.handleDocumentClick);
			
			// Clear any pending timers
			if (this.openTimer) clearTimeout(this.openTimer);
			
			this.openTimer = setTimeout(() => {
				document.body.appendChild(this.host);
				
				// Set open state with guard to prevent infinite loop
				this.isUpdatingOpenState = true;
				this.open = true;
				this.addedToBody = true;
				this.isUpdatingOpenState = false;
				
				this.updateMenuPosition();
				
				// For click trigger, add listener on next tick to avoid immediate closure
				if (this.trigger === 'click') {
					setTimeout(() => {
						document.addEventListener('click', this.handleDocumentClick, { once: false });
					}, 100);
				} else {
					// For other triggers, add immediately
					setTimeout(() => {
						document.addEventListener('click', this.handleDocumentClick);
					}, 0);
				}
			}, this.opendelay);
		} 
	}

	private removeMenu() {
		console.log('[MENU removeMenu] Called. addedToBody:', this.addedToBody, 'in body:', document.body.contains(this.host));
		
		try {
			// Clear any pending timers
			if (this.openTimer) clearTimeout(this.openTimer);
			if (this.closeTimer) clearTimeout(this.closeTimer);
			
			// Remove document click listener when closing menu
			document.removeEventListener('click', this.handleDocumentClick);
			
			// Set open state FIRST before moving
			this.isUpdatingOpenState = true;
			this.open = false;
			this.isUpdatingOpenState = false;
			
			// Check if menu is actually in body, not just the flag
			if (document.body.contains(this.host)) {
				try {
					// Move back to original parent instead of just removing
					if (this.parentDom && this.host.parentNode === document.body) {
						document.body.removeChild(this.host);
						this.parentDom.appendChild(this.host);
						console.log('[MENU removeMenu] Moved back to parent');
					} else if (this.parentDom) {
						// Menu is somewhere else, still move to parent
						this.host.remove();
						this.parentDom.appendChild(this.host);
						console.log('[MENU removeMenu] Removed and moved back to parent');
					}
				} catch (e) {
					console.error('[MENU removeMenu] Error removing from body:', e);
				}
			}
			
			this.addedToBody = false;
		} catch (err: any) {
			console.error('[MENU removeMenu] Error:', err);
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
		// Find all sy-menu elements that are direct children of body
		const menusInBody = Array.from(document.body.children).filter(el => el.tagName.toLowerCase() === 'sy-menu') as HTMLSyMenuElement[];
		
		menusInBody.forEach(menu => {
			// Don't close the current menu
			if (menu !== this.host) {
				// Simply set open to false, @Watch will handle the rest
				(menu as any).open = false;
			}
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
		event.preventDefault();
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
			// Close all other open menus before opening this one
			this.removeAllMenus();
			if (this.closeTimer) clearTimeout(this.closeTimer);
			
			// Wait a bit to ensure other menus are closed before opening this one
			setTimeout(() => {
				this.appendToRoot();

				this.host.dispatchEvent(new CustomEvent('opened', {
					detail: true,
					bubbles: true,
					composed: true,
				}));
			}, 10);
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
		// Don't close if clicking on parent element (the trigger)
		const isParent = this.parentDom?.contains(event.target as Node);
		
		if (isParent) {
			return;
		}
		
		const isInMenu = this.host.contains(event.target as Node);

		if (!isInMenu) {
			this.removeMenu();
		} 
		// else {
		// 	console.log('[MENU handleDocumentClick] Clicked inside menu, keeping open');
		// }
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
		// Menu item selected - close immediately
		console.log('itemSelectedEvent: closing menu');
		// prevent immediate reopen by parent handlers
		this.suppressOpen = true;
		setTimeout(() => { this.suppressOpen = false; }, 200);
		this.removeMenu();
	};
	private itemCheckedEvent = (_e: any) => {
		// placeholder for future behavior
	};
}