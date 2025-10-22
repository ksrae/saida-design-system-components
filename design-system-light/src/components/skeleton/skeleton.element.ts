import { LitElement, html, CSSResultGroup, css, unsafeCSS, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from "lit/directives/class-map.js";
import globalCSS from './styles/skeleton.scss?inline';

@customElement('sy-skeleton')
export class SkeletonElement extends LitElement {
    static styles: CSSResultGroup = css`${unsafeCSS(globalCSS)};`

  @property({ type: String }) type: 'text' | 'avatar' | 'image' | 'gallary' | 'button' | 'table' | 'tree' = 'text';
  @property({ type: Number }) rows: number = 0;
  @property({ type: String }) width: string = '100%';
  // @property({ type: String }) height: string = '100%';
  @property({ type: Boolean }) disabled: boolean = false;

  @state() skeletonWidth: string = '100%'; // Default width for skeleton items
  private _resizeObserver: ResizeObserver | null = null;
  private animationKey: number = 0; // Used to reset animations when rows change
  private treeContentWidth: number = 0; // Store calculated tree content width

   connectedCallback() {
    super.connectedCallback();
    // 첫 마운트 시 리사이즈 옵저버를 설정하기 위해 업데이트 요청
    this.requestUpdate();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // if (this._resizeObserver) {
    //   this._resizeObserver.disconnect();
    //   this._resizeObserver = null;
    // }
  }

  async firstUpdated() {
    await this.updateComplete;
    // 첫 업데이트 후 리사이즈 옵저버 설정
    const skeletonContainer = this.renderRoot.querySelector('.skeleton-container');
    if ((this.type === 'table' || this.type === 'tree') && skeletonContainer) {
      this._resizeObserver = new ResizeObserver(() => {
        if (this.type === 'tree') {
          this.calculateTreeContentWidth();
        }
        this.requestUpdate();
      });
      this._resizeObserver.observe(skeletonContainer);
    }
    
    if (this.type === 'tree') {
      this.calculateTreeContentWidth();
    }
    
    // Start animation after first render
    this.resetAnimation();
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has("width")) {
      this.skeletonWidth = this.getSizeValue(this.width);

      if (this.type === 'tree') {
        this.calculateTreeContentWidth();
      }
    }
    
    // 타입이나 로우가 변경되었을 때 애니메이션 재설정
    if ((changedProperties.has("rows") || changedProperties.has("type")) && !this.disabled) {
      // 타입 변경 시 애니메이션 키 업데이트
      this.animationKey = Date.now();
      // 애니메이션 재시작
      this.resetAnimation();
    }

    // disabled 속성이 변경되었을 때도 애니메이션 상태 확인
    if (changedProperties.has("disabled")) {
      if (this.disabled) {
        // 비활성화된 경우 애니메이션 중지
        this.stopAnimation();
      } else {
        // 활성화된 경우 애니메이션 재시작
        this.resetAnimation();
      }
    }

    // Recalculate tree content width if type changes to tree
    if (changedProperties.has("type") && this.type === 'tree') {
      this.calculateTreeContentWidth();
    }
  }
  
  render() {
    const actualRow = Math.max(1, this.rows);
    const rows = Array.from({ length: actualRow }, (_, i) => i);    

    // for table
    const numColumns = this.type === 'table' ? this.calculateColumns() : 0;
    const columns = this.type === 'table' ? Array.from({ length: numColumns }, (_, i) => i) : [];

    // for gallary - each row has 4 gallary
    const gallaryPerRow = 4;
    
    // Class for all skeleton items
    const itemClass = (extraClasses: string) => classMap({
      'skeleton-item': true,
      'skeleton-animated': !this.disabled,
      [extraClasses]: true
    });

    return html`
    <div 
      class=${classMap({
        "skeleton-container": true,
        "align-center": this.rows === 0 && (this.type === 'avatar' || this.type === 'image'),
      })}
      style="width: ${this.skeletonWidth};" 
      data-animation-key="${this.animationKey}"
    >
      ${this.type === 'table' ?
      // table
        html`
          <table class="skeleton-table">
            ${rows.map(() => html`
              <tr>
                ${columns.map(() => html`
                  <td>
                    <div class=${itemClass('skeleton-table-cell')}></div>
                  </td>
                `)}
              </tr>
            `)}
          </table>`  
      : this.type === 'button' ?
      // button
        html`
          <div class="skeleton-buttons-container">
            ${rows.map(() => html`<div class=${itemClass('skeleton-button')}></div>`)}
          </div>`
      : this.type === 'gallary' ?
      // gallary grid - 3 per row
        html`
          <div class="skeleton-gallary-container">
            ${rows.map(() => html`
              <div class="skeleton-gallary-row">
                ${Array.from({ length: gallaryPerRow }, (_, i) => i).map(() => html`
                  <div class=${itemClass('skeleton-gallary-item')}></div>
                `)}
              </div>
            `)}
          </div>`
      : this.type === 'tree' ?
      // tree structure with indentation
        html`
          <div class="skeleton-tree-container">
            ${rows.map((index) => {
              // Calculate depth for the current row based on the pattern
              // Pattern repeats every 10 rows
              const normalizedIndex = index % 10;
              let depth = 0;
              
              if (normalizedIndex === 0 || normalizedIndex === 1 || normalizedIndex === 8) {
                depth = 0; // First depth (1st, 2nd, and 9th rows)
              } else if (normalizedIndex === 2 || normalizedIndex === 6 || normalizedIndex === 7 || normalizedIndex === 9) {
                depth = 1; // Second depth (3rd, 7th, 8th, and 10th rows)
              } else if (normalizedIndex >= 3 && normalizedIndex <= 5) {
                depth = 2; // Third depth (4th, 5th, and 6th rows)
              }
              
              return html`
                <div class="skeleton-tree-item">
                  ${Array.from({ length: depth }, (_, i) => i).map(() => html`
                    <div class="skeleton-tree-indent"></div>
                  `)}
                  <div class="skeleton-tree-content">
                    <div 
                      class=${itemClass('skeleton-text')}
                      style="width: ${this.treeContentWidth > 0 ? `${this.treeContentWidth}px` : '100%'};"
                    ></div>
                  </div>
                </div>
              `;
            })}
          </div>`
      : 
      // avatar or image
        html` ${this.rows >= 1 && (this.type === 'avatar' || this.type === 'image') ? html`
          <div class="${classMap({
            'skeleton-with-avatar': this.type === 'avatar',
            'skeleton-with-image': this.type === 'image',
          })}">
            <div class=${itemClass(this.type === 'avatar' ? 'skeleton-avatar' : 'skeleton-image')}>
            </div>
            <div class=${classMap({
              'skeleton-content': true,
              'vertical-center': this.rows === 1 // Apply vertical centering only when rows is exactly 1
            })}>
              ${this.rows === 1 
                ? html`<div class=${itemClass('skeleton-text')}></div>` // One centered text skeleton
                : html`${rows.slice(0, 2).map(() => html`<div class=${itemClass('skeleton-text')}></div>`)}` // Stack multiple skeletons
              }
            </div>
          </div>
          ${rows.slice(2).map(() => html`<div class=${itemClass('skeleton-text')}></div>`)}` 
        :
        // text, or there is only one avatar or image
          html` ${rows.map(() => html`
              <div class=${classMap({
                'skeleton-item': true,
                'skeleton-animated': !this.disabled,
                'skeleton-text': this.type === 'text',
                'skeleton-avatar': this.type === 'avatar',
                'skeleton-image': this.type === 'image',
                'large': this.type === 'image' && this.rows === 0,
              })}>
            </div>`
          )}`      
        }
        `
      }
    </div>
  `;
  }

  // 애니메이션 중지 메소드 추가
  private stopAnimation() {
    const animatedElements = this.renderRoot.querySelectorAll('.skeleton-animated');
    animatedElements.forEach(el => {
      el.classList.remove('skeleton-animated');
      (el as HTMLElement).style.animation = 'none';
    });
  }
    
  // 애니메이션 리셋 및 시작 메소드 개선
  private resetAnimation() {
    if (this.disabled) return;
    
    // 애니메이션 초기화를 위해 약간의 지연 추가
    setTimeout(() => {
      // 모든 skeleton-item 요소 선택
      const allSkeletonItems = this.renderRoot.querySelectorAll('.skeleton-item');
      
      // 모든 애니메이션 초기화
      allSkeletonItems.forEach(el => {
        (el as HTMLElement).style.animation = 'none';
        // Force reflow
        void (el as HTMLElement).offsetWidth;
        
        // 애니메이션 클래스 추가
        el.classList.add('skeleton-animated');
        // 애니메이션 다시 시작
        (el as HTMLElement).style.animation = 'skeleton 3s infinite';
      });
    }, 10); // 약간의 지연으로 DOM 업데이트가 완료되도록 함
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

  private calculateColumns() {
    const containerWidth = this.getBoundingClientRect().width;
    
    // 컨테이너 너비에 따라 열 수 계산
    if (containerWidth < 300) {
      return 2;
    } else if (containerWidth < 500) {
      return 3;
    } else if (containerWidth < 700) {
      return 4;
    } else if (containerWidth < 900) {
      return 5;
    } else {
      return 6;
    }
  }
  
  private calculateTreeContentWidth() {
    // Calculate the maximum width available for content based on container width
    const containerWidth = this.getBoundingClientRect().width;
    if (containerWidth <= 0) return;
    
    // Maximum depth is 2, so we need to subtract 2 * indent width (24px each)
    const maxIndentation = 2 * 24;
    const availableWidth = Math.max(150, containerWidth - maxIndentation);
    
    // Set the content width to be consistent across all tree items
    this.treeContentWidth = availableWidth;
    this.requestUpdate();
  }
}