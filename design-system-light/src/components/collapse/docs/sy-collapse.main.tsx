import { html, unsafeHTML, ref, createRef, Ref } from '../../../utils/story-template';
import { Components } from '../../../components';

export interface SyCollapseProps extends Components.SyCollapse {
  slot?: string;
}

export const Collapse = ({ accordion, borderless, disabled, ghost, fullheight, slot }: SyCollapseProps) => html`
  <div>
    <sy-collapse
      ?accordion=${!!accordion}
      ?borderless=${!!borderless}
      ?disabled=${!!disabled}
      ?ghost=${!!ghost}
      ?fullheight=${!!fullheight}
    >${slot ? unsafeHTML(slot) : ''}</sy-collapse>
  </div>
`;

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


export const CollapseMethods = () => {
  const elRef: Ref<HTMLSyCollapseElement> = createRef();
  return html`
    <sy-collapse ${ref(elRef)}>
      <sy-collapse-panel><div slot="header">Panel 1</div><div class="content">Content 1</div></sy-collapse-panel>
      <sy-collapse-panel><div slot="header">Panel 2</div><div class="content">Content 2</div></sy-collapse-panel>
      <sy-collapse-panel><div slot="header">Panel 3</div><div class="content">Content 3</div></sy-collapse-panel>
    </sy-collapse>
    <div style="margin-top:8px;display:flex;gap:4px;">
      <sy-button size="small" @click=${() => elRef.value?.openAll()}>openAll()</sy-button>
      <sy-button size="small" @click=${() => elRef.value?.closeAll()}>closeAll()</sy-button>
      <sy-button size="small" @click=${() => elRef.value?.openPanel(1)}>openPanel(1)</sy-button>
      <sy-button size="small" @click=${() => elRef.value?.closePanel(1)}>closePanel(1)</sy-button>
    </div>
  `;
};

export const CollapseFullHeight = (args: {fullheight: boolean}) => {
  // `fullheight` only has an effect when `accordion` is also true — the
  // component enforces this so we force accordion on here as well.
  return html`
<p style="margin: 0 0 8px;">
  Container is 400px tall. With <code>fullheight</code> + <code>accordion</code>
  the currently open panel stretches to fill the space left after the other
  panels' headers.
</p>
<div style="height: 400px; border: 1px dashed #bbb; padding: 8px; display: flex; flex-direction: column;">
  <sy-collapse accordion ?fullheight=${args.fullheight} style="flex: 1; min-height: 0;">
    <sy-collapse-panel>
      <div slot="header">Panel 1</div>
      <div class="content">Panel 1 content</div>
    </sy-collapse-panel>
    <sy-collapse-panel active>
      <div slot="header">Panel 2 (active)</div>
      <div class="content">
        Panel 2 content — when fullheight + accordion are true this panel
        stretches to fill the remaining space of the 400px container without
        overflowing. Toggle the header above/below to move the stretch.
      </div>
    </sy-collapse-panel>
    <sy-collapse-panel>
      <div slot="header">Panel 3</div>
      <div class="content">Panel 3 content</div>
    </sy-collapse-panel>
  </sy-collapse>
</div>
`
};
