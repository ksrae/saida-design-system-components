import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { Components } from '../../../components';

export interface SyPaginationProps extends Components.SyPagination {
  pageChanged?: (event: CustomEvent<number>) => void;
  pageSizeChanged?: (event: CustomEvent<number>) => void;
}

const renderPagination = (a: Partial<SyPaginationProps>) => html`
  <sy-pagination
    ?disabled=${!!a.disabled}
    ?jumper=${!!a.jumper}
    ?total=${!!a.total}
    .activePage=${a.activePage as any}
    .hideonSingle=${a.hideonSingle as any}
    .pageSize=${a.pageSize as any}
    .totalItems=${(a.totalItems ?? 100) as any}
    pageSizeOptions=${ifDefined(a.pageSizeOptions)}
  ></sy-pagination>
`;

export const Pagination               = (a: SyPaginationProps)              => renderPagination(a);
export const PaginationActivePage     = (a: { activePage: number })          => renderPagination({ activePage: a.activePage });
export const PaginationDisabled       = (a: { disabled: boolean })           => renderPagination({ disabled: a.disabled });
export const PaginationHideonSingle   = (a: { hideonSingle: boolean; totalItems: number; pageSize: number }) =>
  // Expose `totalItems` + `pageSize` so the user can dial the computed page
  // count to exactly 1 (pagination hidden) or > 1 (pagination visible) and
  // watch the `hideonSingle` effect flip in real time.
  renderPagination({
    hideonSingle: a.hideonSingle as any,
    totalItems: a.totalItems ?? 5,
    pageSize: a.pageSize ?? 10,
  });
export const PaginationJumper         = (a: { jumper: boolean })             => renderPagination({ jumper: a.jumper });
export const PaginationPageSize       = (a: { pageSize: number })            => renderPagination({ pageSize: a.pageSize });
export const PaginationPageSizeOptions = (a: { pageSizeOptions: string })    => renderPagination({ pageSizeOptions: a.pageSizeOptions });
export const PaginationTotal          = (a: { total: boolean })              => renderPagination({ total: a.total });
export const PaginationTotalItems     = (a: { totalItems: number })          => renderPagination({ totalItems: a.totalItems });

export const PaginationPageChanged = () => {
  const handle = (e: Event) => {
    const out = document.getElementById('pgPCResult');
    if (out) out.textContent = `page: ${(e as CustomEvent).detail}`;
  };
  return html`
    <sy-pagination .totalItems=${100} @pageChanged=${handle}></sy-pagination>
    <p id="pgPCResult">(idle)</p>
  `;
};

export const PaginationPageSizeChanged = () => {
  const handle = (e: Event) => {
    const out = document.getElementById('pgPSResult');
    if (out) out.textContent = `pageSize: ${(e as CustomEvent).detail}`;
  };
  return html`
    <sy-pagination .totalItems=${100} @pageSizeChanged=${handle}></sy-pagination>
    <p id="pgPSResult">(idle)</p>
  `;
};
