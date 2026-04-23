import { Component, h, Prop, State, Method, Element, Watch } from '@stencil/core';
import { fnFindClosestParentByTagName, fnGetAssignedNodesContent } from '../../utils/utils';
import { ButtonGroupState } from '../button-group';

@Component({
  tag: 'sy-button',
  styleUrl: 'sy-button.scss',
  shadow: false,
  scoped: true,
  formAssociated: true,
})
export class SyButton {
  @Element() host: HTMLSyButtonElement;
  private internals: ElementInternals;
  private formSubmitGuard?: (e: Event) => void;

  @Prop({ reflect: true }) disabled = false;
  @Prop({ reflect: true }) justified = false;
  @Prop({ reflect: true }) loading = false;
  @Prop({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';
  @Prop({ reflect: true }) variant: 'default' | 'primary' | 'secondary' | 'borderless' = 'default';
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';
  @Prop() formnovalidate = false;

  @State() buttonGroup = false;
  @State() vertical = false;
  @State() first = false;
  @State() last = false;
  @State() private hasContent = false;
  @State() private isInsideHeader = false;

  // [추가] Prop 직접 수정을 막기 위한 내부 상태
  @State() private internalDisabled: boolean;

  // attachInternals must run AFTER Stencil has wired up @Element (which
  // happens after the constructor), so use connectedCallback instead of
  // the constructor to avoid `this.host` being undefined.
  connectedCallback() {
    if (!this.internals && (this.host as any).attachInternals) {
      this.internals = (this.host as any).attachInternals();
    }
    this.installFormSubmitGuard();
  }

  disconnectedCallback() {
    this.removeFormSubmitGuard();
  }

  /**
   * Install a CAPTURE-phase `submit` listener on `document`. During the
   * capture phase the listener runs on ancestors from document DOWN to
   * the target. That means it fires BEFORE any listener registered
   * directly on the form — including lit-html's `@submit` binding that
   * the story uses to display "Form submitted".
   *
   * Attaching directly to the form doesn't work: on a target element the
   * DOM spec invokes listeners in registration order regardless of
   * useCapture, and the story's binding is registered before sy-button
   * connects, so its handler would fire first and write the text before
   * we could cancel it.
   *
   * `stopImmediatePropagation` in a document-capture handler stops the
   * target-phase and bubble-phase listeners on the form from firing at
   * all — that's what makes required+unchecked sy-checkbox guarantee a
   * block.
   */
  private installFormSubmitGuard() {
    const form = this.host.closest('form');
    if (!form) return;
    this.formSubmitGuard = (e: Event) => {
      // Only act on the form this button belongs to, and only when this
      // button is the submit button for that form.
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

  @Watch('disabled')
  handleDisabledChange(newValue: boolean) {
    this.internalDisabled = newValue;
  }

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

  // --- Lifecycle Hooks ---
  componentWillLoad() {
    this.internalDisabled = this.disabled;
  }
  componentDidLoad() {
    this.isInsideHeader = fnFindClosestParentByTagName(this.host, 'sy-global-header');
  }
  componentWillRender() {
    this.hasContent = !!fnGetAssignedNodesContent(this.host);
  }

  // --- Form Callbacks ---
  formAssociatedCallback() {}
  formDisabledCallback(disabled: boolean) { this.internalDisabled = disabled; }
  formResetCallback() { this.host.dispatchEvent(new CustomEvent('form-reset')); }
  formStateRestoreCallback(_state: any, _mode: any) {}

  // --- Private Methods ---
  // private checkParentElement() {
  //   this.isInsideHeader = false;
  //   let parent = this.host.parentElement as any;
  //   if (parent?.getRootNode() instanceof ShadowRoot) {
  //     const shadowRoot = parent.getRootNode() as ShadowRoot;
  //     const grandparent = shadowRoot?.host;
  //     this.isInsideHeader = grandparent?.tagName.toLowerCase() === 'sy-global-header';
  //   }
  // }

  private handleButtonClick = (event: MouseEvent) => {
    // [수정] Prop 대신 내부 State와 loading을 함께 체크
    if (this.internalDisabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // Fallback to DOM traversal if internals.form is flaky (can happen when
    // attachInternals runs too early or Stencil's form-association wiring
    // hasn't kicked in yet).
    const form = this.internals?.form || this.host.closest('form');
    if (form) {
      switch (this.type) {
        case 'submit': {
          // Always cancel the native click's default form-submit flow —
          // we drive submission manually so we can run validation first.
          event.preventDefault();
          event.stopPropagation();

          if (!this.formnovalidate && !this.isFormValid(form)) {
            form.reportValidity();
            break;
          }
          const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
          if (!form.dispatchEvent(submitEvent)) { break; }
          form.submit();
          break;
        }
        case 'reset':
          event.preventDefault();
          event.stopPropagation();
          form.reset();
          break;
      }
    }
  };

  /**
   * Native `form.checkValidity()` should surface invalidity set via
   * `ElementInternals.setValidity()`. But if a custom control exposes a
   * synchronous `.internals` getter or `.checkValidity()` method, check
   * it as a fallback so required sy-* components block submission even
   * when the browser's form-association wiring hasn't finished.
   */
  private isFormValid(form: HTMLFormElement): boolean {
    let valid = form.checkValidity();
    if (!valid) return false;

    const customControls = form.querySelectorAll<HTMLElement>(
      'sy-checkbox, sy-radio, sy-input, sy-input-number, sy-textarea, sy-select, sy-switch, sy-autocomplete, sy-datepicker'
    );
    customControls.forEach((el) => {
      // Custom elements often expose a `required` attribute mirror; if the
      // element is `required` and not `checked`/`value`-populated, treat
      // it as invalid.
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
    const classNames = {
      'button--default': this.variant === 'default',
      'button--primary': this.variant === 'primary',
      'button--secondary': this.variant === 'secondary',
      'button--borderless': this.variant === 'borderless',
      'button--small': this.size === 'small',
      'button--medium': this.size === 'medium',
      'button--large': this.size === 'large',
      'button--first': this.buttonGroup && this.first,
      'button--last': this.buttonGroup && this.last,
      'button--middle': this.buttonGroup && !this.first && !this.last,
      'button--vertical': this.buttonGroup && this.vertical,
      'button--header': this.isInsideHeader,
      'button--no-content': !this.hasContent,
    };

    return (
      <button
        class={Object.keys(classNames).filter(key => classNames[key]).join(' ')}
        // Always use type="button" on the inner native button. Native
        // type="submit" / type="reset" fire BEFORE our click handler's
        // preventDefault has a chance to cancel validation in some browser
        // + event timing edge-cases, which was letting required sy-checkbox
        // validation get bypassed. We drive submit/reset manually from
        // handleButtonClick instead; the outer sy-button still exposes
        // `this.type` on the host so consumers and a11y tooling see it.
        type="button"
        // [수정] disabled 속성에 State와 loading을 모두 반영
        disabled={this.internalDisabled || this.loading}
        formnovalidate={this.formnovalidate}
        {...(this.loading && { loading: 'true' })}
        {...(this.justified && { justified: 'true' })}
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
