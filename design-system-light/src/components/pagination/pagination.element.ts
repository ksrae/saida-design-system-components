import { LitElement, html, css, CSSResultGroup, unsafeCSS, nothing } from "lit";
import { property, customElement, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import globalCSS from "./styles/pagination.scss?inline";
import "../icon/icon.element";
import "../select/select.element";
import "../select/select-option.element";
import "../input-number/input-number.element";
import { SelectElement } from "../select/select.element";

@customElement("sy-pagination")
export class PaginationElement extends LitElement {
  static styles: CSSResultGroup = css`
    ${unsafeCSS(globalCSS)};
  `;
  @property({ type: Number }) activePage = 1; // active page
  @property({ type: Boolean }) disabled = false; // disables
  @property({ type: Boolean }) hideonSingle = false;
  @property({ type: Boolean }) jumper = false; // visible go to page
  @property({ type: Number }) pageSize = 10; // how many items in a page
  @property({ 
    type: String,
    converter: {
      fromAttribute: (value: string) => {
        if (!value) return []; // 빈 값이면 기본값 반환
        
        const numbers = value.split(',')
          .map(num => num.trim())
          .filter(num => num !== '')
          .map(num => parseInt(num, 10))
          .filter(num => !isNaN(num));
        
        // 변환된 배열이 비어있다면 기본값 반환
        return numbers.length > 0 ? numbers : [];
      },
      toAttribute: (value: number[]) => {
        // 값이 없거나 빈 배열이면 기본값으로 변환
        if (!value || value.length === 0) {
          return '10';
        }
        return value.join(', ');
      }
    }
  }) pageSizeOptions: number[] = [];
  @property({ type: Boolean }) total = false; // visible current page / total page count
  @property({ type: Number }) totalItems = 0; // total number of items  

  @state() private fixedPageSize = this.pageSize;
  @state() private activeSidePages = 1; // activePages가 landingPages를 벗어나 launching 될 때, active 주위에 몇개의 page를 노출할지 여부를 결정. landingPages -2보다 크지 않아야 landingPages에서 ...이 출현합니다. page의 전체 길이가 늘리지 않으려면 1로 유지하는게 좋다.
  @state() private landingPages = 5; // ...이 출현할 최초의 page를 정의합니다. landingPage에 도달하면 ...이 발생해야 하므로 activeSidePages가 landingPages -2보다 크면 안됩니다.

  constructor() {
    super();
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  // attributeChangedCallback(name: string, oldVal: string | null, newVal: string | null) {
  //   super.attributeChangedCallback(name, oldVal, newVal);
  //   console.log({name}, {oldVal}, {newVal})
  //   if (name === "jumper") {
  //     if(oldVal === null && newVal == '') {
        
  //       // setTimeout(() => {
  //       //   const inputNumber = this.shadowRoot?.querySelector("#jumper") as InputNumberElement;
  //       //   console.log({inputNumber});
  //       //   inputNumber?.setClear();
  //       // }, 0);
  //     }
  //   } 
  // }
  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("click", this.handleOutsideClick, true);

    this.defaultFixedPageSize();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this.handleOutsideClick, true);
  }

  async firstUpdated() {
    await this.updateComplete;

    if (this.landingPages - 2 < this.activeSidePages) {
      this.activeSidePages = this.landingPages - 2;
    }
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has("pageSizeOptions")) {
      this.defaultFixedPageSize();
    } 
    if (changedProperties.has("pageSize")) {
      this.fixedPageSize = this.pageSize;
    }
  }

  private handleOutsideClick(e: any) {
    e.preventDefault();
    const selectElement: SelectElement | null | undefined = this.shadowRoot?.querySelector("sy-select");
    if(selectElement) {
      selectElement.isOpen = false;
    }
  }

  private renderPages() {
    const pages = [];

    let start = 1;
    let end = this.totalPages;

    if (this.activePage < this.landingPages) {
      end = Math.min(this.totalPages, start + this.landingPages - 1);
    } else if (this.activePage + this.landingPages > this.totalPages + 1) {
      start = this.totalPages - this.landingPages + 1;
    } else {
      start = Math.max(1, this.activePage - this.activeSidePages);
      end = Math.min(this.totalPages, this.activePage + this.activeSidePages);
    }

    if (start > 1) {
      // @click=${() => this.handleEllipsisClick('prev')}
      pages.push(html`
        <li
          class=${classMap({
            more: true,
            disabled: this.disabled,
          })}
        >
          <sy-icon size="medium"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M544 320C544 346.5 522.5 368 496 368C469.5 368 448 346.5 448 320C448 293.5 469.5 272 496 272C522.5 272 544 293.5 544 320zM368 320C368 346.5 346.5 368 320 368C293.5 368 272 346.5 272 320C272 293.5 293.5 272 320 272C346.5 272 368 293.5 368 320zM144 368C117.5 368 96 346.5 96 320C96 293.5 117.5 272 144 272C170.5 272 192 293.5 192 320C192 346.5 170.5 368 144 368z"/></svg></sy-icon>
        </li>
      `);
    }

    for (let i = start; i <= end; i++) {
      if (i < 2 || i > this.totalPages - 1) {
        continue;
      }

      pages.push(html`
        <li
          class=${classMap({
            active: this.activePage === i,
            disabled: this.disabled,
          })}
          @click=${() => this.handlePageClick(i)}
        >
          ${i}
        </li>
      `);
    }

    if (end < this.totalPages - 1) {
      // @click=${() => this.handleEllipsisClick('next')}
      pages.push(html`
        <li
          class=${classMap({
            more: true,
            disabled: this.disabled,
          })}
        >
          <sy-icon size="medium"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M544 320C544 346.5 522.5 368 496 368C469.5 368 448 346.5 448 320C448 293.5 469.5 272 496 272C522.5 272 544 293.5 544 320zM368 320C368 346.5 346.5 368 320 368C293.5 368 272 346.5 272 320C272 293.5 293.5 272 320 272C346.5 272 368 293.5 368 320zM144 368C117.5 368 96 346.5 96 320C96 293.5 117.5 272 144 272C170.5 272 192 293.5 192 320C192 346.5 170.5 368 144 368z"/></svg></sy-icon>
        </li>
      `);
    }

    return pages;
  }

  render() {
    return html`
      ${this.hideonSingle && this.totalPages <= 1
        ? nothing
        : html`
        <div class="pagination-wrapper">
          ${this.total
            ? html`<span class="page-info">Total ${this.totalItems} Items</span>` : ""
          }
          <ul class="pagination">
            <!-- previous -->
            <li
              class="${classMap({
                disabled: this.activePage === 1 || this.disabled,
              })}"
              @click=${this.handlePrevClick}
            >
              <sy-icon size="small"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M207.5 303C198.1 312.4 198.1 327.6 207.5 336.9L367.5 496.9C376.9 506.3 392.1 506.3 401.4 496.9C410.7 487.5 410.8 472.3 401.4 463L258.4 320L401.4 177C410.8 167.6 410.8 152.4 401.4 143.1C392 133.8 376.8 133.7 367.5 143.1L207.5 303z"/></svg></sy-icon>
            </li>
            <li
              class=${classMap({
                active: this.activePage === 1,
                disabled: this.disabled,
              })}
              @click=${() => this.handlePageClick(1)}
            >
              1
            </li>

                ${this.renderPages()}
                ${this.totalPages > 1
                  ? html`
                      <li
                        class=${classMap({
                          active: this.activePage === this.totalPages,
                          disabled: this.disabled,
                        })}
                        @click=${() => this.handlePageClick(this.totalPages)}
                      >
                        ${this.totalPages}
                      </li>
                    `
                  : nothing}
                <!-- next -->
                <li
                  class="${classMap({
                    disabled:
                      this.activePage === this.totalPages || this.disabled,
                  })}"
                  @click=${this.handleNextClick}
                >
                  <sy-icon size="small"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M433.5 303C442.9 312.4 442.9 327.6 433.5 336.9L273.5 497C264.1 506.4 248.9 506.4 239.6 497C230.3 487.6 230.2 472.4 239.6 463.1L382.6 320.1L239.6 177.1C230.2 167.7 230.2 152.5 239.6 143.2C249 133.9 264.2 133.8 273.5 143.2L433.5 303.2z"/></svg></sy-icon>
                </li>
              </ul>
              ${this.pageSizeOptions?.length > 0
                ? html`
                    <div class="page-size-selector">
                      <sy-select
                        id="page-size"
                        class="page-size-select"
                        size="small"
                        @selected=${this.handlePageSizeChange}
                        ?disabled=${this.disabled}
                        defaultValue=${this.fixedPageSize ?? this.pageSizeOptions[0]}
                      >
                        ${this.pageSizeOptions.map(
                          (size) =>
                            html`<sy-option
                              value=${size}
                              label="${size} / page"
                            >
                            </sy-option>`
                        )}
                      </sy-select>
                    </div>
                  `
                : ""}
              ${this.jumper
                ? html`
                    <div class="jumper">
                      <label for="jumper" class="jumper-label">Go to</label>
                      <sy-input-number
                        id="jumper"
                        class="jumper-input"
                        size="small"
                        type="number"
                        @changed=${this.handleJumperChange}
                        ?disabled=${this.disabled}
                      >
                      </sy-input-number>
                    </div>
                  `
                : ""}
            </div>
          `}
    `;
  }

  private defaultFixedPageSize() {
    if (this.pageSizeOptions?.length > 0) {
      this.fixedPageSize = this.pageSizeOptions[0];
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

  // private handleEllipsisClick(direction: 'prev' | 'next') {
  //   if (!this.disabled) {
  //     if (direction === 'prev') {
  //       this.handlePageClick(Math.max(this.activePage - this.itemList, 1));
  //     } else {
  //       this.handlePageClick(Math.min(this.activePage + this.itemList, this.totalPages));
  //     }
  //   }
  // }

  private handlePageClick(page: number) {
    if (!this.disabled) {
      this.activePage = page;
      this.dispatchEvent(
        new CustomEvent("pageChanged", {
          detail: page,
          bubbles: true,
          composed: true,
          cancelable: false,
        })
      );
    }
  }

  private handlePageSizeChange(event: any) {
    if (!this.disabled && event?.detail?.selectedOptions?.length > 0) {
      // const select = event.target as HTMLSelectElement;
      this.fixedPageSize = Number(event.detail.selectedOptions[0].value);

      this.activePage = this.totalPages < this.activePage ? this.totalPages : this.activePage;

      this.dispatchEvent(
        new CustomEvent("pageSizeChanged", {
          detail: this.fixedPageSize,
          bubbles: true,
          composed: true,
          cancelable: false,
        })
      );
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
