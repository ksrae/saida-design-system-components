import { html, ifDefined, unsafeHTML, ref, createRef, Ref } from '../../../utils/story-template';
import { Components } from '../../../components';

export interface SyButtonProps extends Components.SyButton {
  slot?: string;
  click?: (event: MouseEvent) => void;
}

/**
 * Generic single-button render used by both Overview and Attributes stories.
 * All props are optional so each attribute story can pass only what it controls.
 */
const renderButton = (args: Partial<SyButtonProps>) => html`
  <sy-button
    ?disabled=${!!args.disabled}
    .fullWidth=${!!(args as any).fullWidth}
    .iconOnly=${!!(args as any).iconOnly}
    ?loading=${!!args.loading}
    tooltip=${ifDefined((args as any).tooltip)}
    size=${ifDefined(args.size)}
    type=${ifDefined(args.type)}
    variant=${ifDefined(args.variant)}
  >${unsafeHTML(args.slot ?? 'Button')}</sy-button>
`;

export const Button = (args: SyButtonProps) => renderButton(args);

// Single shared renderer used by every single-prop attribute story.
export const ButtonAttribute = (args: Partial<SyButtonProps>) => renderButton(args);
export const ButtonDisabled  = (args: Partial<SyButtonProps>) => renderButton(args);
export const ButtonFullWidth = (args: Partial<SyButtonProps>) => renderButton(args);
export const ButtonIconOnly  = (args: Partial<SyButtonProps>) => renderButton(args);
export const ButtonLoading   = (args: Partial<SyButtonProps>) => renderButton(args);
export const ButtonSize      = (args: Partial<SyButtonProps>) => renderButton(args);
export const ButtonTooltip   = (args: Partial<SyButtonProps>) => renderButton(args);
export const ButtonVariant   = (args: Partial<SyButtonProps>) => renderButton(args);

/** Backwards-compatible alias — the legacy `justified` prop name used to live here.
 *  The attribute `full-width` is now the canonical spec surface, but the old story
 *  imports still resolve. */
export const ButtonJustified = ButtonFullWidth;

export const ButtonSlot = (args: { slot?: string }) => html`
  <sy-button>${unsafeHTML(args.slot ?? 'Button')}</sy-button>
`;

export const ButtonType = (args: { type?: 'button' | 'submit' | 'reset' }) => {
  const handleClick = (e: Event) => {
    const btn = e.currentTarget as HTMLSyButtonElement;
    if (btn.type === 'button') {
      const out = document.getElementById('formResult');
      if (out) out.textContent = 'button clicked';
    }
  };
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const out = document.getElementById('formResult');
    if (out) out.textContent = 'Form submitted!';
  };
  const handleReset = () => {
    const out = document.getElementById('formResult');
    if (out) out.textContent = 'Form reset!';
  };

  return html`
    <form id="sampleForm" style="display:flex;gap:4px;" @submit=${handleSubmit} @reset=${handleReset}>
      <sy-input type="text" name="testInput" value="test input value"></sy-input>
      <sy-button type=${ifDefined(args.type)} @click=${handleClick}>Button</sy-button>
    </form>
    <p>Result: <span id="formResult">(idle)</span></p>
  `;
};

/* -------------------- Events -------------------- */

export const ButtonClick = () => {
  const handleClick = () => {
    const out = document.getElementById('btnClickResult');
    if (out) out.textContent = 'clicked at ' + new Date().toLocaleTimeString();
  };
  return html`
    <sy-button @click=${handleClick}>Button</sy-button>
    <p>Status: <span id="btnClickResult">(idle)</span></p>
  `;
};

/* -------------------- Methods -------------------- */

export const ButtonFocusBlur = () => {
  const btnRef: Ref<HTMLSyButtonElement> = createRef();

  const updateResult = (text: string) => {
    const out = document.getElementById('btnFocusResult');
    if (out) out.textContent = text;
  };

  return html`
    <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
      <sy-button
        ${ref(btnRef)}
        @focusin=${() => updateResult('focus')}
        @focusout=${() => updateResult('blur')}
      >Target Button</sy-button>

      <sy-button
        variant="primary"
        @click=${() => btnRef.value?.setFocus()}
      >Call setFocus()</sy-button>

      <sy-button
        variant="secondary"
        @click=${() => btnRef.value?.setBlur()}
      >Call setBlur()</sy-button>
    </div>
    <p>Status: <span id="btnFocusResult">(idle)</span></p>
  `;
};

export const ButtonSetClick = () => {
  const btnRef: Ref<HTMLSyButtonElement> = createRef();

  const updateResult = () => {
    const out = document.getElementById('btnSetClickResult');
    if (out) out.textContent = 'clicked at ' + new Date().toLocaleTimeString();
  };

  return html`
    <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
      <sy-button ${ref(btnRef)} @click=${updateResult}>Target Button</sy-button>
      <sy-button variant="primary" @click=${() => btnRef.value?.setClick()}>Call setClick()</sy-button>
    </div>
    <p>Status: <span id="btnSetClickResult">(idle)</span></p>
  `;
};
