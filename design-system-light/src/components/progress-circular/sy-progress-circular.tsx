import { Component, Prop, h, State, Host, Element, Watch } from '@stencil/core';
import { fnAssignPropFromAlias } from '../../utils/utils';

export interface SegmentModel {
  percent: number;
  status?: 'default' | 'error' | 'complete';
}

/**
 * sy-progress-circular — circular progress indicator with optional segments.
 *
 * Spec: design-system-specs/components/progress-circular.yaml
 *
 * Props (spec-aligned + legacy aliases):
 *   - percent, status, size, indeterminate
 *   - hideText     ↔ `hide-text`
 *   - tooltipTitle ↔ `tooltip-title`
 *   - segment — JSON string with ascending cumulative percent stops.
 */
@Component({
  tag: 'sy-progress-circular',
  styleUrl: 'sy-progress-circular.scss',
  scoped: true,
  shadow: false,
})
export class SyProgressCircular {
  @Element() host!: HTMLSyProgressCircularElement;

  @Prop({ reflect: true, mutable: true }) percent: number = 0;
  @Prop() segment: string = '';
  @Prop() status: 'default' | 'error' | 'complete' = 'default';
  @Prop({ attribute: 'hideText', mutable: true }) hideText: boolean = false;
  @Prop({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';
  @Prop({ attribute: 'tooltipTitle', mutable: true }) tooltipTitle: string = '';
  @Prop() indeterminate: boolean = false;

  @State() private segmentInfo: SegmentModel[] = [];
  @State() private displayPercent: number = 0;

  private readonly center = 20;

  private get radius(): number {
    return 18;
  }

  private get circumference(): number {
    return 2 * Math.PI * this.radius;
  }

  connectedCallback() {
    this.parseSegmentsAttr();
  }

  async componentWillLoad() {
    this.hideText = fnAssignPropFromAlias(this.host, 'hide-text') ?? this.hideText;
    this.tooltipTitle = fnAssignPropFromAlias(this.host, 'tooltip-title') ?? this.tooltipTitle;

    this.parseSegmentsAttr();
  }

  componentWillRender() {
    if (this.percent < 0) this.displayPercent = 0;
    else if (this.percent > 100) this.displayPercent = 100;
    else this.displayPercent = Math.round(this.percent || 0);
  }

  @Watch('segment')
  watchSegment() {
    this.parseSegmentsAttr();
  }

  private parseSegmentsAttr() {
    if (!this.segment) return;

    try {
      let parsedSegments: any;
      if (typeof this.segment === 'object') parsedSegments = this.segment;
      else parsedSegments = JSON.parse(this.segment);

      let previousPercent = 0;
      this.segmentInfo = parsedSegments.map((segment: SegmentModel) => {
        const adjustedSegment = {
          percent: segment.percent - previousPercent,
          status: segment.status || this.status,
        };
        previousPercent = segment.percent;
        return adjustedSegment;
      });
    } catch (e) {
      console.error('Invalid segments JSON format:', e);
      this.segmentInfo = [];
    }
  }

  private getStatusColor(status: string): string {
    switch (status) {
      case 'error': return 'var(--progress-circluar-error-border-enabled)';
      case 'complete': return 'var(--progress-circluar-complete-border-enabled)';
      default: return 'var(--progress-circluar-inprogress-border-enabled)';
    }
  }

  private withoutSegment() {
    if (this.percent <= 0) return null;

    const dashLength = this.circumference * (this.percent / 100);
    const strokeColor = this.getStatusColor(this.status);

    return (
      <circle
        cx={String(this.center)}
        cy={String(this.center)}
        r={String(this.radius)}
        fill="none"
        stroke={strokeColor}
        stroke-linecap="round"
        stroke-dasharray={`${dashLength} ${this.circumference - dashLength}`}
        name="circle-stroke"
      ></circle>
    );
  }

  private withSegments() {
    const dashLength = this.circumference;

    if (!this.segmentInfo || this.segmentInfo.length === 0) return null;

    let cumulativePercent = 0;

    return (
      <g>
        {this.segmentInfo.map(segment => {
          const startAngle = cumulativePercent / 100 * this.circumference;
          const segmentLength = segment.percent / 100 * this.circumference;
          cumulativePercent += segment.percent;
          const strokeColor = this.getStatusColor(segment.status || this.status);

          if (segment.percent > 0) {
            return (
              <circle
                cx={String(this.center)}
                cy={String(this.center)}
                r={String(this.radius)}
                fill="none"
                stroke={strokeColor}
                stroke-linecap="round"
                stroke-dasharray={`${segmentLength} ${dashLength - segmentLength}`}
                stroke-dashoffset={String(-startAngle)}
              ></circle>
            );
          }
          return null;
        })}
      </g>
    );
  }

  private renderIndeterminate() {
    const arc = this.circumference * 0.4;
    const strokeColor = this.getStatusColor(this.status);

    return (
      <circle
        cx={String(this.center)}
        cy={String(this.center)}
        r={String(this.radius)}
        fill="none"
        stroke={strokeColor}
        stroke-width={`var(--progress-thickness-${this.size})`}
        stroke-linecap="round"
        stroke-dasharray={`${arc} ${this.circumference - arc}`}
        stroke-dashoffset={`${this.circumference / 4}`}
      >
        <animateTransform attributeName="transform" type="rotate" from={`0 ${this.center} ${this.center}`} to={`360 ${this.center} ${this.center}`} dur="1s" repeatCount="indefinite" />
      </circle>
    );
  }

  render() {
    return (
      <Host>
        <div class="progress-container">
          {this.tooltipTitle && this.tooltipTitle.trim() !== '' ? <slot name="tooltip" /> : null}
          <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" class={this.indeterminate ? 'indeterminate' : ''}>
            <circle cx={String(this.center)} cy={String(this.center)} r={String(this.radius)} fill="none" stroke="var(--progress-circluar-initial-inner-background-enabled)" name="circle-bg"></circle>
            {this.indeterminate ? this.renderIndeterminate() : (this.segmentInfo.length === 0 ? this.withoutSegment() : this.withSegments())}
          </svg>

          {!this.hideText && !this.indeterminate ? (
            <div class={{'text': true, [`status-${this.status}`]: true}}>
              {this.status === 'error' ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"/></svg>
              ) : this.status === 'complete' ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"/></svg>
              ) : (
                `${this.displayPercent}%`
              )}
            </div>
          ) : null}
        </div>
      </Host>
    );
  }
}
