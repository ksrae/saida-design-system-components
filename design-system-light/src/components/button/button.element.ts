import { LitElement, html, CSSResultGroup, css, unsafeCSS, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import globalCSS from './styles/button.scss?inline';

@customElement('sy-button')
export class ButtonElement extends LitElement {
  static formAssociated = true;
  
  static styles: CSSResultGroup = css`${unsafeCSS(globalCSS)};`
  
  @query('button') button!: HTMLButtonElement;

  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) justified = false;
  @property({ type: Boolean }) loading = false;
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';
  @property({ type: String }) variant: 'default' | 'primary' | 'secondary' | 'borderless' = 'default'; 
  @property({ type: String }) type: 'button' | 'submit' | 'reset' = 'button';
  @property({ type: Boolean }) formnovalidate = false;
    
  @property({ type: String }) title = '';
  @property({ type: String }) name = '';

  @state() buttonGroup = false;
  @state() vertical = false;
  @state() first = false;
  @state() last = false;
  @state() private hasContent = false;
  @state() private isInsideHeader: boolean = false;
  private internals: ElementInternals;


  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  public setClick() {
    this.button?.click();
  }
  public setFocus() {
    this.button?.focus();
  }
  public setBlur() {
    this.button?.blur();
  }

  formAssociatedCallback() {
    // Form 연동 시 호출되는 콜백
  }

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  formResetCallback() {
    // 폼 리셋 시 호출되는 콜백
    this.dispatchEvent(new CustomEvent('form-reset'));
  }

  formStateRestoreCallback(state: any, mode: any) {
    // 폼 상태 복원 시 호출되는 콜백
  }

  async firstUpdated() {
    await this.updateComplete;
    this.checkParentElement();
    this.button.addEventListener('click', this.handleButtonClick);
  }

  // 이벤트 리스너 정리
  disconnectedCallback() {
    super.disconnectedCallback();
    this.button?.removeEventListener('click', this.handleButtonClick);
  }

  render() {
    // const spinnerExists = customElements.get('sy-spinner');

    return html`
    <button 
      class=${
        classMap({
          'button--default': this.variant === 'default',
          'button--primary': this.variant === 'primary',
          'button--secondary': this.variant === 'secondary',
          'button--borderless': this.variant === 'borderless',
          'button--small': this.size === 'small',
          'button--medium': this.size === 'medium',
          'button--large': this.size === 'large',
          'button--first': this.buttonGroup && this.first,
          'button--last': this.buttonGroup && this.last,
          'button--middle': this.buttonGroup && !this.first && !this.last,
          'button--vertical': this.buttonGroup && this.vertical,
          "button--header": this.isInsideHeader,
        })
      }
      loading=${ifDefined(this.loading ?? undefined)}
      justified=${ifDefined(this.justified ?? undefined)}
      title=${ifDefined(this.title ?? undefined)}
      name=${ifDefined(this.name ?? undefined)}
      ?disabled=${this.disabled || this.loading}
      type=${ifDefined(this.type ?? undefined)}
      ?formnovalidate=${this.formnovalidate}
    >

    <!-- loading="true" 일 경우에만 아래 div 노출 요청 -->
    ${this.loading ? html`
      <div class="spinner--wrapper">
        <div class="spinner">
          <svg viewBox="0 0 66 66">
            <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
          </svg>
        </div>
      </div>` : nothing
    }

    <slot @slotchange="${this.handleSlotChange}"></slot>
    </button>`;
  }

    
  private checkParentElement() {
    // this.isInsideHeader = this.parentElement?.getAttribute('name')?.toLowerCase() === 'sy-global-header-extra-elements-in-header' ? true : false;

    this.isInsideHeader = false;
    // 첫 번째 부모 요소 찾기
    let parent = this.parentElement as any;
    
    // 부모가 없으면 Shadow Root의 호스트로 이동 시도
    if (parent && parent.getRootNode() instanceof ShadowRoot) {
      // 두 번째 부모 요소 찾기
      const shadowRoot = parent.getRootNode() as ShadowRoot;
      const grandparent = shadowRoot?.host;
      
      // 부모의 부모가 sy-global-header인지 확인
      this.isInsideHeader = grandparent?.tagName.toLowerCase() === 'sy-global-header';
      
      // console.log('Parent:', parent);
      // console.log('Grandparent:', grandparent);
      // console.log('Is inside header:', this.isInsideHeader);
    }
  }
  
  private handleSlotChange(e: any) {   
    const slot = e.target;
    // 슬롯에 할당된 노드들을 가져옵니다.
    const nodes = slot.assignedNodes({flatten: true});
    // 할당된 노드가 있거나 텍스트 노드가 있는데 trim 했을 때 공백이 아닌 경우만 node가 존재하는 것으로 정의한다.
    const hasContent = nodes.some((node: any) => node.nodeType === Node.TEXT_NODE ? node.textContent.trim() !== '' : true);
    
    this.hasContent = hasContent;
  }

  // 버튼 클릭 핸들러
  private handleButtonClick = (event: MouseEvent) => {
    // 버튼이 비활성화되었거나 로딩중이면 모든 동작을 차단
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    const form = this.internals.form;

    if (form) {
      // type에 따라 다르게 처리
      switch (this.type) {
        case 'submit':
          // 기본 동작 방지
          event.preventDefault();
          
          // submit 이벤트는 항상 발생시킴 (폼이 유효하든 유효하지 않든)
          const submitEvent = new Event('submit', {
            bubbles: true,
            cancelable: true
          });
          
          // submit 이벤트 발생
          const submitCancelled = !form.dispatchEvent(submitEvent);
          
          // submit 이벤트가 취소되지 않았고
          if (!submitCancelled) {
            // 폼이 유효하거나 formnovalidate가 설정된 경우에만 실제 submit 진행
            if (this.formnovalidate || form.checkValidity()) {
              // 실제 폼 제출 실행
              form.submit();
            } else {
              // 유효하지 않으면 유효성 오류 표시만 함
              form.reportValidity();
            }
          }
          break;
          
        case 'reset':
          // reset도 명시적으로 처리
          event.preventDefault();
          event.stopPropagation();
          form.reset();
          break;
          
        // default:
          // button 타입은 기본 클릭 이벤트만 발생
          // this.dispatchEvent(
          //   new CustomEvent('click', {
          //     bubbles: true,
          //     composed: true,
          //     detail: this
          //   })
          // );
          // break;
      }
    }
  };

}


