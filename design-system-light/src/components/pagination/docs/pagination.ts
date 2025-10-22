import { html } from 'lit';
import '../pagination.element.ts';

export interface PaginationProps {
  activePage: number;
  disabled: boolean;
  hideonSingle: boolean;
  jumper: boolean;
  pageSize: number;
  pageSizeOptions: string;
  total: boolean;
  totalItems: number;
  pageChanged?: () => any;
  pageSizeChanged?: () => any;
}
/**
 * Primary UI component for user interaction
 */
export const Pagination = ({activePage, hideonSingle, disabled, jumper, pageSize, pageSizeOptions, total, totalItems}: PaginationProps) => {
  return html`
  <style>
 .pagination {
      display: flex;
      list-style-type: none;
    }
    .pagination li {
      margin: 0 5px;
      cursor: pointer;
    }
    .pagination li.disabled {
      cursor:auto;
      opacity: 0.5;
    }
    .pagination li.active {
      font-weight: bold;
    }
</style>
 <sy-pagination
  activePage=${activePage}
  ?disabled=${disabled}
  ?hideonSingle=${hideonSingle}
  ?jumper=${jumper}
  pageSize=${pageSize}
  ?total=${total}
  totalItems=${totalItems}
  pageSizeOptions=${pageSizeOptions}>
</sy-pagination>
 
  `;
};

export const PaginationActivePage = (args: {activePage: number}) => {
  return html`
  <sy-pagination activePage=${args.activePage} totalItems="300" pageSize="10"></sy-pagination>
  `
}

export const PaginationDisabled = (args: {disabled: boolean}) => {
  return html`
    <sy-pagination ?disabled=${args.disabled} totalItems="300" pageSize="10"></sy-pagination>
  `
}

export const PaginationHideonSingle = (args: {hideonSingle: boolean}) => {
  return html`
  <sy-pagination ?hideonSingle=${args.hideonSingle} totalItems="10" pageSize="10"></sy-pagination>
`
}

export const PaginationJumper = (args: {jumper: boolean}) => {
  return html`
  <sy-pagination ?jumper=${args.jumper} totalItems="300" pageSize="10"></sy-pagination>
  `
}

export const PaginationPageSize = (args: {pageSize: number}) => {
  return html`
  <sy-pagination pageSize=${args.pageSize} totalItems="300"></sy-pagination>`
    
}

export const PaginationPageSizeOptions = (args: {pageSizeOptions: string}) => {
  return html`
  <sy-pagination pageSizeOptions=${args.pageSizeOptions} totalItems="300"></sy-pagination>
  `
}

export const PaginationTotal = (args: {total: boolean}) => {
  return html`
    <sy-pagination ?total=${args.total} totalItems="300"></sy-pagination>
  `
}

export const PaginationTotalItems = (args: {totalItems: number}) => {
  return html`
    <sy-pagination totalItems=${args.totalItems}></sy-pagination>
  `
}

export const PaginationPageChanged = () => {
  return html`
   <h3>Pagination Page Changed Event</h3>
  <sy-pagination 
    activepage="5"
    totalItems="300"
    id="PageChanged">
  </sy-pagination>

<p id="PageChangedResult"></p>

<script>
  (() => {
    let elem = document.querySelector('#PageChanged');  
    let result = document.querySelector('#PageChangedResult');    

    let handleChanged = (e) => {
      result.textContent = e.detail + ' page has selected';
    };

    elem.addEventListener('pageChanged', handleChanged);

    // this is for release click event. It is recommanded for optimization.
    window.addEventListener('beforeunload', () => {
      elem.removeEventListener('pageChanged', handleChanged);
    });
  })();

  </script>`
}

export const PaginationPageSizeChanged = () => {
  return html`
   <h3>Pagination Page Size Changed Event</h3>
  <sy-pagination 
    activePage="5"
    totalItems="300"
    pageSizeOptions="10,20,30"
    id="PageSizeChanged">
  </sy-pagination>

<p id="PageSizeChangedResult"></p>

<script>
  (() => {
    let elem = document.querySelector('#PageSizeChanged');  
    let result = document.querySelector('#PageSizeChangedResult');    

    let handleChanged = (e) => {
      result.textContent = 'page size options has changed to  ' +  e.detail;
    };

    elem.addEventListener('pageSizeChanged', handleChanged);

    // this is for release click event. It is recommanded for optimization.
    window.addEventListener('beforeunload', () => {
      elem.removeEventListener('pageSizeChanged', handleChanged);
    });
  })();

  </script>`
}