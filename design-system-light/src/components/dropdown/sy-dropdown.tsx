import { Component, Prop, h, Element, Watch } from '@stencil/core';

@Component({
	tag: 'sy-dropdown',
	styleUrl: 'sy-dropdown.scss',
	scoped: true,
	shadow: false,
})
export class SyDropdown {
	@Element() host!: HTMLElement;

	private menu!: HTMLSyMenuElement | null;
	private selectedEventHandler!: (e: Event) => void;

	@Prop({ reflect: true }) borderless: boolean = false;
	@Prop({ reflect: true }) disabled: boolean = false;
	@Prop({ reflect: true }) position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' = 'bottomLeft';
	@Prop({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';
	@Prop({ reflect: true }) trigger: 'hover' | 'click' = 'click';

	componentWillLoad() {
		this.selectedEventHandler = this.selectedEvent.bind(this);
	}

	componentDidLoad() {
		this.setMenu();
	}

	disconnectedCallback() {
		// Remove event listeners
		if (this.menu) {
			this.menu.removeEventListener('itemSelected', this.selectedEventHandler);
		}
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
			<div class={containerClasses} tabindex="0">
				<div class="dropdown--header">
					<slot name="title"></slot>
				</div>
				<sy-icon size={this.size}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
						<path fill="currentColor" d="M337.5 433C328.1 442.4 312.9 442.4 303.6 433L143.5 273C134.1 263.6 134.1 248.4 143.5 239.1C152.9 229.8 168.1 229.7 177.4 239.1L320.4 382.1L463.4 239.1C472.8 229.7 488 229.7 497.3 239.1C506.6 248.5 506.7 263.7 497.3 273L337.3 433z"/>
					</svg>
				</sy-icon>
				<slot></slot>
			</div>
		);
	}

	@Watch('trigger')
	watchTrigger() {
		if (this.menu) {
			this.menu.trigger = this.trigger;
		}
	}

	@Watch('position')
	watchPosition() {
		if (this.menu) {
			this.menu.position = this.position;
		}
	}

	@Watch('disabled')
	watchDisabled() {
		if (this.menu) {
			(this.menu as any).disabled = this.disabled;
		}
	}

	private setMenu() {
		// In light DOM, querySelector finds elements regardless of slot
		const newMenu = this.host.querySelector('sy-menu') as HTMLSyMenuElement | null;

		// If menu changed, remove listener from old menu
		if (this.menu && this.menu !== newMenu) {
			this.menu.removeEventListener('itemSelected', this.selectedEventHandler);
		}

		this.menu = newMenu || null;

		if (this.menu) {
			// Prevent duplicate registration
			this.menu.removeEventListener('itemSelected', this.selectedEventHandler);
			this.menu.addEventListener('itemSelected', this.selectedEventHandler);
		} else {
			console.warn('[DROPDOWN setMenu] No menu found!');
		}
	}

	private selectedEvent(e: any) {
		e.stopPropagation();

		if (this.menu) {
			this.menu.clearSelectedItem?.();
		}
		
		const selectedMenuItem = e.target as HTMLSyMenuItemElement;
		if (selectedMenuItem) {
			selectedMenuItem.select = true;
		}
		
		this.host.dispatchEvent(
			new CustomEvent('selected', {
				detail: e.detail,
				bubbles: true,
				composed: true,
			})
		);
	}
}
