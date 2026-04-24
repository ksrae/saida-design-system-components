import { Component, h, Prop, State, Method, Element, Watch, AttachInternals } from '@stencil/core';
import { fnAssignPropFromAlias, fnFindClosestParentByTagName, fnGetAssignedNodesContent } from '../../utils/utils';
import { ButtonGroupState } from '../button-group';

/**
 * sy-button — trigger for actions or form submission.
 *
 * Spec: design-system-specs/components/button.yaml
 *
 * Form-associated: participates in native <form> submit/reset flows via ElementInternals.
 * Install a capture-phase submit guard on document so custom SAIDA form controls
 * (checkbox, radio, select, input, …) can block submission even when the browser's
 * form-association wiring is late.
 */
@Component({
  tag: 'sy-button',
  styleUrl: 'sy-button.scss',
  shadow: false,
  scoped: true,
  formAssociated: true,
})
export class SyButton {
  @Element() host!: HTMLSyButtonElement;
  @AttachInternals() internals!: ElementInternals;

  private formSubmitGuard?: (e: Event) => void;

  // --- Public Properties (spec: attributes) ---
  @Prop({ reflect: true }) disabled: boolean = false;
  @Prop({ reflect: true }) loading: boolean = false;
  @Prop({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';
  @Prop({ reflect: true }) variant: 'default' | 'primary' | 'secondary' | 'borderless' = 'default';

  /** Expand the button to the parent container's full width. Spec name: `full-width`. */
  @Prop({ reflect: true, attribute: 'full-width', mutable: true }) fullWidth: boolean = false;

  /** Render the button without its text label (icon-only). Spec name: `icon-only`. */
  @Prop({ reflect: true, attribute: 'icon-only', mutable: true }) iconOnly: boolean = false;

  /** Tooltip text exposed via the native `title` attribute. Required for icon-only buttons. */
  @Prop() tooltip: string = '';

  /** Native button type — drives form submit/reset behaviour. */
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';

  /** Native formnovalidate — skip form validation when this button submits. */
  @Prop() formnovalidate: boolean = false;

  // --- Private State ---
  @State() buttonGroup: boolean = false;
  @State() vertical: boolean = false;
  @State() first: boolean = false;
  @State() last: boolean = false;
  @State() private hasContent: boolean = false;
  @State() private isInsideHeader: boolean = false;
  /** Mirror of `disabled` that can be flipped by `formDisabledCallback` (fieldset disabled). */
  @State() private internalDisabled: boolean = false;

  // --- Lifecycle ---
  connectedCallback() {
    this.installFormSubmitGuard();
  }

  disconnectedCallback() {
    this.removeFormSubmitGuard();
  }

  componentWillLoad() {
    // Accept legacy `justified` attribute as a fallback for `full-width`. Existing
    // consumers using the old attribute continue to work while we migrate their
    // markup. Spec rule #6: document-based naming wins; we coexist temporarily.
    const legacyJustified = fnAssignPropFromAlias<boolean>(this.host, 'justified');
    if (legacyJustified !== null && legacyJustified !== undefined) {
      this.fullWidth = legacyJustified;
    }
    this.internalDisabled = this.disabled;
  }

  componentDidLoad() {
    this.isInsideHeader = fnFindClosestParentByTagName(this.host, 'sy-global-header');
  }

  componentWillRender() {
    this.hasContent = !!fnGetAssignedNodesContent(this.host);
  }

  @Watch('disabled')
  handleDisabledChange(newValue: boolean) {
    this.internalDisabled = newValue;
  }

  // --- Form callbacks ---
  formAssociatedCallback() { /* noop */ }
  formDisabledCallback(disabled: boolean) { this.internalDisabled = disabled; }
  formResetCallback() { this.host.dispatchEvent(new CustomEvent('form-reset')); }
  formStateRestoreCallback(_state: any, _mode: any) { /* noop */ }

  // --- Public Methods ---
  @Method()
  async setButtonGroupState(state: ButtonGroupState) {
    this.buttonGroup = state.buttonGroup;
    this.vertical = state.vertical;
    this.first = state.first;
    this.last = state.last;
  }

  @Method()
  async setClick() { this.host.querySelector('button')?.click(); }

  @Method()
  async setFocus() { this.host.querySelector('button')?.focus({ focusVisible: true } as FocusOptions); }

  @Method()
  async setBlur() { this.host.querySelector('button')?.blur(); }

  // --- Form submit guard ---
  /**
   * Install a CAPTURE-phase `submit` listener on `document`. Running during capture
   * means we see the event before any bubbling listener (including lit-html's
   * `@submit` binding in stories). That gives us a chance to cancel submission
   * when any SAIDA form-associated control is invalid.
   *
   * Attaching directly to the form doesn't work: on a target element the DOM spec
   * invokes listeners in registration order regardless of useCapture.
   *
   * `stopImmediatePropagation` from a document-capture handler stops the target-
   * phase and bubble-phase listeners on the form from firing at all — this is
   * what makes `required` + unchecked `sy-checkbox` guarantee a block.
   */
  private installFormSubmitGuard() {
    const form = this.host.closest('form');
    if (!form) return;
    this.formSubmitGuard = (e: Event) => {
      if (e.target !== form) return;
      if (this.type !== 'submit' || this.formnovalidate) return;
      if (!this.isFormValid(form)) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        form.reportValidity();
      }
    };
    document.addEventListener('submit', this.formSubmitGuard, true);
  }

  private removeFormSubmitGuard() {
    if (this.formSubmitGuard) {
      document.removeEventListener('submit', this.formSubmitGuard, true);
    }
    this.formSubmitGuard = undefined;
  }

  private handleButtonClick = (event: MouseEvent) => {
    if (this.internalDisabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // Fall back to DOM traversal if internals.form is flaky.
    const form = this.internals?.form || this.host.closest('form');
    if (!form) return;

    switch (this.type) {
      case 'submit': {
        // Always cancel the native click's default submit flow — we drive
        // submission manually so we can run validation first.
        event.preventDefault();
        event.stopPropagation();

        if (!this.formnovalidate && !this.isFormValid(form)) {
          form.reportValidity();
          break;
        }
        const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
        if (!form.dispatchEvent(submitEvent)) break;
        form.submit();
        break;
      }
      case 'reset':
        event.preventDefault();
        event.stopPropagation();
        form.reset();
        break;
    }
  };

  /**
   * Native `form.checkValidity()` surfaces invalidity set via ElementInternals.setValidity().
   * Custom controls that haven't finished form-association wiring are checked via a
   * defensive sweep — belt-and-braces so required controls always block submission.
   */
  private isFormValid(form: HTMLFormElement): boolean {
    let valid = form.checkValidity();
    if (!valid) return false;

    const customControls = form.querySelectorAll<HTMLElement>(
      'sy-checkbox, sy-radio, sy-input, sy-input-number, sy-textarea, sy-select, sy-switch, sy-autocomplete, sy-datepicker'
    );
    customControls.forEach((el) => {
      const required = (el as any).required === true || el.hasAttribute('required');
      if (!required) return;
      const checked = (el as any).checked === true;
      const indeterminate = (el as any).indeterminate === true;
      const value = (el as any).value;
      const isEmpty =
        (el.tagName === 'SY-CHECKBOX' && !checked && !indeterminate) ||
        (el.tagName === 'SY-RADIO' && !checked) ||
        (el.tagName === 'SY-SWITCH' && !checked) ||
        ((el.tagName !== 'SY-CHECKBOX' && el.tagName !== 'SY-RADIO' && el.tagName !== 'SY-SWITCH') &&
          (value === undefined || value === null || value === ''));
      if (isEmpty) valid = false;
    });
    return valid;
  }

  render() {
    const classNames: Record<string, boolean> = {
      [`button--${this.variant}`]: true,
      [`button--${this.size}`]: true,
      'button--first': this.buttonGroup && this.first,
      'button--last': this.buttonGroup && this.last,
      'button--middle': this.buttonGroup && !this.first && !this.last,
      'button--vertical': this.buttonGroup && this.vertical,
      'button--header': this.isInsideHeader,
      'button--no-content': !this.hasContent,
      'button--icon-only': this.iconOnly,
    };

    return (
      <button
        class={Object.keys(classNames).filter(key => classNames[key]).join(' ')}
        // Always type="button" on the inner native button. Native type="submit"/"reset"
        // fires BEFORE our click handler's preventDefault has a chance to cancel validation
        // in some browser timing edge cases. We drive submit/reset manually from
        // handleButtonClick; the outer sy-button still exposes `this.type` for tooling.
        type="button"
        disabled={this.internalDisabled || this.loading}
        formnovalidate={this.formnovalidate}
        title={this.tooltip || undefined}
        aria-busy={this.loading ? 'true' : undefined}
        aria-disabled={this.internalDisabled ? 'true' : undefined}
        aria-label={this.iconOnly && this.tooltip ? this.tooltip : undefined}
        // The SCSS drives the spinner + full-width layout via attribute selectors
        // (`button[loading="true"]` / `button[full-width="true"]`). Stencil JSX
        // requires explicit string attribute spreads — booleans emit no attribute.
        {...(this.loading ? { loading: 'true' } : { loading: 'false' })}
        {...(this.fullWidth && { 'full-width': 'true' })}
        {...(this.fullWidth && { justified: 'true' })}
        onClick={this.handleButtonClick}
      >
        {this.loading && (
          <div class="spinner--wrapper">
            <div class="spinner">
              <svg viewBox="0 0 66 66">
                <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
              </svg>
            </div>
          </div>
        )}
        <slot />
      </button>
    );
  }
}
