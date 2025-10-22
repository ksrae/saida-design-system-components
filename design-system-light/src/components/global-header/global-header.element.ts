import { LitElement, html, css, nothing, CSSResultGroup, unsafeCSS } from "lit"; 
import { property, customElement, state } from "lit/decorators.js"; 
import { classMap } from 'lit/directives/class-map.js';
import { MenuElement, MenuItemElement } from "../menu"; 
import globalCSS from "./styles/global-header.scss?inline";
import { TabElement } from "../tabs";
import synopsysLogo from '../../style/images/synopsys.png';

@customElement("sy-global-header") 
export class GlobalHeaderElement extends LitElement { 
  @property({ type: String }) title!: string; 
  @property({ type: Boolean, reflect: true }) sticky: boolean = false;
  @property({ type: Boolean }) search: boolean = false;
  @property({ type: Boolean }) information: boolean = false;
  @property({ type: Boolean }) notification: boolean = false;

  @state() private overflowTabs: any[] = [];
  @state() private theme: 'light' | 'dark' = 'light';
  @state() private isCustomLogo: boolean = false;
  // Reference to the parent tab group to access its methods if needed
  private _parentTabGroup: any | null = null; 
  private updateInProgress: boolean = false; 


  static styles: CSSResultGroup = css`
      ${unsafeCSS(globalCSS)};
  `;
  
  // static get observedAttributes() {
  //   const observed = super.observedAttributes || [];
  //   return [...observed, 'class'];
  // }

  // attributeChangedCallback에서 클래스 변경 감지 및 테마 업데이트
  // attributeChangedCallback(name: string, old: string, value: string) {
  //   super.attributeChangedCallback(name, old, value);
  //   if (name === 'class') {
  //     this.updateThemeFromHostClass();
  //   }
  // }

  connectedCallback() {
    super.connectedCallback();
    this._parentTabGroup = this.closest('sy-tab-group');
    // this.updateThemeFromHostClass();
  }
  
  async firstUpdated() {
    await this.updateComplete;
    this.isCustomLogo = this.hasSlotLogoContents();

    setTimeout(() => {
      this.updateOverflowTabs();
    }, 100); 
    
  }
  
  disconnectedCallback() {
    super.disconnectedCallback();
    
    // ResizeObserver 정리
    // this.cleanupThemeObserver();
  }
  
  
 private get tabs(): TabElement[] {
  const tabContainer = this.querySelector('[slot="tabs"]') as HTMLElement;
  
  if (tabContainer) {
    const tabElements = Array.from(tabContainer.querySelectorAll('sy-tab'))
      .filter((tab) => tab.getAttribute('slot') !== 'extra') as TabElement[];
    
    tabElements.forEach(tab => {
      tab.inHeader = true;
    });
    
    return tabElements;
  } else return [];
}
  

  private hasNamedSlot(name: string) {
    return this.querySelector(`:scope > [slot="${name}"]`) !== null;
  }


