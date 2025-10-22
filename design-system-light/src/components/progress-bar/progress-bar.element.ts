import { LitElement, html, CSSResultGroup, css, unsafeCSS, nothing } from 'lit';
import { customElement, property, query, state } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js'; 
import globalCSS from './styles/progress.scss?inline';
import '../tooltip/tooltip.element';

// 세그먼트 모델 인터페이스 (color → status로 변경)
export interface SegmentModel {
  percent: number;
  status?: 'default' | 'error' | 'complete'; // | 'warning' | 'info' | 'success'
}

@customElement('sy-progress-bar')
export class ProgressBarElement extends LitElement {
    static styles: CSSResultGroup = css`
    ${unsafeCSS(globalCSS)};
    `
  /** When true, percentage is ignored, the label is hidden, and the progress bar is drawn in an indeterminate state. */
  @property({ type: Boolean }) indeterminate = false;
  /** The current progress as a percentage, 0 to 100. */
  @property({ type: Number, reflect: true }) percent = 0;
  /** The error state of the progress bar */
  @property({ type: String }) status: 'default' | 'error' | 'complete' = 'default';
  /** The value position type of the progress bar. */
  @property({ type: String }) valuePosition: 'progress-left' | 'progress-center' | 'progress-right' | 'center' | 'left' | 'right'  = 'center';
  @property({ type: Boolean }) hidePercent = false;
  
  @property({ type: String }) segment = '';
  @property({ type: String }) tooltipTitle = '';

  @query('.progress-bar--indicator') indicator !: any;
  @state() private innerValuePosition: 'progress-left' | 'progress-center' | 'progress-right' | 'center' | 'left' | 'right' = this.valuePosition;
  @state() private segmentInfo: SegmentModel[] = [];
  
  @property({ type: Boolean }) 
    set pause(value : boolean) {
      if(value){
        setTimeout(() => {
          this.indicator.style.animation = 'none';
        })
      } else {
        this.indicator.style.animation = 'indeterminate 2s linear infinite';
      }
    }
  minProgressWidth = 50;
  
  async firstUpdated() {
    await this.updateComplete;

    this.setValuePosition();
    this.parseSegmentsAttr();
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has('percent') || changedProperties.has('valuePosition')) {
      this.percent = this.percent < 0 ? 0 : this.percent > 100 ? 100 : this.percent;
      this.setValuePosition();
    }
    
