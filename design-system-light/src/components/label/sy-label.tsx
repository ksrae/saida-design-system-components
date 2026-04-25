import { Component, Prop, State, h, Element, Watch } from '@stencil/core';
import { fnAssignPropFromAlias } from '../../utils/utils';

@Component({
  tag: 'sy-label',
  styleUrl: 'sy-label.scss',
  scoped: true,
  shadow: false,
})
export class SyLabel {
  @Element() host!: HTMLSyLabelElement;

  @Prop({ reflect: true }) disabled: boolean = false;
  @Prop({ reflect: true }) required: boolean = false;
  @Prop({ reflect: true, attribute: 'requiredPosition', mutable: true }) requiredPosition: 'left' | 'right' = 'right';
  @Prop({ attribute: 'for', mutable: true }) htmlFor: string = '';
  @Prop() value: string = '';
  // Attribute mirrors the JS property name so `<sy-label valuePosition="right">`
  // works verbatim in storybook stories (HTML lowercases to `valueposition`, which
  // Stencil observes via the explicit attribute mapping).
  @Prop({ reflect: true, attribute: 'valuePosition', mutable: true }) valuePosition: 'left' | 'right' | 'center' = 'left';
  @Prop() width: string = '';

  @State() private labelWidth: string = 'auto';

  private implicitInput: HTMLElement | null = null;
  private internalHtmlFor: string = '';
  private mutationObserver: MutationObserver | null = null;
  private resizeObserver: ResizeObserver | null = null;

  componentWillLoad() {
    this.requiredPosition = fnAssignPropFromAlias(this.host, 'required-position') ?? this.requiredPosition;
    const valuePos = fnAssignPropFromAlias<'left' | 'right' | 'center'>(this.host, 'value-position');
    if (valuePos) this.valuePosition = valuePos;

    // width 초기 설정
    if (this.width && this.width.length) {
      this.labelWidth = this.getSizeValue(this.width);
    } else {
      this.labelWidth = 'auto';
    }
  }

  componentDidLoad() {
    // 초기 타겟 요소 업데이트
    this.updateTargetElement();

    // MutationObserver로 자식 요소 변경 감지
    this.observeChildren();

    // 초기 라벨 가능한 요소 찾기
    this.findAndApplyLabelingWithoutTriggeringRerender();
  }

  disconnectedCallback() {
    // MutationObserver 정리
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = null;
    }

