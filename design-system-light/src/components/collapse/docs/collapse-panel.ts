import { html } from 'lit';
import '../collapse.element';
import '../collapse-panel.element';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export interface CollapsePanelProps {
  active: boolean;
  arrow: boolean;
  disabled: boolean;
  ghost: boolean;
  slotContent: any;
  changed?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const CollapsePanel = ({active, arrow, disabled, ghost, slotContent}: CollapsePanelProps) => {
  return html`
<div>
  <sy-collapse-panel
    ?active=${active}
    ?arrow=${arrow}
    ?disabled=${disabled}
    ?ghost=${ghost}>
    <div slot="header">This is panel header 1</div>
    <div class="content">This is panel content 1</div>
  </sy-collapse-panel>
</div>
  `;
};

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
  return html`
    <sy-collapse>
      <sy-collapse-panel>
        <div slot="header">This is panel header 1</div>
        <div class="content">This is panel content 1</div>
      </sy-collapse-panel>
    </sy-collapse>
    <p id="changed-message"></p>

    <script>
      document.addEventListener('DOMContentLoaded', () => {
        const panel = document.querySelector('sy-collapse-panel');
        const messageElement = document.querySelector('#changed-message');

        if (panel) {
          const handleChanged = (e) => {
            if (messageElement) {
              messageElement.textContent = 'Panel clicked!';
            }
          };

          panel.addEventListener('changed', handleChanged);
        }
      });
    </script>
  `;
};