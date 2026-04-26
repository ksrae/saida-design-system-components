import { html, ifDefined, unsafeHTML, ref, createRef, Ref } from '../../../utils/story-template';
import { Components } from '../../../components';

export interface SyTagProps extends Components.SyTag {
  slot?: any;
  selected?: (event: CustomEvent<any>) => void;
  removed?: (event: CustomEvent<any>) => void;
}

export const Tag = ({ disabled, readonly, removable, rounded, selectable, size, variant, manualClose, slot }: SyTagProps) => html`
  <sy-tag
    ?disabled=${!!disabled}
    ?readonly=${!!readonly}
    ?removable=${!!removable}
    ?rounded=${!!rounded}
    ?selectable=${!!selectable}
    ?manualClose=${!!manualClose}
    size=${ifDefined(size)}
    variant=${ifDefined(variant)}>
    ${slot ? unsafeHTML(slot) : ''}
  </sy-tag>
`;

export const TagDisabled   = (args: { disabled: boolean })   => html`<sy-tag ?disabled=${!!args.disabled}>Disabled tag</sy-tag>`;
export const TagReadonly   = (args: { readonly: boolean })   => html`<sy-tag ?readonly=${!!args.readonly} selectable>Readonly tag</sy-tag>`;
export const TagRemovable  = (args: { removable: boolean })  => html`<sy-tag ?removable=${!!args.removable}>Removable tag</sy-tag>`;
export const TagRounded    = (args: { rounded: boolean })    => html`<sy-tag ?rounded=${!!args.rounded}>Rounded tag</sy-tag>`;
export const TagSelectable = (args: { selectable: boolean }) => html`<sy-tag ?selectable=${!!args.selectable}>Selectable tag</sy-tag>`;
export const TagSize       = (args: { size: 'small' | 'medium' | 'large' }) => html`<sy-tag size=${ifDefined(args.size)}>Sized tag</sy-tag>`;
export const TagVariant    = (args: { variant: 'gray' | 'purple' | 'blue' | 'green' | 'cyan' | 'yellow' | 'orange' | 'red' }) => html`<sy-tag variant=${ifDefined(args.variant)}>Variant tag</sy-tag>`;

export const TagSelected = () => {
  const handle = () => {
    const out = document.getElementById('tagSelectedResult');
    if (out) out.textContent = 'tag selected';
  };
  return html`
    <sy-tag selectable @selected=${handle}>Click me</sy-tag>
    <p id="tagSelectedResult">(idle)</p>
  `;
};

export const TagRemoved = () => {
  const handle = () => {
    const out = document.getElementById('tagRemovedResult');
    if (out) out.textContent = 'tag removed';
  };
  return html`
    <sy-tag removable @removed=${handle}>Remove me</sy-tag>
    <p id="tagRemovedResult">(idle)</p>
  `;
};

/**
 * Manual-close story mirrors sy-tab's pattern: clicking the X on a tag with
 * `manualClose` does NOT auto-remove the tag — it fires `removed` with
 * `isManualRemove: true`. Here we open a `sy-modal` confirmation; pressing OK
 * force-removes the tag via `tag.setRemove(true)`, Cancel keeps it intact.
 */
export const TagManualClose = (a: { manualClose: boolean }) => {
  const modalRef: Ref<HTMLSyModalElement> = createRef();
  const bodyRef: Ref<HTMLDivElement> = createRef();
  const pendingTag = { current: null as HTMLSyTagElement | null };

  const onRemoved = (e: CustomEvent<{ tag: HTMLSyTagElement; isManualRemove: boolean }>) => {
    if (!e.detail?.isManualRemove) return;
    pendingTag.current = e.detail.tag;
    if (bodyRef.value) bodyRef.value.textContent = `Remove tag "${e.detail.tag.textContent?.trim()}"?`;
    modalRef.value?.setOpen();
  };

  const onModalClosed = async (e: CustomEvent) => {
    const tag = pendingTag.current;
    pendingTag.current = null;
    if (e.detail?.event !== 'ok' || !tag) return;
    await tag.setRemove(true);
  };

  return html`
    <div style="display:flex; gap:8px; flex-wrap:wrap;">
      <sy-tag removable .manualClose=${a.manualClose} @removed=${onRemoved}>Apple</sy-tag>
      <sy-tag removable .manualClose=${a.manualClose} @removed=${onRemoved}>Banana</sy-tag>
      <sy-tag removable .manualClose=${a.manualClose} @removed=${onRemoved}>Cherry</sy-tag>
    </div>
    <p style="margin-top:8px; color:#666; font-size:12px;">
      With <code>manualClose</code> enabled, clicking the X opens a confirm modal —
      OK removes the tag, Cancel keeps it.
    </p>
    <sy-modal
      ${ref(modalRef)}
      variant="dialog"
      closable
      okText="OK"
      cancelText="Cancel"
      @closed=${onModalClosed}
    >
      <div slot="header">Remove tag</div>
      <div slot="body" ${ref(bodyRef)}>Remove tag?</div>
    </sy-modal>
  `;
};
