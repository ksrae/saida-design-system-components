import { Component, Prop, h, Element, Watch } from '@stencil/core';

@Component({
  tag: 'sy-step',
  styleUrl: 'sy-step.scss',
  scoped: true,
  shadow: false,
})
export class SyStep {
  @Element() host!: HTMLSyStepElement;

  @Prop({ reflect: true }) description: string = "";
  @Prop({ reflect: true }) disabled: boolean = false;
  @Prop({ reflect: true }) loading: boolean = false;
  @Prop({ reflect: true }) status: "finish" | "current" | "wait" | "error" | "none" = "none";

  @Prop({ mutable: true }) small: boolean = false;
  @Prop({ mutable: true }) clickable: boolean = false;
  @Prop({ mutable: true, reflect: true }) index: number = 0;
  @Prop({ mutable: true }) current: number = 0;
  @Prop({ mutable: true }) size: "small" | "medium" = "medium";
  @Prop({ mutable: true }) parentStatus: "finish" | "current" | "wait" | "error" | "none" = "none";
  @Prop({ mutable: true, reflect: true }) currentStatus: "finish" | "current" | "wait" | "error" | "none" = "none";
  @Prop({ mutable: true }) type: "horizontal" | "vertical" = "horizontal";
  @Prop({ mutable: true }) lastStep: boolean = false;

  componentWillLoad() {
    this.updateCurrentStatus();
  }

  componentDidLoad() {
    // Light DOM에서는 슬롯이 필요없음
  }

  @Watch('parentStatus')
  watchParentStatus() {
    this.updateCurrentStatus();
  }

  @Watch('status')
  watchStatus() {
    this.updateCurrentStatus();
  }

  @Watch('current')
  watchCurrent(newValue: any) {
    this.current = Number(newValue);
    this.updateCurrentStatus();
  }

  @Watch('index')
  watchIndex(newValue: any) {
    this.index = Number(newValue);
    this.updateCurrentStatus();
  }

  private updateCurrentStatus() {
    // 숫자로 명시적 변환
    const currentNum = Number(this.current);
    const indexNum = Number(this.index);

    if (this.parentStatus === "finish") {
      this.currentStatus = "finish";
    } else if (this.status !== "none") {
      this.currentStatus = this.status;
    } else {
      if (currentNum > indexNum) {
        this.currentStatus = "finish";
      } else if (currentNum === indexNum) {
        this.currentStatus = "current";
      } else {
        this.currentStatus = "wait";
      }
    }
  }

  private handleClick = (e: any) => {
    if (this.clickable && !this.disabled) {
      this.host.dispatchEvent(
        new CustomEvent("selected", {
          detail: { index: this.index, step: this.host },
          bubbles: true,
          composed: true,
          cancelable: false,
        })
      );
    }
  }

  render() {
    const classNames = {
      'step': true,
      'step-small': this.size === "small",
      'step-clickable': this.currentStatus !== "error" && this.clickable,
      'step-disabled': this.disabled && this.currentStatus !== "error",
      'step-error': this.currentStatus === "error",
      'step-done': this.currentStatus === "finish",
      'step-active': this.currentStatus === "current",
      'step-wait': this.currentStatus === "wait",
      'step-horizontal': this.type === "horizontal",
      'step-vertical': this.type === "vertical",
      'step-loading':
        this.loading && !this.disabled && this.currentStatus !== "error" && this.currentStatus !== "finish",
      'step-last': this.lastStep,
    };

    return (
      <div
        class={Object.keys(classNames).filter(k => classNames[k]).join(' ')}
        onClick={this.handleClick}
      >
        <div class="step-item">
          {this.currentStatus === "finish" ? (
            <sy-icon size="large">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <path fill="currentColor" d="M534 132.5C544.8 140.2 547.2 155.2 539.5 166L275.5 534C271.4 539.7 265 543.4 258 543.9C251 544.4 244 542 239 537L103 401C93.6 391.6 93.6 376.4 103 367.1C112.4 357.8 127.6 357.7 136.9 367.1L253 483L500.5 138C508.2 127.2 523.2 124.8 534 132.5z"/>
              </svg>
            </sy-icon>
          ) : this.currentStatus === "error" ? (
            <sy-icon size="large">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <path fill="currentColor" d="M135.5 169C126.1 159.6 126.1 144.4 135.5 135.1C144.9 125.8 160.1 125.7 169.4 135.1L320.4 286.1L471.4 135.1C480.8 125.7 496 125.7 505.3 135.1C514.6 144.5 514.7 159.7 505.3 169L354.3 320L505.3 471C514.7 480.4 514.7 495.6 505.3 504.9C495.9 514.2 480.7 514.3 471.4 504.9L320.4 353.9L169.4 504.9C160 514.3 144.8 514.3 135.5 504.9C126.2 495.5 126.1 480.3 135.5 471L286.5 320L135.5 169z"/>
              </svg>
            </sy-icon>
          ) : (
            this.index >= 0 ? this.index : ''
          )}
        </div>
        <div class="step-value">
          <div class="title">
            <slot></slot>
          </div>
          <div class="description">{this.description}</div>
        </div>
      </div>
    );
  }
}
