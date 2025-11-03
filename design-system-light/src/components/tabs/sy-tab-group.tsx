import { Component, Prop, State, h, Element, Event, EventEmitter, Watch, Method, Listen } from '@stencil/core';

@Component({
  tag: 'sy-tab-group',
  styleUrl: 'sy-tab-group.scss',
  shadow: false,
  scoped: true
})
export class SyTabGroup {
  @Element() host!: HTMLSyTabGroupElement;

  @Prop({ mutable: true }) active?: number;
  @Prop({ reflect: true }) align: 'center' | 'left' = 'left';
  @Prop() disabled = false;
  @Prop({ attribute: 'draggable' }) isdraggable = false;
  @Prop({ reflect: true }) position: "top" | "bottom" | "left" | "right" = "top";
  @Prop({ reflect: true }) type: "card" | "line" = "line";
  @Prop({ reflect: true }) size: "small" | "medium" | "large" = "medium";
  @Prop() padding: "small" | "medium" | "large" | 'none' = "none";

  @State() dragover: boolean = false;
  @State() private tabMoreAreaSize: number = 48;
  @State() private tabExtraAreaSize: number = 0;
  @State() private overflowTabs: HTMLSyTabElement[] = [];

  private latestActiveIndex: number | undefined;
  private resizeObserver?: ResizeObserver;

  @Event() selected!: EventEmitter<any>;
  @Event() closed!: EventEmitter<any>;
  @Event() ordered!: EventEmitter<HTMLSyTabElement[]>;

  // private tabMoreArea!: HTMLDivElement;
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

  @Listen('selected')
  handleTabSelected(e: CustomEvent) {
    if (e.target && (e.target as HTMLElement).tagName === 'SY-TAB') {
      this.handleTabSelect(e);
    }
  }

  @Listen('closed')
  handleTabClosed(e: CustomEvent) {
    if (e.target && (e.target as HTMLElement).tagName === 'SY-TAB') {
      this.handleTabClose(e);
    }
  }

  connectedCallback() {
    this.updateParentRect();
  }

  componentDidLoad() {
    this.isUpdateComplete = true;

    if (this.isdraggable && !this.disabled) {
      this.enableDragAndDrop();
    }

    this.setTabs();
    this.setActive(this.active);
    
    // Add resize observer to handle parent size changes
    requestAnimationFrame(() => {
      this.updateParentRect();
      this.updateOverflowTabs();
    });

    // Observe parent element resize
    if (this.host.parentElement) {
      this.resizeObserver = new ResizeObserver(() => {
        this.updateParentRect();
        this.updateOverflowTabs();
      });
      this.resizeObserver.observe(this.host.parentElement);
    }
  }

