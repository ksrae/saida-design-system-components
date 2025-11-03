import { html } from 'lit';
import { Components } from '../../../components';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export interface SyCollapseProps extends Components.SyCollapse {
  slot?: any;
}

// Main render function
export const Collapse = ({accordion, borderless, disabled, ghost, fullheight, slot}: SyCollapseProps) => {
  return html`
    <div>
      <sy-collapse
        ?accordion=${accordion}
        ?borderless=${borderless}
        ?disabled=${disabled}
        ?ghost=${ghost}
        ?fullheight=${fullheight}>
        ${unsafeHTML(slot)}
      </sy-collapse>
    </div>
    `;
};

export const CollapseAccordion = (args: {accordion: boolean}) => {
  return html`
<sy-collapse ?accordion=${args.accordion}>
  <sy-collapse-panel>
    <div slot="header">This is panel header 1</div>
    <div class="content">This is panel content 1</div>
  </sy-collapse-panel>
  <sy-collapse-panel>
    <div slot="header">This is panel header 2</div>
    <div class="content">This is panel content 2</div>
  </sy-collapse-panel>
  <sy-collapse-panel>
    <div slot="header">This is panel header 3</div>
    <div class="content">This is panel content 3</div>
  </sy-collapse-panel>
</sy-collapse>
`
};


export const CollapseBorderless = (args: {borderless: boolean}) => {
  return html`
<sy-collapse ?borderless=${args.borderless}>
  <sy-collapse-panel>
    <div slot="header">This is panel header 1</div>
    <div class="content">This is panel content 1</div>
  </sy-collapse-panel>
  <sy-collapse-panel>
    <div slot="header">This is panel header 2</div>
    <div class="content">This is panel content 2</div>
  </sy-collapse-panel>
  <sy-collapse-panel>
    <div slot="header">This is panel header 3</div>
    <div class="content">This is panel content 3</div>
  </sy-collapse-panel>
</sy-collapse>
`
};

export const CollapseDisabled = (args: {disabled: boolean}) => {
  return html`
<sy-collapse ?disabled=${args.disabled}>
  <sy-collapse-panel>
    <div slot="header">This is panel header 1</div>
    <div class="content">This is panel content 1</div>
  </sy-collapse-panel>
  <sy-collapse-panel>
    <div slot="header">This is panel header 2</div>
    <div class="content">This is panel content 2</div>
  </sy-collapse-panel>
  <sy-collapse-panel>
    <div slot="header">This is panel header 3</div>
    <div class="content">This is panel content 3</div>
  </sy-collapse-panel>
</sy-collapse>
`
};

export const CollapseGhost = (args: {ghost: boolean}) => {
  return html`
<sy-collapse ?ghost=${args.ghost}>
  <sy-collapse-panel>
    <div slot="header">This is panel header 1</div>
    <div class="content">This is panel content 1</div>
  </sy-collapse-panel>
  <sy-collapse-panel>
    <div slot="header">This is panel header 2</div>
    <div class="content">This is panel content 2</div>
  </sy-collapse-panel>
  <sy-collapse-panel>
    <div slot="header">This is panel header 3</div>
    <div class="content">This is panel content 3</div>
  </sy-collapse-panel>
</sy-collapse>
`
};


export const CollapseFullHeight = (args: {fullheight: boolean}) => {
  return html`
<sy-collapse ?fullheight=${args.fullheight}>
  <sy-collapse-panel>
    <div slot="header">This is panel header 1</div>
    <div class="content">This is panel content 1</div>
  </sy-collapse-panel>
  <sy-collapse-panel>
    <div slot="header">This is panel header 2</div>
    <div class="content">This is panel content 2</div>
  </sy-collapse-panel>
  <sy-collapse-panel>
    <div slot="header">This is panel header 3</div>
    <div class="content">This is panel content 3</div>
  </sy-collapse-panel>
</sy-collapse>
`
};
