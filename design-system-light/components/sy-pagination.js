import { p as proxyCustomElement, H, c as createEvent, h } from './index.js';
import { f as fnAssignPropFromAlias } from './p-Dlcw8XSW.js';
import { d as defineCustomElement$9 } from './p-Dzzv4fG9.js';
import { d as defineCustomElement$8 } from './p-DA_POXvZ.js';
import { d as defineCustomElement$7 } from './p-CDQjLY4A.js';
import { d as defineCustomElement$6 } from './p-Dt2pN6ep.js';
import { d as defineCustomElement$5 } from './p-D9IyzZp_.js';
import { d as defineCustomElement$4 } from './p-Dx2eAEw1.js';
import { d as defineCustomElement$3 } from './p-Bd6oegtc.js';
import { d as defineCustomElement$2 } from './p-C0DM0GPD.js';

const syPaginationCss = ".sc-sy-pagination:root,.sc-sy-pagination-h{display:inline-flex}.sc-sy-pagination:root .pagination-wrapper.sc-sy-pagination,.sc-sy-pagination-h .pagination-wrapper.sc-sy-pagination{display:flex;flex-direction:column;align-items:center;gap:var(--spacing-3xsmall)}.sc-sy-pagination:root .pagination-wrapper.sc-sy-pagination .pagination-row.sc-sy-pagination,.sc-sy-pagination-h .pagination-wrapper.sc-sy-pagination .pagination-row.sc-sy-pagination{display:flex;flex-direction:row;align-items:center;flex-wrap:wrap;justify-content:center;gap:var(--spacing-3xsmall)}.sc-sy-pagination:root .pagination-wrapper.sc-sy-pagination .page-info.sc-sy-pagination,.sc-sy-pagination-h .pagination-wrapper.sc-sy-pagination .page-info.sc-sy-pagination{display:inline-flex;align-items:center;color:var(--pagination-index-inactive-text-enabled)}.sc-sy-pagination:root .pagination-wrapper.sc-sy-pagination .pagination.sc-sy-pagination,.sc-sy-pagination-h .pagination-wrapper.sc-sy-pagination .pagination.sc-sy-pagination{padding:0px;margin:0px;display:inline-flex;list-style-type:none}.sc-sy-pagination:root .pagination-wrapper.sc-sy-pagination .pagination.sc-sy-pagination li.sc-sy-pagination,.sc-sy-pagination-h .pagination-wrapper.sc-sy-pagination .pagination.sc-sy-pagination li.sc-sy-pagination{margin:0 var(--spacing-3xsmall);cursor:pointer;gap:var(--spacing-xsmall);color:var(--pagination-index-inactive-text-enabled);caret-color:transparent;border:var(--border-small) transparent;border-radius:var(--border-radius-small);margin:0px;height:var(--component-small);line-height:50%;display:inline-flex;align-items:center;justify-content:center;padding-right:var(--spacing-4xsmall);padding-left:var(--spacing-4xsmall);min-width:var(--component-small);box-sizing:border-box;display:flex;align-items:center}.sc-sy-pagination:root .pagination-wrapper.sc-sy-pagination .pagination.sc-sy-pagination li.sc-sy-pagination:first-child,.sc-sy-pagination-h .pagination-wrapper.sc-sy-pagination .pagination.sc-sy-pagination li.sc-sy-pagination:first-child{color:var(--pagination-index-inactive-icon-active)}.sc-sy-pagination:root .pagination-wrapper.sc-sy-pagination .pagination.sc-sy-pagination li.sc-sy-pagination:first-child:hover,.sc-sy-pagination-h .pagination-wrapper.sc-sy-pagination .pagination.sc-sy-pagination li.sc-sy-pagination:first-child:hover{color:var(--pagination-index-inactive-icon-hover)}.sc-sy-pagination:root .pagination-wrapper.sc-sy-pagination .pagination.sc-sy-pagination li.sc-sy-pagination:last-child,.sc-sy-pagination-h .pagination-wrapper.sc-sy-pagination .pagination.sc-sy-pagination li.sc-sy-pagination:last-child{color:var(--pagination-index-inactive-icon-active)}.sc-sy-pagination:root .pagination-wrapper.sc-sy-pagination .pagination.sc-sy-pagination li.sc-sy-pagination:last-child:hover,.sc-sy-pagination-h .pagination-wrapper.sc-sy-pagination .pagination.sc-sy-pagination li.sc-sy-pagination:last-child:hover{color:var(--pagination-index-inactive-icon-hover)}.sc-sy-pagination:root .pagination-wrapper.sc-sy-pagination .pagination.sc-sy-pagination li.sc-sy-pagination:hover,.sc-sy-pagination-h .pagination-wrapper.sc-sy-pagination .pagination.sc-sy-pagination li.sc-sy-pagination:hover{color:var(--pagination-index-inactive-text-hover);background-color:var(--pagination-index-inactive-background-hover)}.sc-sy-pagination:root .pagination-wrapper.sc-sy-pagination .pagination.sc-sy-pagination li.disabled.sc-sy-pagination sy-icon.sc-sy-pagination,.sc-sy-pagination-h .pagination-wrapper.sc-sy-pagination .pagination.sc-sy-pagination li.disabled.sc-sy-pagination sy-icon.sc-sy-pagination{color:var(--pagination-index-inactive-icon-disabled)}.sc-sy-pagination:root .pagination-wrapper.sc-sy-pagination .pagination.sc-sy-pagination li.sc-sy-pagination sy-icon.sc-sy-pagination,.sc-sy-pagination-h .pagination-wrapper.sc-sy-pagination .pagination.sc-sy-pagination li.sc-sy-pagination sy-icon.sc-sy-pagination{color:var(--pagination-index-inactive-icon-enabled)}.sc-sy-pagination:root .pagination-wrapper.sc-sy-pagination .pagination.sc-sy-pagination li.sc-sy-pagination sy-icon.sc-sy-pagination:hover,.sc-sy-pagination-h .pagination-wrapper.sc-sy-pagination .pagination.sc-sy-pagination li.sc-sy-pagination sy-icon.sc-sy-pagination:hover{color:var(--pagination-index-inactive-icon-hover)}.sc-sy-pagination:root .pagination-wrapper.sc-sy-pagination .pagination.sc-sy-pagination li.active.sc-sy-pagination,.sc-sy-pagination-h .pagination-wrapper.sc-sy-pagination .pagination.sc-sy-pagination li.active.sc-sy-pagination{background-color:var(--pagination-index-active-background-enabled);color:var(--pagination-index-active-text-active);border:var(--border-small) var(--pagination-index-active-border-enabled);display:inline-flex;line-height:normal;font-family:\"Roboto\";font-size:14px;font-weight:500;line-height:22px;letter-spacing:0.25px;margin:0px}.sc-sy-pagination:root .pagination-wrapper.sc-sy-pagination .pagination.sc-sy-pagination li.active.disabled.sc-sy-pagination,.sc-sy-pagination-h .pagination-wrapper.sc-sy-pagination .pagination.sc-sy-pagination li.active.disabled.sc-sy-pagination{color:var(--pagination-index-active-text-disabled);background-color:var(--pagination-index-active-background-disabled);border:var(--border-small) var(--pagination-index-active-border-disabled)}.sc-sy-pagination:root .pagination-wrapper.sc-sy-pagination .pagination.sc-sy-pagination li.active.disabled.sc-sy-pagination:hover,.sc-sy-pagination-h .pagination-wrapper.sc-sy-pagination .pagination.sc-sy-pagination li.active.disabled.sc-sy-pagination:hover{color:var(--pagination-index-active-text-disabled)}.sc-sy-pagination:root .pagination-wrapper.sc-sy-pagination .pagination.sc-sy-pagination li.more.sc-sy-pagination,.sc-sy-pagination-h .pagination-wrapper.sc-sy-pagination .pagination.sc-sy-pagination li.more.sc-sy-pagination{display:flex;align-items:center;cursor:auto}.sc-sy-pagination:root .pagination-wrapper.sc-sy-pagination .pagination.sc-sy-pagination li.more.sc-sy-pagination sy-icon.sc-sy-pagination,.sc-sy-pagination-h .pagination-wrapper.sc-sy-pagination .pagination.sc-sy-pagination li.more.sc-sy-pagination sy-icon.sc-sy-pagination{color:var(--pagination-index-more-text-enabled)}.sc-sy-pagination:root .pagination-wrapper.sc-sy-pagination .pagination.sc-sy-pagination li.more.sc-sy-pagination:hover sy-icon.sc-sy-pagination,.sc-sy-pagination-h .pagination-wrapper.sc-sy-pagination .pagination.sc-sy-pagination li.more.sc-sy-pagination:hover sy-icon.sc-sy-pagination{color:var(--pagination-index-more-text-enabled)}.sc-sy-pagination:root .pagination-wrapper.sc-sy-pagination .pagination.sc-sy-pagination li.disabled.sc-sy-pagination,.sc-sy-pagination-h .pagination-wrapper.sc-sy-pagination .pagination.sc-sy-pagination li.disabled.sc-sy-pagination{color:var(--pagination-index-inactive-text-disabled);cursor:auto}.sc-sy-pagination:root .pagination-wrapper.sc-sy-pagination .pagination.sc-sy-pagination li.disabled.sc-sy-pagination:hover sy-icon.sc-sy-pagination,.sc-sy-pagination-h .pagination-wrapper.sc-sy-pagination .pagination.sc-sy-pagination li.disabled.sc-sy-pagination:hover sy-icon.sc-sy-pagination{color:var(--pagination-index-active-text-disabled)}.sc-sy-pagination:root .pagination-wrapper.sc-sy-pagination .page-size-selector.sc-sy-pagination,.sc-sy-pagination-h .pagination-wrapper.sc-sy-pagination .page-size-selector.sc-sy-pagination{display:flex;flex-direction:row;align-items:center;gap:var(--spacing-3xsmall);width:98px}.sc-sy-pagination:root .pagination-wrapper.sc-sy-pagination .jumper.sc-sy-pagination,.sc-sy-pagination-h .pagination-wrapper.sc-sy-pagination .jumper.sc-sy-pagination{display:flex;flex-direction:row;align-items:center;gap:var(--spacing-3xsmall)}.sc-sy-pagination:root .pagination-wrapper.sc-sy-pagination .jumper.sc-sy-pagination .jumper-input.sc-sy-pagination,.sc-sy-pagination-h .pagination-wrapper.sc-sy-pagination .jumper.sc-sy-pagination .jumper-input.sc-sy-pagination{width:60px}.sc-sy-pagination:root .pagination-wrapper.sc-sy-pagination .jumper-label.sc-sy-pagination,.sc-sy-pagination-h .pagination-wrapper.sc-sy-pagination .jumper-label.sc-sy-pagination{white-space:nowrap}sy-pagination[disabled].sc-sy-pagination-h .page-size-label.sc-sy-pagination,sy-pagination[disabled].sc-sy-pagination-h .jumper-label.sc-sy-pagination,sy-pagination[disabled].sc-sy-pagination-h .page-info.sc-sy-pagination{color:var(--pagination-index-inactive-text-disabled);white-space:nowrap}sy-pagination[disabled].sc-sy-pagination-h .page-size-label.sc-sy-pagination,sy-pagination[disabled].sc-sy-pagination-h .jumper-label.sc-sy-pagination,sy-pagination[disabled].sc-sy-pagination-h .page-info.sc-sy-pagination{color:var(--pagination-index-inactive-text-disabled);white-space:nowrap}";

