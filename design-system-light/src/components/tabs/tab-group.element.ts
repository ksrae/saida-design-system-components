import { LitElement, html, css, nothing, CSSResultGroup, unsafeCSS } from "lit";
import { property, customElement, queryAssignedElements, query, state } from "lit/decorators.js";
import { classMap } from 'lit/directives/class-map.js';
import "../menu/menu.element";
import "../menu/menu-item.element";
import "../button/button.element";
import globalCSS from "./styles/tab-group.scss?inline";
import { MenuElement } from "../menu/menu.element";
import { MenuItemElement } from "../menu/menu-item.element";
import { TabElement } from "./tab.element";
import { GlobalHeaderElement } from "../global-header";

@customElement("sy-tab-group")
export class TabGroupElement extends LitElement {
  static styles: CSSResultGroup = css`
    ${unsafeCSS(globalCSS)};
    .dragging {
      opacity: 0.5;
      background-color: #000;
      color: #fff;
    }

    .drag-over {
      background-color: #000;
      color: #fff;
    }
  `;
  @property({ type: Number }) active: number | undefined;
  @property({ type: String, reflect:true }) align: 'center' | 'left' = 'left';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) draggable = false;
  @property({ type: String, reflect:true }) position: "top" | "bottom" | "left" | "right" = "top";
  @property({ type: String, reflect:true }) type: "card" | "line" = "line";
  @property({ type: String, reflect:true }) size: "small" | "medium" | "large" = "medium";
  @property({ type: String }) padding: "small" | "medium" | "large" | 'none' = "none";
  // @queryAssignedElements({ slot: "title" }) tabs!: any;
  // @queryAssignedElements() tabContents!: any;
  @query('.tab-more') private tabMoreArea!: HTMLDivElement;

  @state() dragover: boolean = false;
  @state() private tabMoreAreaSize: number = 0;
  @state() private tabExtraAreaSize: number = 0;
  @state() private latestActiveIndex: number | undefined;
  
  @state() private overflowTabs: any[] = [];

  
  // isOpen = false;
  draggedItem: any;
  dragoverkey: any;
  prevDragOverkey: any;
  draggedIndex: any;
  dragoverIndex: any;
  droppedIndex: any;
  isDropped = false;
  isUpdateComplete = false;
  parentRect: DOMRect | undefined;
  private _updateInProgress = false;

  constructor() {
    super();
    // this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    // document.addEventListener("click", this.handleOutsideClick, true);
  }

  async firstUpdated() {
    await this.updateComplete;
    this.isUpdateComplete = true;


    if (this.draggable && !this.disabled) {
      this.enableDragAndDrop();
    }
    
    this.setTabs();
    this.setActive(this.active);
    this.updateOverflowTabs();
    // Add resize observer to handle parent size changes
    // if (this.parentElement) {
    //   const resizeObserver = new ResizeObserver(() => {
    //     this.updateParentRect();
    //   });
    //   resizeObserver.observe(this.parentElement);
    // }
    requestAnimationFrame(() => {
      this.updateParentRect();
    });
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if (this.isUpdateComplete) {
      if (changedProperties.has("disabled") || changedProperties.has("active")) {
        this.setActive(this.active);

        const menu = document.querySelector("sy-menu#tab-overflow-menu") as MenuElement;
        if(menu) {
          menu.disabled = this.disabled;
        }
      }
      
      if (changedProperties.has("type") || 
          changedProperties.has("size")) {
        this.updateTabs();
      } else if (changedProperties.has("draggable")) {
        if (this.draggable && !this.disabled) {
          this.enableDragAndDrop();
        } else {
          this.disableDragAndDrop();
        }
      } else if(changedProperties.has("position")) {
        this.updateOverflowTabs();
        for(let tab of this.tabs) {
          tab.position = this.position;
        }
      }
    }
  }


  disconnectedCallback() {
    super.disconnectedCallback();
    // document.removeEventListener("click", this.handleOutsideClick, true);
  }


  // private handleOutsideClick(e: any) {
  //   if (!this.shadowRoot?.contains(e.target)) {
  //     this.isOpen = false;

  //     // const menuElement = this.shadowRoot?.querySelector("sy-menu");
  //     // if(menuElement) {
  //     //   menuElement.delayedMenuClose();
  //     // }
      
  //     this.requestUpdate();
  //   }
  // }

  public closeTab(name: string) {
    const tab = this.tabs.find((tab: any) => tab.tabkey === name);
    if (tab) {
      tab.setClose();
      this.removeTab(tab.tabkey);
    }
  }

  renderHeader() {
    return html`
      <div class="${classMap({ tabs: true, [`${this.position}`]: true })}">
        <slot name="tabs" 
          @selected="${this.handleTabSelect}" 
          @closed="${this.handleTabClose}">
        </slot>
      </div>
      <div class="extra-area">
        <slot name="extra"></slot>
      </div>
      ${this.overflowTabs.length ? html`
      <div class="${classMap({
          'tab-more': true,
          'overflow-menu-button': true,
          disabled: this.disabled
        })}" 
        @mouseenter="${this.handleOverflowMenuButtonClick}">
        <sy-icon size="medium"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M544 320C544 346.5 522.5 368 496 368C469.5 368 448 346.5 448 320C448 293.5 469.5 272 496 272C522.5 272 544 293.5 544 320zM368 320C368 346.5 346.5 368 320 368C293.5 368 272 346.5 272 320C272 293.5 293.5 272 320 272C346.5 272 368 293.5 368 320zM144 368C117.5 368 96 346.5 96 320C96 293.5 117.5 272 144 272C170.5 272 192 293.5 192 320C192 346.5 170.5 368 144 368z"/></svg></sy-icon>
        <sy-menu
          ?disabled=${this.disabled}
          position="bottomRight"
          id="tab-overflow-menu"
          @itemSelected=${this.handleMenuSelect}>
          ${this.overflowTabs.map(tab =>
            html`
            <sy-menu-item 
              value="${tab.tabkey}">
              ${tab.innerHTML}
            </sy-menu-item>`
          )}
        </sy-menu>
      </div>`
      : nothing}
    `
  }

  render() {
    const isInsideGlobalHeader = this.querySelector('sy-global-header [slot="tabs"]') !== null;

    return html`
      <div
        class="${classMap({
          "top-layout": this.position === "top",
          "bottom-layout": this.position === "bottom",
          "left-layout": this.position === "left",
          "right-layout": this.position === "right"
      })}">
        <!-- 헤더 슬롯 추가 -->
        <slot 
          @selected="${this.handleTabSelect}" 
          @closed="${this.handleTabClose}">
        </slot>
        ${isInsideGlobalHeader ? this.renderHeader() : html`
        <div class="${classMap({
          "tab-group-container": true,
          "align-center": this.align === "center",
          "align-left": this.align === "left",
          "tab-padding-small": this.padding === "small",
          "tab-padding-medium": this.padding === "medium",
          "tab-padding-large": this.padding === "large",
          "tab-padding-none": this.padding === "none"
        })}">
          ${this.renderHeader()}
        </div>
        `}
      
        <div class="contents">
          <slot name="contents"></slot>
        </div>
      </div>
    `;
  }

  private get tabs(): TabElement[] {
    const tabContainer = this.querySelector('[slot="tabs"]') as HTMLElement;
    
    if (tabContainer) {
      return Array.from(tabContainer.querySelectorAll('sy-tab'))
        .filter((tab) => tab.getAttribute('slot') !== 'extra') as TabElement[];
    } else return [];
  }
  
  private getTabContents(): any[] {
    const contentContainer = this.querySelector('[slot="contents"]') as HTMLElement;
    if(contentContainer) {
      return Array.from(contentContainer.querySelectorAll('sy-tab-content'));
    } else return [];
  }


  private updateParentRect() {
    if (this.parentElement) {
      this.parentRect = this.parentElement.getBoundingClientRect();
      // Update menu button dimensions when parent rect is updated
    }
  }

  // private updateMenuButtonDimensions() {
  //   if (this.menuButtonElement) {
  //     const buttonRect = this.menuButtonElement.getBoundingClientRect();
  //     this.menuButtonWidth = buttonRect.width;
  //     this.menuButtonHeight = buttonRect.height;
  //   }
  // }


  private handleOverflowMenuButtonClick(e: Event) {
    e.stopPropagation();
    setTimeout(() => {
      const menu = document.querySelector("sy-menu#tab-overflow-menu") as MenuElement;
      menu?.setSelectableAllItems();
    }, 1);  
  }

  // private setMinMaxSize() {
  //   const parentRect = this.parentElement?.getBoundingClientRect();
  //   if (this.position === "top" || this.position === "bottom") {
  //     this.maxwidth = parentRect?.width ?? 0; // `${parentRect?.width}px` : "`100%";
  //     this.maxheight = 0;
  //   } else {
  //     this.maxwidth = 0;
  //     this.maxheight = parentRect?.height ?? 0; // `${parentRect?.height}px` : "`100%";
  //   }
  // }

  private setTabs() {
    // tabContents를 직접 참조하는 대신 getTabContents() 사용
    const tabContents = this.getTabContents();
    
    this.tabs.forEach((tab: any, index: number) => {
      tab.index = index;
      tab.parentDisabled = this.disabled;
      tab.type = this.type;
      tab.size = this.size;
      tab.position = this.position;
  
      if (tab.active && !this.disabled && !tab.currentDisabledStatus) {
        this.latestActiveIndex = index;
      }
      tab.active = this.disabled ? false : (!tab.currentDisabledStatus && index === this.active);
    });
    // 탭 컨텐츠 업데이트
    tabContents.forEach((content: any) => {
      const contentName = content.getAttribute("name");
      const activatedTab = this.tabs.find((t: any) => t.index === this.active);
      content.active = contentName === activatedTab?.getAttribute("tabkey");
      content.disabled = this.disabled;
    });
  }
  
  private setActive(activeIndex?: number) {
    if (this.disabled) {
      // disabled가 true일 때는 현재 active 탭을 저장하고 모든 탭 비활성화
      if (this.active !== undefined) {
        this.latestActiveIndex = this.active;
      }
      this.active = undefined;
    } else {
      // disabled가 false일 때
      if (activeIndex !== undefined && !this.tabs[activeIndex]?.currentDisabledStatus) {
        // 지정된 인덱스가 있고 해당 탭이 disabled가 아니면 그 탭을 active로 설정
        this.active = activeIndex;
      } else if (this.latestActiveIndex !== undefined && !this.tabs[this.latestActiveIndex]?.currentDisabledStatus) {
        // 이전에 active였던 탭이 있고 disabled가 아니면 그 탭을 active로 설정
        this.active = this.latestActiveIndex;
      } else {
        // 그 외의 경우 첫 번째 사용 가능한 탭을 찾아서 active로 설정
        this.active = this.findNextEnabledTab(0);
      }
    }
    this.setTabs();
  }

  private updateTabs() {
    const tabContents = this.getTabContents();

    if (this.tabs && tabContents) {
      this.tabs.forEach((tab: any, index: number) => {
        tab.parentDisabled = this.disabled;
        tab.type = this.type;
        tab.size = this.size;
        tab.position = this.position;
      });
    }
  }

  private updateOverflowTabs() {
  
    const isInsideGlobalHeader = this.querySelector('sy-global-header [slot="tabs"]') !== null;
        
    if (isInsideGlobalHeader) {
      const headerElement = this.querySelector('sy-global-header') as any;
      if (headerElement) {
        headerElement.updateOverflowTabs();
      }
      return;
    }

    // 업데이트가 이미 진행 중이면 중복 실행 방지
    if (this._updateInProgress) return;
    this._updateInProgress = true;

    // 탭이 없거나 부모 요소가 없으면 종료
    if (!this.tabs.length || !this.parentRect) {
      this._updateInProgress = false;
      return;
    }

    // 모든 탭을 보이도록 초기화
    this.tabs.forEach((tab: any) => {
      tab.style.display = 'flex';
    });
      
    // tab-more 크기를 48px로 하드코딩
    this.tabMoreAreaSize = 48;
    
    requestAnimationFrame(() => {
      try {
        // extra 영역 크기 계산
        const tabExtraArea = this.shadowRoot?.querySelector(".extra-area") as HTMLElement;
        const tabExtraRect = tabExtraArea?.getBoundingClientRect();
        this.tabExtraAreaSize = tabExtraRect ? 
          (this.position === 'top' || this.position === 'bottom') ? 
            tabExtraRect.width : 
            tabExtraRect.height
          : 0;
      
        // 사용 가능한 총 공간 계산
        const availableSpace = (this.position === 'top' || this.position === 'bottom') ?
          (this.parentRect as any).width - this.tabExtraAreaSize - this.tabMoreAreaSize :
          (this.parentRect as any).height - this.tabExtraAreaSize - this.tabMoreAreaSize;
      
        let accumulatedWidth = 0;
        let overflowIndex = -1;

        // 탭 크기 계산 및 오버플로우 지점 찾기
        for (let i = 0; i < this.tabs.length; i++) {
          const tab = this.tabs[i];
          const tabRect = tab.getBoundingClientRect();
          const tabWidth = (this.position === 'top' || this.position === 'bottom') ? 
            tabRect.width : tabRect.height;
        
          const styles = window.getComputedStyle(tab);
          const margin = (this.position === 'top' || this.position === 'bottom') ?
            parseFloat(styles.marginRight) :
            parseFloat(styles.marginBottom);
        
          const totalWidth = tabWidth + margin;

          if (accumulatedWidth + totalWidth > availableSpace) {
            overflowIndex = i;
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
          const active = this.active || 0;
          let startIndex = 0;

          // activeTab이 앞부분에 있는 경우 첫 번째부터 보여줌
          if (active < Math.floor(visibleTabCount / 2)) {
            startIndex = 0;
          }
          // activeTab이 끝부분에 있는 경우 마지막 visibleTabCount개 보여줌
          else if (active >= this.tabs.length - Math.ceil(visibleTabCount / 2)) {
            startIndex = Math.max(0, this.tabs.length - visibleTabCount);
          }
          // activeTab이 중간에 있는 경우 활성 탭을 중심으로 보여줌
          else {
            startIndex = Math.max(0, active - Math.floor(visibleTabCount / 2));
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
        
        const menu = document.querySelector("sy-menu#tab-overflow-menu") as MenuElement;
        menu?.clearSelectedItem();
    
        this.requestUpdate();
      } finally {
        // 업데이트 플래그 초기화
        this._updateInProgress = false;
      }
    });
  }

  private findNextEnabledTab(startIndex: number): number | undefined {
    for (let i = startIndex; i < this.tabs.length; i++) {
      if (!this.tabs[i].disabled) {
        return this.tabs[i].index;
      }
    }
    return undefined;
  }

  private findPreviousEnabledTab(startIndex: number): number | undefined {
    for (let i = startIndex; i >= 0; i--) {
      if (!this.tabs[i].disabled) {
        return i;
      }
    }
    return undefined;
  }

  private handleTabSelect(e: any) {
    e.stopPropagation();
    this.active = e.detail.index;
    this.dispatchEvent(new CustomEvent("selected", { detail: e.detail }));
  }

  private handleTabClose(e: any) {
    e.stopPropagation();
    if (!e.detail.isManualClose) {
      const closedTab = this.tabs.find((t: any) => t.index === e.detail.index);
      this.removeTab(e.detail.tabkey);

      // Determine the next active index
      if (closedTab && this.active === closedTab.index) {
        // this.setActive(closedTab.index);
        const nextActiveIndex = this.findNextEnabledTab(closedTab.index);
        const prevActiveIndex = this.findPreviousEnabledTab(closedTab.index - 1);

        if(nextActiveIndex !== undefined) {
          this.setActive(closedTab.index);
        } else if(nextActiveIndex === undefined && prevActiveIndex !== undefined) {
          this.setActive(prevActiveIndex);
        } else {
          this.setActive();
        }
      } else if (closedTab && this.active !== undefined && this.active > closedTab.index) {
        //this.active -= 1;
      }
    }
    this.closeEvent(e);
  }


  private handleMenuSelect(e: CustomEvent) {
    e.stopPropagation();
    if (!this.disabled) {
      const activeTab = this.tabs.find((t: any) => t.tabkey === e.detail.value);
      if(activeTab) {
        this.setActive(activeTab.index);
        setTimeout(() => {
          const menu = document.querySelector("sy-menu#tab-overflow-menu") as MenuElement;
          menu?.clearSelectedItem();
          const selectedMenuItem = e.target as MenuItemElement;
          if(selectedMenuItem) {
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

  private removeTab(key: string) {
    const tabContents = this.getTabContents();
    const tabIndex = this.tabs.findIndex((t: any) => t.tabkey === key);
    
    if (tabIndex >= 0) {
      // Remove the closed tab from the DOM
      this.tabs[tabIndex]?.remove();
      const contentToRemove = tabContents.find(content => content.getAttribute("name") === key);
      contentToRemove?.remove();
  
      // 탭 순서 업데이트
      this.tabs.splice(tabIndex, 1);
      this.setTabs();
  
      // 현재 active 탭 인덱스 업데이트
      if (this.active === tabIndex) {
        this.setActive(this.findNextEnabledTab(tabIndex));
      } else if ((this.active as number) > tabIndex) {
        (this.active as number)--;
        this.setTabs();
      }
  
      // 오버플로우 탭도 업데이트
      setTimeout(() => {
        this.updateOverflowTabs();
      }, 0);
    }
  }

  private enableDragAndDrop() {
    this.tabs.forEach((tab: any) => {
      tab.draggable = true;
      tab.addEventListener("dragstart", this.handleDragStart.bind(this));
      tab.addEventListener("dragover", this.handleDragOver.bind(this));
      tab.addEventListener("drop", this.handleDrop.bind(this));
      tab.addEventListener("dragend", this.handleDragEnd.bind(this));
    });
    this.updateOverflowTabs();
  }

  private disableDragAndDrop() {
    this.tabs.forEach((tab: any) => {
      tab.draggable = false;
      tab.removeEventListener("dragstart", this.handleDragStart);
      tab.removeEventListener("dragover", this.handleDragOver);
      tab.removeEventListener("drop", this.handleDrop);
      tab.removeEventListener("dragend", this.handleDragEnd);
    });
  }

  private handleDragStart(e: DragEvent) {
    this.draggedItem = e.target;
    this.isDropped = false;
    this.draggedIndex = this.draggedItem.index;
  }

  private handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    const target = e.currentTarget as any;
    this.dragoverkey = target.tabkey;

    // 드래그한 탭과 드래그 오버하는 탭이 동일한 경우 작업을 스킵
    if(this.dragoverkey === this.prevDragOverkey) {
      return;
    } else {
      this.prevDragOverkey = this.dragoverkey;  

      if (this.dragoverkey === this.draggedItem.tabkey) {
        return;
      }
    }

    // 드래그 오버 상태 업데이트
    this.clearDragOverClasses();
    target.setAttribute('dragover', true);
    this.dragoverIndex = target.index;

    // 탭 재정렬 로직
    if (this.dragoverIndex !== undefined && this.draggedIndex !== undefined) {
        this.reorderTabs(this.draggedIndex, this.dragoverIndex);        
    }
};

  private handleDrop(e: DragEvent) {
    e.preventDefault();

    this.isDropped = true;
    this.handleDragEnd(e);
  }

  private handleDragEnd = (e: DragEvent) => {
    const target = e.currentTarget as HTMLElement;    
    this.clearDragOverClasses(); // 드래그 오버 상태를 초기화
  };

    // clear dragover attribute to all tabs
    private clearDragOverClasses() {
      this.tabs.forEach((tab: HTMLElement) => {
        tab.removeAttribute('dragover');
      });
    }

  private reorderTabs(draggedIndex: number, droppedIndex: number) {
    if (draggedIndex === droppedIndex) return;

    // 현재 탭들의 배열을 복사
    const tabsArray = Array.from(this.tabs);
    const draggedTab = tabsArray[draggedIndex] as any;
    
    // 탭 배열에서 드래그된 탭을 제거하고 새 위치에 삽입
    tabsArray.splice(draggedIndex, 1);
    tabsArray.splice(droppedIndex, 0, draggedTab);

    // 탭의 인덱스를 순서대로 업데이트
    tabsArray.forEach((tab: any, index: number) => {
      tab.index = index;
      if(tab.tabkey === this.draggedItem.tabkey) {
        this.draggedIndex = index;
      }
    });

    // DOM에서 탭들을 재배치
    const parentElement = draggedTab.parentElement;
    tabsArray.forEach((tab: any) => {
      parentElement.appendChild(tab);
    });

    // active 탭 업데이트
    if(this.active !== undefined) {
      if (this.active === draggedIndex) {
        this.active = droppedIndex;
      } else if (this.active > draggedIndex && this.active <= droppedIndex) {
        this.active--;
      } else if (this.active < draggedIndex && this.active >= droppedIndex) {
        this.active++;
      }
    }


    this.setTabs();  // 모든 탭의 속성을 업데이트
    this.reorderedEvent(tabsArray);
  }

  private reorderedEvent(tabsArray: any[]) {
    this.dispatchEvent(
      new CustomEvent("ordered", {
        detail: tabsArray,
        bubbles: true,
        composed: true,
      })
    );
  }

  private closeEvent(e: any) {
    this.dispatchEvent(
      new CustomEvent("closed", {
        detail: e.detail,
        bubbles: true,
        composed: true,
      })
    );
  }
}
