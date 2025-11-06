import { Component, Prop, State, h, Element, Event, EventEmitter, Method } from '@stencil/core';

@Component({
  tag: 'sy-global-header',
  styleUrl: 'sy-global-header.scss',
  shadow: false
})
export class SyGlobalHeader {
  @Element() hostElement: HTMLElement;

  @Prop() title: string;
  @Prop({ reflect: true }) sticky: boolean = false;
  @Prop() search: boolean = false;
  @Prop() information: boolean = false;
  @Prop() notification: boolean = false;

  @State() overflowTabs: any[] = [];
  @State() theme: 'light' | 'dark' = 'light';
  @State() isCustomLogo: boolean = false;

  @Event() changed: EventEmitter;
  @Event() click: EventEmitter;
  @Event() selected: EventEmitter;

  private _parentTabGroup: any | null = null;
  private updateInProgress: boolean = false;
  private resizeObserver: ResizeObserver | null = null;

  componentWillLoad() {
    this._parentTabGroup = this.hostElement.closest('sy-tab-group');
  }

  componentDidLoad() {
    this.isCustomLogo = this.hasSlotLogoContents();

    // ResizeObserver로 컨테이너 크기 변화 감지
    const tabsContainer = this.hostElement.querySelector('.header-tabs');
    if (tabsContainer) {
      this.resizeObserver = new ResizeObserver(() => {
        this.updateOverflowTabs();
      });
      this.resizeObserver.observe(tabsContainer);
    }

    // 초기 업데이트
    setTimeout(() => {
      this.updateOverflowTabs();

      // sy-tab-group에 알림
      if (this._parentTabGroup && this._parentTabGroup.updateOverflowTabs) {
        this._parentTabGroup.updateOverflowTabs();
      }
    }, 100);
  }

  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private get tabs() {
    // slot="tabs" 내의 sy-tab 요소들 찾기
    const tabsSlot = this.hostElement.querySelector('[slot="tabs"]');
    if (tabsSlot) {
      const tabElements = Array.from(tabsSlot.querySelectorAll('sy-tab')) as any[];
      // 각 탭에 인덱스와 속성 설정
      tabElements.forEach((tab, index) => {
        tab.inHeader = true;
        tab.index = index;
      });
      return tabElements;
    }
    return [];
  }

  private hasNamedSlot(name: string): boolean {
    return this.hostElement.querySelector(`[slot="${name}"]`) !== null;
  }

  private hasSlotLogoContents(): boolean {
    const logoSlot = this.hostElement.querySelector('[slot="logo"]');
    return logoSlot !== null && logoSlot.textContent?.trim() !== '';
  }

  private handleOverflowMenuButtonClick = (e: Event) => {
    e.stopPropagation();
    setTimeout(() => {
      const menu = this.hostElement.querySelector("sy-menu#header-tab-overflow-menu") as any;
      menu?.setSelectableAllItems();
    }, 1);
  }

  private handleSearch = (e: CustomEvent) => {
    e.stopPropagation();
    this.changed.emit({ value: e.detail.value });
  }

  private handleClickInformation = (e: Event) => {
    e.stopPropagation();
    this.click.emit({ type: "information" });
  }

  private handleClickNotification = (e: Event) => {
    e.stopPropagation();
    this.click.emit({ type: "notification" });
  }

  private handleMenuItemSelect = (e: CustomEvent) => {
    e.stopPropagation();

    const tabs = this.tabs;
    const selectedTab = tabs.find((t: any) => t.tabkey === e.detail.value);

    if (selectedTab && this._parentTabGroup) {
      // sy-tab-group의 setActive 호출
      this._parentTabGroup.setActive(selectedTab.index);

      setTimeout(() => {
        const menu = this.hostElement.querySelector("sy-menu#header-tab-overflow-menu") as any;
        menu?.clearSelectedItem();

        const selectedMenuItem = e.target as any;
        if(selectedMenuItem) {
          selectedMenuItem.setAttribute('selected', '');
          selectedMenuItem.select = true;
          this.updateOverflowTabs();
        }
      }, 1);

      this.selected.emit({
        tabkey: selectedTab.tabkey,
        index: selectedTab.index
      });
    }
  }