const SyPagination$1 = /*@__PURE__*/ proxyCustomElement(class SyPagination extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.pageChanged = createEvent(this, "pageChanged");
        this.pageSizeChanged = createEvent(this, "pageSizeChanged");
    }
    get host() { return this; }
    activePage = 1; // active page
    disabled = false; // disables
    hideonSingle = false;
    jumper = false; // visible go to page
    pageSize = 10; // how many items in a page
    pageSizeOptions; // 문자열로 받음
    total = false; // visible current page / total page count
    totalItems = 0; // total number of items
    fixedPageSize = this.pageSize;
    activeSidePages = 1; // activePages가 landingPages를 벗어나 launching 될 때, active 주위에 몇개의 page를 노출할지 여부를 결정. landingPages -2보다 크지 않아야 landingPages에서 ...이 출현합니다. page의 전체 길이가 늘리지 않으려면 1로 유지하는게 좋다.
    landingPages = 5; // ...이 출현할 최초의 page를 정의합니다. landingPage에 도달하면 ...이 발생해야 하므로 activeSidePages가 landingPages -2보다 크면 안됩니다.
    // pageSizeOptionsStr을 배열로 변환하는 computed property
    get pageSizeOptionList() {
        if (!this.pageSizeOptions)
            return [];
        const numbers = this.pageSizeOptions.split(',')
            .map(num => num.trim())
            .filter(num => num !== '')
            .map(num => parseInt(num, 10))
            .filter(num => !isNaN(num));
        return numbers.length > 0 ? numbers : [];
    }
    pageChanged;
    pageSizeChanged;
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
    onPageSizeOptionsChanged() {
        this.defaultFixedPageSize();
    }
    onPageSizeChanged() {
        this.fixedPageSize = this.pageSize;
    }
    handleOutsideClick(e) {
        const target = e.target;
        const selectElement = this.host.querySelector('sy-select');
        // pagination 외부를 클릭한 경우에만 select를 닫음
        if (selectElement && !this.host.contains(target)) {
            selectElement.closeDropdown?.();
        }
    }
    renderPages() {
        const pages = [];
        let start = 2; // 첫 번째 페이지(1)는 별도 렌더링되므로 2부터 시작
        let end = this.totalPages - 1; // 마지막 페이지는 별도 렌더링되므로 -1
        if (this.totalPages <= 2) {
            // 총 페이지가 2 이하면 중간 페이지가 없음
            return pages;
        }
        if (this.activePage < this.landingPages) {
            end = Math.min(this.totalPages - 1, start + this.landingPages - 2);
        }
        else if (this.activePage + this.landingPages > this.totalPages + 1) {
            start = Math.max(2, this.totalPages - this.landingPages + 1);
        }
        else {
            start = Math.max(2, this.activePage - this.activeSidePages);
            end = Math.min(this.totalPages - 1, this.activePage + this.activeSidePages);
        }
        if (start > 2) {
            pages.push(h("li", { class: {
                    more: true,
                    disabled: this.disabled,
                } }, h("sy-icon", { size: "medium" }, h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { fill: "currentColor", d: "M544 320C544 346.5 522.5 368 496 368C469.5 368 448 346.5 448 320C448 293.5 469.5 272 496 272C522.5 272 544 293.5 544 320zM368 320C368 346.5 346.5 368 320 368C293.5 368 272 346.5 272 320C272 293.5 293.5 272 320 272C346.5 272 368 293.5 368 320zM144 368C117.5 368 96 346.5 96 320C96 293.5 117.5 272 144 272C170.5 272 192 293.5 192 320C192 346.5 170.5 368 144 368z" })))));
        }
        for (let i = start; i <= end; i++) {
            pages.push(h("li", { class: {
                    active: this.activePage === i,
                    disabled: this.disabled,
                }, onClick: () => this.handlePageClick(i) }, i));
        }
        if (end < this.totalPages - 1) {
            pages.push(h("li", { class: {
                    more: true,
                    disabled: this.disabled,
                } }, h("sy-icon", { size: "medium" }, h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { fill: "currentColor", d: "M544 320C544 346.5 522.5 368 496 368C469.5 368 448 346.5 448 320C448 293.5 469.5 272 496 272C522.5 272 544 293.5 544 320zM368 320C368 346.5 346.5 368 320 368C293.5 368 272 346.5 272 320C272 293.5 293.5 272 320 272C346.5 272 368 293.5 368 320zM144 368C117.5 368 96 346.5 96 320C96 293.5 117.5 272 144 272C170.5 272 192 293.5 192 320C192 346.5 170.5 368 144 368z" })))));
        }
        return pages;
    }
    render() {
        if (this.hideonSingle && this.totalPages <= 1) {
            return null;
        }
        return (h("div", { class: "pagination-wrapper" }, h("div", { class: "pagination-row" }, h("ul", { class: "pagination" }, h("li", { class: {
                disabled: this.activePage === 1 || this.disabled,
            }, onClick: this.handlePrevClick.bind(this) }, h("sy-icon", { size: "small" }, h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { fill: "currentColor", d: "M207.5 303C198.1 312.4 198.1 327.6 207.5 336.9L367.5 496.9C376.9 506.3 392.1 506.3 401.4 496.9C410.7 487.5 410.8 472.3 401.4 463L258.4 320L401.4 177C410.8 167.6 410.8 152.4 401.4 143.1C392 133.8 376.8 133.7 367.5 143.1L207.5 303z" })))), h("li", { class: {
                active: this.activePage === 1,
                disabled: this.disabled,
            }, onClick: () => this.handlePageClick(1) }, "1"), this.renderPages(), this.totalPages > 1 && (h("li", { class: {
                active: this.activePage === this.totalPages,
                disabled: this.disabled,
            }, onClick: () => this.handlePageClick(this.totalPages) }, this.totalPages)), h("li", { class: {
                disabled: this.activePage === this.totalPages || this.disabled,
            }, onClick: this.handleNextClick.bind(this) }, h("sy-icon", { size: "small" }, h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640" }, h("path", { fill: "currentColor", d: "M433.5 303C442.9 312.4 442.9 327.6 433.5 336.9L273.5 497C264.1 506.4 248.9 506.4 239.6 497C230.3 487.6 230.2 472.4 239.6 463.1L382.6 320.1L239.6 177.1C230.2 167.7 230.2 152.5 239.6 143.2C249 133.9 264.2 133.8 273.5 143.2L433.5 303.2z" }))))), this.pageSizeOptionList?.length > 0 && (h("div", { class: "page-size-selector" }, h("sy-select", { id: "page-size", class: "page-size-select", size: "small", onSelected: this.handlePageSizeChange.bind(this), disabled: this.disabled, defaultValue: String(this.fixedPageSize ?? this.pageSizeOptionList[0]) }, this.pageSizeOptionList.map(size => (h("sy-option", { value: String(size), label: `${size} / page` })))))), this.jumper && (h("div", { class: "jumper" }, h("label", { htmlFor: "jumper", class: "jumper-label" }, "Go to"), h("sy-input-number", { id: "jumper", class: "jumper-input", size: "small", onChanged: this.handleJumperChange.bind(this), disabled: this.disabled })))), this.total && (h("span", { class: "page-info" }, "Total ", this.totalItems, " Items"))));
    }
    defaultFixedPageSize() {
        if (this.pageSizeOptionList?.length > 0) {
            this.fixedPageSize = this.pageSizeOptionList[0];
        }
        else {
            this.fixedPageSize = this.pageSize;
        }
    }
    get totalPages() {
        return Math.abs(Math.ceil(this.totalItems / this.fixedPageSize));
    }
    handlePrevClick() {
        if (!this.disabled && this.activePage > 1) {
            this.handlePageClick(this.activePage - 1);
        }
    }
    handleNextClick() {
        if (!this.disabled && this.activePage < this.totalPages) {
            this.handlePageClick(this.activePage + 1);
        }
    }
    handlePageClick(page) {
        if (!this.disabled) {
            this.activePage = page;
            this.pageChanged.emit(page);
        }
    }
    handlePageSizeChange(event) {
        if (!this.disabled && event?.detail?.selectedOptions?.length > 0) {
            this.fixedPageSize = Number(event.detail.selectedOptions[0].value);
            this.activePage = this.totalPages < this.activePage ? this.totalPages : this.activePage;
            this.pageSizeChanged.emit(this.fixedPageSize);
        }
    }
    handleJumperChange(event) {
        if (!this.disabled) {
            let page = Number(event.detail.value);
            if (isNaN(page) || page < 1) {
                page = 1;
            }
            else if (page > this.totalPages) {
                page = this.totalPages;
            }
            this.handlePageClick(page);
        }
    }
    static get watchers() { return {
        "pageSizeOptions": ["onPageSizeOptionsChanged"],
        "pageSize": ["onPageSizeChanged"]
    }; }
    static get style() { return syPaginationCss; }
}, [258, "sy-pagination", {
        "activePage": [1026, "activepage"],
        "disabled": [4],
        "hideonSingle": [1028, "hideonsingle"],
        "jumper": [4],
        "pageSize": [1026, "pagesize"],
        "pageSizeOptions": [1025, "pagesizeoptions"],
        "total": [4],
        "totalItems": [1026, "totalitems"],
        "fixedPageSize": [32],
        "activeSidePages": [32],
        "landingPages": [32]
    }, [[4, "click", "handleOutsideClick"]], {
        "pageSizeOptions": ["onPageSizeOptionsChanged"],
        "pageSize": ["onPageSizeChanged"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-pagination", "sy-empty", "sy-icon", "sy-input-number", "sy-option", "sy-select", "sy-spinner", "sy-tag", "sy-tooltip"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-pagination":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyPagination$1);
            }
            break;
        case "sy-empty":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "sy-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "sy-input-number":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "sy-option":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "sy-select":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "sy-spinner":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "sy-tag":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "sy-tooltip":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const SyPagination = SyPagination$1;
const defineCustomElement = defineCustomElement$1;

export { SyPagination, defineCustomElement };
