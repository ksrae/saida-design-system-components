import { html, unsafeHTML } from '../../../utils/story-template';
import { Components } from '../../../components';

export interface SyCollapsePanelProps extends Components.SyCollapsePanel {
  slot?: string;
  changed?: (event: CustomEvent<any>) => void;
}

export const CollapsePanel = ({ active, arrow, disabled, ghost, slot }: SyCollapsePanelProps) => html`
  <div>
    <sy-collapse-panel
      ?active=${!!active}
      ?arrow=${!!arrow}
      ?disabled=${!!disabled}
      ?ghost=${!!ghost}
    >${slot ? unsafeHTML(slot) : ''}</sy-collapse-panel>
  </div>
`;

export const CollapsePanelActive = (args: {active: boolean}) => {
  return html`
<sy-collapse>
  <sy-collapse-panel ?active=${args.active}>
    <div slot="header">This is panel header 1</div>
    <div class="content">This is panel content 1</div>
  </sy-collapse-panel>
</sy-collapse>
`
};
export const CollapsePanelArrow = (args: {arrow: boolean}) => {
  return html`
<sy-collapse>
  <sy-collapse-panel ?arrow=${args.arrow}>
    <div slot="header">This is panel header 1</div>
    <div class="content">This is panel content 1</div>
  </sy-collapse-panel>
</sy-collapse>
`
};
export const CollapsePanelDisabled = (args: {disabled: boolean}) => {
  return html`
<sy-collapse>
  <sy-collapse-panel ?disabled=${args.disabled}>
    <div slot="header">This is panel header 1</div>
    <div class="content">This is panel content 1</div>
  </sy-collapse-panel>
</sy-collapse>
`
};
export const CollapsePanelGhost = (args: {ghost: boolean}) => {
  return html`
<sy-collapse>
  <sy-collapse-panel ?ghost=${args.ghost}>
    <div slot="header">This is panel header 1</div>
    <div class="content">This is panel content 1</div>
  </sy-collapse-panel>
</sy-collapse>
`
};

export const CollapsePanelChanged = () => {
  const handle = () => {
    const out = document.getElementById('changed-message');
    if (out) out.textContent = 'Panel clicked!';
  };
  return html`
    <sy-collapse>
      <sy-collapse-panel @changed=${handle}>
        <div slot="header">This is panel header 1</div>
        <div class="content">This is panel content 1</div>
      </sy-collapse-panel>
    </sy-collapse>
    <p id="changed-message">(idle)</p>
  `;
};
