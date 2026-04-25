import { html, unsafeHTML } from '../../../utils/story-template';
import { Components } from '../../../components';
import { clearElements } from '../../clear-element';

export interface SyInlineMessageProps extends Components.SyInlineMessage {
  slot?: any;
  btnClick?: (event: CustomEvent<MouseEvent>) => void;
}

/**
 * Wrap each story's inline-message inside a trigger button so the user can
 * click an obvious target instead of the empty story background. Also call
 * clearElements() so previously-opened messages from other stories are
 * removed when navigating between menu items.
 */
const clickTrigger = (pageTitle: string, label: string, inner: ReturnType<typeof html>) => {
  clearElements(pageTitle);
  return html`
    <sy-button>
      ${label}
      ${inner}
    </sy-button>
  `;
};

export const InlineMessage = ({ variant, message, showIcon, open, trigger, btnLabel, position, sticky, slot }: SyInlineMessageProps) => {
  clearElements('InlineMessage/Overview');
  return html`
    <sy-button>
      Click to open message
      <sy-inline-message
        variant=${variant}
        message=${message}
        .showIcon=${showIcon}
        ?open=${open}
        trigger=${trigger}
        .btnLabel=${btnLabel}
        position=${position}
        ?sticky=${sticky}>
        ${unsafeHTML(slot)}
      </sy-inline-message>
    </sy-button>
  `;
};

export const InlineMessageVariant = (args: { variant: 'info' | 'success' | 'warning' | 'error' }) =>
  clickTrigger('InlineMessage/Attributes/Variant', 'Click to open message', html`
    <sy-inline-message variant=${args.variant} message="Variant demo" .btnLabel=${'Click'} showIcon></sy-inline-message>
  `);

export const InlineMessageMessage = (args: { message: string }) =>
  clickTrigger('InlineMessage/Attributes/Message', 'Click to open message', html`
    <sy-inline-message message=${args.message} .btnLabel=${'Click'}></sy-inline-message>
  `);

export const InlineMessageShowIcon = (args: { showIcon: boolean }) =>
  clickTrigger('InlineMessage/Attributes/Show Icon', 'Click to open message', html`
    <sy-inline-message message="Icon demo" .showIcon=${args.showIcon} .btnLabel=${'Click'}></sy-inline-message>
  `);

export const InlineMessageOpen = (args: { open: boolean }) =>
  clickTrigger('InlineMessage/Attributes/Open', 'Click to open message', html`
    <sy-inline-message message="Open demo" .btnLabel=${'Click'} ?open=${args.open}></sy-inline-message>
  `);

/**
 * Trigger story: renders two buttons so both `click` and `focusout` triggers
 * are actually testable. The `focusout` parent needs focus first, then
 * lose focus — so a second button is provided to move focus off the trigger.
 */
export const InlineMessageTrigger = (args: { trigger: 'click' | 'focusout' }) => {
  clearElements('InlineMessage/Attributes/Trigger');
  if (args.trigger === 'focusout') {
    return html`
      <p>Step 1: click/tab into the left button to focus it. Step 2: click the right button (or tab away) to blur —
      the <code>focusout</code> trigger opens the message.</p>
      <div style="display:flex; gap:12px; align-items:center;">
        <sy-button>
          Focus me first
          <sy-inline-message message="Focusout trigger demo" .btnLabel=${'Close'} trigger="focusout"></sy-inline-message>
        </sy-button>
        <sy-button variant="primary">Click to move focus away</sy-button>
      </div>
    `;
  }
  return html`
    <p>Click the button below — <code>click</code> trigger toggles the message.</p>
    <sy-button>
      Click to open message
      <sy-inline-message message="Click trigger demo" .btnLabel=${'Close'} trigger="click"></sy-inline-message>
    </sy-button>
  `;
};

export const InlineMessageBtnLabel = (args: { btnLabel: string }) =>
  clickTrigger('InlineMessage/Attributes/Btn Label', 'Click to open message', html`
    <sy-inline-message message="Btn label demo" .btnLabel=${args.btnLabel}></sy-inline-message>
  `);

export const InlineMessagePosition = (args: { position: 'top' | 'bottom' | 'left' | 'right' }) => {
  clearElements('InlineMessage/Attributes/Position');
  return html`
    <div style="padding: 80px; display: flex; justify-content: center;">
      <sy-button>
        Click to open message
        <sy-inline-message message="Position demo" .btnLabel=${'Click'} position=${args.position}></sy-inline-message>
      </sy-button>
    </div>
  `;
};

export const InlineMessageSticky = (args: { sticky: boolean }) =>
  clickTrigger('InlineMessage/Attributes/Sticky', 'Click to open message', html`
    <sy-inline-message message="Sticky demo" .btnLabel=${'Click'} ?sticky=${args.sticky}></sy-inline-message>
  `);

export const InlineMessageBtnClick = () => {
  clearElements('InlineMessage/Events/Btn Click');
  const handle = () => {
    const out = document.getElementById('imBtnClickResult');
    if (out) out.textContent = 'btnClick fired at ' + new Date().toLocaleTimeString();
  };
  return html`
    <sy-button>
      Click to open message
      <sy-inline-message message="Click the button" .btnLabel=${'Action'} @btnClick=${handle}></sy-inline-message>
    </sy-button>
    <p style="margin-top:12px;">Status: <span id="imBtnClickResult">(idle)</span></p>
  `;
};

