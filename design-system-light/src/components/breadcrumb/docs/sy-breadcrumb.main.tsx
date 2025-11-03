import { html } from "lit";
import { Components } from '../../../components';
import { unsafeHTML } from "lit/directives/unsafe-html.js";

export interface SyBreadcrumbProps extends Components.SyBreadcrumb {
  slot?: any;
  selected?: (event: CustomEvent<any>) => void;
}

export interface SyBreadcrumbItemprops extends Components.SyBreadcrumbItem {
  slot?: any;
}

export const BreadCrumb = ({separator, slot} : SyBreadcrumbProps) => {
  return html`
    <sy-breadcrumb
      separator=${separator}>
      ${unsafeHTML(slot)}
    </sy-breadcrumb>
    `;
  };

export const BreadCrumbItem = ({active, disabled, separator, slot} : SyBreadcrumbItemprops) => {
  return html`
  <sy-breadcrumb>
    <sy-breadcrumb-item
    ?active=${active}
    ?disabled=${disabled}
    separator=${separator}>
    ${unsafeHTML(slot)}
    </sy-breadcrumb-item>
  </sy-breadcrumb>
  `
};

export const BreadCrumbSeparator = (args: {separator: 'slash' | 'arrow'}) => {
  return html`
  <sy-breadcrumb separator="${args.separator}">
    <sy-breadcrumb-item>item 1</sy-breadcrumb-item><sy-breadcrumb-item>item 2</sy-breadcrumb-item><sy-breadcrumb-item>item 3</sy-breadcrumb-item></sy-breadcrumb>
  `
};

export const BreadCrumbSelected = () => {
  return html`
  <sy-breadcrumb id="breadcrumbSelected">
    <sy-breadcrumb-item>item 1</sy-breadcrumb-item><sy-breadcrumb-item>item 2</sy-breadcrumb-item><sy-breadcrumb-item>item 3</sy-breadcrumb-item></sy-breadcrumb>
  </sy-breadcrumb>

<p id="breadcrumbSelectedResult"></p>
<script>
(() => {
  const elem = document.querySelector('#breadcrumbSelected');
  const result = document.querySelector('#breadcrumbSelectedResult');

  const handleBreadcrumbSelected = (e) => {
    result.textContent = 'value ' + e.detail.target.innerText + ' is selected';
  };

  elem.addEventListener('selected', handleBreadcrumbSelected);

  // this is for release click event. It is recommanded for optimization.
  window.addEventListener('beforeunload', () => {
    elem.removeEventListener('selected', handleBreadcrumbSelected);
  });
})();

</script>
  `
}

