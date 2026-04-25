import { html, ifDefined, unsafeHTML, ref, createRef, Ref } from '../../../utils/story-template';
import { Components } from '../../../components';

export interface SyPopoverProps extends Components.SyPopover {
  slot?: any;
}

const defaultBody = html`<span>Popover body</span>`;

// sy-popover anchors itself to its `parentElement` (parentDom). When the
// popover is a direct child of the Storybook canvas, parentDom is the huge
// canvas div, so the popup is positioned around the canvas edge and is
// effectively invisible.
//
// We wrap the popover in a small <sy-button> trigger so:
//   - parentDom is the button → position calculations land on a small,
//     visible anchor.
//   - `trigger="hover" | "click" | "focus"` use the listeners sy-popover
//     wires onto its parent (the button) directly.
//   - For `trigger="null"` (or any other value) the @click handler on the
//     anchor button calls setOpen() so the popover still opens for testing.
//
// Most stories don't need an external Close button — the popover dismisses
// on outside click / hover-leave / blur depending on trigger. Only stories
// where the close action needs explicit triggering (Trigger story when set
// to "null", and the Methods story) opt in via `withClose: true`.
const renderPopover = (
  a: Partial<SyPopoverProps>,
  body = defaultBody,
  opts: { withClose?: boolean } = {},
) => {
  const poRef: Ref<HTMLSyPopoverElement> = createRef();
  return html`
    <sy-button @click=${() => poRef.value?.setOpen()}>
      Click to Open
      <sy-popover
        ${ref(poRef)}
        ?arrow=${!!a.arrow}
        ?open=${!!a.open}
        ?sticky=${!!a.sticky}
        position=${ifDefined(a.position)}
        trigger=${ifDefined(a.trigger)}
        opendelay=${ifDefined(a.opendelay as any)}
        closedelay=${ifDefined(a.closedelay as any)}
      >${body}</sy-popover>
    </sy-button>
    ${opts.withClose
      ? html`<sy-button
          @click=${(e: MouseEvent) => { e.stopPropagation(); poRef.value?.setClose(); }}
        >Click to Close</sy-button>`
      : ''}
  `;
};

// Wrap the unsafeHTML interpolation in a fresh html`` template so the body
// argument stays a VNode (renderPopover's `body` parameter type is inferred
// from defaultBody, which is a VNode). Passing the raw UnsafeHtml sentinel
// directly was a type error: `UnsafeHtml` doesn't satisfy the VNode shape.
export const Popover = (a: SyPopoverProps) =>
  renderPopover(a, a.slot ? html`${unsafeHTML(a.slot)}` : defaultBody);

export const PopoverArrow      = (a: { arrow: boolean })          => renderPopover({ arrow: a.arrow });
export const PopoverOpen       = (a: { open: boolean })           => renderPopover({ open: a.open });
export const PopoverPosition   = (a: { position: string })        => renderPopover({ position: a.position as any });
export const PopoverTrigger    = (a: { trigger: any })            => html`
  <h4>How to test</h4>
  <p>
    Try each <code>trigger</code> value: <code>"hover"</code> opens on
    pointer-enter, <code>"click"</code> on click, <code>"focus"</code> on
    keyboard focus of the anchor button. With <code>"null"</code> the
    component does not auto-trigger — drive it manually via the
    <strong>Click to Open</strong> / <strong>Click to Close</strong>
    buttons (which call setOpen() / setClose()).
  </p>
  ${renderPopover({ trigger: a.trigger }, defaultBody, { withClose: true })}
`;
export const PopoverOpendelay  = (a: { opendelay: number })       => renderPopover({ opendelay: a.opendelay });
export const PopoverClosedelay = (a: { closedelay: number })      => renderPopover({ closedelay: a.closedelay });
export const PopoverSticky     = (a: { sticky: boolean })         => renderPopover({ sticky: a.sticky });

export const PopoverSetOpenClose = () => {
  const poRef: Ref<HTMLSyPopoverElement> = createRef();
  // The popover sits inside the first sy-button so it has a small visible
  // anchor for positioning. The setOpen / setClose buttons are separate
  // siblings — clicks on them must NOT bubble to the popover's parentDom
  // (the anchor button), otherwise the click trigger would toggle the
  // popup back and immediately reverse the method call.
  //
  // trigger is hard-coded to "click" here. The component default is
  // "hover", which means just moving the cursor across the anchor (or
  // either of the method buttons next to it) opens the popover —
  // making it impossible to isolate what setOpen() / setClose() actually
  // did. With "click" the popup only reacts to deliberate input.
  return html`
    <sy-button>
      Anchor
      <sy-popover ${ref(poRef)} trigger="click"><span>Popover body</span></sy-popover>
    </sy-button>
    <br/>
    <sy-button
      @click=${(e: MouseEvent) => { e.stopPropagation(); poRef.value?.setOpen(); }}
    >setOpen()</sy-button>
    <sy-button
      @click=${(e: MouseEvent) => { e.stopPropagation(); poRef.value?.setClose(); }}
    >setClose()</sy-button>
  `;
};
