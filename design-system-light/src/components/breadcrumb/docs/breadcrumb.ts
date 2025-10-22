import { html } from 'lit';
import '../breadcrumb-item.element';
import '../breadcrumb.element';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { BreadcrumbItemElement } from '../breadcrumb-item.element';

export interface BreadCrumbProps {
    separator: 'slash' | 'arrow';
    slotContent : any; //bread crumb item group
    selected?: (event: CustomEvent<BreadcrumbItemElement>) => any;
  }

  // ${unsafeHTML(slotContent)}
  export const BreadCrumb = ({separator, slotContent} : BreadCrumbProps) => {
    return html`
    <sy-breadcrumb
      separator=${ifDefined(separator)}><sy-breadcrumb-item>item 1</sy-breadcrumb-item><sy-breadcrumb-item>item 2</sy-breadcrumb-item><sy-breadcrumb-item>item 3</sy-breadcrumb-item>
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
