import { LitElement, html, CSSResultGroup, css, unsafeCSS } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import globalCSS from "./styles/tag.scss?inline";
import "../icon/icon.element";

@customElement("sy-tag")
export class TagElement extends LitElement {
  static styles: CSSResultGroup = css`
    ${unsafeCSS(globalCSS)};
  `;

  @property({ type: Boolean }) disabled: boolean = false;
  //@property({ type: String }) key!: string; // do not remove

  @property({ type: Boolean }) readonly: boolean = false;

  /** Makes the tag removable and shows a remove button. */
  @property({ type: Boolean }) removable: boolean = false;
  
  /** Makes the tag rounded. */
  @property({ type: Boolean, reflect: true }) rounded: boolean = false;

  /** Makes the tag selectable and emit click event */
  @property({ type: Boolean, reflect: true }) selectable: boolean = false;
  /** The tag's size. */
  @property({ type: String, reflect: true }) size: "small" | "medium" | "large" = "medium";
  @property({ type: String, reflect: true }) variant: "gray"| "purple" | "blue" | "green" | "cyan" | "yellow" | "orange" | "red" = "gray";

  @state() private checked: boolean = false;

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has("selectable")) {
      if (this.selectable) {
        //this.removable = false;
        // this.rounded = false;
        this.variant = "purple";
      } else {
        this.checked = false;
      }
    }
  }

  render() {
    return html`
      <span
        class=${classMap({
          // Selected
          tag: true,
          "tag--selectable": this.selectable,
          "tag--checked": this.checked,

          "tag--gray": this.variant === "gray",
          "tag--purple": this.variant === "purple",
          "tag--blue": this.variant === "blue",
          "tag--green": this.variant === "green",
          "tag--cyan": this.variant === "cyan",
          "tag--yellow": this.variant === "yellow",
          "tag--orange": this.variant === "orange",
          "tag--red": this.variant === "red",
          // Sizes
          "tag--small": this.size === "small",
          "tag--medium": this.size === "medium",
          "tag--large": this.size === "large",

          // disabled
          "tag--disabled": this.disabled,

          // Remove
          "tag--removable": this.removable,

          // Rounded
          'tag--rounded': this.rounded
        })}
        @click=${this.handleClick}
      >
        <slot></slot>

        ${this.removable
          ? html`<sy-icon
              size="xxsmall"
              class="tag-remove"
              selectable
              @selected=${this.handleRemoveClick}
            ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M71.5 105C62.2 95.6 62.2 80.4 71.5 71C80.8 61.6 96.1 61.7 105.5 71L320.5 286L535.5 71C544.9 61.6 560.1 61.6 569.4 71C578.7 80.4 578.8 95.6 569.4 104.9L354.4 319.9L569.4 534.9C578.8 544.3 578.8 559.5 569.4 568.8C560 578.1 544.8 578.2 535.5 568.8L320.5 353.8L105.5 568.8C96.1 578.2 80.9 578.2 71.6 568.8C62.3 559.4 62.2 544.2 71.6 534.9L286.6 319.9L71.6 104.9z"/></svg></sy-icon>`
          : ""}
      </span>
    `;
  }

  private handleClick = (e: any) => {
    if (this.selectable && (!this.disabled && !this.disabled)) {
      this.checked = !this.checked;

      this.dispatchEvent(
        new CustomEvent("selected", {
          detail: {
            tag: this,
          },
          bubbles: true, // 이벤트가 상위 요소들을 통해 버블링되도록 합니다.
          composed: true, // 이벤트가 Shadow DOM 경계를 넘어 전파되도록 합니다.
        })
      );
    } else {
      e.preventDefault();
    }
  };

  private handleRemoveClick = (e: any) => {
    if (this.removable && (!this.disabled && !this.readonly)) {
      // e.preventDefault();
      e.stopPropagation(); // 이벤트 전파를 멈춤
      this.dispatchEvent(
        new CustomEvent("removed", {
          detail: {
            tag: this,
          },
          bubbles: true, // 이벤트가 상위 요소들을 통해 버블링되도록 합니다.
          composed: true, // 이벤트가 Shadow DOM 경계를 넘어 전파되도록 합니다.
        })
      );
      this.remove();
    }
  };
}
