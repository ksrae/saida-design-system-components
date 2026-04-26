import { html, ifDefined, unsafeHTML } from '../../../utils/story-template';
import { Components } from '../../../components';

export interface SyTooltipProps extends Components.SyTooltip {
  slot?: any;
}

// sy-tooltip itself has `display: none` — it portals its bubble to document.body
// and uses its DOM parent as the hover/click trigger. Every story therefore wraps
// <sy-tooltip> in a visible <div> that becomes the actual hover target. Copy this
// pattern in real apps: put <sy-tooltip> inside the element you want annotated.
//
// Why a helper instead of `style=${TARGET_STYLE}` interpolation: this story-
// template's `attr`-kind binding hands the raw string to Stencil's `h()`, which
// then tries `el.style[0] = '...'` and throws "Indexed property setter is not
// supported". Keeping the style literal in the template lets `toStyleObject`
// pre-parse it into the object form Stencil expects.
const targetDiv = (label: unknown, tooltip: unknown) => html`
  <div style="display:inline-block; padding:8px 16px; border:1px solid #d0d5dd; border-radius:4px; background:#fff; cursor:default; user-select:none;">
    ${label}${tooltip}
  </div>
`;

// Overview anchors the tooltip directly to <sy-button>: putting <sy-tooltip>
// inside the button makes the button itself the parentDom trigger, so no
// extra wrapper div is needed.
export const Tooltip = ({ hideArrow, open, closedelay, maxWidth, opendelay, content, position, trigger, slot }: SyTooltipProps) => html`
  <sy-button>
    ${slot ? unsafeHTML(slot) : 'Hover me'}
    <sy-tooltip
      .hideArrow=${hideArrow}
      .maxWidth=${maxWidth}
      ?open=${!!open}
      closedelay=${ifDefined(closedelay)}
      opendelay=${ifDefined(opendelay)}
      content=${ifDefined(content)}
      position=${ifDefined(position)}
      trigger=${ifDefined(trigger)}>
    </sy-tooltip>
  </sy-button>
`;

export const TooltipHideArrow  = (args: { hideArrow: boolean })      => targetDiv('Hover this div', html`<sy-tooltip .hideArrow=${args.hideArrow} content="Tooltip content"></sy-tooltip>`);
export const TooltipOpen       = (args: { open: boolean })           => targetDiv('Hover target (forced open)', html`<sy-tooltip ?open=${!!args.open} content="Always shown when open" trigger="none"></sy-tooltip>`);
export const TooltipClosedelay = (args: { closedelay: number })      => targetDiv('Hover this div', html`<sy-tooltip closedelay=${ifDefined(args.closedelay)} content="Close delay demo"></sy-tooltip>`);
export const TooltipMaxWidth   = (args: { maxWidth: number | null }) => targetDiv('Hover this div', html`<sy-tooltip .maxWidth=${args.maxWidth} content="A very long tooltip content to demonstrate max width"></sy-tooltip>`);
export const TooltipOpendelay  = (args: { opendelay: number })       => targetDiv('Hover this div', html`<sy-tooltip opendelay=${ifDefined(args.opendelay)} content="Open delay demo"></sy-tooltip>`);
export const TooltipContent    = (args: { content: string })         => targetDiv('Hover this div', html`<sy-tooltip content=${ifDefined(args.content)}></sy-tooltip>`);
export const TooltipTrigger    = (args: { trigger: any })            => targetDiv('Trigger target', html`<sy-tooltip trigger=${ifDefined(args.trigger)} content="Trigger demo"></sy-tooltip>`);

export const TooltipPosition = (args: { position: any }) => html`
  <div style="padding:60px;">
    ${targetDiv('Hover this div', html`<sy-tooltip position=${ifDefined(args.position)} content="Position demo"></sy-tooltip>`)}
  </div>
`;

// close() demo — tooltip is anchored to the click-trigger div. Once open,
// sy-tooltip relocates itself to document.body (appendToRoot in sy-tooltip.tsx),
// so we have to look for it on the document, not the button's parent. This page
// only ever has one sy-tooltip (clearElements wipes stale ones), so a plain
// document.querySelector is enough.
export const TooltipClose = () => html`
  <div>
    ${targetDiv('Click this div to open', html`<sy-tooltip content="Click the button to close" trigger="click"></sy-tooltip>`)}
    <br/>
    <sy-button @click=${() => {
      document.querySelector<HTMLSyTooltipElement>('sy-tooltip')?.close();
    }}>close()</sy-button>
  </div>
`;
