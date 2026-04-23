import { Component, Prop, State, h, Element } from '@stencil/core';

@Component({
  tag: 'sy-menu-sub',
  shadow: false,
  scoped: true,
  styleUrl: 'sy-menu-sub.scss',
})
export class SyMenuSub {
  @Element() host!: HTMLSyMenuSubElement;

  private DefaultOpendelay = 0;
  private DefaultClosedelay = 0;
  private parentDirection: 'left' | 'right' = 'right';

  @Prop() disabled: boolean = false;
  @Prop({ mutable: true }) open: boolean = false;
  @Prop({ attribute: 'title' }) menuSubTitle: string = '';

  // queries
  // private get submenuTitle(): HTMLElement | null {
  //   return this.host.querySelector('.submenu-title');
  // }
  private get submenu(): HTMLElement | null {
    return this.host.querySelector('.submenu');
  }

  @State() private trigger: 'click' | 'hover' = 'hover';
  @State() private opendelay: number = this.DefaultOpendelay;
  @State() private closedelay: number = this.DefaultClosedelay;
  @State() private innerOpen = false;
  private menuObserver?: MutationObserver;

  constructor() {
    this.openOnMouseEnter = this.openOnMouseEnter.bind(this);
    this.closeOnMouseLeave = this.closeOnMouseLeave.bind(this);
    this.toggleOnClick = this.toggleOnClick.bind(this);
  }

  connectedCallback() {
    this.updateAttribute();
    this.applyEventListeners();

    if (this.open) {
      this.setOpen();
    }

    document.addEventListener('click', this.handleOutsideClick as EventListener);
  }

  disconnectedCallback() {
    this.innerOpen = false;
    document.removeEventListener('click', this.handleOutsideClick as EventListener);
    if (this.trigger === 'hover') {
      this.host.removeEventListener('mouseenter', this.openOnMouseEnter);
      this.host.removeEventListener('mouseleave', this.closeOnMouseLeave);
    }
    if (this.menuObserver) this.menuObserver.disconnect();
  }

  private handleOutsideClick = (_event: any) => {
    // placeholder for external click handling (original code commented)
  };

  private updateAttribute() {
    const closestMenu = this.host.closest('sy-menu');
    if (closestMenu) {
      // leave attributes in place for now
    }
  }

  private applyEventListeners() {
    if (this.trigger !== 'click') {
      this.host.addEventListener('mouseenter', this.openOnMouseEnter);
      this.host.addEventListener('mouseleave', this.closeOnMouseLeave);
      this.host.removeEventListener('click', this.toggleOnClick);
    } else {
      this.host.removeEventListener('mouseenter', this.openOnMouseEnter);
      this.host.removeEventListener('mouseleave', this.closeOnMouseLeave);
      this.host.addEventListener('click', this.toggleOnClick);
    }
  }

  private adjustSubMenuPosition() {
    requestAnimationFrame(() => {
      if (this.submenu) {
        setTimeout(() => {
          const closestMenu = this.host.closest('sy-menu') as any;
          const rect = this.submenu!.getBoundingClientRect();
          this.parentDirection = closestMenu?.direction ?? this.parentDirection;

          const rectWidth = this.parentDirection === 'left' ? rect.width * 2 : rect.width;

          if (this.parentDirection === 'left') {
            if (rect.left < rectWidth) {
              if (closestMenu) closestMenu.setAttribute('direction', 'right');
              this.submenu!.style.left = '100%';
              this.submenu!.style.right = 'auto';
            } else {
              this.submenu!.style.left = 'auto';
              this.submenu!.style.right = '100%';
              if (closestMenu) closestMenu.setAttribute('direction', 'left');
            }
          } else if (this.parentDirection === 'right') {
            if ((rect.left - rect.width < 0) || (rect.left - rect.width > 0 && window.innerWidth < (rect.left + rect.width))) {
              if (closestMenu) closestMenu.setAttribute('direction', 'left');
              this.submenu!.style.left = 'auto';
              this.submenu!.style.right = '100%';
            } else {
              this.submenu!.style.left = '100%';
              this.submenu!.style.right = 'auto';
              if (closestMenu) closestMenu.setAttribute('direction', 'right');
            }
          }
        }, 100);
      }
    });
  }

  private sanitizeHtml(content: string): string {
    if (!content) return '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    return tempDiv.innerText.trim();
  }

  render() {
    const safeTitle = this.sanitizeHtml(this.menuSubTitle);

    return (
      <div>
        <div
          tabindex={0}
          class={{ 'submenu-title': true, 'active': this.innerOpen } as any}
          onClick={this.toggleOnClick}
          title={safeTitle}
        >
          <div class="menu-title">
            <span class="title">{safeTitle}</span>
          </div>
          <sy-icon size="medium" class="submenu-open">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M433.5 303C442.9 312.4 442.9 327.6 433.5 336.9L273.5 497C264.1 506.4 248.9 506.4 239.6 497C230.3 487.6 230.2 472.4 239.6 463.1L382.6 320.1L239.6 177.1C230.2 167.7 230.2 152.5 239.6 143.2C249 133.9 264.2 133.8 273.5 143.2L433.5 303.2z"/></svg>
          </sy-icon>
        </div>
        <ul class={{ 'submenu': true, 'open': this.innerOpen } as any} aria-disabled={this.disabled ? 'true' : 'false'}>
          <slot></slot>
        </ul>
      </div>
    );
  }

  private toggleOnClick() {
    if (this.trigger === 'click') this.setTrigger();
  }

  private openOnMouseEnter() {
    if (this.trigger !== 'click') this.setOpen();
  }

  private closeOnMouseLeave() {
    if (this.trigger !== 'click') this.setClose();
  }

  private setTrigger() {
    if (this.innerOpen) this.setClose(); else this.setOpen();
  }

  private setOpen() {
    if (this.disabled) return;
    setTimeout(() => {
      this.adjustSubMenuPosition();
      this.innerOpen = true;
    }, this.opendelay);
  }

  private setClose() {
    setTimeout(() => {
      this.innerOpen = false;
      const children = Array.from(this.host.children);
      children?.forEach(child => {
        if (child.tagName === 'SY-MENU-SUB') {
          (child as any).setClose?.();
        }
      });
    }, this.closedelay);
  }
}
