import { Component, h, Prop, State, Element, Event, EventEmitter, Watch } from '@stencil/core';

@Component({
  tag: 'sy-icon',
  styleUrl: 'sy-icon.scss',
  shadow: false,
  scoped: true,
})
export class SyIcon {
  @Element() host: HTMLSyIconElement;

  @Prop({ reflect: true }) size: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'xxxlarge' = 'medium';
  @Prop({ reflect: true }) path?: string; // slot보다 path가 우선함.
  @Prop() svgMarkup?: string;
  @Prop({ reflect: true, attribute: 'natural-aspect' }) naturalAspect: boolean = false;
  @Prop({ reflect: true }) selectable: boolean = false;

  @State() private svgContent: string = '';

  @Event() selected: EventEmitter<{ value: string }>;

  private containerEl: HTMLSpanElement;
  private mutationObserver?: MutationObserver;


  componentWillLoad() {
    // Load external SVG if path is provided
    if (this.path) {
      this.loadExternalSvg(this.path);
      return;
    }

    if (this.svgMarkup) {
      this.svgContent = this.normalizeSvgMarkup(this.svgMarkup);
    }
  }

  componentDidLoad() {
    this.observeSvgMutations();
    this.normalizeRenderedSvgDimensions();
  }

  componentDidRender() {
    this.normalizeRenderedSvgDimensions();
  }

  disconnectedCallback() {
    this.mutationObserver?.disconnect();
  }

  @Watch('path')
  async watchPath(newValue: string, oldValue: string) {
    if (newValue && newValue !== oldValue) {
      await this.loadExternalSvg(newValue);
      return;
    }

    if (!newValue) {
      this.svgContent = this.svgMarkup ? this.normalizeSvgMarkup(this.svgMarkup) : '';
    }
  }

  @Watch('svgMarkup')
  watchSvgMarkup(newValue: string) {
    if (!this.path) {
      this.svgContent = newValue ? this.normalizeSvgMarkup(newValue) : '';
    }
  }

  private async loadExternalSvg(path: string) {
    try {
      const res = await fetch(path);
      if (res.ok) {
        this.svgContent = this.normalizeSvgMarkup(await res.text());
      } else {
        console.error(`Failed to load SVG from path: ${path}, status: ${res.status}`);
      }
    } catch (e) {
      console.error(`Error loading SVG: ${e.message}`);
    }
  }

  private normalizeSvgMarkup(svgMarkup: string): string {
    if (!svgMarkup || typeof document === 'undefined' || !svgMarkup.includes('<svg')) {
      return svgMarkup;
    }

    try {
      const template = document.createElement('template');
      template.innerHTML = svgMarkup.trim();
      template.content.querySelectorAll('svg').forEach((svg) => {
        const hadDimensions = svg.hasAttribute('width') || svg.hasAttribute('height');
        svg.removeAttribute('width');
        svg.removeAttribute('height');
        if (hadDimensions) {
          svg.setAttribute('data-sy-had-dimensions', 'true');
        }
      });
      return template.innerHTML.trim();
    } catch {
      return svgMarkup;
    }
  }

  private normalizeRenderedSvgDimensions() {
    // sy-icon controls the final rendered size, so incoming SVG dimensions are stripped.
    this.host?.querySelectorAll('svg').forEach((svg) => {
      const hadDimensions = svg.hasAttribute('width') || svg.hasAttribute('height') || svg.getAttribute('data-sy-had-dimensions') === 'true';
      svg.removeAttribute('width');
      svg.removeAttribute('height');
      svg.removeAttribute('data-sy-had-dimensions');

      if (hadDimensions) {
        this.normalizeSvgViewBox(svg as SVGSVGElement);
      }
    });
  }

  private observeSvgMutations() {
    if (!this.host || typeof MutationObserver === 'undefined') {
      return;
    }

    this.mutationObserver?.disconnect();
    this.mutationObserver = new MutationObserver(() => {
      this.normalizeRenderedSvgDimensions();
    });
    this.mutationObserver.observe(this.host, { childList: true, subtree: true });
  }

  private normalizeSvgViewBox(svg: SVGSVGElement) {
    const viewBox = svg.viewBox?.baseVal;
    const bbox = this.getSvgBBox(svg);

    if (!bbox || bbox.width <= 0 || bbox.height <= 0) {
      return;
    }

    const shouldTrimViewBox = !viewBox ||
      !Number.isFinite(viewBox.width) ||
      !Number.isFinite(viewBox.height) ||
      viewBox.width <= 0 ||
      viewBox.height <= 0 ||
      viewBox.x !== 0 ||
      viewBox.y !== 0 ||
      (bbox.width / viewBox.width) < 0.6 ||
      (bbox.height / viewBox.height) < 0.6;

    if (!shouldTrimViewBox) {
      return;
    }

    svg.setAttribute('viewBox', `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  }

  private getSvgBBox(svg: SVGSVGElement) {
    try {
      return svg.getBBox();
    } catch {
      try {
        const graphic = svg.querySelector('path, g, rect, circle, ellipse, polygon, polyline, line') as SVGGraphicsElement | null;
        return graphic?.getBBox();
      } catch {
        return null;
      }
    }
  }

private handleClick = () => {
    // selectable이 false이면 아무 작업도 하지 않음
    if (!this.selectable) {
      return;
    }

    // 1. path prop이 있으면 최우선으로 path 값을 사용
    if (this.path) {
      this.selected.emit({ value: this.path });
      return;
    }

    // 2. path가 없을 경우, slot에 있는 첫 번째 자식 요소를 찾음
    // containerEl은 slot을 감싸는 span이며, firstElementChild는 slot에 실제로 들어온 첫 번째 HTML 요소를 가리킴
    const slottedElement = this.containerEl.firstElementChild;

    if (slottedElement) {
      // 텍스트가 아닌 요소의 전체 HTML(예: <svg>...</svg>)을 값으로 사용
      const value = slottedElement.outerHTML;
      this.selected.emit({ value });
    }
    // path도 없고 slot에 요소도 없으면 아무것도 emit하지 않음
  };

  render() {
    const classNames = {
      icon: true,
      xxsmall: this.size === 'xxsmall',
      xsmall: this.size === 'xsmall',
      small: this.size === 'small',
      medium: this.size === 'medium',
      large: this.size === 'large',
      xlarge: this.size === 'xlarge',
      xxlarge: this.size === 'xxlarge',
      xxxlarge: this.size === 'xxxlarge',
      'natural-aspect': this.naturalAspect,
      selectable: this.selectable,
    };
    return (
      <span
        class={Object.keys(classNames).filter(key => classNames[key]).join(' ')}
        onClick={this.handleClick}
      >
        {/* Always render slot container; hide when svgContent is present */}
        <span
          ref={(el) => this.containerEl = el as HTMLSpanElement}
          class="svg-container"
          style={{ display: this.svgContent ? 'none' : undefined }}
        >
          <slot />
        </span>

        {/* Render path SVG if svgContent is available */}
        {this.svgContent && (
          <span class="svg-container" innerHTML={this.svgContent}></span>
        )}
      </span>
    );
  }
}