    if (changedProperties.has('segment')) {
      this.parseSegmentsAttr();
    }
  }

  // HTML 속성으로부터 segments 데이터를 파싱
  private parseSegmentsAttr() {
    if (!this.segment) {
      this.segmentInfo = [];
      return;
    }
    
    try {
      // JSON 형식으로 파싱 시도
      let parsedSegments = this.parsingSegment(this.segment);
            
      // 빈 배열이면 즉시 반환
      if (parsedSegments.length === 0) {
        this.segmentInfo = [];
        return;
      }
      
      // 세그먼트 정보 확인 및 정리
      const validSegments = parsedSegments
        .filter((segment: any) => segment && typeof segment === 'object')
        .map((segment: SegmentModel) => ({
          percent: typeof segment.percent === 'number' ? segment.percent : 100,
          status: segment.status || 'default'
        }))
        .sort((a: SegmentModel, b: SegmentModel) => a.percent - b.percent); // 퍼센트 값으로 정렬
      
      // 누적값을 개별값으로 변환
      let previousPercent = 0;
      this.segmentInfo = validSegments.map((segment: SegmentModel) => {
        const adjustedSegment = {
          percent: segment.percent - previousPercent,
          status: segment.status
        };
        previousPercent = segment.percent;
        return adjustedSegment;
      });
      
      // 없는 구간 자동 보완 (총 범위가 100%가 아닌 경우)
      if (previousPercent < 100 && this.segmentInfo.length > 0) {
        this.segmentInfo.push({
          percent: 100 - previousPercent,
          status: 'default'
        });
      }
      
      // 모든 세그먼트가 양수인지 확인
      this.segmentInfo = this.segmentInfo.filter(segment => segment.percent > 0);
        
    } catch (e) {
      console.error('세그먼트 파싱 오류:', e);
      // 오류 발생 시 기본 세그먼트 설정
      this.segmentInfo = [{
        percent: 100,
        status: 'default'
      }];
    }
  }

  private parsingSegment(segment: any) {
    let parsedSegments = segment;

    if (typeof segment !== 'object') {
      // 문자열 정리 (빈 항목 제거)
      const cleanedString = segment.replace(/,\s*]/g, ']');
      parsedSegments = JSON.parse(cleanedString);
    }

    // 배열이 아니면 배열로 변환 (단일 세그먼트 대응)
    if (!Array.isArray(parsedSegments)) {
      parsedSegments = [parsedSegments];
    }

    return parsedSegments;
  }

  private setValuePosition() {
    const currentProgressWidth = this.getBoundingClientRect().width * (this.percent * 0.01);
    if(this.valuePosition.startsWith('progress') && currentProgressWidth <= this.minProgressWidth) {
      this.innerValuePosition = 'progress-left';
    } else {
      this.innerValuePosition = this.valuePosition;
    }
  }

  private get progressBarLabelPositionStyle() {
    if (this.innerValuePosition.startsWith('progress')) {
      if (this.innerValuePosition === 'progress-center') {
        return { left: `50%`, transform: 'translate(-50%)' };
      } else if (this.innerValuePosition === 'progress-left') {
        return { left: `var(--spacing-xsmall)` };
      } else if (this.innerValuePosition === 'progress-right') {
        return { right: `var(--spacing-xsmall)` };
      }
    }
    return {};
  }

  private get totalWidthLabelStyle() {
    if (this.innerValuePosition === 'center') {
      return { left: '50%', transform: 'translate(-50%)' };
    } else if (this.innerValuePosition === 'left') {
      return { left: 'var(--spacing-xsmall)' };
    } else if (this.innerValuePosition === 'right') {
      return { right: 'var(--spacing-xsmall)' };
    }
    return {};
  }

  // 세그먼트 렌더링 메소드
  private renderSegments() {
    // 공통 너비 스타일 - 세그먼트 유무와 상관없이 동일한 너비 적용
    const progressWidth = this.indeterminate ? '50%' : `${this.percent}%`;
    
    // 세그먼트가 없으면 기본 인디케이터만 반환
    if (!this.segmentInfo || this.segmentInfo.length === 0) {
      return html`<div class="progress-bar--indicator" 
                      style=${styleMap({ width: progressWidth })}>
                   ${this.renderLabel()}
                 </div>`;
    }
    
    // 누적 퍼센트를 계산하기 위한 변수
    let cumulativePercent = 0;
    const segments = [];
    let totalSegmentPercent = 0; // 세그먼트들의 전체 퍼센트 합계
    let visibleSegmentsCount = 0; // 보이는 세그먼트 수 계산용
    
    // 표시할 세그먼트들의 전체 퍼센트 계산
    for (const segment of this.segmentInfo) {
      const prevCumulativePercent = cumulativePercent;
      cumulativePercent += segment.percent;
      
      if (prevCumulativePercent >= this.percent) continue;
      
      if (cumulativePercent <= this.percent) {
        totalSegmentPercent += segment.percent;
        visibleSegmentsCount++;
      } else {
        totalSegmentPercent += (this.percent - prevCumulativePercent);
        visibleSegmentsCount++;
      }
    }
    
    // 누적 퍼센트 재계산
    cumulativePercent = 0;
    let currentSegmentIndex = 0;
    
    // 각 세그먼트에 해당하는 div 생성
    for (const segment of this.segmentInfo) {
      const prevCumulativePercent = cumulativePercent;
      cumulativePercent += segment.percent;
      
      // 조기 종료 조건 - 현재 percent 값을 넘어서면 더 이상 처리하지 않음
      if (prevCumulativePercent >= this.percent) continue;
      
      currentSegmentIndex++;
      const isLastSegment = currentSegmentIndex === visibleSegmentsCount;
      
      // 완전히 포함되는 세그먼트
      if (cumulativePercent <= this.percent) {
        // 전체 세그먼트 내에서의 상대적 비율 계산 (100% 기준)
        const relativePercent = (segment.percent / totalSegmentPercent) * 100;
        segments.push(html`
          <div class=${classMap({
            'progress-bar--segment': true,
            [`progress-bar--segment-${segment.status}`]: true,
            'progress-bar--segment-last': isLastSegment
          })} 
               style=${styleMap({ width: `${relativePercent}%` })}>
          </div>
        `);
      } 
      // 부분적으로 포함되는 세그먼트
      else {
        const partialSegment = this.percent - prevCumulativePercent;
        // 전체 세그먼트 내에서의 상대적 비율 계산 (100% 기준)
        const relativePercent = (partialSegment / totalSegmentPercent) * 100;
        segments.push(html`
          <div class=${classMap({
            'progress-bar--segment': true,
            [`progress-bar--segment-${segment.status}`]: true,
            'progress-bar--segment-last': isLastSegment
          })} 
               style=${styleMap({ width: `${relativePercent}%` })}>
          </div>
        `);
      }
    }
    
    // 세그먼트가 렌더링되지 않은 경우 (잘못된 데이터) 기본 인디케이터 사용
    if (segments.length === 0) {
      return html`<div class="progress-bar--indicator" 
                      style=${styleMap({ width: progressWidth })}>
                   ${this.renderLabel()}
                 </div>`;
    }
    
    // console.log(`렌더링할 세그먼트 수: ${segments.length}, 진행률: ${this.percent}%, 세그먼트 총합: ${totalSegmentPercent}`);
    
    // 절대 너비를 사용하여 세그먼트 컨테이너의 크기 설정
    return html`
      <div class="progress-bar--segments" style="width: ${progressWidth};">
        ${segments}
        ${this.renderLabel()}
      </div>
    `;
  }
  
  // 라벨 렌더링 메소드
  private renderLabel() {
    if (this.indeterminate) return nothing;
    
    if (this.innerValuePosition === 'progress-left' || 
        this.innerValuePosition === 'progress-center' || 
        this.innerValuePosition === 'progress-right') {
      return html`
        <div class="progress-bar--label" 
             style=${styleMap({
               display: 'block',
               ...this.progressBarLabelPositionStyle
             })}>
          ${!this.hidePercent ? html`${this.percent}%` : ''}
        </div>
      `;
    }
    return nothing;
  }

  render() {
    return html`
      <div
        class=${classMap({
          'progress-bar': true,
          'progress-bar--indeterminate': this.indeterminate,
          'progress-bar--error': this.status === 'error',
          'progress-bar--complete': this.status === 'complete',
          'progress-bar--value-position-center': this.innerValuePosition === 'center',
          'progress-bar--value-position-left': this.innerValuePosition === 'left',
          'progress-bar--value-position-right': this.innerValuePosition === 'right',
          'progress-bar--value-position-hidden': !this.innerValuePosition,
          'progress-bar--segmented': this.segmentInfo.length > 0
        })}
        role="progressbar"
        title=${ifDefined(this.title)}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${this.indeterminate ? 0 : this.percent}
      >
        ${this.tooltipTitle && this.tooltipTitle.trim() !== '' ? 
          html`<sy-tooltip content="${this.tooltipTitle}" position="top" arrow></sy-tooltip>` : 
          nothing
        }
        
        <div 
          class="${classMap({
            'progress-bar--label': true,          
          })}" 
          style=${styleMap({
            display: !this.indeterminate && (this.innerValuePosition === 'left' || this.innerValuePosition === 'center' || this.innerValuePosition === 'right')  ? 'block' : 'none',
            ...this.totalWidthLabelStyle})}>
            ${!this.hidePercent ? html`${this.percent}%` : ''}
        </div>
        
        ${this.renderSegments()}
      </div>
    `;
  }
}