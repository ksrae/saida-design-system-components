import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ref, createRef, Ref } from 'lit/directives/ref.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Components } from '../../../components';

export interface SyPopoverProps extends Components.SyPopover {
  slot?: any;
}

const defaultBody = html`<sy-button slot="target">Target</sy-button><span>Popover body</span>`;

const renderPopover = (a: Partial<SyPopoverProps>, body = defaultBody) => html`
  <sy-popover
    ?arrow=${!!a.arrow}
    ?open=${!!a.open}
    ?sticky=${!!a.sticky}
    position=${ifDefined(a.position)}
    trigger=${ifDefined(a.trigger)}
    opendelay=${ifDefined(a.opendelay as any)}
    closedelay=${ifDefined(a.closedelay as any)}
  >${body}</sy-popover>
`;

export const Popover = (a: SyPopoverProps) => renderPopover(a, a.slot ? unsafeHTML(a.slot) : defaultBody);

export const PopoverArrow      = (a: { arrow: boolean })          => renderPopover({ arrow: a.arrow });
export const PopoverOpen       = (a: { open: boolean })           => html`<div style="padding:50px;">${renderPopover({ open: a.open })}</div>`;
export const PopoverPosition   = (a: { position: string })        => html`<div style="padding:60px;">${renderPopover({ position: a.position as any })}</div>`;
export const PopoverTrigger    = (a: { trigger: any })            => renderPopover({ trigger: a.trigger });
export const PopoverOpendelay  = (a: { opendelay: number })       => renderPopover({ opendelay: a.opendelay });
export const PopoverClosedelay = (a: { closedelay: number })      => renderPopover({ closedelay: a.closedelay });
export const PopoverSticky     = (a: { sticky: boolean })         => renderPopover({ sticky: a.sticky });

export const PopoverSetOpenClose = () => {
  const poRef: Ref<HTMLSyPopoverElement> = createRef();
  return html`
    <sy-popover ${ref(poRef)}>${defaultBody}</sy-popover>
    <br/>
    <sy-button @click=${() => poRef.value?.setOpen()}>setOpen()</sy-button>
    <sy-button @click=${() => poRef.value?.setClose()}>setClose()</sy-button>
  `;
};
