import { LitElement, html, CSSResultGroup, css, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import globalCSS from "./styles/collapse.scss?inline";

@customElement("sy-collapse-panel")
export class CollapsePanelElement extends LitElement {
  static styles: CSSResultGroup = css`
    ${unsafeCSS(globalCSS)};
  `;

  @property({ type: Boolean, reflect:true }) active: boolean = false;
  @property({ type: Boolean }) arrow: boolean = false;
  @property({ type: Boolean }) disabled: boolean = false;
  // @property({ type: Boolean }) borderless: boolean = false;
  @property({ type: Boolean }) ghost: boolean = false;
  @property({ type: Boolean }) fullheight: boolean = false;

  @state() index!: number;
  @state() borderless: boolean = false;
  @state() contentHeight: number = 0;

  async firstUpdated() {
    await this.updateComplete;
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has("disabled")) {
      this.active = this.disabled ? false : this.active;
    } else if(changedProperties.has("active")) {
      if(this.active){
        this.contentHeight = this.calculateContentHeight();
      }
    }
  }

  render() {
    return html`
      <div
        class=${classMap({
          "collapse--item": true,
          ghost: this.ghost,
          active: this.active,
          borderless: this.borderless,
          disabled: this.disabled,
          'full-height-collapse': this.fullheight,
        })}
      >
        <div
          tabindex="0"
          class=${classMap({
            "collapse--header": true,
            "collapse--arrow": this.arrow,
          })}
          disabled=${ifDefined(this.disabled ?? undefined)}
          @click=${this.handleClick}
        >
          <div class="collapse--title">
            <slot name="header" class="header"></slot>
          </div>
        </div>

        <div
          class="collapse--content"
          style=${styleMap({
            display: this.active ? "block" : "none",
          })}
        >
          <slot style=${styleMap({
              // height: this.active && this.contentHeight ? `${this.contentHeight}px` : null,
              display: "block",
              overflow: "auto",
              boxSizing: "border-box",
            })}></slot>
        </div>
      </div>
    `;
  }

  private calculateContentHeight() {
    const content = this.shadowRoot?.querySelector(".collapse--content") as HTMLElement;
    if (content) {
      const contentHeight = content.scrollHeight;
      return contentHeight;
    } else return 0;
  }

  private handleClick(e: any) {
    if (!this.disabled) {
      this.active = !this.active;

      this.dispatchEvent(
        new CustomEvent("changed", {
          detail: this,
          bubbles: true,
          composed: true,
          cancelable: false,
        })
      );
    }
  }
}