  render() {
      const hasOverflowTabs = this.overflowTabs.length > 0;

      return html`
          <div class="header-title">
            <!-- dark for logo-white -->
          <!-- <span class="logo ${this.theme === 'dark' ? 'logo-color' : 
                              this.theme === 'light' ? 'logo-color' : 'logo-color'}"></span> -->
            <span class="logo" style="display: ${this.isCustomLogo ? 'none' : 'block'};">
              <img src="${synopsysLogo}" width="100%" height="100%">
            </span>
            <slot name="logo"></slot>
            ${this.title ? html`<span class="appname">${this.title}</span>` : nothing}
          </div>
          ${this.hasNamedSlot('tabs') ?
            html`
              <div class="header-tab">
              <slot name="tabs"></slot>
                ${hasOverflowTabs ? html`
                <div class="header-tab-more" @mouseenter="${this.handleOverflowMenuButtonClick}">
                    <sy-icon size="medium"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M544 320C544 346.5 522.5 368 496 368C469.5 368 448 346.5 448 320C448 293.5 469.5 272 496 272C522.5 272 544 293.5 544 320zM368 320C368 346.5 346.5 368 320 368C293.5 368 272 346.5 272 320C272 293.5 293.5 272 320 272C346.5 272 368 293.5 368 320zM144 368C117.5 368 96 346.5 96 320C96 293.5 117.5 272 144 272C170.5 272 192 293.5 192 320C192 346.5 170.5 368 144 368z"/></svg></sy-icon>
                    <sy-menu
                        position="bottomRight"
                        id="header-tab-overflow-menu"
                        @itemSelected=${this.handleMenuItemSelect}>
                        ${this.overflowTabs.map(tab =>
                            html`<sy-menu-item value="${tab.tabkey}">${tab.textContent}</sy-menu-item>`
                        )}
                    </sy-menu>
                </div>` : nothing}
              </div>`
            : nothing }
          
          <!-- change name of header-end class may cause error -->
          <div class="header-end">
            ${this.search ? html`<sy-input placeholder="Help Search" size="medium" @changed="${this.handleSearch}"></sy-input>` : nothing}
            ${this.information ? html`
              <sy-button size="medium" variant="borderless" @click="${this.handleClickInformation}">
                <sy-icon size="large" selectable><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM288 224C288 206.3 302.3 192 320 192C337.7 192 352 206.3 352 224C352 241.7 337.7 256 320 256C302.3 256 288 241.7 288 224zM280 288L328 288C341.3 288 352 298.7 352 312L352 400L360 400C373.3 400 384 410.7 384 424C384 437.3 373.3 448 360 448L280 448C266.7 448 256 437.3 256 424C256 410.7 266.7 400 280 400L304 400L304 336L280 336C266.7 336 256 325.3 256 312C256 298.7 266.7 288 280 288z"/></svg></sy-icon>
              </sy-button>` : nothing}
            ${this.notification ? html`
              <sy-button size="medium" variant="borderless" @click="${this.handleClickNotification}">
                <sy-icon size="large" selectable><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M320 64C302.3 64 288 78.3 288 96L288 99.2C215 114 160 178.6 160 256L160 277.7C160 325.8 143.6 372.5 113.6 410.1L103.8 422.3C98.7 428.6 96 436.4 96 444.5C96 464.1 111.9 480 131.5 480L508.4 480C528 480 543.9 464.1 543.9 444.5C543.9 436.4 541.2 428.6 536.1 422.3L526.3 410.1C496.4 372.5 480 325.8 480 277.7L480 256C480 178.6 425 114 352 99.2L352 96C352 78.3 337.7 64 320 64zM258 528C265.1 555.6 290.2 576 320 576C349.8 576 374.9 555.6 382 528L258 528z"/></svg></sy-icon> 
              </sy-button>`: nothing}
            <slot name="actions"></slot>
          </div>
      `;
  }
  
  private hasSlotLogoContents() {
		const logoSlot = this.shadowRoot?.querySelector(`slot[name="logo"]`) as HTMLSlotElement;
		const assignedNodes = logoSlot?.assignedNodes();

		const hasText = assignedNodes && assignedNodes.length > 0 && assignedNodes[0].textContent?.trim() !== '';

		return hasText;
	}
    
  // 오버플로우 메뉴 클릭 핸들러
  private handleOverflowMenuButtonClick(e: Event) {
    e.stopPropagation();
    setTimeout(() => {
      const menu = document.querySelector("sy-menu#header-tab-overflow-menu") as MenuElement;
      menu?.setSelectableAllItems();
    }, 1);  
  }

  private handleSearch(e: CustomEvent) {
    e.stopPropagation();

    this.dispatchEvent(
      new CustomEvent("changed", {
          detail: { value: e.detail.value },
          bubbles: true,
          composed: true,
      })
    );
  }

  private handleClickInformation(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(
      new CustomEvent("click", {
          detail: { type: "information" },
          bubbles: true,
          composed: true,
      })
    );
  }

  private handleClickNotification(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(
      new CustomEvent("click", {
          detail: { type: "notification" },
          bubbles: true,
          composed: true,
      })
    );
  }

  // 메뉴 아이템 선택 핸들러
  private handleMenuItemSelect(e: CustomEvent) {
      e.stopPropagation();
      
      if (this._parentTabGroup) {
          const activeTab = this._parentTabGroup.tabs.find((t: any) => t.tabkey === e.detail.value);
          if (activeTab) {
              this._parentTabGroup.setActive(activeTab.index);
              
              const selectedMenuItem = e.target as MenuItemElement;
              setTimeout(() => {
                const menu = document.querySelector("sy-menu#header-tab-overflow-menu") as MenuElement;
                menu?.clearSelectedItem();
    
                if(selectedMenuItem) {
                    selectedMenuItem.setAttribute('selected', '');
                    selectedMenuItem.select = true;
                    this.updateOverflowTabs();
                }
              }, 1);
              
              this.dispatchEvent(
                  new CustomEvent("selected", {
                      detail: { tabkey: activeTab.tabkey, index: activeTab.index },
                      bubbles: true,
                      composed: true,
                  })
              );
          }
      }
  }

