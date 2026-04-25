import { html, ifDefined, unsafeHTML } from '../../../utils/story-template';
import { Components } from '../../../components';

export interface SyBreadcrumbProps extends Components.SyBreadcrumb {
  slot?: string;
  selected?: (event: CustomEvent<any>) => void;
}

export interface SyBreadcrumbItemprops extends Components.SyBreadcrumbItem {
  slot?: string;
}

export const BreadCrumb = ({separator, slot} : SyBreadcrumbProps) => {
  return html`
    <sy-breadcrumb
      separator=${ifDefined(separator)}>
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
    separator=${ifDefined(separator)}>
    ${unsafeHTML(slot)}
    </sy-breadcrumb-item>
  </sy-breadcrumb>
  `
};

export const BreadCrumbItemSeparator = ({separator} : {separator: 'slash' | 'arrow'}) => {
  return html`
  <sy-breadcrumb separator="slash">
    <sy-breadcrumb-item separator=${ifDefined(separator)}>item 1</sy-breadcrumb-item>
    <sy-breadcrumb-item >item 2</sy-breadcrumb-item>
  </sy-breadcrumb>
  `;
};

export const BreadCrumbSeparator = (args: {separator: 'slash' | 'arrow'}) => {
  return html`
  <sy-breadcrumb separator="${args.separator}">
    <sy-breadcrumb-item>item 1</sy-breadcrumb-item><sy-breadcrumb-item>item 2</sy-breadcrumb-item><sy-breadcrumb-item>item 3</sy-breadcrumb-item></sy-breadcrumb>
  `
};

export const BreadCrumbSelected = () => {
  const handleSelected = (e: CustomEvent<HTMLElement>) => {
    const result = document.querySelector('#breadcrumbSelectedResult');
    if (result) {
      result.textContent = 'value ' + e.detail.innerText + ' is selected';
    }
  };

  return html`
  <sy-breadcrumb id="breadcrumbSelected" @selected=${handleSelected}>
    <sy-breadcrumb-item>item 1</sy-breadcrumb-item>
    <sy-breadcrumb-item>item 2</sy-breadcrumb-item>
    <sy-breadcrumb-item>item 3</sy-breadcrumb-item>
  </sy-breadcrumb>
  <p id="breadcrumbSelectedResult"></p>
  `;
}

export const BreadCrumbItemSelected = () => {
  const handleSelected = (e: CustomEvent<HTMLElement>) => {
    const result = document.querySelector('#breadcrumbItemSelectedResult');
    if (result) {
      result.textContent = 'selected: ' + (e.target as HTMLElement).innerText;
    }
  };

  return html`
  <sy-breadcrumb id="breadcrumbItemSelected">
    <sy-breadcrumb-item @selected=${handleSelected}>item 1</sy-breadcrumb-item>
    <sy-breadcrumb-item @selected=${handleSelected}>item 2</sy-breadcrumb-item>
    <sy-breadcrumb-item @selected=${handleSelected}>item 3</sy-breadcrumb-item>
  </sy-breadcrumb>
  <p id="breadcrumbItemSelectedResult"></p>
  `;
}

