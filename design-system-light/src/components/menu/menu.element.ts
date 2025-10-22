import { LitElement, html, CSSResultGroup, css, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import globalCSS from './styles/menu.scss?inline';
import { MenuItemElement } from './menu-item.element';
import { PopoverElement } from '../popover/popover.element';
import { TooltipElement } from '../tooltip/tooltip.element';
import { InlineMessageElement } from '../inline-message/inline-message.element';
import { PopConfirmElement } from '../popconfirm/popconfirm.element';

@customElement('sy-menu')
export class MenuElement extends LitElement {
  static styles: CSSResultGroup = css`${unsafeCSS(globalCSS)};`
  private addedToBody = false; // 상태 변수 추가
  // private observer: any; // 부모 컴포넌트의 변화를 감지하기 위한 MutationObserver
  private isMouseOverParent = false;
  //private isMouseOverMenu = false;
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
  // @property({type: String}) mode: 'inline' | 'vertical' = 'vertical';
  @property({type: Boolean, reflect: true}) open: boolean = false;
  @property({type: Boolean, reflect: true}) checkable: boolean = false;

  @property({type: String}) position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' = 'bottomLeft'; // shows menu on the parent's which side.
  // @property({type: String}) position: 'right' | 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight' = 'bottom'; // shows menu on the parent's which side.
  @property({type: String}) trigger: 'click' | 'hover' | 'contextmenu' = 'hover';
  @property({type: String}) direction: 'left' | 'right' = 'right'; // do not use manually by user.
  @state() disabled: boolean = false;
  @state() opendelay: number = this.DefaultOpendelay;
  @state() closedelay: number = this.DefaultClosedelay;

  constructor() {
    super();
    this.updateMenuPosition = this.updateMenuPosition.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("scroll", this.updateMenuPosition, true);
    window.addEventListener("resize", this.updateMenuPosition, true);
  }

  async firstUpdated() {
    await this.updateComplete;
    this.parentDom = this.parentElement;
    this.setDropdown();
    // this.setOpendelay();
    // this.setClosedelay();
    if(this.open) {
      this.appendToRoot();
    }
    this.setCheckableAllItems();
    this.addEvent(); // 여기에서 addEvent를 호출합니다.
  }

  
  // attributeChangedCallback(name: string, oldVal: string | null, newVal: any | null) {
  //   super.attributeChangedCallback(name, oldVal, newVal);
  //   console.log('attributeChangedCallback', name, oldVal, newVal);

  //   if(name === 'position') { 
  //     this.position = newVal as 'right' | 'bottom' ?? 'bottom';
  //     console.log(this.position);
  //   } 
  // }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has('trigger')) {
      if(this.isDropdown) {
        this.trigger = this.parentDom?.trigger ? this.parentDom.trigger : 'click';
      } 
      this.addEvent();  
    } else if(changedProperties.has('checkable')) {
      this.setCheckableAllItems();
    }

    // else if (changedProperties.has('mode') && !this.isDropdown) {
    //   if(this.mode === 'inline') {
    //     this.closedelay = this.DefaultInlineClosedelay > this.closedelay ? this.DefaultInlineClosedelay : this.closedelay;
    //   } else {
    //     this.closedelay = this.DefaultClosedelay > this.closedelay ? this.DefaultClosedelay : this.closedelay;
    //   }
    // } 
    else if(changedProperties.has('open') && !this.isDropdown) {
      if (this.open) {
        this.appendToRoot();
      } else {
        this.removeMenu();
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // 컴포넌트가 document.body에서 제거되어야 하는 경우
    if (this.addedToBody) {
      window.removeEventListener('resize', this.updateMenuPosition);
      window.removeEventListener('scroll', this.updateMenuPosition); // Add scroll event listener
      document.removeEventListener('click', this.handleDocumentClick.bind(this));

      this.removeMenu();
      if (this.openTimer) clearTimeout(this.openTimer);
      if (this.closeTimer) clearTimeout(this.closeTimer);
    }
  }

  render() {
    return html`
      <ul @mouseenter=${this.handleMouseEnter} @mouseleave=${this.handleMouseLeave}>
        <slot @itemSelected=${this.itemSelectedEvent} @itemChecked=${this.itemCheckedEvent}></slot>
      </ul>
    `;
  }

  private setDropdown() {
    this.isDropdown = this.parentDom?.nodeName.toLowerCase() === 'sy-dropdown';
    if(this.isDropdown) {
      this.position = this.parentDom?.position;
      this.trigger = this.parentDom?.trigger;
      this.disabled = this.parentDom?.disabled;
      this.parentDom.addEventListener('keydown', this.handleDropdownKeydown.bind(this))
    }
  }

  private handleDropdownKeydown(e: KeyboardEvent) {
    if(e.code === 'Enter') {
      e.preventDefault();
      if (this.open) {
        this.removeMenu();
      } else {
        this.appendToRoot();
        
      }
    }
  }
    
  private addEvent() {
    const parent = this.parentDom; // this.parentElement 대신 this.parentDom을 사용
    if(parent) {
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
      document.addEventListener('click', this.handleDocumentClick.bind(this));
    }
  }

  // setOpendelay() {
  //   this.opendelay = this.opendelay < this.DefaultOpendelay ? this.DefaultOpendelay : this.opendelay;
  // }
  // setClosedelay() {
  //   this.closedelay = this.closedelay < this.DefaultClosedelay ? this.DefaultClosedelay : this.closedelay;
  // }

  private appendToRoot() {
    if (this.parentNode !== document.body) {
      
      this.openTimer = setTimeout(() => {
        document.body.appendChild(this);
        this.addedToBody = true; // document.body에 추가되었다는 플래그 설정
        this.open = true;
        this.requestUpdate();  
        this.updateMenuPosition();
      }, this.opendelay);
    }
  }

  private removeMenu() {
    // 컴포넌트가 document.body의 자식인지 확인 및 제거
    try {
      document.body.removeChild(this);
      this.addedToBody = false;
      this.open = false;

    } catch (err: any) {
      // console.log({err});
    }
  }

  private removeAllPopover() {
    const popover = document.querySelector('sy-popover') as PopoverElement;
    if(popover) {
      popover.open = false;
    }

    const popConfirm = document.querySelector('sy-popconfirm') as PopConfirmElement;
    if(popConfirm) {
      popConfirm.setClose();
    }

    const inlineMessage = document.querySelector('sy-inline-message') as InlineMessageElement;
    if(inlineMessage) {
      inlineMessage.open = false;
    }

    const tooltip = document.querySelector('sy-tooltip') as TooltipElement;
    if(tooltip) {
      tooltip.open = false;
    }
  }

  private removeAllMenus() {
    const menuList = document.querySelectorAll('sy-menu') as NodeListOf<MenuElement>;
    menuList.forEach((menu: MenuElement) => {
      menu.delayedMenuClose();
    });
  }
  
  public delayedMenuClose = () => {
    if (this.closeTimer) clearTimeout(this.closeTimer);
    this.closeTimer = setTimeout(() => {
      if (!this.isMouseOverParent) {
        // this.opened = false;
        this.removeMenu();
        this.removeAllPopover();
      }
    }, this.closedelay);

    this.dispatchEvent(new CustomEvent('opened', {
      detail: false,
      bubbles: true,
      composed: true
    }));
  }

  private parentMouseEnter = () => {
    if(this.disabled) { return; }
    this.isMouseOverParent = true;
    if (this.closeTimer) clearTimeout(this.closeTimer);
    this.removeAllMenus();
    this.appendToRoot();

    this.dispatchEvent(new CustomEvent('opened', {
      detail: true,
      bubbles: true,
      composed: true
    }));
  }
  
  private parentMouseLeave = () => {
    this.isMouseOverParent = false;
    this.delayedMenuClose();
  }
  private handleMouseEnter = () => {
    if(this.trigger === 'hover') {
      // this.isMouseOverMenu = true;
      if (this.closeTimer) clearTimeout(this.closeTimer);
    }
  }
  private handleMouseLeave = () => {
    if(this.trigger === 'hover') {
      // this.isMouseOverMenu = false;
      this.delayedMenuClose();
    }
  }
  
  private parentClick = (event: any) => {
    event.stopPropagation(); // 이벤트 버블링 중단
    
    if(this.disabled) { return; }
    if(this.open) {
      this.removeMenu();

    this.dispatchEvent(new CustomEvent('opened', {
      detail: false,
      bubbles: true,
      composed: true
    }));
    } else {
      // 이 코드가 없으면 여러개의 menu가 노출됨.
      this.removeAllMenus();
      if (this.closeTimer) clearTimeout(this.closeTimer);
      this.appendToRoot(); 

      this.dispatchEvent(new CustomEvent('opened', {
        detail: true,
        bubbles: true,
        composed: true
      }));
    }
  }
  private parentContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  
    if (this.disabled) { return; }
  
    // 메뉴가 열려 있지 않은 경우에만 추가
    
      if (this.closeTimer) clearTimeout(this.closeTimer);

      // 메뉴를 루트에 추가
      this.appendToRoot();
  
      // 마우스 위치 저장
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
  
      // 메뉴 위치 업데이트
      this.updateMenuPosition(); // event 없이 호출
  
      // 열림 이벤트 발생
      // this.dispatchEvent(new CustomEvent('opened', {
      //   detail: true,
      //   bubbles: true,
      //   composed: true
      // }));
    
  }
  private handleDocumentClick = (event: any) => {
    const isInMenu = this.contains(event.target as Node);
    const isParent = this.parentDom?.contains(event.target as Node);    

    if (!isInMenu && !isParent) {
      this.removeMenu();
    }
  };

  private updateMenuPosition(e?: any) {
    if (this.parentDom && this.parentDom instanceof HTMLElement) {
      this.style.visibility = 'hidden';
  
      setTimeout(() => {
        const parentRect = this.parentDom.getBoundingClientRect();
        const rect = this.getBoundingClientRect();
        
        if (rect.width > 0 && rect.height) {
          this.width = rect.width;
          this.height = rect.height;
        }
  
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        const scrollTop = document.documentElement.scrollTop;
        const scrollLeft = document.documentElement.scrollLeft;
  
        // 위치 계산 로직
        if (this.trigger === 'contextmenu') {
          // close menu if scrolling
          if(e) {
            this.removeMenu();
          }

          // 메뉴의 왼쪽 위가 마우스 위치에 오도록 조정
          this.style.left = `${this.mouseX + scrollLeft}px`; // 스크롤 위치 추가
          this.style.top = `${this.mouseY + scrollTop}px`; // 스크롤 위치 추가
  
          // 메뉴가 화면을 벗어나지 않도록 조정
          if (this.mouseX + this.width > viewportWidth + scrollLeft) {
            this.style.left = `${viewportWidth - this.width - scrollLeft}px`;
          }
          // console.log('this.mouseY', this.mouseY, 'this.height', this.height, {scrollTop}, {viewportHeight})
          if (this.mouseY + this.height  > viewportHeight + scrollTop) {
            this.style.top = `${viewportHeight - this.height - scrollTop -16}px`;
          }
        } else {
          // bottom
          if (this.position.indexOf('bottom') === 0) {
            if (parentRect.bottom + this.height > viewportHeight && (parentRect.top - this.height) >= 0) {
              this.style.top = `${parentRect.top - this.height + scrollTop}px`;
            } else {
              this.style.top = `${parentRect.bottom + scrollTop}px`;
            }
  
            if (this.position.indexOf('Left') > -1) {
              this.style.left = `${parentRect.left + scrollLeft}px`;
            } else if (this.position.indexOf('Right') > -1) {
              this.style.left = `${parentRect.right - this.width + scrollLeft}px`;
            } else {
              this.style.left = `${(parentRect.left + (parentRect.width - this.width) / 2) + scrollLeft}px`;
            }
          } 
          // right
          else if (this.position.indexOf('right') === 0) {
            if (parentRect.right + this.width > viewportWidth && (parentRect.left - this.width) >= 0) {
              this.style.left = `${parentRect.left - this.width + scrollLeft}px`;
              this.direction = 'left';
            } else {
              this.style.left = `${parentRect.right + scrollLeft}px`;
              this.direction = 'right';
            }
  
            this.style.top = `${parentRect.top + scrollTop}px`;
          } 
          // top
          else if (this.position.indexOf('top') === 0) {
            if (parentRect.top - this.height < 0 && (parentRect.bottom + this.height) <= viewportHeight) {
              this.style.top = `${parentRect.bottom + scrollTop}px`;
            } else {
              this.style.top = `${parentRect.top - this.height + scrollTop}px`;
            }
  
            if (this.position.indexOf('Left') > -1) {
              this.style.left = `${parentRect.left + scrollLeft}px`;
            } else if (this.position.indexOf('Right') > -1) {
              this.style.left = `${parentRect.right - this.width + scrollLeft}px`;
            } else {
              this.style.left = `${(parentRect.left + (parentRect.width - this.width) / 2) + scrollLeft}px`;
            }
          }
        }
  
        this.style.width = `${this.width}px`;
        this.style.visibility = 'visible';                          
      }, this.DISPLAY_INTERVAL);
    }
  
  
  }

  // dropdown calls this function for setting selectable to all items.
  public setSelectableAllItems() {
    const items = Array.from(this.children)?.filter(item => item.tagName.toLowerCase() === 'sy-menu-item') as MenuItemElement[];
    if(items) {
      items.forEach((item: MenuItemElement) => item.selectable = true);
    }
  }

  // dropdown calls this function for clear selected to all items.
  public clearSelectedItem() {
    const items = Array.from(this.children)?.filter(item => item.tagName.toLowerCase() === 'sy-menu-item') as MenuItemElement[];
    if(items) {
      items.forEach((item: MenuItemElement) => item.select = false);
    }
  }

  private setCheckableAllItems() {
    const items = Array.from(this.children)?.filter(item => item.tagName.toLowerCase() === 'sy-menu-item') as MenuItemElement[];
    if(items) {
      items.forEach((item: MenuItemElement) => item.checkable = this.checkable);
    }
  }
  private itemSelectedEvent(e: CustomEvent) {
    // e.stopPropagation();
    // this.dispatchEvent(new CustomEvent('selected', {
    //   detail: e.detail,
    //   bubbles: true,
    //   composed: true
    // }));
  
    this.delayedMenuClose();    
  }
  private itemCheckedEvent(e: CustomEvent) {
  //   e.stopPropagation();
  //   this.dispatchEvent(new CustomEvent('checked', {
  //     detail: e.detail,
  //     bubbles: true,
  //     composed: true
  //   }));
  }
}
