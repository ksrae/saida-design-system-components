import { html, ifDefined, ref, createRef, Ref } from '../../../utils/story-template';
import { Components } from '../../../components';

export interface SyToastProps extends Components.SyToast { slot?: any; }
export interface SyToastItemProps extends Components.SyToastItem { slot?: any; }

const toastContent = (headerSlot: string, bodySlot: string, option: Record<string, unknown> = {}) => ({
  headerSlot,
  bodySlot,
  ...option,
});

export const Toast = (a: SyToastProps) => {
  const tRef: Ref<HTMLSyToastElement> = createRef();
  return html`
    <sy-toast ${ref(tRef)} ?latestTop=${!!(a as any).latestTop} .duration=${a.duration ?? 3000}></sy-toast>
    <sy-button @click=${() => { tRef.value?.createSuccessToast(toastContent('Success', 'Content: Saved successfully.')); }}>createToast('success')</sy-button>
  `;
};

export const ToastItem = (a: SyToastItemProps) => html`
  <sy-toast-item
    ?open=${!!a.open}
    ?closable=${!!a.closable}
    .position=${a.position ?? 'bottomRight'}
    .variant=${a.variant ?? 'neutral'}
    .duration=${a.duration}>
    <span slot="header">Toast Title</span>
    <span slot="body">Content: Toast body message</span>
  </sy-toast-item>
`;

// Toast attrs
export const ToastLatestTop = (a: { latestTop: boolean }) => {
  const tRef: Ref<HTMLSyToastElement> = createRef();
  let n = 0;
  return html`
    <sy-toast ${ref(tRef)} ?latestTop=${!!a.latestTop}></sy-toast>
    <sy-button @click=${() => {
      n++;
      tRef.value?.createNeutralToast(toastContent(`Toast ${n}`, `Content index: ${n}`, { duration: 0 }));
    }}>Add toast</sy-button>
  `;
};
export const ToastDuration = (a: { duration: number }) => {
  const tRef: Ref<HTMLSyToastElement> = createRef();
  return html`
    <sy-toast ${ref(tRef)} .duration=${a.duration}></sy-toast>
    <sy-button @click=${() => { tRef.value?.createNeutralToast(toastContent(`Duration: ${a.duration}ms`, `Content: This toast uses duration ${a.duration}ms.`)); }}>Add toast</sy-button>
  `;
};

// ToastItem attrs
export const ToastItemOpen     = (a: { open: boolean })     => html`<sy-toast-item ?open=${!!a.open}><span slot="header">Open state</span><span slot="body">Content: open=${String(!!a.open)}</span></sy-toast-item>`;
export const ToastItemPosition = (a: { position: any })     => html`<sy-toast-item open .position=${a.position}><span slot="header">Position</span><span slot="body">Content: position=${a.position}</span></sy-toast-item>`;
export const ToastItemVariant  = (a: { variant: any })      => html`<sy-toast-item open .variant=${a.variant}><span slot="header">Variant</span><span slot="body">Content: variant=${a.variant}</span></sy-toast-item>`;
export const ToastItemClosable = (a: { closable: boolean }) => html`<sy-toast-item open ?closable=${!!a.closable}><span slot="header">Closable</span><span slot="body">Content: closable=${String(!!a.closable)}</span></sy-toast-item>`;
export const ToastItemDuration = (a: { duration: number })  => html`<sy-toast-item open .duration=${a.duration}><span slot="header">Duration</span><span slot="body">Content: closes in ${a.duration}ms</span></sy-toast-item>`;

// Toast methods
const renderToastMethod = (label: string, action: (el: HTMLSyToastElement) => void | Promise<void>) => {
  const tRef: Ref<HTMLSyToastElement> = createRef();
  return html`
    <sy-toast ${ref(tRef)}></sy-toast>
    <sy-button @click=${async () => { if (tRef.value) await action(tRef.value); }}>${label}</sy-button>
  `;
};

export const ToastCreateToast        = () => renderToastMethod("createToast('info', opt)", (el) => { el.createToast('info', toastContent('Info', 'Content: Generic createToast call.', { duration: 0 })); });
export const ToastCreateNeutralToast = () => renderToastMethod('createNeutralToast()', (el) => { el.createNeutralToast(toastContent('Neutral', 'Content: Neutral toast created.', { duration: 0 })); });
export const ToastCreateSuccessToast = () => renderToastMethod('createSuccessToast()', (el) => { el.createSuccessToast(toastContent('Success', 'Content: Success toast created.', { duration: 0 })); });
export const ToastCreateErrorToast   = () => renderToastMethod('createErrorToast()',   (el) => { el.createErrorToast(toastContent('Error', 'Content: Error toast created.', { duration: 0 })); });
export const ToastCreateInfoToast    = () => renderToastMethod('createInfoToast()',    (el) => { el.createInfoToast(toastContent('Info', 'Content: Info toast created.', { duration: 0 })); });
export const ToastCreateWarningToast = () => renderToastMethod('createWarningToast()', (el) => { el.createWarningToast(toastContent('Warning', 'Content: Warning toast created.', { duration: 0 })); });

export const ToastCloseToast = () => {
  const tRef: Ref<HTMLSyToastElement> = createRef();
  return html`
    <sy-toast ${ref(tRef)}></sy-toast>
    <sy-button @click=${async () => {
      const t = tRef.value;
      if (!t) return;
      await t.createNeutralToast(toastContent('Will close', 'Content: This toast will close after the test delay.', { duration: 0 }));
      setTimeout(() => {
        const last = document.querySelector('sy-toast-item:last-of-type') as HTMLSyToastItemElement | null;
        if (last) t.closeToast(last);
      }, 500);
    }}>Create & close last</sy-button>
  `;
};

// ToastItem methods
const renderItemMethod = (label: string, action: (el: HTMLSyToastItemElement) => void | Promise<void>) => {
  const iRef: Ref<HTMLSyToastItemElement> = createRef();
  return html`
    <sy-toast-item ${ref(iRef)} variant="info"><span slot="header">Item method</span><span slot="body">Content: Toast item method test.</span></sy-toast-item>
    <sy-button @click=${async () => { if (iRef.value) await action(iRef.value); }}>${label}</sy-button>
  `;
};

export const ToastItemShow  = () => renderItemMethod('show()',  async (el) => { await el.show(); });
export const ToastItemClose = () => renderItemMethod('close()', async (el) => { await el.show(); setTimeout(() => el.close(), 800); });

void ifDefined;
