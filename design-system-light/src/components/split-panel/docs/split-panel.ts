import { html } from 'lit';
import '../split-panel.element';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../../modeless/modeless.element';

export interface SplitPanelProps {
  disabled: boolean;
  hideDivider: boolean;
  minRatio: number;
  ratio: number;
  type: 'horizontal' | 'vertical';
  slotLeftContent: any;
  slotRightContent: any;
  horizontalChanged?: () => any;
  verticalChanged?: () => any;
}
/**
 * Primary UI component for user interaction
 */
export const SplitPanel = ({disabled, hideDivider, minRatio, ratio, type, slotLeftContent, slotRightContent}: SplitPanelProps) => {
  return html`
  <div>
    <sy-split-panel
      style="height:200px;"
      ?disabled=${disabled}
      ?hideDivider=${hideDivider}
      minRatio=${minRatio}
      ratio=${ratio}
      type=${type}>
      <span slot="left">Left</span>
      <span slot="right">Right</span>
    </sy-split-panel>
  </div>
  `;
};

export const SplitPanelDisabled = (args: {disabled: boolean}) => {
  return html`
  <sy-split-panel ?disabled=${args.disabled} style="height:200px;">
    <div slot="left">Left panel content</div>
    <div slot="right">Right panel content</div>
  </sy-split-panel>
  `
};


export const SplitPanelHideDivider = (args: {hideDivider: boolean}) => {
  return html`
  <sy-split-panel ?hideDivider=${args.hideDivider} style="height:200px;">
    <div slot="left">Left panel content</div>
    <div slot="right">Right panel content</div>
  </sy-split-panel>
  `
};

export const SplitPanelMinRatio = (args: {minRatio: number}) => {
  return html`
  <sy-split-panel minRatio=${args.minRatio} style="height:200px;">
    <div slot="left">Left panel content</div>
    <div slot="right">Right panel content</div>
  </sy-split-panel>
  `
};

export const SplitPanelRatio = (args: {ratio: number}) => {
  return html`  
  <sy-split-panel ratio=${args.ratio} style="height:200px;">
    <div slot="left">Left panel content</div>
    <div slot="right">Right panel content</div>
  </sy-split-panel>
  `
};

export const SplitPanelType = (args: {type: 'horizontal' | 'vertical'}) => {
  return html`
  <sy-split-panel type=${args.type} style="height:200px;">
    <div slot="left">Left(or Top) panel content</div>
    <div slot="right">Right(or Bottom) panel content</div>
  </sy-split-panel>
  `
};

export const SplitPanelChanged = () => {
  return html`
  <sy-split-panel id="horizontalPanel" style="height:200px;">
    <div slot="left">Left panel content</div>
    <div slot="right" >
      <sy-split-panel type="vertical" id="verticalPanel">
        <div slot="left" >Top panel content</div>
        <div slot="right" >Bottom panel content</div>
      </sy-split-panel>
    </div>
  </sy-split-panel>
  <p id="result"></p>

  <script>
    const horizontalPanel = document.querySelector('#horizontalPanel'); 
    const verticalPanel = document.querySelector('#verticalPanel');
    const result = document.querySelector('#result');

    horizontalPanel.addEventListener('horizontalChanged', (e) => {
      const { leftRatio, rightRatio } = e.detail;
      result.innerHTML = "Left panel width ratio: <b>" + leftRatio + "%</b>, Right panel width ratio: <b>" + rightRatio + "%</b>";
    });

    verticalPanel.addEventListener('verticalChanged', (e) => {
      const { topRatio, bottomRatio } = e.detail;
      result.innerHTML = "Top panel height ratio: <b>" + topRatio + "%</b>, Bottom panel height ratio: <b>" + bottomRatio + "%</b>";
    });
  </script>
  `
};