import { html, ifDefined, unsafeHTML, ref, createRef, Ref } from '../../../utils/story-template';
import { Components } from '../../../components';

export interface SyPopconfirmProps extends Components.SyPopconfirm {
  slot?: any;
  slotTitle?: any;
  visibleChanged?: (event: CustomEvent<boolean>) => void;
  selected?: (event: CustomEvent<'ok' | 'cancel'>) => void;
}

const slotOrEmpty = (s?: any) => (s ? unsafeHTML(s) : '');

// Default body for every story. Putting actual confirmation copy in the
// slot — instead of relying on the always-rendered footer alone — gives
// users a realistic preview. The text goes into the popconfirm's default
// slot (the only one the component declares).
const defaultBody = html`
  <span slot="title"><strong>Delete this item?</strong></span>
  <p>This action cannot be undone. Are you sure you want to continue?</p>
`;

// sy-popconfirm anchors itself to its `parentElement` (parentDom). When the
// popconfirm is a direct child of the Storybook canvas, parentDom is the
// huge canvas div, so the popup ends up positioned around the canvas edge —
// often off-screen, which looks like "nothing happened."
//
// We wrap the popconfirm in a small <sy-button> trigger so:
//   - parentDom is the button → position calculations land on a small,
//     visible anchor instead of the canvas.
//   - With `trigger="click"` the button is the natural trigger.
//   - With any other trigger value, the @click handler on the button calls
//     setOpen() directly.
//
// Most stories don't need an external Close button — users dismiss via the
// OK/Cancel buttons inside the popup. Only stories that benefit from a
// dedicated close handle (Trigger when set to "none", and the Methods
// story) opt in via `withClose: true`.
const renderPopconfirm = (
  a: Partial<SyPopconfirmProps>,
  body = defaultBody,
  opts: { withClose?: boolean } = {},
) => {
  const pcRef: Ref<HTMLSyPopconfirmElement> = createRef();
  return html`
    <sy-button @click=${() => pcRef.value?.setOpen()}>
      Click to Open
      <sy-popconfirm
        ${ref(pcRef)}
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
    </sy-button>
    ${opts.withClose
      ? html`<sy-button
          @click=${(e: MouseEvent) => { e.stopPropagation(); pcRef.value?.setClose(); }}
        >Click to Close</sy-button>`
      : ''}
  `;
};

export const Popconfirm = (a: SyPopconfirmProps) =>
  renderPopconfirm(
    a,
    html`${slotOrEmpty(a.slotTitle)}${slotOrEmpty(a.slot)}` || defaultBody,
  );

export const PopconfirmArrow       = (a: { arrow: boolean })       => renderPopconfirm({ arrow: a.arrow });
export const PopconfirmClosable    = (a: { closable: boolean })    => html`
  <h4>How to test</h4>
  <p>
    With <code>closable=true</code>, the popup dismisses on either an outside
    click (anywhere outside the trigger and the popup) or pressing
    <kbd>Esc</kbd>. With <code>closable=false</code>, both are ignored — only
    the OK / Cancel buttons close the popup. Toggle the control and try both
    interactions.
  </p>
  ${renderPopconfirm({ closable: a.closable })}
`;
export const PopconfirmPosition    = (a: { position: any })        => renderPopconfirm({ position: a.position });
export const PopconfirmTrigger     = (a: { trigger: any })         => html`
  <h4>How to test</h4>
  <p>
    <code>trigger="click"</code> opens the popup when the trigger button is
    clicked. <code>trigger="none"</code> disables the auto-trigger entirely
    so use the explicit <strong>Click to Open</strong> /
    <strong>Click to Close</strong> buttons to drive setOpen() / setClose()
    yourself.
  </p>
  ${renderPopconfirm({ trigger: a.trigger }, defaultBody, { withClose: true })}
`;
export const PopconfirmOpendelay   = (a: { opendelay: number })    => renderPopconfirm({ opendelay: a.opendelay });
export const PopconfirmClosedelay  = (a: { closedelay: number })   => renderPopconfirm({ closedelay: a.closedelay });
export const PopconfirmConfirmText = (a: { confirmText: string })  => renderPopconfirm({ confirmText: a.confirmText });
export const PopconfirmCancelText  = (a: { cancelText: string })   => renderPopconfirm({ cancelText: a.cancelText });
export const PopconfirmSticky      = (a: { sticky: boolean })      => renderPopconfirm({ sticky: a.sticky });

export const PopconfirmVisibleChanged = () => {
  const pcRef: Ref<HTMLSyPopconfirmElement> = createRef();
  const handle = (e: Event) => {
    const out = document.getElementById('pcVisResult');
    if (out) out.textContent = `visible: ${(e as CustomEvent).detail}`;
  };
  return html`
    <sy-button @click=${() => pcRef.value?.setOpen()}>
      Click to Open
      <sy-popconfirm ${ref(pcRef)} @visibleChanged=${handle}>${defaultBody}</sy-popconfirm>
    </sy-button>
    <p id="pcVisResult">(idle)</p>
  `;
};

export const PopconfirmSelected = () => {
  const pcRef: Ref<HTMLSyPopconfirmElement> = createRef();
  const handle = (e: Event) => {
    const out = document.getElementById('pcSelResult');
    if (out) out.textContent = `selected: ${(e as CustomEvent).detail}`;
  };
  return html`
    <sy-button @click=${() => pcRef.value?.setOpen()}>
      Click to Open
      <sy-popconfirm ${ref(pcRef)} @selected=${handle}>${defaultBody}</sy-popconfirm>
    </sy-button>
    <p id="pcSelResult">(idle)</p>
  `;
};

export const PopconfirmSetOpenClose = () => {
  const pcRef: Ref<HTMLSyPopconfirmElement> = createRef();
  // The popconfirm sits inside the first sy-button so it has a small,
  // visible anchor for positioning. The setOpen / setClose buttons are
  // separate siblings — clicks on them must NOT bubble to the popconfirm's
  // parentDom (the anchor button), or its toggle handler would reverse
  // whatever setOpen/setClose just did.
  return html`
    <sy-button>
      Anchor
      <sy-popconfirm ${ref(pcRef)}>${defaultBody}</sy-popconfirm>
    </sy-button>
    <br/>
    <sy-button
      @click=${(e: MouseEvent) => { e.stopPropagation(); pcRef.value?.setOpen(); }}
    >setOpen()</sy-button>
    <sy-button
      @click=${(e: MouseEvent) => { e.stopPropagation(); pcRef.value?.setClose(); }}
    >setClose()</sy-button>
  `;
};
