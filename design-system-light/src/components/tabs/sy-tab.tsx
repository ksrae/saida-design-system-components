import { Component, Prop, h, Element, Event, EventEmitter, Watch, Method } from '@stencil/core';
import { fnAssignPropFromAlias } from '../../utils/utils';

@Component({
  tag: 'sy-tab',
  styleUrl: 'sy-tab.scss',
  shadow: false,
  scoped: true
})
export class SyTab {
  @Element() host!: HTMLSyTabElement;

  @Prop() closable = false;
  @Prop({ reflect: true }) disabled: boolean = false;
  @Prop({ reflect: true }) tabkey!: string;
  @Prop() manualClose = false;

  // State에서 Prop으로 변경된 부분들
  @Prop({ mutable: true }) active = false;
  @Prop({ mutable: true, attribute: 'parentDisabled' }) parentDisabled = false;
  @Prop({ mutable: true, attribute: 'currentDisabledStatus' }) currentDisabledStatus = false;
  @Prop({ mutable: true }) index!: number;
  @Prop({ mutable: true }) type: "card" | "line" = "line";
  @Prop({ mutable: true }) size: "small" | "medium" | "large" = "medium";
  @Prop({ mutable: true }) position: "top" | "bottom" | "left" | "right" = "top";
  @Prop({ mutable: true, attribute: 'inHeader' }) inHeader: boolean = false;

  @Event() selected!: EventEmitter<any>;
  @Event() closed!: EventEmitter<any>;

  confirmVisible: boolean = false;

  componentDidLoad() {
    this.setEnabled();
  }

  componentWillLoad() {
    this.parentDisabled = fnAssignPropFromAlias(this.host, 'parent-disabled') ?? this.parentDisabled;
    this.currentDisabledStatus = fnAssignPropFromAlias(this.host, 'current-disabled-status') ?? this.disabled;
    this.inHeader = fnAssignPropFromAlias(this.host, 'in-header') ?? this.inHeader;
    if (this.parentDisabled) {
      this.currentDisabledStatus = true;
      this.active = false;
    }
  }

  @Watch('active')
  watchActive() {
    this.setEnabled();
  }

  @Watch('disabled')
  watchDisabled() {
    if (!this.parentDisabled) {
      this.currentDisabledStatus = this.disabled;
    }
    this.setEnabled();
  }

  @Watch('parentDisabled')
  watchParentDisabled() {
    if (this.parentDisabled) {
      this.currentDisabledStatus = true;
      this.active = false;
    } else {
      this.currentDisabledStatus = this.disabled;
    }
    this.setEnabled();
  }

  @Method()
  async setClose(isForce: boolean = false) {
    if (this.closable && !this.currentDisabledStatus) {
      this.closeEvent(isForce);
    }
  }

  render() {
    const containerClasses = {
      "tab-container": true,
      [`tab-container--${this.type}`]: true,
      [`tab-container--${this.size}`]: true,
      'tab-container-disabled': this.parentDisabled || this.currentDisabledStatus,
      "tab-position-top": this.position === "top",
      "tab-position-bottom": this.position === "bottom",
      "tab-position-left": this.position === "left",
      "tab-position-right": this.position === "right",
    };

    return (
      <div class={`tab-wrapper ${this.inHeader ? "tab-in-header" : ""}`}>
        <div
          class={containerClasses}
          onClick={this.handleClick.bind(this)}
          onMouseUp={this.handleMouseUp.bind(this)}
        >
          <div class="tab-inner" tabindex="0">
            <slot></slot>
            {this.closable ? (
              <sy-icon
                class="tab-close-icon"
                selectable
                size="xsmall"
                onSelected={this.handleCloseClick.bind(this)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" aria-hidden="true">
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-width="1.6"
                    d="M5.5 5.5l9 9M14.5 5.5l-9 9"
                  />
                </svg>
              </sy-icon>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  private setEnabled() {
    if (this.active && !this.currentDisabledStatus && !this.parentDisabled) {
      this.host.setAttribute("active", "");
    } else if (this.host.hasAttribute('active')) {
      this.host.removeAttribute("active");
    }
  }

  private handleMouseUp(event: MouseEvent) {
    if (event.button === 1 && !this.currentDisabledStatus) {
      // middle click to close
      this.handleCloseClick(event);
    }
  }

  private handleClick() {
    if (!this.currentDisabledStatus) {
      this.selectedEvent();
    }
  }

  private handleCloseClick(e: any) {
    e.stopPropagation();
    if (this.closable && !this.currentDisabledStatus) {
      this.closeEvent();
    }
  }

  private selectedEvent() {
    this.selected.emit({ tabkey: this.tabkey, index: this.index });
  }

  private closeEvent(isForceClose: boolean = false) {
    this.closed.emit({
      tabkey: this.tabkey,
      index: this.index,
      isManualClose: isForceClose ? false : this.manualClose,
    });
  }
}
