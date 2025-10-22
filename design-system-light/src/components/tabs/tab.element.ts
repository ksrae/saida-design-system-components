import { LitElement, html, css, nothing, CSSResultGroup, unsafeCSS } from "lit";
import { property, customElement, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import globalCSS from "./styles/tab.scss?inline";

@customElement("sy-tab")
export class TabElement extends LitElement {
  static styles: CSSResultGroup = css`
    ${unsafeCSS(globalCSS)};
  `;

  @property({ type: Boolean }) closable = false;
  @property({ type: Boolean, reflect: true }) disabled: boolean = false;
  @property({ type: String, reflect: true }) tabkey!: string;
  @property({ type: Boolean }) manualClose = false;
  
  @state() active = false;
  @state() parentDisabled = false;
  @state() currentDisabledStatus = false;
  @state() index!: number;
  @state() type: "card" | "line" = "line";
  @state() size: "small" | "medium" | "large" = "medium";
  @state() position: "top" | "bottom" | "left" | "right" = "top";
  @state() inHeader: boolean = false;
  confirmVisible: boolean = false;
  

  async firstUpdated() {
    await this.updateComplete;

    this.currentDisabledStatus = this.disabled;

    this.setEnabled();
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has("active")) {
      this.setEnabled();
    } else if (changedProperties.has("disabled")) {
      if (!this.parentDisabled) {
        this.currentDisabledStatus = this.disabled;
      }
      this.setEnabled();
    } else if (changedProperties.has("parentDisabled")) {
      if (this.parentDisabled) {
        // parentDisabled가 true인 경우 모든 탭을 비활성화
        this.currentDisabledStatus = true;
        this.active = false;
      } else {
        // parentDisabled가 false로 변경된 경우 원래의 disabled 상태로 복원
        this.currentDisabledStatus = this.disabled;
      }
      this.setEnabled();
    }
  }

  public setClose(isForce: boolean = false) {
    if (this.closable && !this.currentDisabledStatus) {
      this.closeEvent(isForce);
    }
  }


  render() {
    return html`
    <div class="tab-wrapper ${this.inHeader ? "tab-in-header" : ""}">
      <div
        class=${classMap({
          "tab-container": true,
          [`tab-container--${this.type}`]: true,
          [`tab-container--${this.size}`]: true,
          'tab-container-disabled': this.parentDisabled || this.currentDisabledStatus,
          "tab-position-top": this.position === "top",
          "tab-position-bottom": this.position === "bottom",
          "tab-position-left": this.position === "left",
          "tab-position-right": this.position === "right",
        })}
        @click="${this.handleClick}"
        @mouseup=${this.handleMouseUp}
      > 
        <div class="tab-inner" tabindex="0">
          <slot></slot>
          ${this.closable
            ? html`<sy-icon
                selectable
                @selected=${this.handleCloseClick}
              ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M135.5 169C126.1 159.6 126.1 144.4 135.5 135.1C144.9 125.8 160.1 125.7 169.4 135.1L320.4 286.1L471.4 135.1C480.8 125.7 496 125.7 505.3 135.1C514.6 144.5 514.7 159.7 505.3 169L354.3 320L505.3 471C514.7 480.4 514.7 495.6 505.3 504.9C495.9 514.2 480.7 514.3 471.4 504.9L320.4 353.9L169.4 504.9C160 514.3 144.8 514.3 135.5 504.9C126.2 495.5 126.1 480.3 135.5 471L286.5 320L135.5 169z"/></svg></sy-icon>`
            : nothing}
        </div> 
      </div>
      </div>
    `;
  }

  private setEnabled() {
    if (this.active && !this.currentDisabledStatus && !this.parentDisabled) {
      this.setAttribute("active", "");
    } else if (this.hasAttribute('active')) {
      this.removeAttribute("active");
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
    this.dispatchEvent(
      new CustomEvent("selected", {
        detail: { tabkey: this.tabkey, index: this.index },
        bubbles: true,
        composed: true,
      })
    );
  }
  private closeEvent(isForceClose: boolean = false) {
    this.dispatchEvent(
      new CustomEvent("closed", {
        detail: {
          tabkey: this.tabkey,
          index: this.index,
          isManualClose: isForceClose ? false : this.manualClose,
        },
        bubbles: true,
        composed: true,
      })
    );
  }
}