    // ResizeObserver 정리
    if (this.resizeObserver && this.implicitInput) {
      this.resizeObserver.unobserve(this.implicitInput);
      this.resizeObserver = null;
    }
  }

  @Watch('htmlFor')
  @Watch('required')
  @Watch('disabled')
  watchTargetProps() {
    this.updateTargetElement();
  }

  @Watch('width')
  watchWidth() {
    if (this.width && this.width.length) {
      this.labelWidth = this.getSizeValue(this.width);
    } else {
      this.labelWidth = 'auto';
    }
  }

  private observeChildren() {
    // 라벨 아이템 컨테이너 찾기
    const labelItem = this.host.querySelector('.label-item');
    if (!labelItem) {
      // 아직 렌더링되지 않은 경우 짧은 지연 후 재시도
      setTimeout(() => this.observeChildren(), 10);
      return;
    }

    // MutationObserver 생성
    this.mutationObserver = new MutationObserver((mutations) => {
      // 자식 노드가 변경되었을 때
      const hasChildListChange = mutations.some(mutation =>
        mutation.type === 'childList' &&
        (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)
      );

      if (hasChildListChange) {
        this.findAndApplyLabeling();
      }
    });

    // 옵저버 시작
    this.mutationObserver.observe(labelItem, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false
    });
  }

  private findAndApplyLabelingWithoutTriggeringRerender() {
    const labelItem = this.host.querySelector('.label-item');
    if (!labelItem) return;

    // 모든 자식 요소 가져오기
    const elements = Array.from(labelItem.children);

    // 라벨 가능한 요소 찾기
    const newImplicitInput = this.findLabelableElement(elements);

    // 이전과 다른 요소인 경우에만 업데이트
    if (newImplicitInput !== this.implicitInput) {
      // 이전 ResizeObserver 정리
      if (this.resizeObserver && this.implicitInput) {
        this.resizeObserver.unobserve(this.implicitInput);
        this.resizeObserver = null;
      }

      this.implicitInput = newImplicitInput;
      this.applyImplicitLabelingWithoutPropChange();

      // 새로운 요소에 ResizeObserver 설정 (필요한 경우)
      if (this.implicitInput) {
        this.setupResizeObserver();
      }
    }
  }

  private findAndApplyLabeling() {
    const labelItem = this.host.querySelector('.label-item');
    if (!labelItem) return;

    // 모든 자식 요소 가져오기
    const elements = Array.from(labelItem.children);

    // 라벨 가능한 요소 찾기
    const newImplicitInput = this.findLabelableElement(elements);

    // 이전과 다른 요소인 경우에만 업데이트
    if (newImplicitInput !== this.implicitInput) {
      // 이전 ResizeObserver 정리
      if (this.resizeObserver && this.implicitInput) {
        this.resizeObserver.unobserve(this.implicitInput);
        this.resizeObserver = null;
      }

      this.implicitInput = newImplicitInput;
      this.applyImplicitLabeling();

      // 새로운 요소에 ResizeObserver 설정 (필요한 경우)
      if (this.implicitInput) {
        this.setupResizeObserver();
      }
    }
  }

  private setupResizeObserver() {
    if (!this.implicitInput || !window.ResizeObserver) return;

    this.resizeObserver = new ResizeObserver(() => {
      // 크기 변경 시 필요한 작업 수행
      // 예: 라벨 정렬 업데이트 등
    });

    this.resizeObserver.observe(this.implicitInput);
  }

  private findLabelableElement(elements: Element[]): HTMLElement | null {
    // 라벨 가능한 요소 목록
    const labelableTypes = [
      'button', 'input', 'progress', 'select', 'textarea',
      'sy-button', 'sy-input', 'sy-input-number', 'sy-textarea', 'sy-select',
      'sy-progress-bar', 'sy-checkbox', 'sy-radio', 'sy-switch',
    ];

    // 직접적인 자식 요소 중 라벨 가능한 요소 찾기
    for (const element of elements) {
      const tagName = element.tagName.toLowerCase();

      // hidden 타입의 input은 제외
      if (tagName === 'input' && (element as HTMLInputElement).type === 'hidden') {
        continue;
      }

      if (labelableTypes.includes(tagName)) {
        return element as HTMLElement;
      }

      // sy- 접두사 확인
      if (tagName.startsWith('sy-') && labelableTypes.some(type => tagName.includes(type))) {
        return element as HTMLElement;
      }

      // 자식 요소 재귀적으로 확인 (깊이 우선 탐색)
      const childResult = this.findLabelableElement(Array.from(element.children));
      if (childResult) {
        return childResult;
      }
    }

    return null;
  }

  private applyImplicitLabelingWithoutPropChange() {
    if (!this.implicitInput) return;

    // 요소에 id가 없으면 자동으로 생성
    if (!this.implicitInput.id) {
      this.implicitInput.id = `sy-label-input-${Math.random().toString(36).substring(2, 11)}`;
    }

    // htmlFor를 내부 변수에만 저장하고 prop은 변경하지 않음
    this.internalHtmlFor = this.implicitInput.id;

    // required 속성 설정
    if (this.required) {
      this.implicitInput.setAttribute('required', 'true');
      // 커스텀 컴포넌트인 경우 prop으로도 설정
      if ((this.implicitInput as any).required !== undefined) {
        (this.implicitInput as any).required = true;
      }
    } else {
      this.implicitInput.removeAttribute('required');
      if ((this.implicitInput as any).required !== undefined) {
        (this.implicitInput as any).required = false;
      }
    }

    // disabled 속성 설정
    if (this.disabled) {
      this.implicitInput.setAttribute('disabled', 'true');
      if ((this.implicitInput as any).disabled !== undefined) {
        (this.implicitInput as any).disabled = true;
      }
    } else {
      this.implicitInput.removeAttribute('disabled');
      if ((this.implicitInput as any).disabled !== undefined) {
        (this.implicitInput as any).disabled = false;
      }
    }
  }

  private applyImplicitLabeling() {
    if (!this.implicitInput) return;

    // 요소에 id가 없으면 자동으로 생성
    if (!this.implicitInput.id) {
      this.implicitInput.id = `sy-label-input-${Math.random().toString(36).substring(2, 11)}`;
    }

    // htmlFor 속성이 명시적으로 설정되지 않은 경우에만 암시적 라벨링 적용
    const newHtmlFor = this.implicitInput.id;

    // Only update htmlFor if it's different to avoid re-render warnings
    if (this.htmlFor !== newHtmlFor) {
      this.htmlFor = newHtmlFor;
    }

    // required 속성 설정
    if (this.required) {
      this.implicitInput.setAttribute('required', 'true');
      // 커스텀 컴포넌트인 경우 prop으로도 설정
      if ((this.implicitInput as any).required !== undefined) {
        (this.implicitInput as any).required = true;
      }
    } else {
      this.implicitInput.removeAttribute('required');
      if ((this.implicitInput as any).required !== undefined) {
        (this.implicitInput as any).required = false;
      }
    }

    // disabled 속성 설정
    if (this.disabled) {
      this.implicitInput.setAttribute('disabled', 'true');
      if ((this.implicitInput as any).disabled !== undefined) {
        (this.implicitInput as any).disabled = true;
      }
    } else {
      this.implicitInput.removeAttribute('disabled');
      if ((this.implicitInput as any).disabled !== undefined) {
        (this.implicitInput as any).disabled = false;
      }
    }
  }

  private updateTargetElement() {
    // 암시적 라벨링이 적용된 경우는 별도로 처리
    if (this.implicitInput && this.implicitInput.id === this.htmlFor) {
      this.applyImplicitLabeling();
      return;
    }

    // 명시적 라벨링 처리
    if (!this.htmlFor) return;

    // 전체 문서에서 ID로 요소 찾기
    const targetElement = document.getElementById(this.htmlFor);
    if (!targetElement) return;

    // required 속성 설정
    if (this.required) {
      targetElement.setAttribute('required', 'true');
      if ((targetElement as any).required !== undefined) {
        (targetElement as any).required = true;
      }
    } else {
      targetElement.removeAttribute('required');
      if ((targetElement as any).required !== undefined) {
        (targetElement as any).required = false;
      }
    }

    // disabled 속성 설정
    if (this.disabled) {
      targetElement.setAttribute('disabled', 'true');
      if ((targetElement as any).disabled !== undefined) {
        (targetElement as any).disabled = true;
      }
    } else {
      targetElement.removeAttribute('disabled');
      if ((targetElement as any).disabled !== undefined) {
        (targetElement as any).disabled = false;
      }
    }
  }

  private getSizeValue(value: string): string {
    if (!value) return '100%';
    // If the value is just a number, add 'px'
    if (/^\d+$/.test(value)) {
      return `${value}px`;
    }
    // Otherwise, return as is
    return value;
  }

  render() {
    const labelClass = {
      'label': true,
      [`align-${this.valuePosition}`]: true
    };

    // Use internalHtmlFor if set (from implicit labeling), otherwise use htmlFor prop
    const effectiveHtmlFor = this.internalHtmlFor || this.htmlFor || undefined;

    return (
      <label
        class={Object.keys(labelClass).filter(k => labelClass[k]).join(' ')}
        style={{ width: this.labelWidth }}
        htmlFor={effectiveHtmlFor}
      >
        <div class="label-title">
          {this.required && this.requiredPosition === 'left' && (
            <span class="required-mark-left">*</span>
          )}
          <span class="label-content">{this.value}</span>
          {this.required && this.requiredPosition === 'right' && (
            <span class="required-mark-right">*</span>
          )}
        </div>
        <div class="label-item">
          <slot></slot>
        </div>
      </label>
    );
  }
}
