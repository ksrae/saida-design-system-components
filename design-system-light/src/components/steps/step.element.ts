import { LitElement, CSSResultGroup, css, unsafeCSS, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import globalCSS from "./styles/step.scss?inline";
import "../icon/icon.element";

@customElement("sy-step")
export class StepElement extends LitElement {
  static styles: CSSResultGroup = css`
    ${unsafeCSS(globalCSS)};
  `;
  @property({ type: String }) description = "";
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) loading = false;
  @property({ type: String, reflect: true }) status: "finish" | "current" | "wait" | "error" | "none" = "none";

  @state() small = false;
  @state() clickable = false;
  @state() index: number = 0;
  @state() current: number = 0;
  @state() size: "small" | "medium" = "medium";
  @state() parentStatus: "finish" | "current" | "wait" | "error" | "none" = "none";
  @state() currentStatus: "finish" | "current" | "wait" | "error" | "none" = "none";
  @state() type: "horizontal" | "vertical" = "horizontal";
  @state() lastStep: boolean = false

  @query("slot") slotElement!: HTMLSlotElement;

  async firstUpdated() {
    await this.updateComplete;
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has("parentStatus")) {
      if (this.parentStatus === "finish") {
        this.currentStatus = "finish";
      } else {
        this.currentStatus = this.status;
      }
    } else if (changedProperties.has("status")) {
      this.currentStatus = this.status;
    }
  }

  render() {
    return html`
      <div
        class=${classMap({
          step: true,
          "step-small": this.size === "small",
          "step-clickable": this.currentStatus !== "error" && this.clickable,
          "step-disabled": this.disabled && this.currentStatus !== "error",
          "step-error": this.currentStatus === "error",
          "step-done":
            this.currentStatus === "finish" ||
            (this.currentStatus === "none" && this.current > this.index),
          "step-active":
            this.currentStatus === "current" ||
            (this.currentStatus === "none" && this.current === this.index),
          "step-wait":
            this.currentStatus === "wait" ||
            (this.currentStatus === "none" && this.current < this.index),
          "step-horizontal": this.type === "horizontal",
          "step-vertical": this.type === "vertical",
          "step-loading":
            this.loading && !this.disabled && this.currentStatus !== "error" && this.currentStatus !== "finish",
          "step-last": this.lastStep,
        })}
        @click=${this.handleClick}
      >
        <div class="step-item">
          ${this.currentStatus === "finish" ||
          (this.currentStatus === "none" && this.current > this.index)
            ? html`<sy-icon size="large"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M534 132.5C544.8 140.2 547.2 155.2 539.5 166L275.5 534C271.4 539.7 265 543.4 258 543.9C251 544.4 244 542 239 537L103 401C93.6 391.6 93.6 376.4 103 367.1C112.4 357.8 127.6 357.7 136.9 367.1L253 483L500.5 138C508.2 127.2 523.2 124.8 534 132.5z"/></svg></sy-icon>`
            : this.currentStatus === "error"
              ? html`<sy-icon size="large"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M135.5 169C126.1 159.6 126.1 144.4 135.5 135.1C144.9 125.8 160.1 125.7 169.4 135.1L320.4 286.1L471.4 135.1C480.8 125.7 496 125.7 505.3 135.1C514.6 144.5 514.7 159.7 505.3 169L354.3 320L505.3 471C514.7 480.4 514.7 495.6 505.3 504.9C495.9 514.2 480.7 514.3 471.4 504.9L320.4 353.9L169.4 504.9C160 514.3 144.8 514.3 135.5 504.9C126.2 495.5 126.1 480.3 135.5 471L286.5 320L135.5 169z"/></svg></sy-icon>`
              : this.index}
        </div>
        <div class="step-value">
          <div class="title">
            <slot></slot>
          </div>
          <div class="description">${this.description}</div>
        </div>
      </div>
    `;
  }

  private handleClick(e: any) {
    // e.preventDefault();
    if (this.clickable && !this.disabled) {
      this.dispatchEvent(
        new CustomEvent("selected", {
          detail: { index: this.index, step: this },
          bubbles: true,
          composed: true,
          cancelable: false,
        })
      );
    }
  }

  private slotChange() {}
}
