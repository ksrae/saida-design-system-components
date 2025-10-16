// src/components/select/select-option.tsx

import { Component, Prop, State, h, Element, Watch, Event, EventEmitter } from '@stencil/core';
import { Fragment } from '@stencil/core/internal';
import { fnAssignPropFromAlias } from '../../utils/utils';

 
@Component({
  tag: 'sy-option',
  styleUrl: 'sy-select-option.scss',
  scoped: true,
  shadow: false,
})
export class SyOption {
  @Element() host: HTMLSyOptionElement;

  @Prop() disabled: boolean = false;
  @Prop({ reflect: true, mutable: true }) label: string = '';
  @Prop() readonly: boolean = false;
  @Prop({ reflect: true }) value: string = '';
  @Prop({ attribute: 'showTooltip', mutable: true}) showTooltip: boolean = false;
  @Prop({ reflect: true, mutable: true }) selected: boolean = false;

  @Prop() hide: boolean = false;
  @Prop() empty: boolean = false;
  @Prop() loading: boolean = false;
  @Prop() isCustomTag: boolean = false;
  @Prop() active: boolean = false;
  @State() private hasSlotContents: boolean = false;

  @Event({
    eventName: 'activated',
    composed: true,
    bubbles: true,
  })
  onActivated: EventEmitter<{ value: string; label: string }>;

  @Watch('label')
  @Watch('value')
  handleLabelOrValueChange() {
    if (!this.label) {
      const textFromSlot = Array.from(this.host.childNodes)
        .filter(node => node.nodeType === Node.TEXT_NODE)
        .map(node => node.textContent?.trim())
        .join('');
      this.label = textFromSlot?.length ? textFromSlot : this.value;
    }
  }

  componentWillLoad() {
    this.showTooltip = fnAssignPropFromAlias(this.host, 'show-tooltip') ?? this.showTooltip;
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
    this.hasSlotContents = Array.from(this.host.children).some(
      child => child.tagName.toLowerCase() !== 'div'
    );
  }

  private handleOptionClick = () => {
    if (this.disabled || this.readonly || this.empty || this.loading) return;
    this.onActivated.emit({ value: this.value, label: this.label });
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
            {this.showTooltip ? <sy-tooltip maxWidth={this.host.clientWidth} content={this.label}></sy-tooltip> : null}
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