import { Component, h, Prop, State, Event, EventEmitter, Watch, Element, Listen } from '@stencil/core';
import { fnAssignPropFromAlias } from '../../utils/utils';

@Component({
  tag: 'sy-pagination',
  styleUrl: 'sy-pagination.scss',
  shadow: false, // Using light DOM
  scoped: true
})
export class SyPagination {
  @Element() host!: HTMLSyPaginationElement;

  @Prop({ attribute: 'activePage', mutable: true }) activePage: number = 1; // active page
  @Prop() disabled = false; // disables
  @Prop({ attribute: 'hideonSingle', mutable: true }) hideonSingle = false;
  @Prop() jumper = false; // visible go to page
  @Prop({ attribute: 'pageSize', mutable: true }) pageSize: number = 10; // how many items in a page
  @Prop({ attribute: 'pageSizeOptions', mutable: true }) pageSizeOptions: string; // 문자열로 받음
  @Prop() total = false; // visible current page / total page count
  @Prop({ attribute: 'totalItems', mutable: true }) totalItems: number = 0; // total number of items

  @State() private fixedPageSize = this.pageSize;
  @State() private activeSidePages = 1; // activePages가 landingPages를 벗어나 launching 될 때, active 주위에 몇개의 page를 노출할지 여부를 결정. landingPages -2보다 크지 않아야 landingPages에서 ...이 출현합니다. page의 전체 길이가 늘리지 않으려면 1로 유지하는게 좋다.
  @State() private landingPages = 5; // ...이 출현할 최초의 page를 정의합니다. landingPage에 도달하면 ...이 발생해야 하므로 activeSidePages가 landingPages -2보다 크면 안됩니다.

  // pageSizeOptionsStr을 배열로 변환하는 computed property
  private get pageSizeOptionList(): number[] {
    if (!this.pageSizeOptions) return [];
    
    const numbers = this.pageSizeOptions.split(',')
      .map(num => num.trim())
      .filter(num => num !== '')
      .map(num => parseInt(num, 10))
      .filter(num => !isNaN(num));
    
    return numbers.length > 0 ? numbers : [];
  }

  @Event() pageChanged!: EventEmitter<number>;
  @Event() pageSizeChanged!: EventEmitter<number>;

  componentWillLoad() {
    // fnAssignPropFromAlias를 사용하여 kebab-case 속성을 가져온 후 적절히 변환
    const activePageValue = fnAssignPropFromAlias(this.host, 'active-page');
    const pageSizeValue = fnAssignPropFromAlias(this.host, 'page-size');
    const totalItemsValue = fnAssignPropFromAlias(this.host, 'total-items');
    
    // 숫자 변환 시 기본값 보장
    if (activePageValue !== null && activePageValue !== undefined) {
      const parsedActivePage = Number(activePageValue);
      this.activePage = !isNaN(parsedActivePage) && parsedActivePage > 0 ? parsedActivePage : 1;
    }
    
    this.hideonSingle = fnAssignPropFromAlias(this.host, 'hideon-single') ?? this.hideonSingle;
    
    if (pageSizeValue !== null && pageSizeValue !== undefined) {
      const parsedPageSize = Number(pageSizeValue);
      this.pageSize = !isNaN(parsedPageSize) && parsedPageSize > 0 ? parsedPageSize : 10;
    }
    
    this.pageSizeOptions = fnAssignPropFromAlias(this.host, 'page-size-options') ?? this.pageSizeOptions;
    
    if (totalItemsValue !== null && totalItemsValue !== undefined) {
      const parsedTotalItems = Number(totalItemsValue);
      this.totalItems = !isNaN(parsedTotalItems) && parsedTotalItems >= 0 ? parsedTotalItems : 0;
    }

    this.defaultFixedPageSize();
  }

  componentDidLoad() {
    if (this.landingPages - 2 < this.activeSidePages) {
      this.activeSidePages = this.landingPages - 2;
    }
  }

  @Watch('pageSizeOptions')
  onPageSizeOptionsChanged() {
    this.defaultFixedPageSize();
  }

  @Watch('pageSize')
  onPageSizeChanged() {
    this.fixedPageSize = this.pageSize;
  }

  @Listen('click', { target: 'document' })
  handleOutsideClick(e: Event) {
    e.preventDefault();
    const selectElement = this.host.querySelector('sy-select');
    if (selectElement) {
      (selectElement as any).isOpen = false;
    }
  }

  private renderPages() {
    const pages = [];

    let start = 2; // 첫 번째 페이지(1)는 별도 렌더링되므로 2부터 시작
    let end = this.totalPages - 1; // 마지막 페이지는 별도 렌더링되므로 -1

    if (this.totalPages <= 2) {
      // 총 페이지가 2 이하면 중간 페이지가 없음
      return pages;
    }

    if (this.activePage < this.landingPages) {
      end = Math.min(this.totalPages - 1, start + this.landingPages - 2);
    } else if (this.activePage + this.landingPages > this.totalPages + 1) {
      start = Math.max(2, this.totalPages - this.landingPages + 1);
    } else {
      start = Math.max(2, this.activePage - this.activeSidePages);
      end = Math.min(this.totalPages - 1, this.activePage + this.activeSidePages);
    }

    if (start > 2) {
      pages.push(
        <li
          class={{
            more: true,
            disabled: this.disabled,
          }}
        >
          <sy-icon size="medium">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path fill="currentColor" d="M544 320C544 346.5 522.5 368 496 368C469.5 368 448 346.5 448 320C448 293.5 469.5 272 496 272C522.5 272 544 293.5 544 320zM368 320C368 346.5 346.5 368 320 368C293.5 368 272 346.5 272 320C272 293.5 293.5 272 320 272C346.5 272 368 293.5 368 320zM144 368C117.5 368 96 346.5 96 320C96 293.5 117.5 272 144 272C170.5 272 192 293.5 192 320C192 346.5 170.5 368 144 368z"/>
            </svg>
          </sy-icon>
        </li>
      );
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <li
          class={{
            active: this.activePage === i,
            disabled: this.disabled,
          }}
          onClick={() => this.handlePageClick(i)}
        >
          {i}
        </li>
      );
    }

