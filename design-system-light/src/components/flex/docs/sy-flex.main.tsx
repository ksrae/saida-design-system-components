import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Components } from '../../../components';

export interface SyFlexProps extends Components.SyFlex {
  slot?: string;
}

const demoChildren = `
  <div style="background:#e0f0ff;padding:8px;">A</div>
  <div style="background:#ffe0e0;padding:8px;">B</div>
  <div style="background:#e0ffd0;padding:8px;">C</div>
`;

export const Flex = ({ align, rowGap, columnGap, justify, direction, wrap, padding, width, height, slot }: SyFlexProps) => html`
  <sy-flex
    align=${ifDefined(align)}
    .rowGap=${rowGap ?? 'none'}
    .columnGap=${columnGap ?? 'none'}
    justify=${ifDefined(justify)}
    direction=${ifDefined(direction)}
    wrap=${ifDefined(wrap)}
    padding=${ifDefined(padding)}
    width=${ifDefined(width)}
    height=${ifDefined(height)}
  >${slot ? unsafeHTML(slot) : unsafeHTML(demoChildren)}</sy-flex>
`;

export const FlexAlign     = (args: { align: 'start'|'end'|'center'|'stretch'|'baseline' }) =>
  html`<sy-flex align=${ifDefined(args.align)} style="height:100px;border:1px solid #ccc;">${unsafeHTML(demoChildren)}</sy-flex>`;

export const FlexRowGap    = (args: { rowGap: 'none'|'xsmall'|'small'|'medium'|'large'|'xlarge' }) =>
  html`<sy-flex direction="vertical" .rowGap=${args.rowGap ?? 'none'}>${unsafeHTML(demoChildren)}</sy-flex>`;

export const FlexColumnGap = (args: { columnGap: 'none'|'xsmall'|'small'|'medium'|'large'|'xlarge' }) =>
  html`<sy-flex .columnGap=${args.columnGap ?? 'none'}>${unsafeHTML(demoChildren)}</sy-flex>`;

export const FlexJustify   = (args: { justify: 'start'|'center'|'end'|'space-between' }) =>
  html`<sy-flex justify=${ifDefined(args.justify)} style="width:100%;">${unsafeHTML(demoChildren)}</sy-flex>`;

export const FlexDirection = (args: { direction: 'horizontal'|'vertical'|'horizontal-reverse'|'vertical-reverse' }) =>
  html`<sy-flex direction=${ifDefined(args.direction)}>${unsafeHTML(demoChildren)}</sy-flex>`;

export const FlexWrap      = (args: { wrap: 'nowrap'|'wrap'|'wrap-reverse' }) =>
  html`<sy-flex wrap=${ifDefined(args.wrap)} style="width:160px;">${unsafeHTML(demoChildren)}</sy-flex>`;

export const FlexPadding   = (args: { padding: 'none'|'xsmall'|'small'|'medium'|'large'|'xlarge' }) =>
  html`<sy-flex padding=${ifDefined(args.padding)} style="background:#f6f6f6;">${unsafeHTML(demoChildren)}</sy-flex>`;

export const FlexWidth     = (args: { width: string }) =>
  html`<sy-flex width=${ifDefined(args.width)} style="background:#f6f6f6;">${unsafeHTML(demoChildren)}</sy-flex>`;

export const FlexHeight    = (args: { height: string }) =>
  html`<sy-flex height=${ifDefined(args.height)} direction="vertical" style="background:#f6f6f6;">${unsafeHTML(demoChildren)}</sy-flex>`;
