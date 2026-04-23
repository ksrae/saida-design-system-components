import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ref, createRef, Ref } from 'lit/directives/ref.js';
import { Components } from '../../../components';

export interface SyToastProps extends Components.SyToast { slot?: any; }
export interface SyToastItemProps extends Components.SyToastItem { slot?: any; }

export const Toast = (a: SyToastProps) => {
  const tRef: Ref<HTMLSyToastElement> = createRef();
  return html`
    <sy-toast ${ref(tRef)} ?latestTop=${!!(a as any).latestTop} .duration=${a.duration ?? 3000}></sy-toast>
    <sy-button @click=${() => { tRef.value?.createSuccessToast({ title: 'Success', message: 'Saved!' } as any); }}>createToast('success')</sy-button>
  `;
};

export const ToastItem = (a: SyToastItemProps) => html`
  <sy-toast-item
    ?open=${!!a.open}
    ?closable=${!!a.closable}
    .position=${a.position ?? 'bottomRight'}
    .variant=${a.variant ?? 'neutral'}
    .duration=${a.duration}>
    <span slot="title">Toast Title</span>
    <span slot="message">Toast body message</span>
  </sy-toast-item>
`;

// Toast attrs
export const ToastLatestTop = (a: { latestTop: boolean }) => {
  const tRef: Ref<HTMLSyToastElement> = createRef();
  let n = 0;
  return html`
    <sy-toast ${ref(tRef)} ?latestTop=${!!a.latestTop}></sy-toast>
    <sy-button @click=${() => { n++; tRef.value?.createNeutralToast({ title: `Toast ${n}` } as any); }}>Add toast</sy-button>
  `;
};
export const ToastDuration = (a: { duration: number }) => {
  const tRef: Ref<HTMLSyToastElement> = createRef();
  return html`
    <sy-toast ${ref(tRef)} .duration=${a.duration}></sy-toast>
    <sy-button @click=${() => { tRef.value?.createNeutralToast({ title: `Duration: ${a.duration}ms` } as any); }}>Add toast</sy-button>
  `;
};

// ToastItem attrs
export const ToastItemOpen     = (a: { open: boolean })     => html`<sy-toast-item ?open=${!!a.open}><span slot="title">Title</span><span slot="message">Message</span></sy-toast-item>`;
export const ToastItemPosition = (a: { position: any })     => html`<sy-toast-item open .position=${a.position}><span slot="title">Title</span><span slot="message">Message</span></sy-toast-item>`;
export const ToastItemVariant  = (a: { variant: any })      => html`<sy-toast-item open .variant=${a.variant}><span slot="title">Title</span><span slot="message">Message</span></sy-toast-item>`;
export const ToastItemClosable = (a: { closable: boolean }) => html`<sy-toast-item open ?closable=${!!a.closable}><span slot="title">Title</span><span slot="message">Message</span></sy-toast-item>`;
export const ToastItemDuration = (a: { duration: number })  => html`<sy-toast-item open .duration=${a.duration}><span slot="title">Title</span><span slot="message">Closes in ${a.duration}ms</span></sy-toast-item>`;

// Toast methods
const renderToastMethod = (label: string, action: (el: HTMLSyToastElement) => void | Promise<void>) => {
  const tRef: Ref<HTMLSyToastElement> = createRef();
  return html`
    <sy-toast ${ref(tRef)}></sy-toast>
    <sy-button @click=${async () => { if (tRef.value) await action(tRef.value); }}>${label}</sy-button>
  `;
};

export const ToastCreateToast        = () => renderToastMethod("createToast('info', opt)", (el) => { el.createToast('info', { title: 'Info', message: 'Generic create' } as any); });
export const ToastCreateNeutralToast = () => renderToastMethod('createNeutralToast()', (el) => { el.createNeutralToast({ title: 'Neutral', message: 'Ok' } as any); });
export const ToastCreateSuccessToast = () => renderToastMethod('createSuccessToast()', (el) => { el.createSuccessToast({ title: 'Success', message: 'Saved' } as any); });
export const ToastCreateErrorToast   = () => renderToastMethod('createErrorToast()',   (el) => { el.createErrorToast({ title: 'Error', message: 'Failed' } as any); });
export const ToastCreateInfoToast    = () => renderToastMethod('createInfoToast()',    (el) => { el.createInfoToast({ title: 'Info', message: 'FYI' } as any); });
export const ToastCreateWarningToast = () => renderToastMethod('createWarningToast()', (el) => { el.createWarningToast({ title: 'Warning', message: 'Heads up' } as any); });

export const ToastCloseToast = () => {
  const tRef: Ref<HTMLSyToastElement> = createRef();
  return html`
    <sy-toast ${ref(tRef)}></sy-toast>
    <sy-button @click=${async () => {
      const t = tRef.value;
      if (!t) return;
      await t.createNeutralToast({ title: 'Will close' } as any);
      setTimeout(() => {
        const last = t.querySelector('sy-toast-item:last-of-type') as HTMLSyToastItemElement | null;
        if (last) t.closeToast(last);
      }, 500);
    }}>Create & close last</sy-button>
  `;
};

// ToastItem methods
const renderItemMethod = (label: string, action: (el: HTMLSyToastItemElement) => void | Promise<void>) => {
  const iRef: Ref<HTMLSyToastItemElement> = createRef();
  return html`
    <sy-toast-item ${ref(iRef)} variant="info"><span slot="title">Title</span><span slot="message">Message</span></sy-toast-item>
    <sy-button @click=${async () => { if (iRef.value) await action(iRef.value); }}>${label}</sy-button>
  `;
};

export const ToastItemShow  = () => renderItemMethod('show()',  async (el) => { await el.show(); });
export const ToastItemClose = () => renderItemMethod('close()', async (el) => { await el.show(); setTimeout(() => el.close(), 800); });

void ifDefined;