    if (end < this.totalPages - 1) {
      pages.push(
        <li
          class={{
            more: true,
            disabled: this.disabled,
          }}
        >
          <sy-icon size="medium">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path fill="currentColor" d="M544 320C544 346.5 522.5 368 496 368C469.5 368 448 346.5 448 320C448 293.5 469.5 272 496 272C522.5 272 544 293.5 544 320zM368 320C368 346.5 346.5 368 320 368C293.5 368 272 346.5 272 320C272 293.5 293.5 272 320 272C346.5 272 368 293.5 368 320zM144 368C117.5 368 96 346.5 96 320C96 293.5 117.5 272 144 272C170.5 272 192 293.5 192 320C192 346.5 170.5 368 144 368z"/>
            </svg>
          </sy-icon>
        </li>
      );
    }

    return pages;
  }

  render() {
    if (this.hideonSingle && this.totalPages <= 1) {
      return null;
    }

    return (
      <div class="pagination-wrapper">
        {this.total && (
          <span class="page-info">Total {this.totalItems} Items</span>
        )}
        <ul class="pagination">
          {/* previous */}
          <li
            class={{
              disabled: this.activePage === 1 || this.disabled,
            }}
            onClick={this.handlePrevClick.bind(this)}
          >
            <sy-icon size="small">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <path fill="currentColor" d="M207.5 303C198.1 312.4 198.1 327.6 207.5 336.9L367.5 496.9C376.9 506.3 392.1 506.3 401.4 496.9C410.7 487.5 410.8 472.3 401.4 463L258.4 320L401.4 177C410.8 167.6 410.8 152.4 401.4 143.1C392 133.8 376.8 133.7 367.5 143.1L207.5 303z"/>
              </svg>
            </sy-icon>
          </li>
          <li
            class={{
              active: this.activePage === 1,
              disabled: this.disabled,
            }}
            onClick={() => this.handlePageClick(1)}
          >
            1
          </li>

          {this.renderPages()}
          
          {this.totalPages > 1 && (
            <li
              class={{
                active: this.activePage === this.totalPages,
                disabled: this.disabled,
              }}
              onClick={() => this.handlePageClick(this.totalPages)}
            >
              {this.totalPages}
            </li>
          )}
          
          {/* next */}
          <li
            class={{
              disabled: this.activePage === this.totalPages || this.disabled,
            }}
            onClick={this.handleNextClick.bind(this)}
          >
            <sy-icon size="small">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <path fill="currentColor" d="M433.5 303C442.9 312.4 442.9 327.6 433.5 336.9L273.5 497C264.1 506.4 248.9 506.4 239.6 497C230.3 487.6 230.2 472.4 239.6 463.1L382.6 320.1L239.6 177.1C230.2 167.7 230.2 152.5 239.6 143.2C249 133.9 264.2 133.8 273.5 143.2L433.5 303.2z"/>
              </svg>
            </sy-icon>
          </li>
        </ul>
        
        {this.pageSizeOptionList?.length > 0 && (
          <div class="page-size-selector">
            <sy-select
              id="page-size"
              class="page-size-select"
              size="small"
              onSelected={this.handlePageSizeChange.bind(this)}
              disabled={this.disabled}
              defaultValue={String(this.fixedPageSize ?? this.pageSizeOptionList[0])}
            >
              {this.pageSizeOptionList.map(size => (
                <sy-option value={String(size)} label={`${size} / page`}></sy-option>
              ))}
            </sy-select>
          </div>
        )}
        
        {this.jumper && (
          <div class="jumper">
            <label htmlFor="jumper" class="jumper-label">Go to</label>
            <sy-input-number
              id="jumper"
              class="jumper-input"
              size="small"
              onChanged={this.handleJumperChange.bind(this)}
              disabled={this.disabled}
            ></sy-input-number>
          </div>
        )}
      </div>
    );
  }

  private defaultFixedPageSize() {
    if (this.pageSizeOptionList?.length > 0) {
      this.fixedPageSize = this.pageSizeOptionList[0];
    } else {
      this.fixedPageSize = this.pageSize;
    }
  }

  private get totalPages(): number {
    return Math.abs(Math.ceil(this.totalItems / this.fixedPageSize));
  }

  private handlePrevClick() {
    if (!this.disabled && this.activePage > 1) {
      this.handlePageClick(this.activePage - 1);
    }
  }

  private handleNextClick() {
    if (!this.disabled && this.activePage < this.totalPages) {
      this.handlePageClick(this.activePage + 1);
    }
  }

  private handlePageClick(page: number) {
    if (!this.disabled) {
      this.activePage = page;
      this.pageChanged.emit(page);
    }
  }

  private handlePageSizeChange(event: any) {
    if (!this.disabled && event?.detail?.selectedOptions?.length > 0) {
      this.fixedPageSize = Number(event.detail.selectedOptions[0].value);
      this.activePage = this.totalPages < this.activePage ? this.totalPages : this.activePage;
      this.pageSizeChanged.emit(this.fixedPageSize);
    }
  }

  private handleJumperChange(event: any) {
    if (!this.disabled) {
      let page = Number(event.detail.value);
      if (isNaN(page) || page < 1) {
        page = 1;
      } else if (page > this.totalPages) {
        page = this.totalPages;
      }

      this.handlePageClick(page);
    }
  }
}
