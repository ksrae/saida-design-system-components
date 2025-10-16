// src/components/sy-tag/sy-tag.tsx

import { Component, h, Prop, State, Watch, Event, EventEmitter, Element } from '@stencil/core';

@Component({
  tag: 'sy-tag',
  styleUrl: 'sy-tag.scss',
  shadow: false,
  scoped: true,
})
export class SyTag {
  @Element() host: HTMLSyTagElement;

  @Prop({ reflect: true }) disabled = false;
  @Prop({ reflect: true }) readonly = false;
  @Prop({ reflect: true }) removable = false;
  @Prop({ reflect: true }) rounded = false;
  @Prop({ reflect: true }) selectable = false;
  @Prop({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';
  @Prop({ reflect: true, mutable: true }) variant: 'gray' | 'purple' | 'blue' | 'green' | 'cyan' | 'yellow' | 'orange' | 'red' = 'gray';

  // Lit의 `checked` state와 동일
  @State() private checked = false;

  // Stencil의 이벤트 발송 방식
  @Event() selected: EventEmitter<{ tag: HTMLSyTagElement }>;
  @Event() removed: EventEmitter<{ tag: HTMLSyTagElement }>;

  // Lit의 `updated` 라이프사이클 훅을 @Watch로 대체
  @Watch('selectable')
  handleSelectableChange(isSelectable: boolean) {
    if (isSelectable) {
      // selectable이 true가 되면 variant를 purple로 변경
      this.variant = 'purple';
    } else {
      // selectable이 false가 되면 checked 상태를 리셋
      this.checked = false;
    }
  }

  private handleClick = () => {
    if (this.selectable && !this.disabled && !this.readonly) {
      this.checked = !this.checked;

      // 'selected' 이벤트를 발송
      this.selected.emit({ tag: this.host });
    }
  };

  private handleRemoveClick = (event: Event) => {
    event.stopPropagation(); // 이벤트 버블링 중지

    if (this.removable && !this.disabled && !this.readonly) {
      // 'removed' 이벤트를 발송
      this.removed.emit({ tag: this.host });

      this.host.remove(); // 이 줄을 제거하여 부모가 렌더링을 담당하도록 함
    }
  };

  render() {
    const tagClasses = {
      tag: true,
      'tag--selectable': this.selectable,
      'tag--checked': this.checked,
      'tag--gray': this.variant === 'gray',
      'tag--purple': this.variant === 'purple',
      'tag--blue': this.variant === 'blue',
      'tag--green': this.variant === 'green',
      'tag--cyan': this.variant === 'cyan',
      'tag--yellow': this.variant === 'yellow',
      'tag--orange': this.variant === 'orange',
      'tag--red': this.variant === 'red',
      'tag--small': this.size === 'small',
      'tag--medium': this.size === 'medium',
      'tag--large': this.size === 'large',
      'tag--disabled': this.disabled,
      'tag--readonly': this.readonly,
      'tag--removable': this.removable,
      'tag--rounded': this.rounded,
    };

    return (
      <span
        class={Object.keys(tagClasses).filter(key => tagClasses[key]).join(' ')}
        onClick={this.handleClick}
      >
        <slot />

        {this.removable && (
          <sy-icon
            size="xxsmall"
            class="tag-remove"
            selectable
            // Lit의 @selected -> Stencil의 onSelected
            onSelected={this.handleRemoveClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M71.5 105C62.2 95.6 62.2 80.4 71.5 71C80.8 61.6 96.1 61.7 105.5 71L320.5 286L535.5 71C544.9 61.6 560.1 61.6 569.4 71C578.7 80.4 578.8 95.6 569.4 104.9L354.4 319.9L569.4 534.9C578.8 544.3 578.8 559.5 569.4 568.8C560 578.1 544.8 578.2 535.5 568.8L320.5 353.8L105.5 568.8C96.1 578.2 80.9 578.2 71.6 568.8C62.3 559.4 62.2 544.2 71.6 534.9L286.6 319.9L71.6 104.9z"/></svg>
          </sy-icon>
        )}
      </span>
    );
  }
}
