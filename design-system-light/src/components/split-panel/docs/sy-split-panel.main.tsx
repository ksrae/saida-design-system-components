import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { Components } from '../../../components';

export interface SySplitPanelProps extends Components.SySplitPanel {
  slot?: any;
  horizontalChanged?: (event: CustomEvent<any>) => void;
  verticalChanged?: (event: CustomEvent<any>) => void;
}

const demoChildren = html`
  <div slot="first" style="background:#e0f0ff;padding:12px;">Panel A</div>
  <div slot="second" style="background:#ffe0e0;padding:12px;">Panel B</div>
`;

export const SplitPanel = ({ disabled, hideDivider, minRatio, ratio, type }: SySplitPanelProps) => html`
  <sy-split-panel
    ?disabled=${!!disabled}
    .hideDivider=${hideDivider}
    .minRatio=${minRatio}
    ratio=${ifDefined(ratio as any)}
    type=${ifDefined(type)}
    style="height:200px;border:1px solid #ccc;"
  >${demoChildren}</sy-split-panel>
`;

export const SplitPanelDisabled    = (a: { disabled: boolean })    => html`<sy-split-panel ?disabled=${!!a.disabled} style="height:200px;border:1px solid #ccc;">${demoChildren}</sy-split-panel>`;
export const SplitPanelHideDivider = (a: { hideDivider: boolean }) => html`<sy-split-panel .hideDivider=${a.hideDivider} style="height:200px;border:1px solid #ccc;">${demoChildren}</sy-split-panel>`;
export const SplitPanelMinRatio    = (a: { minRatio: number })     => html`<sy-split-panel .minRatio=${a.minRatio} style="height:200px;border:1px solid #ccc;">${demoChildren}</sy-split-panel>`;
export const SplitPanelRatio       = (a: { ratio: number })        => html`<sy-split-panel ratio=${ifDefined(a.ratio as any)} style="height:200px;border:1px solid #ccc;">${demoChildren}</sy-split-panel>`;
export const SplitPanelType        = (a: { type: 'horizontal' | 'vertical' }) =>
  html`<sy-split-panel type=${ifDefined(a.type)} style="height:200px;border:1px solid #ccc;">${demoChildren}</sy-split-panel>`;

export const SplitPanelHorizontalChanged = () => {
  const handle = (e: Event) => {
    const out = document.getElementById('spHResult');
    if (out) out.textContent = JSON.stringify((e as CustomEvent).detail);
  };
  return html`
    <sy-split-panel type="horizontal" style="height:200px;border:1px solid #ccc;" @horizontalChanged=${handle}>
      <div slot="first" style="background:#e0f0ff;padding:12px;">A</div>
      <div slot="second" style="background:#ffe0e0;padding:12px;">B</div>
    </sy-split-panel>
    <p id="spHResult">(idle)</p>
  `;
};

export const SplitPanelVerticalChanged = () => {
  const handle = (e: Event) => {
    const out = document.getElementById('spVResult');
    if (out) out.textContent = JSON.stringify((e as CustomEvent).detail);
  };
  return html`
    <sy-split-panel type="vertical" style="height:200px;border:1px solid #ccc;" @verticalChanged=${handle}>
      <div slot="first" style="background:#e0f0ff;padding:12px;">A</div>
      <div slot="second" style="background:#ffe0e0;padding:12px;">B</div>
    </sy-split-panel>
    <p id="spVResult">(idle)</p>
  `;
};
