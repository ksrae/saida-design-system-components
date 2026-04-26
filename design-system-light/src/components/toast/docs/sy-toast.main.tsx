import { html } from '../../../utils/story-template';
import { Components } from '../../../components';

export interface SyToastProps extends Components.SyToast { slot?: any; }
export interface SyToastItemProps extends Components.SyToastItem { slot?: any; }

const toastContent = (headerSlot: string, bodySlot: string, option: Record<string, unknown> = {}) => ({
  headerSlot,
  bodySlot,
  ...option,
});

// Helper used by every story that needs a handle on the rendered <sy-toast>
// (or <sy-toast-item>). Each story wraps its body in a single <div> so the
// click handler can locate the element from `e.currentTarget.parentElement`
// — that's the readable, ref-free pattern we want users to copy.
const findInScope = <K extends keyof HTMLElementTagNameMap>(e: Event, tag: K): HTMLElementTagNameMap[K] | null => {
  const scope = (e.currentTarget as HTMLElement).parentElement;
  return scope?.querySelector(tag) ?? null;
};

export const Toast = (a: SyToastProps) => html`
  <div>
    <sy-toast ?latestTop=${!!(a as any).latestTop} .duration=${a.duration ?? 3000}></sy-toast>
    <sy-button @click=${(e: Event) => {
      findInScope(e, 'sy-toast')?.createSuccessToast(toastContent('Success', 'Content: Saved successfully.'));
    }}>createToast('success')</sy-button>
  </div>
`;

// Toast-item overview: the item is rendered closed; the buttons drive its
// lifecycle so the demo behaves like real usage (no toast that's stuck open).
export const ToastItem = (a: SyToastItemProps) => html`
  <div>
    <sy-toast-item
      ?closable=${!!a.closable}
      .position=${a.position ?? 'bottomRight'}
      .variant=${a.variant ?? 'neutral'}
      .duration=${a.duration ?? 3000}>
      <span slot="header">Toast Title</span>
      <span slot="body">Content: Toast body message</span>
    </sy-toast-item>
    <sy-button @click=${async (e: Event) => { await findInScope(e, 'sy-toast-item')?.show(); }}>Show</sy-button>
    <sy-button @click=${async (e: Event) => { await findInScope(e, 'sy-toast-item')?.close(); }}>Close</sy-button>
  </div>
`;

// Toast attrs
export const ToastLatestTop = (a: { latestTop: boolean }) => {
  let n = 0;
  return html`
    <div>
      <sy-toast ?latestTop=${!!a.latestTop}></sy-toast>
      <sy-button @click=${(e: Event) => {
        n++;
        findInScope(e, 'sy-toast')?.createNeutralToast(toastContent(`Toast ${n}`, `Content index: ${n}`));
      }}>Add toast</sy-button>
    </div>
  `;
};

export const ToastDuration = (a: { duration: number }) => html`
  <div>
    <sy-toast .duration=${a.duration}></sy-toast>
    <sy-button @click=${(e: Event) => {
      findInScope(e, 'sy-toast')?.createNeutralToast(toastContent(`Duration: ${a.duration}ms`, `Content: This toast uses duration ${a.duration}ms.`));
    }}>Add toast</sy-button>
  </div>
`;

// ToastItem attrs — driven through <sy-toast> so each click spawns a fresh
// item and the item auto-closes via the manager's default duration. This
// matches the realistic API surface (apps don't hand-construct items).
export const ToastItemPosition = (a: { position: any }) => html`
  <div>
    <sy-toast></sy-toast>
    <sy-button @click=${(e: Event) => {
      findInScope(e, 'sy-toast')?.createNeutralToast(toastContent('Position', `Content: position=${a.position}`, { position: a.position }));
    }}>Show toast at ${a.position}</sy-button>
  </div>
`;

export const ToastItemVariant = (a: { variant: 'neutral' | 'success' | 'error' | 'info' | 'warning' }) => html`
  <div>
    <sy-toast></sy-toast>
    <sy-button @click=${(e: Event) => {
      findInScope(e, 'sy-toast')?.createToast(a.variant, toastContent('Variant', `Content: variant=${a.variant}`));
    }}>Show ${a.variant} toast</sy-button>
  </div>
`;

export const ToastItemClosable = (a: { closable: boolean }) => html`
  <div>
    <sy-toast></sy-toast>
    <sy-button @click=${(e: Event) => {
      findInScope(e, 'sy-toast')?.createNeutralToast(toastContent('Closable', `Content: closable=${String(!!a.closable)}`, { closable: a.closable }));
    }}>Show toast (closable=${String(!!a.closable)})</sy-button>
  </div>
`;

export const ToastItemDuration = (a: { duration: number }) => html`
  <div>
    <sy-toast></sy-toast>
    <sy-button @click=${(e: Event) => {
      findInScope(e, 'sy-toast')?.createNeutralToast(toastContent('Duration', `Content: closes in ${a.duration}ms`, { duration: a.duration }));
    }}>Show toast (${a.duration}ms)</sy-button>
  </div>
`;

// Toast methods
const renderToastMethod = (label: string, action: (el: HTMLSyToastElement) => void | Promise<void>) => html`
  <div>
    <sy-toast></sy-toast>
    <sy-button @click=${async (e: Event) => {
      const toast = findInScope(e, 'sy-toast');
      if (toast) await action(toast);
    }}>${label}</sy-button>
  </div>
`;

export const ToastCreateToast        = () => renderToastMethod("createToast('info', opt)", (el) => { el.createToast('info', toastContent('Info', 'Content: Generic createToast call.')); });
export const ToastCreateNeutralToast = () => renderToastMethod('createNeutralToast()', (el) => { el.createNeutralToast(toastContent('Neutral', 'Content: Neutral toast created.')); });
export const ToastCreateSuccessToast = () => renderToastMethod('createSuccessToast()', (el) => { el.createSuccessToast(toastContent('Success', 'Content: Success toast created.')); });
export const ToastCreateErrorToast   = () => renderToastMethod('createErrorToast()',   (el) => { el.createErrorToast(toastContent('Error', 'Content: Error toast created.')); });
export const ToastCreateInfoToast    = () => renderToastMethod('createInfoToast()',    (el) => { el.createInfoToast(toastContent('Info', 'Content: Info toast created.')); });
export const ToastCreateWarningToast = () => renderToastMethod('createWarningToast()', (el) => { el.createWarningToast(toastContent('Warning', 'Content: Warning toast created.')); });

// closeToast() demo — duration is bumped to 10s so the toast lingers and the
// Close button has something to act on. Click Create, then click Close: the
// manager's closeToast() dismisses the most recent item before the timer fires.
export const ToastCloseToast = () => html`
  <div>
    <sy-toast .duration=${10000}></sy-toast>
    <sy-button @click=${(e: Event) => {
      findInScope(e, 'sy-toast')?.createNeutralToast(toastContent('Will close', 'Content: Click "Close last toast" to dismiss before the 10s timer fires.'));
    }}>Create toast</sy-button>
    <sy-button @click=${(e: Event) => {
      const toast = findInScope(e, 'sy-toast');
      const last = document.querySelector('sy-toast-item:last-of-type') as HTMLSyToastItemElement | null;
      if (toast && last) toast.closeToast(last);
    }}>Close last toast</sy-button>
  </div>
`;

