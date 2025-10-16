import { Component, h, Prop, Element } from '@stencil/core';
import { fnGetChildrenByTagName } from '../../utils/utils';

export interface ButtonGroupState {
  buttonGroup: boolean;
  vertical: boolean;
  first: boolean;
  last: boolean;
}

@Component({
  tag: 'sy-button-group',
  styleUrl: 'sy-button-group.scss',
  shadow: false,
  scoped: true,
})
export class SyButtonGroup {
  @Element() host: HTMLSyButtonGroupElement;
  @Prop({ reflect: true }) vertical: boolean = false;

  private containerEl: HTMLDivElement; // Ref로 참조할 div 요소를 담을 변수
  private mutationObserver: MutationObserver;
  private buttons: HTMLElement[] = [];

  // componentDidRender는 초기 렌더링 및 모든 후속 렌더링 후에 호출됩니다.
  componentDidRender() {
    // MutationObserver가 아직 설정되지 않았고, containerEl이 Ref를 통해 할당되었다면
    if (!this.mutationObserver && this.containerEl) {
      this.mutationObserver = new MutationObserver(() => {
        // 자식 노드에 변화가 생기면 updateButtons를 다시 호출
        this.updateButtons();
      });
      // 감시 대상을 Ref로 직접 지정
      this.mutationObserver.observe(this.containerEl, { childList: true });
    }
    // 렌더링이 완료될 때마다 버튼 상태를 업데이트
    this.updateButtons();
  }

  disconnectedCallback() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }

  private updateButtons() {
    const children = fnGetChildrenByTagName(this.containerEl, 'sy-button') as HTMLElement[];

    if (this.haveButtonsChanged(children)) {
      this.buttons = children;
      if (this.buttons.length === 0) return;

      this.buttons.forEach((button, index) => {
        if (typeof (button as any).setButtonGroupState === 'function') {
          const state: ButtonGroupState = {
            buttonGroup: true,
            vertical: this.vertical,
            first: index === 0,
            last: index === this.buttons.length - 1,
          };
          (button as any).setButtonGroupState(state);
        }
      });
    }
  }

  private haveButtonsChanged(newButtons: HTMLElement[]): boolean {
    if (this.buttons.length !== newButtons.length) return true;
    for (let i = 0; i < this.buttons.length; i++) {
      if (this.buttons[i] !== newButtons[i]) return true;
    }
    return false;
  }

  render() {
    return (
      <div
        class={{
          'button-group': true,
          'button-group--vertical': this.vertical,
        }}
        // [핵심 수정] ref 속성을 사용하여 이 div에 대한 참조를 this.containerEl에 할당합니다.
        ref={(el) => this.containerEl = el as HTMLDivElement}
      >
        <slot />
      </div>
    );
  }
}