  @Method()
  async updateOverflowTabs() {
    if (this.updateInProgress) return;
    this.updateInProgress = true;

    const tabs = this.tabs;
    if (!tabs.length) {
      this.updateInProgress = false;
      return;
    }

    // 모든 탭 초기 표시
    tabs.forEach(tab => {
      tab.style.display = '';
      tab.style.visibility = 'visible';
    });

    requestAnimationFrame(() => {
      try {
        // header-tabs 컨테이너 찾기
        const tabContainer = this.hostElement.querySelector('.header-tabs');
        if (!tabContainer) {
          this.updateInProgress = false;
          return;
        }

        const containerRect = tabContainer.getBoundingClientRect();
        const ellipsisButton = this.hostElement.querySelector('.header-tab-more');
        const ellipsisWidth = ellipsisButton ? 48 : 0;
        const buffer = 16; // 여유 공간

        const availableSpace = containerRect.width - ellipsisWidth - buffer;

        let accumulatedWidth = 0;
        let overflowIndex = -1;

        // 각 탭의 너비 계산
        for (let i = 0; i < tabs.length; i++) {
          const tab = tabs[i];
          const tabRect = tab.getBoundingClientRect();

          if (tabRect.width === 0) {
            // 탭이 아직 렌더링되지 않은 경우
            continue;
          }

          const styles = window.getComputedStyle(tab);
          const marginLeft = parseFloat(styles.marginLeft) || 0;
          const marginRight = parseFloat(styles.marginRight) || 0;
          const tabWidth = tabRect.width + marginLeft + marginRight;

          if (accumulatedWidth + tabWidth > availableSpace) {
            overflowIndex = i;
            break;
          }
          accumulatedWidth += tabWidth;
        }

        // Overflow 처리
        if (overflowIndex > -1 && overflowIndex > 0) {
          const visibleTabCount = overflowIndex;
          const newOverflowTabs = [];

          // active 탭 인덱스
          const activeIndex = this._parentTabGroup?.active || 0;
          let startIndex = 0;

          // active 탭이 보이도록 시작 인덱스 계산
          if (activeIndex < visibleTabCount) {
            startIndex = 0;
          } else if (activeIndex >= tabs.length - Math.ceil(visibleTabCount / 2)) {
            startIndex = Math.max(0, tabs.length - visibleTabCount);
          } else {
            startIndex = Math.max(0, activeIndex - Math.floor(visibleTabCount / 2));
          }

          // 탭 표시/숨김 처리
          tabs.forEach((tab: any, index: number) => {
            if (index >= startIndex && index < startIndex + visibleTabCount) {
              tab.style.display = '';
              tab.style.visibility = 'visible';
            } else {
              tab.style.display = 'none';
              tab.style.visibility = 'hidden';
              newOverflowTabs.push(tab);
            }
          });

          this.overflowTabs = newOverflowTabs;
        } else {
          // Overflow 없음 - 모든 탭 표시
          this.overflowTabs = [];
          tabs.forEach(tab => {
            tab.style.display = '';
            tab.style.visibility = 'visible';
          });
        }
      } catch (error) {
        console.error('Error in updateOverflowTabs:', error);
      } finally {
        this.updateInProgress = false;
      }
    });
  }

render() {
  const synopsysLogo = '../../assets/style/images/test.png';
  const hasOverflowTabs = this.overflowTabs.length > 0;
  const hasTabsSlot = this.hasNamedSlot('tabs');
  const hasActionsSlot = this.hasNamedSlot('actions');
  const hasLogoSlot = this.hasNamedSlot('logo');

  // 하나의 wrapper div로 감싸서 flex 적용
  return (
    <div class="header-wrapper">
      <div class="header-title">
        <span
          class="logo"
          style={{ display: this.isCustomLogo ? 'none' : 'block' }}
        >
          <img src={synopsysLogo} width="100%" height="100%" />
        </span>
        {hasLogoSlot && <slot name="logo" />}
        {this.title && <span class="appname">{this.title}</span>}
      </div>

      {hasTabsSlot && (
        <div class="header-tab">
          <slot name="tabs" />
          {hasOverflowTabs && (
            <div
              class="header-tab-more"
              onMouseEnter={this.handleOverflowMenuButtonClick}
            >
              <sy-icon size="medium">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                  <path fill="currentColor" d="M544 320C544 346.5 522.5 368 496 368C469.5 368 448 346.5 448 320C448 293.5 469.5 272 496 272C522.5 272 544 293.5 544 320zM368 320C368 346.5 346.5 368 320 368C293.5 368 272 346.5 272 320C272 293.5 293.5 272 320 272C346.5 272 368 293.5 368 320zM144 368C117.5 368 96 346.5 96 320C96 293.5 117.5 272 144 272C170.5 272 192 293.5 192 320C192 346.5 170.5 368 144 368z"/>
                </svg>
              </sy-icon>
              <sy-menu
                position="bottomRight"
                id="header-tab-overflow-menu"
                onItemSelected={this.handleMenuItemSelect}
              >
                {this.overflowTabs.map(tab => (
                  <sy-menu-item value={tab.tabkey}>
                    {tab.textContent}
                  </sy-menu-item>
                ))}
              </sy-menu>
            </div>
          )}
        </div>
      )}

      <div class="header-end">
        {this.search && (
          <sy-input
            placeholder="Help Search"
            size="medium"
            onChanged={this.handleSearch}
          />
        )}

        {this.information && (
          <sy-button
            size="medium"
            variant="borderless"
            onClick={this.handleClickInformation}
          >
            <sy-icon size="large" selectable>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <path fill="currentColor" d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM288 224C288 206.3 302.3 192 320 192C337.7 192 352 206.3 352 224C352 241.7 337.7 256 320 256C302.3 256 288 241.7 288 224zM280 288L328 288C341.3 288 352 298.7 352 312L352 400L360 400C373.3 400 384 410.7 384 424C384 437.3 373.3 448 360 448L280 448C266.7 448 256 437.3 256 424C256 410.7 266.7 400 280 400L304 400L304 336L280 336C266.7 336 256 325.3 256 312C256 298.7 266.7 288 280 288z"/>
              </svg>
            </sy-icon>
          </sy-button>
        )}

        {this.notification && (
          <sy-button
            size="medium"
            variant="borderless"
            onClick={this.handleClickNotification}
          >
            <sy-icon size="large" selectable>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <path fill="currentColor" d="M320 64C302.3 64 288 78.3 288 96L288 99.2C215 114 160 178.6 160 256L160 277.7C160 325.8 143.6 372.5 113.6 410.1L103.8 422.3C98.7 428.6 96 436.4 96 444.5C96 464.1 111.9 480 131.5 480L508.4 480C528 480 543.9 464.1 543.9 444.5C543.9 436.4 541.2 428.6 536.1 422.3L526.3 410.1C496.4 372.5 480 325.8 480 277.7L480 256C480 178.6 425 114 352 99.2L352 96C352 78.3 337.7 64 320 64zM258 528C265.1 555.6 290.2 576 320 576C349.8 576 374.9 555.6 382 528L258 528z"/>
              </svg>
            </sy-icon>
          </sy-button>
        )}

        {hasActionsSlot && <slot name="actions" />}
      </div>
    </div>
  );
}
}
