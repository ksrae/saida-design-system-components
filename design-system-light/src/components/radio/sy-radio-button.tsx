// sy-radio-button.tsx

import { Component, Prop, State, Event, EventEmitter, h, Element, Listen } from '@stencil/core';

export interface HTMLSyRadioButtonElement extends HTMLElement {
  // Public Props
  checked: boolean;
  disabled: boolean;
  value: string;
  size: 'small' | 'medium' | 'large';
  variant: 'outlined' | 'solid';
}

@Component({
  tag: 'sy-radio-button',
  styleUrl: 'sy-radio-button.scss',
  shadow: false,
  scoped: true,
})
export class SyRadioButton {
  // --- Element References ---
  @Element() hostElement: HTMLSyRadioButtonElement;
  //private radioButton!: HTMLButtonElement;

  // --- Props ---
  @Prop({ mutable: true }) checked: boolean = false;
  @Prop({ reflect: true }) disabled: boolean = false;
  @Prop() value!: string;
  // [수정] @State에서 @Prop으로 변경하여 부모 컴포넌트로부터 값을 받을 수 있도록 함
  @Prop({ mutable: true }) size: 'small' | 'medium' | 'large' = 'medium';
  @Prop({ mutable: true }) variant: 'outlined' | 'solid' = 'outlined';

  // --- State ---
  @State() protected hasFocus = false;

  // --- Events ---
  @Event() selected: EventEmitter<string>;

  // --- Event Handlers ---
  private handleClick = (e: MouseEvent) => {
    e.preventDefault();
    if (this.disabled) return;

    if (!this.checked) {
      this.checked = true;
      this.selected.emit(this.value);
    }
  };

  private handleFocus = () => {
    this.hasFocus = true;
  };

  private handleBlur = () => {
    this.hasFocus = false;
  };

  // --- Host Event Listeners ---
  @Listen('keydown')
  handleKeydown(e: KeyboardEvent) {
    if (this.disabled) return;

    if (!this.checked) {
      if (e.code === 'Enter' || e.code === 'Space') {
        e.preventDefault();
        this.checked = true;
        this.selected.emit(this.value);
      }
    }
  }

  // --- Render Method ---
  render() {
    const buttonClasses = {
      // button 클래스들은 sy-button.scss에서 정의되므로 그대로 사용합니다.
      'button--default': !this.checked && this.variant === 'outlined',
      'button--secondary': this.checked && this.variant === 'outlined',
      'button--primary': this.checked && this.variant === 'solid',
      'button--small': this.size === 'small',
      'button--medium': this.size === 'medium',
      'button--large': this.size === 'large',
      'button--focused': this.hasFocus,
    };

    return (
      <button
        class={buttonClasses}
        type="button" // form submit 방지
        role="radio"
        aria-checked={`${this.checked}`}
        value={this.value}
        disabled={this.disabled}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onClick={this.handleClick}
      >
        <slot></slot>
      </button>
    );
  }
}