  disconnectedCallback() {
    // Cleanup resize observer
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  @Watch('disabled')
  @Watch('active')
  watchDisabledOrActive() {
    if (this.isUpdateComplete) {
      this.setActive(this.active);

      const menu = document.querySelector("sy-menu#tab-overflow-menu") as HTMLSyMenuElement;
      if(menu) {
        menu.disabled = this.disabled;
      }
    }
  }

  @Watch('type')
  @Watch('size')
  watchTypeOrSize() {
    if (this.isUpdateComplete) {
      this.updateTabs();
    }
  }

  @Watch('isdraggable')
  watchDraggable() {
    if (this.isUpdateComplete) {
      if (this.isdraggable && !this.disabled) {
        this.enableDragAndDrop();
      } else {
        this.disableDragAndDrop();
      }
    }
  }

  @Watch('position')
  watchPosition() {
    if (this.isUpdateComplete) {
      this.updateOverflowTabs();
      for(let tab of this.tabs) {
        tab.position = this.position;
      }
    }
  }

  @Method()
  async closeTab(name: string) {
    const tab = this.tabs.find((tab: HTMLSyTabElement) => tab.tabkey === name);
    if (tab) {
      await tab.setClose();
      this.removeTab(tab.tabkey);
    }
  }

  private renderHeader() {
    const tabClasses = {
      tabs: true,
      [this.position]: true
    };

    const menuClasses = {
      'tab-more': true,
      'overflow-menu-button': true,
      disabled: this.disabled
    };

    return [
      <div class={tabClasses}>
        <slot name="tabs" />
      </div>,
      <div class="extra-area">
        <slot name="extra" />
      </div>,
      this.overflowTabs.length ? (
        <div
          class={menuClasses}
          onMouseEnter={this.handleOverflowMenuButtonClick.bind(this)}
        >
          <sy-icon size="medium">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path fill="currentColor" d="M544 320C544 346.5 522.5 368 496 368C469.5 368 448 346.5 448 320C448 293.5 469.5 272 496 272C522.5 272 544 293.5 544 320zM368 320C368 346.5 346.5 368 320 368C293.5 368 272 346.5 272 320C272 293.5 293.5 272 320 272C346.5 272 368 293.5 368 320zM144 368C117.5 368 96 346.5 96 320C96 293.5 117.5 272 144 272C170.5 272 192 293.5 192 320C192 346.5 170.5 368 144 368z"/>
            </svg>
          </sy-icon>
          <sy-menu
            disabled={this.disabled}
            position="bottomRight"
            id="tab-overflow-menu"
            onItemSelected={this.handleMenuSelect.bind(this)}
          >
            {this.overflowTabs.map(tab => {
              const slotContent = this.getTabSlotContent(tab);
              return (
                <sy-menu-item value={tab.tabkey}>
                  {slotContent.map(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                      // Element 노드는 outerHTML 사용
                      return <span innerHTML={(node as Element).outerHTML}></span>;
                    } else if (node.nodeType === Node.TEXT_NODE) {
                      // 텍스트 노드는 textContent 사용
                      return node.textContent;
                    }
                    return null;
                  })}
                </sy-menu-item>
              );
            })}
          </sy-menu>
        </div>
      ) : null
    ];
  }

  render() {
    const isInsideGlobalHeader = this.host.querySelector('sy-global-header [slot="tabs"]') !== null;

    const layoutClasses = {
      "top-layout": this.position === "top",
      "bottom-layout": this.position === "bottom",
      "left-layout": this.position === "left",
      "right-layout": this.position === "right"
    };

    const containerClasses = {
      "tab-group-container": true,
      "align-center": this.align === "center",
      "align-left": this.align === "left",
      "tab-padding-small": this.padding === "small",
      "tab-padding-medium": this.padding === "medium",
      "tab-padding-large": this.padding === "large",
      "tab-padding-none": this.padding === "none"
    };

    return (
      <div class={layoutClasses}>
        <slot />
        {isInsideGlobalHeader ? this.renderHeader() : (
          <div class={containerClasses}>
            {this.renderHeader()}
          </div>
        )}

        <div class="contents">
          <slot name="contents" />
        </div>
      </div>
    );
  }

  private get tabs(): HTMLSyTabElement[] {
    const tabContainer = this.host.querySelector('[slot="tabs"]') as HTMLElement;

    if (tabContainer) {
      return Array.from(tabContainer.querySelectorAll('sy-tab'))
        .filter((tab) => tab.getAttribute('slot') !== 'extra') as HTMLSyTabElement[];
    } else return [];
  }

  private getTabContents(): HTMLSyTabContentElement[] {
    const contentContainer = this.host.querySelector('[slot="contents"]') as HTMLElement;
    if(contentContainer) {
      return Array.from(contentContainer.querySelectorAll('sy-tab-content')) as HTMLSyTabContentElement[];
    } else return [];
  }

  /**
   * sy-tab의 실제 표시 컨텐츠(slot 내용)만 추출
   */
  private getTabSlotContent(tab: HTMLSyTabElement): Node[] {
    // sy-tab의 직접 자식 노드들을 가져옴 (이것이 slot에 들어가는 내용)
    const slotContent: Node[] = [];
    for (let i = 0; i < tab.childNodes.length; i++) {
      const node = tab.childNodes[i];
      // 텍스트 노드이거나 Element 노드인 경우만 추가
      if (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ELEMENT_NODE) {
        slotContent.push(node.cloneNode(true));
      }
    }
    return slotContent;
  }

  private updateParentRect() {
    if (this.host.parentElement) {
      this.parentRect = this.host.parentElement.getBoundingClientRect();
    }
  }

  private handleOverflowMenuButtonClick(e: Event) {
    e.stopPropagation();
    setTimeout(() => {
      const menu = document.querySelector("sy-menu#tab-overflow-menu") as HTMLSyMenuElement;
      menu?.setSelectableAllItems();
    }, 1);
  }

  private setTabs() {
    const tabContents = this.getTabContents();

    this.tabs.forEach((tab: HTMLSyTabElement, index: number) => {
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

    tabContents.forEach((content: HTMLSyTabContentElement) => {
      const contentName = content.getAttribute("name");
      const activatedTab = this.tabs.find((t: HTMLSyTabElement) => t.index === this.active);
      content.active = contentName === activatedTab?.getAttribute("tabkey");
      content.disabled = this.disabled;
    });
  }

  private setActive(activeIndex?: number) {
    if (this.disabled) {
      if (this.active !== undefined) {
        this.latestActiveIndex = this.active;
      }
      this.active = undefined;
    } else {
      if (activeIndex !== undefined && !this.tabs[activeIndex]?.currentDisabledStatus) {
        this.active = activeIndex;
      } else if (this.latestActiveIndex !== undefined && !this.tabs[this.latestActiveIndex]?.currentDisabledStatus) {
        this.active = this.latestActiveIndex;
      } else {
        this.active = this.findNextEnabledTab(0);
      }
    }
    this.setTabs();
  }

  private updateTabs() {
    const tabContents = this.getTabContents();

    if (this.tabs && tabContents) {
      this.tabs.forEach((tab: HTMLSyTabElement, _index: number) => {
        tab.parentDisabled = this.disabled;
        tab.type = this.type;
        tab.size = this.size;
        tab.position = this.position;
      });
    }
  }

private updateOverflowTabs() {
  const isInsideGlobalHeader = this.host.querySelector('sy-global-header [slot="tabs"]') !== null;

  if (isInsideGlobalHeader) {
    // const headerElement = this.host.querySelector('sy-global-header') as HTMLSyGlobalHeaderElement;
    const headerElement = this.host.querySelector('sy-global-header') as any;
    if (headerElement) {
      headerElement.updateOverflowTabs();
    }
    return;
  }

  if (this._updateInProgress) return;
  this._updateInProgress = true;

  if (!this.tabs.length || !this.parentRect) {
    this._updateInProgress = false;
    return;
  }

  // 모든 탭을 보이도록 초기화
  this.tabs.forEach((tab: HTMLSyTabElement) => {
    tab.style.display = 'flex';
  });

  // tab-more 크기를 48px로 하드코딩
  this.tabMoreAreaSize = 48;

  requestAnimationFrame(() => {
    try {
      // light DOM에서 extra-area 찾기
      const tabExtraArea = this.host.querySelector(".extra-area") as HTMLElement;
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

        this.tabs.forEach((tab: HTMLSyTabElement, index: number) => {
          if (index >= startIndex && index < startIndex + visibleTabCount) {
            tab.style.display = 'flex';
          } else {
            tab.style.display = 'none';
            this.overflowTabs = [...this.overflowTabs, tab];
          }
        });
      } else {
        // 오버플로우가 없는 경우 - 모든 탭 표시
        this.overflowTabs = [];
        this.tabs.forEach(tab => {
          tab.style.display = 'flex';
        });
      }

      const menu = document.querySelector("sy-menu#tab-overflow-menu") as HTMLSyMenuElement;
      menu?.clearSelectedItem();
    } finally {
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
    this.selected.emit(e.detail);
  }

  private handleTabClose(e: any) {
    e.stopPropagation();
    if (!e.detail.isManualClose) {
      const closedTab = this.tabs.find((t: HTMLSyTabElement) => t.index === e.detail.index);
      this.removeTab(e.detail.tabkey);

      if (closedTab && this.active === closedTab.index) {
        const nextActiveIndex = this.findNextEnabledTab(closedTab.index);
        const prevActiveIndex = this.findPreviousEnabledTab(closedTab.index - 1);

        if(nextActiveIndex !== undefined) {
          this.setActive(closedTab.index);
        } else if(nextActiveIndex === undefined && prevActiveIndex !== undefined) {
          this.setActive(prevActiveIndex);
        } else {
          this.setActive();
        }
      }
    }
    this.closeEvent(e);
  }

  private handleMenuSelect(e: CustomEvent) {
    e.stopPropagation();
    if (!this.disabled) {
      const activeTab = this.tabs.find((t: HTMLSyTabElement) => t.tabkey === e.detail.value);
      if(activeTab) {
        this.setActive(activeTab.index);
        setTimeout(() => {
          const menu = document.querySelector("sy-menu#tab-overflow-menu") as HTMLSyMenuElement;
          menu?.clearSelectedItem();
          const selectedMenuItem = e.target as HTMLSyMenuItemElement;
          if(selectedMenuItem) {
            selectedMenuItem.select = true;
            this.updateOverflowTabs();
          }
        }, 1);
        this.selected.emit({ tabkey: activeTab.tabkey, index: activeTab.index });
      }
    }
  }

  private removeTab(key: string) {
    const tabContents = this.getTabContents();
    const tabIndex = this.tabs.findIndex((t: HTMLSyTabElement) => t.tabkey === key);

    if (tabIndex >= 0) {
      this.tabs[tabIndex]?.remove();
      const contentToRemove = tabContents.find(content => content.getAttribute("name") === key);
      contentToRemove?.remove();

      this.tabs.splice(tabIndex, 1);
      this.setTabs();

      if (this.active === tabIndex) {
        this.setActive(this.findNextEnabledTab(tabIndex));
      } else if ((this.active as number) > tabIndex) {
        (this.active as number)--;
        this.setTabs();
      }

      setTimeout(() => {
        this.updateOverflowTabs();
      }, 0);
    }
  }

  private enableDragAndDrop() {
    this.tabs.forEach((tab: HTMLSyTabElement) => {
      tab.draggable = true;
      tab.addEventListener("dragstart", this.handleDragStart.bind(this));
      tab.addEventListener("dragover", this.handleDragOver.bind(this));
      tab.addEventListener("drop", this.handleDrop.bind(this));
      tab.addEventListener("dragend", this.handleDragEnd.bind(this));
    });
    this.updateOverflowTabs();
  }

  private disableDragAndDrop() {
    this.tabs.forEach((tab: HTMLSyTabElement) => {
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
    const target = e.currentTarget as HTMLSyTabElement;
    this.dragoverkey = target.tabkey;

    if(this.dragoverkey === this.prevDragOverkey) {
      return;
    } else {
      this.prevDragOverkey = this.dragoverkey;

      if (this.dragoverkey === this.draggedItem.tabkey) {
        return;
      }
    }

    this.clearDragOverClasses();
    target.setAttribute('dragover', 'true');
    this.dragoverIndex = target.index;

    if (this.dragoverIndex !== undefined && this.draggedIndex !== undefined) {
        this.reorderTabs(this.draggedIndex, this.dragoverIndex);
    }
  };

  private handleDrop(e: DragEvent) {
    e.preventDefault();
    this.isDropped = true;
    this.handleDragEnd(e);
  }

  private handleDragEnd = (_e: DragEvent) => {
    this.clearDragOverClasses();
  };

  private clearDragOverClasses() {
    this.tabs.forEach((tab: HTMLSyTabElement) => {
      tab.removeAttribute('dragover');
    });
  }

  private reorderTabs(draggedIndex: number, droppedIndex: number) {
    if (draggedIndex === droppedIndex) return;

    const tabsArray = Array.from(this.tabs);
    const draggedTab = tabsArray[draggedIndex] as HTMLSyTabElement;

    tabsArray.splice(draggedIndex, 1);
    tabsArray.splice(droppedIndex, 0, draggedTab);

    tabsArray.forEach((tab: HTMLSyTabElement, index: number) => {
      tab.index = index;
      if(tab.tabkey === this.draggedItem.tabkey) {
        this.draggedIndex = index;
      }
    });

    const parentElement = draggedTab.parentElement;
    tabsArray.forEach((tab: HTMLSyTabElement) => {
      parentElement!.appendChild(tab);
    });

    if(this.active !== undefined) {
      if (this.active === draggedIndex) {
        this.active = droppedIndex;
      } else if (this.active > draggedIndex && this.active <= droppedIndex) {
        this.active--;
      } else if (this.active < draggedIndex && this.active >= droppedIndex) {
        this.active++;
      }
    }

    this.setTabs();
    this.reorderedEvent(tabsArray);
  }

  private reorderedEvent(tabsArray: HTMLSyTabElement[]) {
    this.ordered.emit(tabsArray);
  }

  private closeEvent(e: any) {
    this.closed.emit(e.detail);
  }
}