  // 탭 오버플로우 계산 및 처리
  private updateOverflowTabs = () => {
      
    // 업데이트가 이미 진행 중이면 중복 실행 방지
    if (this.updateInProgress) return;
    this.updateInProgress = true;

    // 탭이 없거나 부모 요소가 없으면 종료
    if (!this.tabs.length) {
      this.updateInProgress = false;
      return;
    }

    // 모든 탭 표시 초기화
    this.tabs.forEach(tab => {
        tab.style.display = 'flex';
    });
    
    requestAnimationFrame(() => {
      try {
        // 헤더 탭 영역 접근
        const headerTab = this.shadowRoot?.querySelector('.header-tab');
        if (!headerTab) {
            console.error('headerTab is not found.');
            return;
        }
            
        const headerTabRect = headerTab.getBoundingClientRect(); 
        // 실제 가용 공간 계산 (헤더 탭 영역 기준)
        const ellipsisWidth = 16; // ellipsis 버튼 예상 크기 - 값 수정
        const buffer = 1; // 안전 버퍼 추가 - 경계에 걸친 탭 인식용
        
        // 탭 간격 계산 (2개 이상의 탭이 있을 때)
        let tabGap = 0;
        if (this.tabs.length >= 2) {
            const firstTabRect = this.tabs[0].getBoundingClientRect();
            const secondTabRect = this.tabs[1].getBoundingClientRect();
            
            // 두 번째 탭의 왼쪽 - 첫 번째 탭의 오른쪽 = 간격
            tabGap = secondTabRect.left - firstTabRect.right;
        }
        // 가용 공간 = 헤더 탭 영역 너비 - ellipsis 버튼 너비 - 안전 버퍼 - 탭 간격 합계
        const availableSpace = headerTabRect.width - ellipsisWidth - buffer - (tabGap * (this.tabs.length-1));
        
/*         console.log('디버깅: 헤더 탭 영역 정보', {
            '헤더탭영역너비': headerTabRect.width,
            '액션영역너비': 0,
            'Ellipsis버튼너비': ellipsisWidth,
            '안전버퍼': buffer,
            '탭간격': tabGap,
            '계산된가용공간': availableSpace,
            '탭개수': tabs.length
        });
         */
        let accumulatedWidth = 0;
        let overflowIndex = -1;
        
        // 탭 너비 계산 및 오버플로우 처리
        for (let i = 0; i < this.tabs.length; i++) {
            const tab = this.tabs[i];
            const tabRect = tab.getBoundingClientRect();
            const styles = window.getComputedStyle(tab);
            const margin = parseFloat(styles.marginRight);
            // 탭 자체 너비 + 마진
            const tabWidth = tabRect.width ;
            
            // 이전 탭과의 간격 추가 (첫 번째 탭 제외)
            const totalWidth = tabWidth;
            
            //console.log(`탭 ${i+1} (${tab.textContent}): 너비=${tabRect.width.toFixed(2)}, 총=${totalWidth.toFixed(2)}, 누적=${(accumulatedWidth + totalWidth).toFixed(2)}`);
            
            // 가용 공간과 비교 - 버퍼 포함하여 경계에 걸친 탭도 감지
            if (accumulatedWidth + tabWidth > availableSpace) {
              overflowIndex = i;
              //console.log(`오버플로우 발생 지점: 탭 ${i+1} (${tab.textContent}), 누적 너비가 ${(accumulatedWidth + totalWidth).toFixed(2)}px로 가용 공간 ${availableSpace.toFixed(2)}px를 초과`);
              break;
            } else {
              accumulatedWidth += totalWidth;
            }
        }
        // 오버플로우가 발생한 경우
        if (overflowIndex > -1) {
          const visibleTabCount = overflowIndex;
          this.overflowTabs = [];
          
          // activeTab기준으로 보여지는 tab의 범위를 계산
          const activeIndex = this._parentTabGroup.active || 0;
          let startIndex = 0;

          // activeTab이 앞부분에 있는 경우 첫 번째부터 보여줌
          if (activeIndex < Math.floor(visibleTabCount / 2)) {
            startIndex = 0;
          }
          // activeTab이 끝부분에 있는 경우 마지막 visibleTabCount개 보여줌
          else if (activeIndex >= this.tabs.length - Math.ceil(visibleTabCount / 2)) {
            startIndex = Math.max(0, this.tabs.length - visibleTabCount);
          }
          // activeTab이 중간에 있는 경우 활성 탭을 중심으로 보여줌
          else {
            startIndex = Math.max(0, activeIndex - Math.floor(visibleTabCount / 2));
          }

          this.tabs.forEach((tab: any, index: number) => {
            if (index >= startIndex && index < startIndex + visibleTabCount) {
              tab.style.display = 'flex';
            } else {
              tab.style.display = 'none';
              this.overflowTabs.push(tab);
            }
          });
        } else {
          // 오버플로우가 없는 경우 - 모든 탭 표시
          this.overflowTabs = [];
          this.tabs.forEach(tab => {
            tab.style.display = 'flex';
          });
        }
        
        const menu = document.querySelector("sy-menu#header-tab-overflow-menu") as MenuElement;
        menu?.clearSelectedItem();
  
        this.requestUpdate();
        } finally {
          // 업데이트 플래그 초기화
          this.updateInProgress = false;
        }
    });
  }
}