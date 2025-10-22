import {LitElement,CSSResultGroup,css,unsafeCSS,html} from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import globalCSS from "./styles/flex.scss?inline";
import { styleMap } from "lit/directives/style-map.js";

@customElement("sy-flex")
export class FlexElement extends LitElement {
  static styles: CSSResultGroup = css`
    ${unsafeCSS(globalCSS)};
  `;
  @property({ type: String }) align: 'start' | 'end' | 'center' | 'stretch' | 'baseline'  = 'start';
  @property({ type: String }) rowGap: 'none' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' = 'medium';
  @property({ type: String }) columnGap: 'none' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' = 'medium';
  @property({ type: String }) justify: 'start' | 'center' | 'end' | 'space-between' = 'start';
  @property({ type: String }) direction: "horizontal" | "vertical" | "horizontal-reverse" | "vertical-reverse" = "horizontal";
  @property({ type: String }) wrap: 'nowrap' | 'wrap' | 'wrap-reverse' = 'nowrap';
  @property({ type: String }) padding: 'none' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' = 'medium';
  @property({ type: String, reflect: false }) height!: string;
  @property({ type: String, reflect: false }) width!: string;
  
  @query(".flex-container") flexContainer!: HTMLElement;

  @state() private containerWidth!: string;
  @state() private containerHeight!: string;
  @state() private containerPadding!: string;

  itemList!: Element[];

  connectedCallback(): void {
    super.connectedCallback();
    setTimeout(() => {
      this.itemList = Array.from(this.children);
      this.requestUpdate();
    }, 0);
  }

  async firstUpdated() {
    await this.updateComplete;
    if(this.width) {
      this.setContainerWidth();
    }
    if(this.height) {
      this.setContainerHeight();
    }
    
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('width') && this.width) {
      this.setContainerWidth();
    } 
    if (changedProperties.has('height') && this.height) {
      this.setContainerHeight();
    }
  }

  private setContainerWidth() {
    this.containerWidth = this.width ? !isNaN(Number(this.width)) ? `${this.width}px`: this.width : '100%';
    this.style.width = this.containerWidth;
  }
  
  private setContainerHeight() {
    this.containerHeight = this.height ? !isNaN(Number(this.height)) ? `${this.height}px`: this.height : '100%';
    this.style.height = this.containerHeight;
  }


  render() {
    return html` 
    <div class=${classMap({
        "flex-container": true,
        vertical: this.direction === "vertical",
        horizontal: this.direction === "horizontal",
      })}
      style=${styleMap({
        width: this.containerWidth,
        height: this.containerHeight,
      })}
    >
      <slot></slot>
    </div>`;
  }
}
