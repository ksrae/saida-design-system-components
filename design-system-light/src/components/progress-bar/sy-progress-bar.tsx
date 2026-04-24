import { Component, Prop, h, State, Element, Host, Watch } from '@stencil/core';
import { fnAssignPropFromAlias } from '../../utils/utils';

export interface SegmentModel {
  percent: number;
  status?: 'default' | 'error' | 'complete';
}

/**
 * sy-progress-bar — linear progress indicator with optional segmentation.
 *
 * Spec: design-system-specs/components/progress-bar.yaml
 *
 * Props (spec-aligned + legacy aliases via fnAssignPropFromAlias):
 *   - percent, status, indeterminate
 *   - valuePosition (camelCase prop) ↔ `value-position` (legacy attribute)
 *   - hidePercent                    ↔ `hide-percent`
 *   - tooltipTitle                   ↔ `tooltip-title`
 *   - segment — JSON array string of { percent, status } entries
 *
 * role="progressbar" + aria-valuenow are applied for screen reader support.
 */
@Component({
  tag: 'sy-progress-bar',
  styleUrl: 'sy-progress-bar.scss',
  scoped: true,
  shadow: false,
})
export class SyProgressBar {
  @Element() host!: HTMLSyProgressBarElement;

  /** When true, percentage is ignored, the label is hidden, and the progress bar is drawn in an indeterminate state. */
  @Prop() indeterminate: boolean = false;
  /** The current progress as a percentage, 0 to 100. */
  @Prop({ reflect: true, mutable: true }) percent: number = 0;
  /** The error state of the progress bar */
  @Prop() status: 'default' | 'error' | 'complete' = 'default';
  /** The value position type of the progress bar. */
  @Prop({ attribute: 'valuePosition', mutable: true }) valuePosition: 'progress-left' | 'progress-center' | 'progress-right' | 'center' | 'left' | 'right'  = 'center';
  @Prop({ attribute: 'hidePercent', mutable: true }) hidePercent: boolean = false;
  @Prop() segment: string = '';
  @Prop({ attribute: 'tooltipTitle', mutable: true }) tooltipTitle: string = '';

  @State() private innerValuePosition: 'progress-left' | 'progress-center' | 'progress-right' | 'center' | 'left' | 'right' = this.valuePosition;
  @State() private segmentInfo: SegmentModel[] = [];

  minProgressWidth = 50;

  componentWillLoad() {
    this.valuePosition = fnAssignPropFromAlias(this.host, 'value-position') ?? this.valuePosition;
    this.hidePercent = fnAssignPropFromAlias(this.host, 'hide-percent') ?? this.hidePercent;
    this.tooltipTitle = fnAssignPropFromAlias(this.host, 'tooltip-title') ?? this.tooltipTitle;

    this.setValuePosition();
    this.parseSegmentsAttr();
  }

  componentWillRender() {
    this.percent = this.percent < 0 ? 0 : this.percent > 100 ? 100 : this.percent;
  }

  @Watch('segment')
  watchSegment() {
    this.parseSegmentsAttr();
  }

  private parseSegmentsAttr() {
    if (!this.segment) {
      this.segmentInfo = [];
      return;
    }

    try {
      let parsedSegments = this.parsingSegment(this.segment);

      if (parsedSegments.length === 0) {
        this.segmentInfo = [];
        return;
      }

      const validSegments = parsedSegments
        .filter((segment: any) => segment && typeof segment === 'object')
        .map((segment: SegmentModel) => ({
          percent: typeof segment.percent === 'number' ? segment.percent : 100,
          status: segment.status || 'default'
        }))
        .sort((a: SegmentModel, b: SegmentModel) => a.percent - b.percent);

      let previousPercent = 0;
      this.segmentInfo = validSegments.map((segment: SegmentModel) => {
        const adjustedSegment = {
          percent: segment.percent - previousPercent,
          status: segment.status
        };
        previousPercent = segment.percent;
        return adjustedSegment;
      });

      if (previousPercent < 100 && this.segmentInfo.length > 0) {
        this.segmentInfo.push({ percent: 100 - previousPercent, status: 'default' });
      }

      this.segmentInfo = this.segmentInfo.filter(segment => segment.percent > 0);
    } catch (e) {
      console.error('세그먼트 파싱 오류:', e);
      this.segmentInfo = [{ percent: 100, status: 'default' }];
    }
  }

  private parsingSegment(segment: any) {
    let parsedSegments = segment;

    if (typeof segment !== 'object') {
      const cleanedString = segment.replace(/,\s*]/g, ']');
      parsedSegments = JSON.parse(cleanedString);
    }

    if (!Array.isArray(parsedSegments)) {
      parsedSegments = [parsedSegments];
    }

