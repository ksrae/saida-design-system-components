import { LitElement, html, CSSResultGroup, svg, css, unsafeCSS, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import '../tooltip/tooltip.element';
import globalCSS from './styles/progress-circular.scss?inline';

export interface SegmentModel {
  percent: number;
  status?: 'default' | 'error' | 'complete'; // | 'warning' | 'info' | 'success'
}

@customElement('sy-progress-circular')
export class ProgressCircularElement extends LitElement {
  static styles: CSSResultGroup = css`${unsafeCSS(globalCSS)};`

  @property({ type: Number, reflect: true }) percent = 0;
  @property({ type: String }) segment = '';
  @property({ type: String }) status: 'default' | 'error' | 'complete' = 'default';
  @property({ type: Boolean }) hideText = false;
  @property({ type: String,  reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';
  // @property({ type: String }) thick: 'small' | 'medium' | 'large' = 'medium';
  @property({ type: String }) tooltipTitle: string = '';
  @property({ type: Boolean }) indeterminate = false;
  @state() private segmentInfo: SegmentModel[] = [];
  @state() private displayPercent: number = 0;
  

  private readonly center = 20;

  // Get radius based on thickness to prevent overlap
  private get radius(): number {
    return 18;
  }

  private get circumference(): number {
    return 2 * Math.PI * this.radius;
  }

  connectedCallback() {
    super.connectedCallback();
    this.parseSegmentsAttr();
  }

  async firstUpdated() {
    await this.updateComplete;
    this.parseSegmentsAttr();
    // this.handleSlotChange();
  }

  updated(changedProperties: Map<string, any>) {    
    
    if (changedProperties.has('status')) {
      // this.style.setProperty('--progress-color', this.progressColor(this.color));

      // 아래는 class 추가
      const status = `progress-status-${this.status}`;
      const classList = Array.from(this.classList);
      
      if(!this.classList.contains(status)) {
        for(const className of classList) {
          if (className.startsWith('progress-status-')) {
            this.classList.remove(className);
            break;
          }
        }
        this.classList.add(`progress-status-${this.status}`);
      }
    }
    
    if (changedProperties.has('segment')) {
      this.parseSegmentsAttr();
    }
    
    // if (changedProperties.has('thick')) {
    //   this.updateStrokeWidth();
    // }
    if (changedProperties.has('percent')) {
      if(this.percent < 0) {
        this.displayPercent = 0;
      } else if(this.percent > 100) {
        this.displayPercent = 100;
      } else {
        if(typeof(this.percent) === "number") {
          this.displayPercent = Math.round(this.percent);
        } else {
          this.displayPercent = 0;
        }
      }
    }
  }
  
  // Update stroke width CSS variable
  // private updateStrokeWidth() {
  //   // this.style.setProperty('--stroke-width', `${this.stroke}px`);

  //   // 아래는 class 추가
  //   const thick = `thick-${this.thick}`;
  //   const classList = Array.from(this.classList);
    
  //   if(!this.classList.contains(thick)) {
  //     for(const className of classList) {
  //       if (className.startsWith('thick-')) {
  //         this.classList.remove(className);
  //         break;
  //       }
  //     }
  //     this.classList.add(`thick-${this.thick}`);
  //   }
  // }

  // HTML 속성으로부터 segments 데이터를 파싱
  private parseSegmentsAttr() {
    if (!this.segment) return;
    
    try {
      // JSON 형식으로 파싱 시도
      let parsedSegments;
      if(typeof this.segment === 'object') {
        parsedSegments = this.segment;
      } else {
        parsedSegments = JSON.parse(this.segment);
      }
  
      // 여기서 중요한 부분: 누적값을 개별값으로 변환
      let previousPercent = 0;
      this.segmentInfo = parsedSegments.map((segment: SegmentModel) => {
        const adjustedSegment = {
          percent: segment.percent - previousPercent,
          status: segment.status || this.status  
        };
        previousPercent = segment.percent;
        return adjustedSegment;
      });
  
    } catch (e) {
      console.error('Invalid segments JSON format:', e);
    }
  }

  private renderSegments() {
    this.percent = Math.max(0, Math.min(this.percent, 100));
  
    // 세그먼트가 없는 경우, 단일 원으로 표시
    if (!this.segmentInfo || this.segmentInfo.length === 0) {
      return this.withoutSegment();
    } else {
      return this.withSegments();
    }    
  }

  // 두께 값을 CSS 변수 참조로 변경
  // private getStrokeWidth(): string {
  //   // CSS 변수 형태로 반환
  //   switch (this.thick) {
  //     case 'small': return 'var(--progress-thickness-small)';
  //     case 'large': return 'var(--progress-thickness-large)';
  //     case 'medium':
  //     default: return 'var(--progress-thickness-medium)';
  //   }
  // }

  // 색상을 CSS 변수로 매핑하는 함수 추가
  private getStatusColor(status: string): string {
    switch(status) {
      case 'error': return 'var(--progress-circluar-error-border-enabled)';
      case 'complete': return 'var(--progress-circluar-complete-border-enabled)';
      default: return 'var(--progress-circluar-inprogress-border-enabled)';
    }
  }

  private withoutSegment() {
    if(this.percent <= 0) {
      return nothing;
    }
    
    const dashLength = this.circumference * (this.percent / 100);
    
    // 토큰 기반 색상과 두께 적용
    const strokeColor = this.getStatusColor(this.status);
    // const strokeWidth = this.getStrokeWidth();
    
    // stroke-width="${strokeWidth}"
    return svg`
      <circle
        cx="${this.center}"
        cy="${this.center}"
        r="${this.radius}"
        fill="none"
        stroke="${strokeColor}"
        stroke-linecap="round"
        stroke-dasharray="${dashLength} ${this.circumference - dashLength}"
        name="circle-storke"
      ></circle>
    `;
  }

  private withSegments() {
    // SVG 크기에 맞는 원 반지름과 둘레 계산
    const dashLength = this.circumference;
    
    // 세그먼트 정보가 없으면 빈 SVG 반환
    if (!this.segmentInfo || this.segmentInfo.length === 0) {
      return svg``;
    }
    
    // 누적 퍼센트 계산을 위한 변수
    let cumulativePercent = 0;
    
    // 두께 직접 지정
    // const strokeWidth = this.getStrokeWidth();
    
    // 각 세그먼트에 해당하는 원호 생성
    return svg`
      ${this.segmentInfo.map(segment => {
        // 현재 세그먼트 시작 각도
        const startAngle = cumulativePercent / 100 * this.circumference;
        
        // 세그먼트 길이 (전체 둘레의 비율)
        const segmentLength = segment.percent / 100 * this.circumference;
        
        // 다음 세그먼트를 위한 누적 퍼센트 업데이트
        cumulativePercent += segment.percent;
        
        // 토큰 기반 색상 적용
        const strokeColor = this.getStatusColor(segment.status || this.status);
        
        // 세그먼트가 0보다 클 때만 그리기
        // stroke-width="${this.getStrokeWidth()}"
        if (segment.percent > 0) {
          return svg`
            <circle
              cx="${this.center}"
              cy="${this.center}"
              r="${this.radius}"
              fill="none"
              stroke="${strokeColor}"
              stroke-linecap="round"
              stroke-dasharray="${segmentLength} ${dashLength - segmentLength}"
              stroke-dashoffset="${-startAngle}"
            ></circle>
          `;
        }
        return nothing;
      })}
    `;
  }

  private renderIndeterminate() {
    const arc = this.circumference * 0.4; // Slightly longer stroke
    const strokeColor = this.getStatusColor(this.status); // Get color based on status
    return svg`
      <circle
        cx="${this.center}"
        cy="${this.center}"
        r="${this.radius}"
        fill="none"
        stroke="${strokeColor}" /* Apply status-based color */
        stroke-width="var(--progress-thickness-${this.size})" /* Use CSS variable for stroke-width */
        stroke-linecap="round"
        stroke-dasharray="${arc} ${this.circumference - arc}"
        stroke-dashoffset="${this.circumference / 4}"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 20 20"
          to="360 20 20"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    `;
  }

  // stroke-width="${this.getStrokeWidth()}"
  render() {    
    return html`
      <div class="progress-container">
        ${this.tooltipTitle && this.tooltipTitle.trim() !== '' ? 
          html`<sy-tooltip content="${this.tooltipTitle}" position="top" arrow></sy-tooltip>` : 
          nothing
        }
        
        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" class="${this.indeterminate ? 'indeterminate' : ''}">
          <!-- 배경 원 -->
          <circle
            cx="${this.center}"
            cy="${this.center}"
            r="${this.radius}"
            fill="none"
            stroke="var(--progress-circluar-initial-inner-background-enabled)"
            name="circle-bg"
          ></circle>

          <!-- 세그먼트 렌더링 또는 indeterminate 상태 -->
          ${this.indeterminate ? this.renderIndeterminate() : this.renderSegments()}
        </svg>

        <!-- 텍스트 표시 -->
        ${!this.hideText && !this.indeterminate ? html`
          <div class=${classMap({
            'text': true,
            [`status-${this.status}`]: true
          })}>
            ${this.status === 'error' ? 
                html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"/></svg>` : 
              this.status === 'complete' ? 
                html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"/></svg>` : 
              `${this.displayPercent}%`}
          </div>
        `: nothing}
      </div>
    `;
  }
}
