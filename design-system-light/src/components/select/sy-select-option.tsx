// src/components/select/select-option.tsx

import { Component, Prop, State, h, Element, Watch, Event, EventEmitter } from '@stencil/core';
import { Fragment } from '@stencil/core/internal';

export interface HTMLSyOptionElement extends HTMLElement {
    disabled: boolean;
    label: string;
    readonly: boolean;
    value: string;
    showTooltip: boolean;
    hide: boolean;
    selected: boolean;
    empty: boolean;
    loading: boolean;
    isCustomTag: boolean;
    active: boolean;
    getHide(): () => Promise<boolean>;
    onSelected: EventEmitter<{ value: string; label: string }>;
  }
  
@Component({
  tag: 'sy-option',
  styleUrl: 'sy-select-option.scss',
  scoped: true,
  shadow: false,
})
export class SyOption {
  @Element() private el: HTMLElement;

  @Prop() disabled: boolean = false;
  @Prop({ reflect: true, mutable: true }) label: string = '';
  @Prop() readonly: boolean = false;
  @Prop({ reflect: true }) value: string = '';
  @Prop({ attribute: 'showTooltip', mutable: true}) showTooltip: boolean = false;
  @Prop({ reflect: true, mutable: true }) selected: boolean = false;

  @State() hide: boolean = false;
  @State() empty: boolean = false;
  @State() loading: boolean = false;
  @State() isCustomTag: boolean = false;
  @State() active: boolean = false;
  @State() private hasSlotContents: boolean = false;

  @Event({
    eventName: 'selected',
    composed: true,
    bubbles: true,
  })
  onSelected: EventEmitter<{ value: string; label: string }>;

  @Watch('label')
  @Watch('value')
  handleLabelOrValueChange() {
    if (!this.label) {
      const textFromSlot = Array.from(this.el.childNodes)
        .filter(node => node.nodeType === Node.TEXT_NODE)
        .map(node => node.textContent?.trim())
        .join('');
      this.label = textFromSlot?.length ? textFromSlot : this.value;
    }
  }

  componentDidLoad() {
    this.checkSlotContents();
    this.handleLabelOrValueChange();
  }

  componentDidUpdate() {
    this.checkSlotContents();
  }

  getHide() {
    return this.hide;
  }

  private checkSlotContents() {
    this.hasSlotContents = Array.from(this.el.children).some(
      child => child.tagName.toLowerCase() !== 'div'
    );
  }

  private handleOptionClick = () => {
    if (this.disabled || this.readonly || this.empty || this.loading) return;
    this.onSelected.emit({ value: this.value, label: this.label });
  };

  disconnectedCallback(): void {}

  render() {
    const classes = {
      'select-item': true,
      'option-active': this.active,
      'option-selected': this.selected && !this.disabled,
    };

    return (
      <div
        class={classes}
        style={{ display: this.hide ? 'none' : 'flex' }}
        data-disabled={this.disabled ? true : null}
        data-readonly={this.readonly ? true : null}
        onClick={this.handleOptionClick}
      >
        {!this.empty && !this.loading && !this.hasSlotContents ? (
          <Fragment>
            {this.showTooltip ? <sy-tooltip maxWidth={this.el.clientWidth} content={this.label}></sy-tooltip> : null}
            <span>{this.label}</span>
          </Fragment>
        ) : this.empty ? (
          <sy-empty></sy-empty>
        ) : this.loading ? (
          <sy-spinner></sy-spinner>
        ) : null}
        <slot />
      </div>
    );
  }
}