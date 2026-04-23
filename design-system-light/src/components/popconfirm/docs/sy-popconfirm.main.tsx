import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ref, createRef, Ref } from 'lit/directives/ref.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Components } from '../../../components';

export interface SyPopconfirmProps extends Components.SyPopconfirm {
  slot?: any;
  slotTitle?: any;
  visibleChanged?: (event: CustomEvent<boolean>) => void;
  selected?: (event: CustomEvent<'ok' | 'cancel'>) => void;
}

const slotOrEmpty = (s?: any) => (s ? unsafeHTML(s) : '');
const defaultTitle = html`<span slot="title">Are you sure?</span>`;
const defaultTarget = html`<sy-button slot="target">Target</sy-button>`;

const renderPopconfirm = (a: Partial<SyPopconfirmProps>, body = html`${defaultTitle}${defaultTarget}`) => html`
  <sy-popconfirm
    ?arrow=${!!a.arrow}
    ?closable=${!!a.closable}
    ?sticky=${!!a.sticky}
    position=${ifDefined(a.position)}
    trigger=${ifDefined(a.trigger)}
    opendelay=${ifDefined(a.opendelay as any)}
    closedelay=${ifDefined(a.closedelay as any)}
    .confirmText=${a.confirmText as any}
    .cancelText=${a.cancelText as any}
  >${body}</sy-popconfirm>
`;

export const Popconfirm = (a: SyPopconfirmProps) =>
  renderPopconfirm(a, html`${slotOrEmpty(a.slotTitle)}${slotOrEmpty(a.slot)}`);

export const PopconfirmArrow       = (a: { arrow: boolean })       => renderPopconfirm({ arrow: a.arrow });
export const PopconfirmClosable    = (a: { closable: boolean })    => renderPopconfirm({ closable: a.closable });
export const PopconfirmPosition    = (a: { position: any })        => html`<div style="padding:60px;">${renderPopconfirm({ position: a.position })}</div>`;
export const PopconfirmTrigger     = (a: { trigger: any })         => renderPopconfirm({ trigger: a.trigger });
export const PopconfirmOpendelay   = (a: { opendelay: number })    => renderPopconfirm({ opendelay: a.opendelay });
export const PopconfirmClosedelay  = (a: { closedelay: number })   => renderPopconfirm({ closedelay: a.closedelay });
export const PopconfirmConfirmText = (a: { confirmText: string })  => renderPopconfirm({ confirmText: a.confirmText });
export const PopconfirmCancelText  = (a: { cancelText: string })   => renderPopconfirm({ cancelText: a.cancelText });
export const PopconfirmSticky      = (a: { sticky: boolean })      => renderPopconfirm({ sticky: a.sticky });

export const PopconfirmVisibleChanged = () => {
  const handle = (e: Event) => {
    const out = document.getElementById('pcVisResult');
    if (out) out.textContent = `visible: ${(e as CustomEvent).detail}`;
  };
  return html`
    <sy-popconfirm @visibleChanged=${handle}>${defaultTitle}${defaultTarget}</sy-popconfirm>
    <p id="pcVisResult">(idle)</p>
  `;
};

export const PopconfirmSelected = () => {
  const handle = (e: Event) => {
    const out = document.getElementById('pcSelResult');
    if (out) out.textContent = `selected: ${(e as CustomEvent).detail}`;
  };
  return html`
    <sy-popconfirm @selected=${handle}>${defaultTitle}${defaultTarget}</sy-popconfirm>
    <p id="pcSelResult">(idle)</p>
  `;
};

export const PopconfirmSetOpenClose = () => {
  const pcRef: Ref<HTMLSyPopconfirmElement> = createRef();
  return html`
    <sy-popconfirm ${ref(pcRef)}>${defaultTitle}${defaultTarget}</sy-popconfirm>
    <br/>
    <sy-button @click=${() => pcRef.value?.setOpen()}>setOpen()</sy-button>
    <sy-button @click=${() => pcRef.value?.setClose()}>setClose()</sy-button>
  `;
};
