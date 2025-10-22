import { Component, Prop, h, Element, Watch } from '@stencil/core';

@Component({
  tag: 'sy-steps',
  styleUrl: 'sy-steps.scss',
  scoped: true,
  shadow: false,
})
export class SySteps {
  @Element() host!: HTMLSyStepsElement;

  @Prop({ reflect: true, mutable: true }) current: number = 0;
  @Prop({ reflect: true }) clickable: boolean = false;
  @Prop({ reflect: true }) complete: boolean = false;
  @Prop({ reflect: true }) type: "horizontal" | "vertical" = "horizontal";
  @Prop({ reflect: true }) size: "small" | "medium" = "medium";
  @Prop({ reflect: true }) startIndex: number = 0;

  componentWillLoad() {
    // 문자열인 경우 숫자로 변환
    if (typeof this.current === 'string') {
      this.current = parseInt(this.current as any, 10);
    }
    if (typeof this.startIndex === 'string') {
      this.startIndex = parseInt(this.startIndex as any, 10);
    }

    this.validateCurrent();
  }

  componentDidLoad() {
    setTimeout(() => {
      this.initializeAllSteps();
    }, 10);
  }


  @Watch('current')
  watchCurrent(newValue: any) {
    this.current = Number(newValue);
    this.validateCurrent();
    this.updateCurrentOnChildren();
  }

  @Watch('startIndex')
  watchStartIndex(newValue: any) {
    this.startIndex = Number(newValue);
    this.validateCurrent();
    this.updateStartIndex();
  }

  @Watch('clickable')
  watchClickable() {
    this.updateClickable();
  }

  @Watch('size')
  watchSize() {
    this.updateSize();
  }

  @Watch('complete')
  watchComplete() {
    this.updateCompleteSteps();
  }

  @Watch('type')
  watchType() {
    this.updateType();
  }

  private getStepContents(): HTMLSyStepElement[] {
    // Light DOM에서 직접 sy-step 요소들을 찾기
    // slot 내부가 아니라 host의 직접 자식들
    return Array.from(this.host.querySelectorAll('sy-step')) as HTMLSyStepElement[];
  }

  private validateCurrent() {
    const stepList = this.getStepContents();

    if (stepList.length === 0) return;

    const maxIndex = stepList.length - 1 + this.startIndex;

    if (this.current < this.startIndex) {
      this.current = this.startIndex;
    } else if (this.current > maxIndex + 1) {
      this.current = maxIndex + 1;
    }
  }

  private initializeAllSteps() {
    const steps = this.getStepContents();

    steps.forEach((step: HTMLSyStepElement, i: number, arr) => {
      const calculatedIndex = this.startIndex + i;

      step.index = calculatedIndex;
      step.current = this.current;
      step.size = this.size;
      step.lastStep = i === arr.length - 1;
      step.clickable = this.clickable;
      step.type = this.type;

      if (this.complete) {
        step.parentStatus = "finish";
      }
    });
  }

  private updateCurrentOnChildren() {
    this.getStepContents().forEach((step: HTMLSyStepElement) => {
      step.current = this.current;
    });
  }

  private updateSize() {
    this.getStepContents().forEach((element: HTMLSyStepElement, index: number, arr) => {
      element.size = this.size;
      element.lastStep = index === arr.length - 1;
    });
  }

  private updateStartIndex() {
    const steps = this.getStepContents();
    steps.forEach((stepElement: HTMLSyStepElement, i: number) => {
      const newIndex = this.startIndex + i;
      stepElement.index = newIndex;
    });
  }

  private updateClickable() {
    this.getStepContents().forEach((stepElement: HTMLSyStepElement) => {
      stepElement.clickable = this.clickable;
    });
  }

  private updateCompleteSteps() {
    this.getStepContents().forEach((stepElement: HTMLSyStepElement) => {
      stepElement.parentStatus = this.complete ? "finish" : "none";
    });

    if(!this.complete) {
      this.updateCurrentOnChildren();
    }
  }

  private updateType() {
    this.getStepContents().forEach((stepElement: HTMLSyStepElement) => {
      stepElement.type = this.type;
    });
  }

  private handleSlotChange = () => {
    // 슬롯 내용이 변경되면 재초기화
    setTimeout(() => {
      this.initializeAllSteps();
    }, 10);
  }

  render() {
    return (
      <div class="steps-wrapper">
        <slot onSlotchange={this.handleSlotChange}></slot>
      </div>
    );
  }
}
