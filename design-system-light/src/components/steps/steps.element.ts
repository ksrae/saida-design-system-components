import { LitElement, CSSResultGroup, css, unsafeCSS, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { StepElement } from "./step.element";
import globalCSS from "./styles/steps.scss?inline";

@customElement("sy-steps")
export class StepsElement extends LitElement {
  static styles: CSSResultGroup = css`
    ${unsafeCSS(globalCSS)};
  `;
  @property({ type: Number }) current = 0;
  @property({ type: Boolean }) clickable: boolean = false;
  @property({ type: Boolean }) complete: boolean = false;
  @property({ type: String, reflect: true }) type: "horizontal" | "vertical" = "horizontal";
  @property({ type: String }) size: "small" | "medium" = "medium";
  //By setting startIndex to change starting index of a step component. Be sure to add an offset to currentIndex as well.
  @property({ type: Number }) startIndex = 0;

  // private stepList: StepElement[] = [];

  connectedCallback(): void {
    super.connectedCallback();

    this.setActiveIndex();

    // this.stepList = Array.from(this.children);
  }

  async firstUpdated() {
    await this.updateComplete;
    this.updateStartIndex();
    this.updateClickable();
    this.updateType();
    this.updateSize();
    
    if(this.complete) {
      this.updateCompleteSteps();
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has("current")) {
      this.updateSteps();
    } else if (changedProperties.has("startIndex")) {
      this.updateStartIndex();
    } else if (changedProperties.has("clickable")) {
      this.updateClickable();
    } else if (changedProperties.has("size")) {
      this.updateSize();
    } else if (changedProperties.has("complete")) {
      this.updateCompleteSteps();
    } else if (changedProperties.has('type')) {
      this.updateType();
    }
  }

  private getStepContents(): StepElement[] {
    return Array.from(this.querySelectorAll('sy-step') as NodeListOf<StepElement>);
  }
  
  private updateSteps() {
    this.setActiveIndex();

    this.getStepContents().forEach((step: StepElement) => {
      // if (step.tagName === "SY-STEP") {
        step.current = this.current;
      // }
    });
  }

  private updateSize() {
    this.getStepContents().forEach((element: StepElement, index: number, arr) => {
      element.size = this.size;
      element.lastStep = index === arr.length - 1;
    });
  }

    private setActiveIndex() {
    const stepList = this.getStepContents();
    const maxIndex = stepList.length - 1 + this.startIndex;

    if (this.current < this.startIndex) {
        this.current = this.startIndex;
    } else if (this.current > maxIndex + 1) {
        this.current = maxIndex + 1;
    }
  }

  private updateStartIndex() {
    
    this.getStepContents().forEach((stepElement: StepElement, index: number) => {
      stepElement.index = this.startIndex + index;
    });
  }

  private updateClickable() {
    this.getStepContents().forEach((stepElement: StepElement) => {
      stepElement.clickable = this.clickable;
    });
  }

  private updateCompleteSteps() {    
    this.getStepContents().forEach((stepElement: StepElement) => {
      stepElement.parentStatus = this.complete ? "finish" : "none";
    });
    
    if(!this.complete) {
      this.updateSteps();
    }
  }

  private updateType() {
    this.getStepContents().forEach((stepElement: StepElement) => {
      stepElement.type = this.type;
    });    
  }

  render() {
    return html`
      <div class="steps-wrapper">
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
  }

  private handleSlotChange() {
    // this.stepList = this.getStepContents();
    this.updateSteps();
  }

}