    return parsedSegments;
  }

  private setValuePosition() {
    const width = this.host.getBoundingClientRect().width || 0;
    const currentProgressWidth = width * (this.percent * 0.01);
    if(this.valuePosition.startsWith('progress') && currentProgressWidth <= this.minProgressWidth) {
      this.innerValuePosition = 'progress-left';
    } else {
      this.innerValuePosition = this.valuePosition;
    }
  }

  private get progressBarLabelPositionStyle() {
    if (this.innerValuePosition.startsWith('progress')) {
      if (this.innerValuePosition === 'progress-center') {
        return { left: `50%`, transform: 'translate(-50%)' } as any;
      } else if (this.innerValuePosition === 'progress-left') {
        return { left: `var(--spacing-xsmall)` } as any;
      } else if (this.innerValuePosition === 'progress-right') {
        return { right: `var(--spacing-xsmall)` } as any;
      }
    }
    return {} as any;
  }

  private get totalWidthLabelStyle() {
    if (this.innerValuePosition === 'center') {
      return { left: '50%', transform: 'translate(-50%)' } as any;
    } else if (this.innerValuePosition === 'left') {
      return { left: 'var(--spacing-xsmall)' } as any;
    } else if (this.innerValuePosition === 'right') {
      return { right: 'var(--spacing-xsmall)' } as any;
    }
    return {} as any;
  }

  private renderLabel() {
    if (this.indeterminate) return null;

    if (this.innerValuePosition === 'progress-left' || 
        this.innerValuePosition === 'progress-center' || 
        this.innerValuePosition === 'progress-right') {
      return (
        <div class="progress-bar--label" style={this.progressBarLabelPositionStyle as any}>
          {!this.hidePercent ? `${this.percent}%` : ''}
        </div>
      );
    }
    return null;
  }

  private renderSegments() {
    const progressWidth = this.indeterminate ? '50%' : `${this.percent}%`;

    if (!this.segmentInfo || this.segmentInfo.length === 0) {
      return (
        <div class="progress-bar--indicator" style={{ width: progressWidth }}>
          {this.renderLabel()}
        </div>
      );
    }

    let cumulativePercent = 0;
    const segments: any[] = [];
    let totalSegmentPercent = 0;
    let visibleSegmentsCount = 0;

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

    cumulativePercent = 0;
    let currentSegmentIndex = 0;

    for (const segment of this.segmentInfo) {
      const prevCumulativePercent = cumulativePercent;
      cumulativePercent += segment.percent;
      if (prevCumulativePercent >= this.percent) continue;

      currentSegmentIndex++;
      const isLastSegment = currentSegmentIndex === visibleSegmentsCount;

      if (cumulativePercent <= this.percent) {
        const relativePercent = (segment.percent / totalSegmentPercent) * 100;
        segments.push(
          <div class={
            `progress-bar--segment progress-bar--segment-${segment.status} ${isLastSegment ? 'progress-bar--segment-last' : ''}`
          } style={{ width: `${relativePercent}%` }}></div>
        );
      } else {
        const partialSegment = this.percent - prevCumulativePercent;
        const relativePercent = (partialSegment / totalSegmentPercent) * 100;
        segments.push(
          <div class={
            `progress-bar--segment progress-bar--segment-${segment.status} ${isLastSegment ? 'progress-bar--segment-last' : ''}`
          } style={{ width: `${relativePercent}%` }}></div>
        );
      }
    }

    if (segments.length === 0) {
      return (
        <div class="progress-bar--indicator" style={{ width: progressWidth }}>
          {this.renderLabel()}
        </div>
      );
    }

    return (
      <div class="progress-bar--segments" style={{ width: progressWidth }}>
        {segments}
        {this.renderLabel()}
      </div>
    );
  }

  render() {
    return (
      <Host>
        <div
          class={
            `progress-bar ${this.indeterminate ? 'progress-bar--indeterminate' : ''} ${this.status === 'error' ? 'progress-bar--error' : ''} ${this.status === 'complete' ? 'progress-bar--complete' : ''} ${this.segmentInfo.length > 0 ? 'progress-bar--segmented' : ''} ${this.innerValuePosition === 'center' ? 'progress-bar--value-position-center' : ''} ${this.innerValuePosition === 'left' ? 'progress-bar--value-position-left' : ''} ${this.innerValuePosition === 'right' ? 'progress-bar--value-position-right' : ''} ${this.innerValuePosition === 'progress-left' ? 'progress-bar--value-position-left' : ''} ${this.innerValuePosition === 'progress-center' ? 'progress-bar--value-position-center' : ''} ${this.innerValuePosition === 'progress-right' ? 'progress-bar--value-position-right' : ''} ${this.hidePercent ? 'progress-bar--value-position-hidden' : ''}`
          }
          role="progressbar"
          title={this.tooltipTitle || undefined}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={this.indeterminate ? 0 : this.percent}
        >
          <div class="progress-bar--label" style={{ display: !this.indeterminate && (this.innerValuePosition === 'left' || this.innerValuePosition === 'center' || this.innerValuePosition === 'right') ? 'block' : 'none', ...this.totalWidthLabelStyle as any }}>
            {!this.hidePercent ? `${this.percent}%` : ''}
          </div>

          {this.renderSegments()}
        </div>
      </Host>
    );
  }
}
