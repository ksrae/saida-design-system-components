// src/components/breadcrumb-item/sy-breadcrumb-item.tsx

import { Component, h, Prop, State, Event, EventEmitter, Method, forceUpdate, Element } from '@stencil/core';
import { fnAssignPropFromAlias } from '../../utils/utils';

@Component({
  tag: 'sy-breadcrumb-item',
  styleUrl: 'sy-breadcrumb.scss',
  shadow: false,
  scoped: true,
})
export class SyBreadcrumbItem {
  @Element() host!: HTMLSyBreadcrumbItemElement;

  @Prop({ reflect: true }) active: boolean = false;
  @Prop({ reflect: true }) disabled: boolean = false;
  @Prop() separator?: 'slash' | 'arrow';
  @Prop({ attribute: 'parentSeparator', mutable: true }) parentSeparator: 'slash' | 'arrow' = 'slash';
  @Prop({ mutable: true }) isLast: boolean = false;

  @State() hasFocus: boolean = false;

  @Event({
    eventName: 'selected',
    composed: true,
    bubbles: true,
  }) selected!: EventEmitter<HTMLSyBreadcrumbItemElement>; // 이벤트 타입을 HTMLElement로 명확히 함

  @Method()
  async forceUpdate() {
    forceUpdate(this);
  }

  componentWillLoad() {
    this.parentSeparator = fnAssignPropFromAlias(this.host, 'parent-separator') ?? this.parentSeparator;
  }

  private handleFocus = () => { if (!this.disabled) this.hasFocus = true; }
  private handleBlur = () => { if (!this.disabled) this.hasFocus = false; }

  private handleClick = () => {
    if (!this.disabled) {
      this.selected.emit(this.host);
    }
  }

  render() {
    const finalSeparator = this.separator || this.parentSeparator;

    const arrowIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M433.5 303C442.9 312.4 442.9 327.6 433.5 336.9L273.5 497C264.1 506.4 248.9 506.4 239.6 497C230.3 487.6 230.2 472.4 239.6 463.1L382.6 320.1L239.6 177.1C230.2 167.7 230.2 152.5 239.6 143.2C249 133.9 264.2 133.8 273.5 143.2L433.5 303.2z"/></svg>';
    const slashIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M468.1 67.3C479.5 74 483.4 88.7 476.7 100.1L204.7 564.1C198 575.5 183.3 579.4 171.9 572.7C160.5 566 156.6 551.3 163.3 539.9L435.3 75.9C442 64.4 456.7 60.6 468.1 67.3z"/></svg>';

    return [
      <span
        class={{
          'breadcrumb--item': true,
          'breadcrumb--item-focused': this.hasFocus,
          'breadcrumb--item-current': !this.disabled && this.active,
          'breadcrumb--item-disabled': this.disabled,
        }}
        onFocus={this.handleFocus}
        onMouseEnter={this.handleFocus}
        onBlur={this.handleBlur}
        onMouseLeave={this.handleBlur}
        onClick={this.handleClick}
      >
        <slot></slot>
      </span>,
      !this.isLast && (
        <span class="separator">
            <sy-icon size="xsmall" svgMarkup={finalSeparator === 'arrow' ? arrowIcon : slashIcon}></sy-icon>
        </span>
      )
    ];
  }
}
