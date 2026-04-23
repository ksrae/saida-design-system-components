import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ref, createRef, Ref } from 'lit/directives/ref.js';
import { Components } from '../../../components';

export interface SyTooltipProps extends Components.SyTooltip {
  slot?: any;
}

export const Tooltip = ({ hideArrow, open, closedelay, maxWidth, opendelay, content, position, trigger, slot }: SyTooltipProps) => html`
  <sy-tooltip
    .hideArrow=${hideArrow}
    .maxWidth=${maxWidth}
    ?open=${!!open}
    closedelay=${ifDefined(closedelay)}
    opendelay=${ifDefined(opendelay)}
    content=${ifDefined(content)}
    position=${ifDefined(position)}
    trigger=${ifDefined(trigger)}>
    ${slot ? unsafeHTML(slot) : ''}
  </sy-tooltip>
`;

export const TooltipHideArrow  = (args: { hideArrow: boolean })           => html`<sy-tooltip .hideArrow=${args.hideArrow} content="Tooltip content"><sy-button>Hover me</sy-button></sy-tooltip>`;
export const TooltipOpen       = (args: { open: boolean })                => html`<sy-tooltip ?open=${!!args.open} content="Always shown when open" trigger="none"><sy-button>Target</sy-button></sy-tooltip>`;
export const TooltipClosedelay = (args: { closedelay: number })           => html`<sy-tooltip closedelay=${ifDefined(args.closedelay)} content="Close delay demo"><sy-button>Hover me</sy-button></sy-tooltip>`;
export const TooltipMaxWidth   = (args: { maxWidth: number | null })      => html`<sy-tooltip .maxWidth=${args.maxWidth} content="A very long tooltip content to demonstrate max width"><sy-button>Hover me</sy-button></sy-tooltip>`;
export const TooltipOpendelay  = (args: { opendelay: number })            => html`<sy-tooltip opendelay=${ifDefined(args.opendelay)} content="Open delay demo"><sy-button>Hover me</sy-button></sy-tooltip>`;
export const TooltipContent    = (args: { content: string })              => html`<sy-tooltip content=${ifDefined(args.content)}><sy-button>Hover me</sy-button></sy-tooltip>`;
export const TooltipPosition   = (args: { position: any })                => html`<div style="padding:50px;"><sy-tooltip position=${ifDefined(args.position)} content="Position demo"><sy-button>Hover me</sy-button></sy-tooltip></div>`;
export const TooltipTrigger    = (args: { trigger: any })                 => html`<sy-tooltip trigger=${ifDefined(args.trigger)} content="Trigger demo"><sy-button>Target</sy-button></sy-tooltip>`;

export const TooltipClose = () => {
  const tRef: Ref<HTMLSyTooltipElement> = createRef();
  return html`
    <sy-tooltip ${ref(tRef)} content="Click the button to close" trigger="click"><sy-button>Target</sy-button></sy-tooltip>
    <br/>
    <sy-button @click=${() => tRef.value?.close()}>close()</sy-button>
  `;
};
