import { LitElement, html, CSSResultGroup, css, unsafeCSS, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import globalCSS from './styles/menu-sub.scss?inline';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../icon/icon.element';

@customElement('sy-menu-sub')
export class MenuSubElement extends LitElement {
  static styles: CSSResultGroup = css`${unsafeCSS(globalCSS)};`
  private DefaultOpendelay = 0;
  private DefaultClosedelay = 0;
  private parentDirection: 'left' | 'right' = 'right';

  @property({ type: Boolean }) disabled: boolean = false;
  @property({ type: Boolean }) open: boolean = false;
  @property({ type: String }) title: string = '';
    
  @query('.submenu-title') submenuTitle!: HTMLElement;
  @query('.submenu') submenu!: HTMLElement;
  // @state() private direction: 'left' | 'right' = 'right';
  // @state() private mode: 'vertical' | 'inline' = 'vertical'; // 기본 모드는 'inline'
  @state() private trigger: 'click' | 'hover' = 'hover';
  @state() private opendelay: number = this.DefaultOpendelay;
  @state() private closedelay: number = this.DefaultClosedelay;
  @state() private innerOpen = false;
  private menuObserver?: MutationObserver;

  constructor() {
    super();
    // 이벤트 리스너를 동적으로 추가하기 위한 바인딩
    this.openOnMouseEnter = this.openOnMouseEnter.bind(this);
    this.closeOnMouseLeave = this.closeOnMouseLeave.bind(this);
    // this.adjustSubMenuPosition = this.adjustSubMenuPosition.bind(this); // 새로 추가한 메소드 바인딩
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateAttribute();
    this.applyEventListeners();

    if(this.open) {
      this.setOpen();
    }

      // 외부 클릭 감지를 위한 이벤트 리스너 추가
    document.addEventListener('click', this.handleOutsideClick.bind(this));

  }


  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('open')) {
      this.innerOpen = this.open;
      if(this.open) {
        this.adjustSubMenuPosition();
        // if(this.mode === 'vertical') {
        //   this.#adjustSubMenuPosition();
        // }        
      } else {
        this.setClose();
      }

    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    
    this.innerOpen = false;
    // this.opened = false;
    // 컴포넌트가 DOM에서 제거될 때 이벤트 리스너를 제거해야 메모리 누수를 방지할 수 있습니다.
    document.removeEventListener('click', this.handleOutsideClick.bind(this));

    if(this.trigger === 'hover') {
      this.removeEventListener('mouseenter', this.openOnMouseEnter);
      this.removeEventListener('mouseleave', this.closeOnMouseLeave);
    }

    // MutationObserver 연결 해제
    if (this.menuObserver) {
      this.menuObserver.disconnect();
    }
  }


  
  private handleOutsideClick = (event: any) => {
    // 이벤트가 이 컴포넌트 내부에서 발생하지 않았는지 확인합니다.
    // 이 컴포넌트나 자식 요소가 이벤트의 타겟이 아니라면, 메뉴를 닫습니다.
    // const parentDom = this.parentElement;

    // // const isParent = parentDom?.contains(event);


    // if (this.trigger === 'click' && !this.contains(event.target)) {
    //   // this.direction = this.parentDirection;

    //   // this.setClose();
    // }
  };
  
  private updateAttribute() {
    const closestMenu = this.closest('sy-menu');
    
    if (closestMenu) {
      // this.mode = (closestMenu.getAttribute('mode') as 'vertical' | 'inline') || 'vertical';
      // this.trigger = (closestMenu.getAttribute('trigger') as 'click' | 'hover') || 'hover';
      // this.parentDirection = (closestMenu.getAttribute('direction') as 'left' | 'right') || 'right';
      // this.opendelay = Number(closestMenu.getAttribute('opendelay')) || this.DefaultOpendelay;
      // this.closedelay = Number(closestMenu.getAttribute('closedelay')) || this.DefaultClosedelay;
    }
  }

  private applyEventListeners() {
    // mouseenter와 mouseleave 이벤트 리스너는 vertical 모드에서만 적용되므로 제거
    if(this.trigger !== 'click') {
      this.addEventListener('mouseenter', this.openOnMouseEnter);
      this.addEventListener('mouseleave', this.closeOnMouseLeave);
      this.removeEventListener('click', this.toggleOnClick);

    } else {
      this.removeEventListener('mouseenter', this.openOnMouseEnter);
      this.removeEventListener('mouseleave', this.closeOnMouseLeave);
    }
  }

  private adjustSubMenuPosition() {
    requestAnimationFrame(() => {
      if (this.submenu) {
        setTimeout(() => {
          const closestMenu = this.closest('sy-menu');
          const rect = this.submenu.getBoundingClientRect();
          this.parentDirection = (closestMenu as any).direction;

          // direction은 left일 때는 rect.width를 두배로 계산해야 방향을 정확히 잡음.
          const rectWidth = this.parentDirection === 'left' ? rect.width * 2 : rect.width;
          
          if (this.parentDirection === 'left') {
            // 왼쪽으로 펼쳐진다.         
            if (rect.left < rectWidth) {
              if(closestMenu) { closestMenu.setAttribute('direction', 'right'); }
              this.submenu.style.left = '100%';
              this.submenu.style.right = 'auto';            
            } else {
              this.submenu.style.left = 'auto';
              this.submenu.style.right = '100%';
              if(closestMenu) { closestMenu.setAttribute('direction', 'left'); }
            }
          } else if (this.parentDirection === 'right') {
            // 이전 direction이 left인 경우 다음 menu의 방향에 영향이 가므로 그 때는 left가 width보다 큰지 비교한다.
            // direction에 영향이 없는 경우에는 window의 width를 기준으로 계산한다.
            if((rect.left - rect.width < 0) || (rect.left - rect.width > 0 && window.innerWidth < (rect.left + rect.width))) {
              if(closestMenu) { closestMenu.setAttribute('direction', 'left'); }
              this.submenu.style.left = 'auto';
              this.submenu.style.right = '100%';
            } else {
              this.submenu.style.left = '100%';
              this.submenu.style.right = 'auto';
              if(closestMenu) { closestMenu.setAttribute('direction', 'right'); }
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
    return html`
    <div tabindex="0" class=${classMap({    
      'submenu-title': true,
      'active': this.innerOpen,
      })}
      @click=${this.toggleOnClick}
      title=${this.sanitizeHtml(this.title)}>
      <div class="menu-title">
        <span class="title">${unsafeHTML(this.title)}</span>
      </div>
      <sy-icon size="medium" class="submenu-open">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M433.5 303C442.9 312.4 442.9 327.6 433.5 336.9L273.5 497C264.1 506.4 248.9 506.4 239.6 497C230.3 487.6 230.2 472.4 239.6 463.1L382.6 320.1L239.6 177.1C230.2 167.7 230.2 152.5 239.6 143.2C249 133.9 264.2 133.8 273.5 143.2L433.5 303.2z"/></svg>
      </sy-icon>
    </div>
    <ul class=${classMap({    
      'submenu': true,
      'open': this.innerOpen
    })}
    disabled=${ifDefined(this.disabled ?? undefined)}
    >
      <slot></slot>
    </ul>
    `;
  }

  private toggleOnClick() {
    if (this.trigger === 'click') {
      this.setTrigger();
    }
  }

  private openOnMouseEnter() {
    if (this.trigger !== 'click') {
      this.setOpen();
      
    }
  }

  private closeOnMouseLeave() {
    if (this.trigger !== 'click') {
      this.setClose();
    }
  }

  private setTrigger() {
    if(this.innerOpen) {
      this.setClose();
    } else {
      this.setOpen();
    }
  }
  
  private setOpen() {
    if(this.disabled) return;

    setTimeout(() => {
      this.adjustSubMenuPosition();
      this.innerOpen = true;
      this.requestUpdate();
    }, this.opendelay);
  }

  private setClose() {
    setTimeout(() => {
      this.innerOpen = false;

      const children = Array.from(this.children);

      children?.forEach(child => {
        if(child.tagName === 'SY-MENU-SUB') {
          (child as any).setClose();
        }
      });
      this.requestUpdate();
    }, this.closedelay);
  }
}
