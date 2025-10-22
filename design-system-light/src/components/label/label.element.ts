import { LitElement, CSSResultGroup, css, unsafeCSS, html, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import globalCSS from './styles/label.scss?inline';
import { classMap } from 'lit/directives/class-map.js';


@customElement('sy-label')
export class LabelElement extends LitElement {
  // ${unsafeCSS(globalCSS)};
  static styles: CSSResultGroup = css`
    ${unsafeCSS(globalCSS)};
  `

  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: String, reflect: true }) requiredPosition: 'left' | 'right' = 'right';
  @property({ type: String, attribute: 'for' }) htmlFor: string = '';  // for 속성을 htmlFor로 변경하고 HTML 속성과 매핑
  @property({ type: String }) value: string = '';
  @property({ type: String }) valuePosition: 'left' | 'right' = 'left';
  @property({ type: String }) width: string = '';
  @state() private implicitInput: HTMLElement | null = null;
  @state() private labelWidth: string = 'auto';

  private resizeObserver: ResizeObserver | null = null; // ResizeObserver를 위한 속성 추가

  // 컴포넌트가 DOM에 처음 연결될 때 호출
  connectedCallback() {
    super.connectedCallback();
    this.updateTargetElement();
  }

  // 컴포넌트가 업데이트될 때 호출
  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);

    // htmlFor 속성이나 required 속성이 변경됐을 때 처리
    if (changedProperties.has('htmlFor') || changedProperties.has('required') || changedProperties.has('disabled')) {
      this.updateTargetElement();
    }
    if (changedProperties.has('width')) {
      // width 속성이 변경되면 스타일 업데이트
      if (this.width && this.width.length) {
        this.labelWidth = this.getSizeValue(this.width);
      } else {
        this.labelWidth = 'auto'; // 기본값으로 auto 설정
      }

    }
  }

  // 컴포넌트가 DOM에서 제거될 때 호출
  disconnectedCallback() {
    super.disconnectedCallback();

    // ResizeObserver 정리
    if (this.resizeObserver && this.implicitInput) {
      this.resizeObserver.unobserve(this.implicitInput);
      this.resizeObserver = null;
    }
  }
  // 라벨 렌더링 - 슬롯 추가
  render() {
    return html`
      <label 
        class=${classMap({
      'label': true,
      [`align-${this.valuePosition}`]: true
    })}
        style="width: ${this.labelWidth};" 
        for="${ifDefined(this.htmlFor)}"
      >
        <div class="label-title">
          ${this.required && this.requiredPosition === 'left' ? html`<span class="required-mark-left">*</span>` : nothing}
          <span class="label-content">${this.value}</span>
          ${this.required && this.requiredPosition === 'right' ? html`<span class="required-mark-right">*</span>` : nothing}          
        </div>
        <div class="label-item">
          <slot @slotchange="${this.handleSlotChange}"></slot>
        </div>
      </label>
    `;
  }

  // 슬롯 변경 시 암시적 라벨링 확인
  private handleSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const assignedElements = slot.assignedElements();

    // 슬롯에 할당된 요소 중 라벨 가능한 요소 찾기
    this.implicitInput = this.findLabelableElement(assignedElements);

    // 암시적 라벨링 적용
    this.applyImplicitLabeling();

    // 연결된 요소의 높이에 맞춰 라벨 세로 중앙 정렬
    // this.updateVerticalAlignment();
  }

  // 라벨 가능한 요소 찾기
  private findLabelableElement(elements: Element[]): HTMLElement | null {
    // 라벨 가능한 요소 목록
    const labelableTypes = [
      'button', 'input', 'progress', 'select', 'textarea',
      'sy-button', 'sy-input', 'sy-input-number', 'sy-textarea', 'sy-select', 'sy-progress-bar', 'sy-checkbox', 'sy-radio', 'sy-switch',
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

      // Lit 컴포넌트일 수 있으므로 'sy-' 접두사도 확인
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

  // 암시적 라벨링 적용
  private applyImplicitLabeling() {
    if (this.implicitInput) {
      // 요소에 id가 없으면 자동으로 생성
      if (!this.implicitInput.id) {
        this.implicitInput.id = `sy-label-input-${Math.random().toString(36).substring(2, 11)}`;
      }

      // htmlFor 속성이 명시적으로 설정되지 않은 경우에만 암시적 라벨링 적용
      if (!this.htmlFor) {
        this.htmlFor = this.implicitInput.id;
      }

      if (this.required) {
        this.implicitInput.setAttribute('required', 'true');
      } else {
        this.implicitInput.removeAttribute('required');
      }

      if (this.disabled) {
        this.implicitInput.setAttribute('disabled', 'true');
      } else {
        this.implicitInput.removeAttribute('disabled');
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
    if (targetElement) {
      if (this.required) {
        targetElement.setAttribute('required', 'true');
      } else {
        targetElement.removeAttribute('required');
      }

      if (this.disabled) {
        targetElement.setAttribute('disabled', 'true');
      } else {
        targetElement.removeAttribute('disabled');
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
}