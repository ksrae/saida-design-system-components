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
    this.currentDisabledStatus = this.disabled;
    this.setEnabled();
  }

  componentwWillLoad() {
    this.parentDisabled = fnAssignPropFromAlias(this.host, 'parent-disabled') ?? this.parentDisabled;
    this.currentDisabledStatus = fnAssignPropFromAlias(this.host, 'current-disabled-status') ?? this.currentDisabledStatus;
    this.inHeader = fnAssignPropFromAlias(this.host, 'in-header') ?? this.inHeader;
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
                selectable
                onSelected={this.handleCloseClick.bind(this)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                  <path fill="currentColor" d="M135.5 169C126.1 159.6 126.1 144.4 135.5 135.1C144.9 125.8 160.1 125.7 169.4 135.1L320.4 286.1L471.4 135.1C480.8 125.7 496 125.7 505.3 135.1C514.6 144.5 514.7 159.7 505.3 169L354.3 320L505.3 471C514.7 480.4 514.7 495.6 505.3 504.9C495.9 514.2 480.7 514.3 471.4 504.9L320.4 353.9L169.4 504.9C160 514.3 144.8 514.3 135.5 504.9C126.2 495.5 126.1 480.3 135.5 471L286.5 320L135.5 169z"/>
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
