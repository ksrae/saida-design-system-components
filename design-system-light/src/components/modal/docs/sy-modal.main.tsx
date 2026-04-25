import { html, ifDefined, unsafeHTML, ref, createRef, Ref } from '../../../utils/story-template';
import { Components } from '../../../components';

export interface SyModalProps extends Components.SyModal {
  slotHeader?: string;
  slotBody?: string;
  slotFooter?: string;
  closed?: (event: CustomEvent<any>) => void;
}

const slotOrEmpty = (s?: string) => (s ? unsafeHTML(s) : '');

const renderModalDemo = (
  args: Partial<SyModalProps> & { maskless?: boolean },
  body = html`<div slot="body">Modal demo body</div>`,
) => {
  const modalRef: Ref<HTMLSyModalElement> = createRef();
  return html`
    <sy-modal
      ${ref(modalRef)}
      ?closable=${!!args.closable}
      ?enableModalMaximize=${!!args.enableModalMaximize}
      ?hideFooter=${!!args.hideFooter}
      ?maskClosable=${!!args.maskClosable}
      ?maskless=${!!args.maskless}
      ?open=${!!args.open}
      cancelText=${ifDefined(args.cancelText)}
      okText=${ifDefined(args.okText)}
      width=${ifDefined(args.width as any)}
      top=${ifDefined(args.top as any)}
      left=${ifDefined(args.left as any)}
      variant=${ifDefined(args.variant)}
    >
      ${body}
    </sy-modal>
    <sy-button @click=${() => modalRef.value?.setOpen()}>Click to Open</sy-button>
  `;
};

export const Modal = (args: SyModalProps) => {
  const modalRef: Ref<HTMLSyModalElement> = createRef();
  return html`
    <sy-modal
      ${ref(modalRef)}
      ?closable=${!!args.closable}
      ?enableModalMaximize=${!!args.enableModalMaximize}
      ?hideFooter=${!!args.hideFooter}
      ?maskClosable=${!!args.maskClosable}
      ?maskless=${!!(args as any).maskless}
      ?open=${!!args.open}
      cancelText=${ifDefined(args.cancelText)}
      okText=${ifDefined(args.okText)}
      width=${ifDefined(args.width as any)}
      top=${ifDefined(args.top as any)}
      left=${ifDefined(args.left as any)}
      variant=${ifDefined(args.variant)}
    >
      ${slotOrEmpty(args.slotHeader)}
      ${slotOrEmpty(args.slotBody)}
      ${slotOrEmpty(args.slotFooter)}
    </sy-modal>
    <sy-button @click=${() => modalRef.value?.setOpen()}>Click to Open</sy-button>
  `;
};

export const ModalCanceltext           = (args: { cancelText: string })           => renderModalDemo(args, html`<div slot="body">Customizing cancel button.</div>`);
export const ModalClosable             = (args: { closable: boolean })            => renderModalDemo(args, html`<div slot="body">Click the close button on the right of the header to close.</div>`);
export const ModalEnableModalMaximize  = (args: { enableModalMaximize: boolean }) => renderModalDemo({ ...args, variant: 'modal' }, html`<div slot="body">Try to click the maximum button.</div>`);
export const ModalHideFooter           = (args: { hideFooter: boolean })          => renderModalDemo({ ...args, closable: true }, html`<div slot="body">This modal does not have footer.</div>`);
export const ModalMaskclosable         = (args: { maskClosable: boolean })        => renderModalDemo(args, html`<div slot="body">Allows to click the mask to close modal.</div>`);
export const ModalMaskless             = (args: { maskless: boolean })            => renderModalDemo(args, html`<div slot="body">There no mask. Maskclosable will be ignored.</div>`);
export const ModalOktext               = (args: { okText: string })               => renderModalDemo(args, html`<div slot="body">Customizing Ok button.</div>`);
export const ModalPosition             = (args: { top: number; left: number })    => renderModalDemo(args, html`<div slot="body">Sets top, left to set the modal position. Default position is center.</div>`);
export const ModalWidth                = (args: { width: number })                => renderModalDemo(args, html`<div slot="body">Set width of modal.</div>`);
export const ModalVariant              = (args: { variant: 'modal'|'dialog' })    => renderModalDemo(args, html`<div slot="body">Modal Variant</div>`);

export const ModalOpen = (args: { open: boolean }) => html`
  <p>Sets control to true to open a modal, Manually setting control to false is required. to reopen.</p>
  <sy-modal ?open=${!!args.open}>
    <div slot="body">Set open to display modal.</div>
  </sy-modal>
`;

