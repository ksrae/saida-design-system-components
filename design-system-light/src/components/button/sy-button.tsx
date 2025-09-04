// src/components/sy-button/sy-button.tsx

import { Component, h, Prop, State, Method, Element } from '@stencil/core';
import { getAssignedNodesContent } from '../../utils/utils';

@Component({
  tag: 'sy-button',
  styleUrl: 'sy-button.scss',
  shadow: false,
  scoped: true,
  formAssociated: true, // Form Association 활성화
})
export class SyButton {
  @Element() host: HTMLElement;
  private internals: ElementInternals;

  // --- Props (Lit의 @property에 해당) ---
  // reflect: true를 추가하여 prop 값이 HTML attribute에도 반영되도록 합니다.
  // CSS에서 [disabled], [size="small"] 같은 속성 셀렉터를 사용하기 위해 필요합니다.
  @Prop({ reflect: true }) disabled = false;
  @Prop({ reflect: true }) justified = false;
  @Prop({ reflect: true }) loading = false;
  @Prop({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';
  @Prop({ reflect: true }) variant: 'default' | 'primary' | 'secondary' | 'borderless' = 'default';

  @Prop() type: 'button' | 'submit' | 'reset' = 'button';
  @Prop() formnovalidate = false;

  // --- State (Lit의 @state에 해당) ---
  @State() buttonGroup = false;
  @State() vertical = false;
  @State() first = false;
  @State() last = false;
  @State() private hasContent = false;
  @State() private isInsideHeader = false;

  constructor() {
    // Stencil에서는 this.host를 통해 host 요소에 접근하여 attachInternals를 호출합니다.
    this.internals = (this.host as any).attachInternals();
  }

  // --- Public Methods (Lit의 public method에 해당) ---
  // @Method() 데코레이터는 외부에서 이 메서드를 호출할 수 있음을 Stencil에 알립니다.
  @Method()
  async setClick() {
    // Lit의 @query와 달리, 직접 요소를 찾아 호출합니다.
    this.host.querySelector('button')?.click();
  }

  @Method()
  async setFocus() {
    this.host.querySelector('button')?.focus();
  }

  @Method()
  async setBlur() {
    this.host.querySelector('button')?.blur();
  }

  // --- Lifecycle Hooks ---
  // Lit의 firstUpdated와 유사한 역할을 합니다.
  componentDidLoad() {
    this.checkParentElement();
  }

  // --- Form Callbacks (웹 표준 기능으로 Lit과 동일) ---
  formAssociatedCallback() {}

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  formResetCallback() {
    this.host.dispatchEvent(new CustomEvent('form-reset'));
  }

  formStateRestoreCallback(_state: any, _mode: any) {}

  // --- Private Methods (Lit의 private method와 동일) ---
  private checkParentElement() {
    this.isInsideHeader = false;
    let parent = this.host.parentElement as any;
    if (parent?.getRootNode() instanceof ShadowRoot) {
      const shadowRoot = parent.getRootNode() as ShadowRoot;
      const grandparent = shadowRoot?.host;
      this.isInsideHeader = grandparent?.tagName.toLowerCase() === 'sy-global-header';
    }
  }

  componentWillRender() {
    this.hasContent = !!getAssignedNodesContent(this.host);
  }

  private handleButtonClick = (event: MouseEvent) => {
    if (this.disabled || this.loading) {
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
          if (!form.dispatchEvent(submitEvent)) {
            // submit 이벤트가 취소됨
            return;
          }
          if (this.formnovalidate || form.checkValidity()) {
            form.submit();
          } else {
            form.reportValidity();
          }
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
    // Lit의 classMap과 동일한 역할을 하는 로직
    const classNames = {
      // 클래스 이름은 원본과 동일하게 유지
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
        // Lit의 `ifDefined`와 같은 효과. 값이 falsy(빈 문자열 등)이면 속성이 렌더링되지 않음.
        // title={this.title || undefined}
        // name={this.name || undefined}
        type={this.type}
        // boolean 속성은 값으로 직접 전달
        disabled={this.disabled || this.loading}
        formnovalidate={this.formnovalidate}
        // 사용자 정의 속성. Stencil은 자동으로 소문자로 변환해 줍니다.
        // CSS에서 [loading], [justified] 셀렉터를 사용하려면 값이 없어도 속성 자체가 존재해야 합니다.
        // `attr:` 접두사를 사용하거나 아래와 같이 처리할 수 있습니다.
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
  <slot></slot>
      </button>
    );
  }
}
