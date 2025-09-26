import { Component, h, Prop, State, Method, Element, Watch } from '@stencil/core';
import { fnFindClosestParentByTagName, fnGetAssignedNodesContent } from '../../utils/utils';
import { ButtonGroupState } from '../button-group';

export interface HTMLSyButtonElement extends HTMLElement {
  disabled: boolean;
  justified: boolean;
  loading: boolean;
  size: 'small' | 'medium' | 'large';
  variant: 'default' | 'primary' | 'secondary' | 'borderless';
  type: 'button' | 'submit' | 'reset';
  setButtonGroupState: (state: ButtonGroupState) => Promise<void>;
  setClick: () => Promise<void>;
  setFocus: () => Promise<void>;
  setBlur: () => Promise<void>;
}

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

  constructor() {
    this.internals = (this.host as any).attachInternals();
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
  async setFocus() { this.host.querySelector('button')?.focus(); }
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

    const form = this.internals.form;
    if (form) {
      switch (this.type) {
        case 'submit':
          event.preventDefault();
          const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
          if (!form.dispatchEvent(submitEvent)) { return; }
          if (this.formnovalidate || form.checkValidity()) { form.submit(); }
          else { form.reportValidity(); }
          break;
        case 'reset':
          event.preventDefault();
          event.stopPropagation();
          form.reset();
          break;
      }
    }
  };

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
        type={this.type}
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
