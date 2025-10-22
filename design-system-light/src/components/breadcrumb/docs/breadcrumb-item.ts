import { html } from 'lit';
import '../breadcrumb-item.element';
import '../breadcrumb.element';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';

export interface BreadCrumbItemProps {
  active: boolean;
  disabled: boolean;
    separator: 'slash' | 'arrow';
    slotContent : any; //bread crumb item group
    selected?: () => any;
  }

  export const BreadCrumbItem = ({active, disabled, separator, slotContent} : BreadCrumbItemProps) => {
    return html`
    <sy-breadcrumb>
      <sy-breadcrumb-item
      ?active=${active}
      ?disabled=${disabled}
      separator=${ifDefined(separator)}>
      ${unsafeHTML(slotContent)}
      </sy-breadcrumb-item>
    </sy-breadcrumb>
    `
  };
  
  export const BreadCrumbItemActive = (args: {active: boolean}) => {
    return html`
    <sy-breadcrumb separator="arrow">
      <sy-breadcrumb-item ?active=${args.active}>item 1</sy-breadcrumb-item>
      <sy-breadcrumb-item>item 2</sy-breadcrumb-item>
    </sy-breadcrumb>
    `
   };

   export const BreadCrumbItemSeparator = (args: {separator: 'slash' | 'arrow'}) => {
    return html`
    <sy-breadcrumb separator="arrow">
      <sy-breadcrumb-item separator="${args.separator}">item 1</sy-breadcrumb-item>
      <sy-breadcrumb-item>item 2</sy-breadcrumb-item>
      <sy-breadcrumb-item>item 3</sy-breadcrumb-item>
    </sy-breadcrumb>
    <br/>

    `
   };

   export const BreadCrumbItemDisabled = (args: {disabled: boolean}) => {
    return html`
    <sy-breadcrumb>
      <sy-breadcrumb-item ?disabled=${args.disabled}>item 1</sy-breadcrumb-item>
      <sy-breadcrumb-item ?disabled=${args.disabled}>item 2</sy-breadcrumb-item>
    </sy-breadcrumb>
    `
   };