export const ModalSlot = (args: { slotHeader: any; slotBody: any; slotFooter: any }) => {
  const modalRef: Ref<HTMLSyModalElement> = createRef();
  return html`
    <sy-modal ${ref(modalRef)} ?closable=${true}>
      <div slot="header">${unsafeHTML(String(args.slotHeader ?? ''))}</div>
      <div slot="body">${unsafeHTML(String(args.slotBody ?? ''))}</div>
      <div slot="footer">${unsafeHTML(String(args.slotFooter ?? ''))}</div>
    </sy-modal>
    <sy-button @click=${() => modalRef.value?.setOpen()}>Click to Open</sy-button>
  `;
};

export const ModalTriggerButtons = () => {
  const modalRef: Ref<HTMLSyModalElement> = createRef();
  const handleClosed = (e: Event) => {
    const out = document.getElementById('modalTriggerResult');
    const detail = (e as CustomEvent).detail ?? {};
    let text = `${detail.event} is selected.`;
    if (detail.value) text += ` value (${detail.value}) is included.`;
    if (out) out.textContent = text;
  };
  return html`
    <sy-modal ${ref(modalRef)} @closed=${handleClosed}>
      <div slot="body">
        Trigger buttons<br/>
        <sy-button variant="secondary" @click=${() => modalRef.value?.setOk('ok value')}>Click Ok</sy-button>
        <sy-button @click=${() => modalRef.value?.setCancel('cancel value')}>Click Cancel</sy-button>
        <sy-button variant="primary" @click=${() => modalRef.value?.setClose('close value')}>Click Close</sy-button>
      </div>
    </sy-modal>
    <sy-button @click=${() => modalRef.value?.setOpen()}>Click Open</sy-button>
    <p id="modalTriggerResult">(idle)</p>
  `;
};

const renderSingleTrigger = (
  method: 'setOk' | 'setCancel' | 'setClose',
  label: string,
  variant: 'primary' | 'secondary' | undefined,
  resultId: string,
) => {
  const modalRef: Ref<HTMLSyModalElement> = createRef();
  const handleClosed = (e: Event) => {
    const out = document.getElementById(resultId);
    const detail = (e as CustomEvent).detail ?? {};
    let text = `${detail.event} is selected.`;
    if (detail.value) text += ` value (${detail.value}) is included.`;
    if (out) out.textContent = text;
  };
  const value = `${method.replace('set', '').toLowerCase()} value`;
  return html`
    <sy-modal ${ref(modalRef)} @closed=${handleClosed}>
      <div slot="body">
        Calls <code>${method}()</code> on the modal.<br/>
        <sy-button
          variant=${ifDefined(variant)}
          @click=${() => (modalRef.value as any)?.[method]?.(value)}
        >${label}</sy-button>
      </div>
    </sy-modal>
    <sy-button @click=${() => modalRef.value?.setOpen()}>Click Open</sy-button>
    <p id=${resultId}>(idle)</p>
  `;
};

export const ModalSetOk     = () => renderSingleTrigger('setOk',     'Click Ok',     'secondary', 'modalSetOkResult');
export const ModalSetCancel = () => renderSingleTrigger('setCancel', 'Click Cancel', undefined,   'modalSetCancelResult');
export const ModalSetClose  = () => renderSingleTrigger('setClose',  'Click Close',  'primary',   'modalSetCloseResult');

export const ModalClosed = () => {
  const modalRef: Ref<HTMLSyModalElement> = createRef();
  const handleClosed = (e: Event) => {
    const out = document.getElementById('modalClosedResult');
    if (out) out.textContent = `${(e as CustomEvent).detail?.event} is selected`;
  };
  return html`
    <sy-modal ${ref(modalRef)} maskclosable closable @closed=${handleClosed}>
      <div slot="body">Close Event emits.</div>
    </sy-modal>
    <p id="modalClosedResult">(idle)</p>
    <br/>
    <sy-button @click=${() => modalRef.value?.setOpen()}>Click to Open</sy-button>
  `;
};

export const NestedModal = () => {
  const baseRef: Ref<HTMLSyModalElement> = createRef();
  const nestedRef: Ref<HTMLSyModalElement> = createRef();
  return html`
    <sy-modal ${ref(baseRef)} closable width="500">
      <div slot="body">
        <sy-button @click=${() => nestedRef.value?.setOpen()}>Click to Open Nested modal</sy-button>
      </div>
    </sy-modal>
    <sy-modal ${ref(nestedRef)} closable>
      <div slot="body">Nested modal.</div>
    </sy-modal>
    <br/>
    <sy-button @click=${() => baseRef.value?.setOpen()}>Click to Open Modal</sy-button>
  `;
};
