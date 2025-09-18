import { Component, Prop, State, Event, EventEmitter, h, Watch, Element } from '@stencil/core';

@Component({
  tag: 'sy-switch',
  styleUrl: 'sy-switch.scss',
  shadow: false,
  scoped: true,
})
export class SySwitch {
  @Element() hostElement: HTMLElement;

  // Props
  @Prop({ reflect: true, mutable: true }) checked: boolean = false;
  @Prop({ reflect: true, mutable: true }) disabled: boolean = false;
  @Prop() label: string;
  @Prop({ reflect: true }) loading: boolean = false;
  @Prop({ reflect: true }) readonly: boolean = false;
    @Prop({ reflect: true }) size: 'small' | 'medium' = 'medium';
  @Prop() name: string = '';

  // State
  @State() private internalDisabled: boolean = false;

  // Events
  @Event() changed: EventEmitter<boolean>;

  // Lifecycle
  componentWillLoad() {
    this.updateInternalDisabled();
  }

  // Watchers
  @Watch('loading')
  @Watch('disabled')
  handleLoadingOrDisabledChange() {
    if (this.loading) {
      this.internalDisabled = true;
    } else {
      this.internalDisabled = this.disabled;
    }
  }

  @Watch('checked')
  handleCheckedChange() {
    this.changed.emit(this.checked);
  }

  // Private Methods
  private updateInternalDisabled() {
    if (this.loading) {
      this.internalDisabled = true;
    } else {
      this.internalDisabled = this.disabled;
    }
  }


  private handleClick() {
    if (this.internalDisabled || this.readonly) {
      return;
    }

    this.checked = !this.checked;

    // LitElement 원본과 동일한 이벤트 발생
    const event = new CustomEvent('changed', {
      detail: this.checked,
      bubbles: true,
      composed: true
    });
    this.hostElement.dispatchEvent(event);
  }

  private handleHover(_event: MouseEvent) {
    if (this.internalDisabled) {
      return;
    }

    // 원본에서는 주석처리되어 있지만 메서드는 존재
    // this.dispatchEvent(new CustomEvent('hover', {
    //   detail: {
    //     readonly: this.readonly,
    //     disabled: this.internalDisabled,
    //     checked: this.checked,
    //     hovering: event.type === 'mouseover'
    //   }
    // }));
  }

  // Render
  render() {
    const switchClasses = {
      switch: true,
      on: this.checked,
      readonly: this.readonly,
      disabled: this.internalDisabled,
      'switch--small': this.size === 'small',
      'switch--medium': this.size === 'medium',
    };

    return (
      <div>
        <div
          class={switchClasses}
          tabindex={this.internalDisabled ? -1 : 0} // tabindex 추가
          onClick={() => this.handleClick()}
          onMouseOver={(event) => this.handleHover(event)}
          onMouseOut={(event) => this.handleHover(event)}
        >
          <div class="handle">
            {this.loading && <div class="loader"></div>}
          </div>
        </div>
        <span class="switch-label">{this.label || ''}</span>
      </div>
    );
  }
}