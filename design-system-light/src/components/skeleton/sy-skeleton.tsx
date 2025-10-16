import { Component, h, Prop, State, Element, Watch, Method } from '@stencil/core';

@Component({
  tag: 'sy-skeleton',
  styleUrl: 'sy-skeleton.scss',
  scoped: true,
  shadow: false,
})
export class SySkeleton {
  @Element() host: HTMLSySkeletonElement;

  // --- Props (Lit의 @property와 동일) ---
  @Prop() type: 'text' | 'avatar' | 'image' | 'gallary' | 'button' | 'table' | 'tree' = 'text';
  @Prop() rows: number = 0;
  @Prop() width: string = '100%';
  @Prop() disabled: boolean = false;

  // --- State (Lit의 @state와 동일) ---
  @State() private skeletonWidth: string = '100%';
  @State() private animationKey: number = 0;
  @State() private treeContentWidth: number = 0;
  @State() private numColumns: number = 0; // for table

  // --- Internal properties ---
  private resizeObserver: ResizeObserver;

  // --- Lifecycle Hooks ---

  componentWillLoad() {
    // 렌더링 전에 초기 너비 설정
    this.skeletonWidth = this.getSizeValue(this.width);
  }

  connectedCallback() {
    // Lit의 connectedCallback과 유사. DOM에 연결될 때 호출
    // ResizeObserver를 여기서 설정
    this.setupResizeObserver();
  }

  disconnectedCallback() {
    // Lit의 disconnectedCallback. DOM에서 제거될 때 호출
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  componentDidLoad() {
    // [설명] 이 컴포넌트는 렌더링된 후의 실제 너비를 기준으로
    // 내부 컨텐츠(테이블 컬럼 수, 트리 너비)를 계산해야 합니다.
    // 따라서 첫 렌더링 이후인 componentDidLoad()에서 크기를 측정하고
    // State를 업데이트하는 것이 필수적입니다.
    // 이로 인해 발생하는 초기 리렌더링은 의도된 동작이며,
    // Stencil의 경고는 이 특정 케이스에서는 무시해도 괜찮습니다.
    this.updateDimensions();
    this.resetAnimation();
  }

  // componentDidUpdate는 Stencil에 없으므로 Watcher로 대체합니다.
  // 이 hook은 Stencil V1에 있었지만 현재는 사용되지 않습니다.
  // prop 변경에 따른 로직은 Watcher에서 처리합니다.

  // --- Watchers (Lit의 updated() 대체) ---

  @Watch('width')
  handleWidthChange(newValue: string) {
    this.skeletonWidth = this.getSizeValue(newValue);
    if (this.type === 'tree') {
      this.calculateTreeContentWidth();
    }
  }

  @Watch('rows')
  @Watch('type')
  handleTypeOrRowsChange() {
    if (this.type === 'table') {
      // type이 table로 변경되거나, table인 상태에서 다른 prop이 바뀔 때 컬럼 재계산
      this.numColumns = this.calculateColumns();
    }
    if (this.type === 'tree') {
      this.calculateTreeContentWidth();
    }

    // 애니메이션 리셋 로직
    if (!this.disabled) {
      this.animationKey = Date.now();
      this.resetAnimation();
    }

    // Observer 재설정
    this.setupResizeObserver();
  }

  @Watch('disabled')
  handleDisabledChange(isDisabled: boolean) {
    if (isDisabled) {
      this.stopAnimation();
    } else {
      this.resetAnimation();
    }
  }

  // --- Private Methods (원본 Lit 코드에서 거의 그대로 가져옴) ---
  private updateDimensions() {
    if (this.type === 'table') {
      this.numColumns = this.calculateColumns();
    }
    if (this.type === 'tree') {
      this.calculateTreeContentWidth();
    }
  }

  private setupResizeObserver() {
    // 기존 옵저버가 있으면 해제
    if (this.resizeObserver) {
        this.resizeObserver.disconnect();
    }
    if (this.type === 'table' || this.type === 'tree') {
        this.resizeObserver = new ResizeObserver(() => {
            if (this.type === 'table') {
                // State를 직접 변경하여 리렌더링 유도
                this.numColumns = this.calculateColumns();
            }
            if (this.type === 'tree') {
                this.calculateTreeContentWidth();
            }
        });
        // host 엘리먼트를 관찰
        this.resizeObserver.observe(this.host);
    }
  }

  @Method()
  async stopAnimation() {
    const animatedElements = this.host.querySelectorAll('.skeleton-animated');
    animatedElements.forEach(el => {
      (el as HTMLElement).style.animation = 'none';
      el.classList.remove('skeleton-animated');
    });
  }

  @Method()
  async resetAnimation() {
    if (this.disabled) return;

    setTimeout(() => {
      const allSkeletonItems = this.host.querySelectorAll('.skeleton-item');
      allSkeletonItems.forEach(el => {
        (el as HTMLElement).style.animation = 'none';
        void (el as HTMLElement).offsetWidth; // Force reflow

        el.classList.add('skeleton-animated');
        (el as HTMLElement).style.animation = ''; // SCSS에 정의된 애니메이션을 다시 적용
      });
    }, 10);
  }

  private getSizeValue(value: string): string {
    if (!value) return '100%';
    if (/^\d+$/.test(value)) {
      return `${value}px`;
    }
    return value;
  }

  private calculateColumns(): number {
    const containerWidth = this.host.getBoundingClientRect().width;
    if (containerWidth < 300) return 2;
    if (containerWidth < 500) return 3;
    if (containerWidth < 700) return 4;
    if (containerWidth < 900) return 5;
    return 6;
  }

  private calculateTreeContentWidth() {
    const containerWidth = this.host.getBoundingClientRect().width;
    if (containerWidth <= 0) return;

    const maxIndentation = 2 * 24; // 24px is an example indent width
    const availableWidth = Math.max(150, containerWidth - maxIndentation);

    // State를 직접 변경하여 리렌더링 유도
    this.treeContentWidth = availableWidth;
  }

  // --- Render Method ---
  render() {
    const actualRow = Math.max(1, this.rows);
    const rows = Array.from({ length: actualRow }, (_, i) => i);
    const columns = Array.from({ length: this.numColumns }, (_, i) => i);
    const gallaryPerRow = 4;

    const itemClass = (extraClasses: string) => ({
      'skeleton-item': true,
      'skeleton-animated': !this.disabled,
      [extraClasses]: true,
    });

    const renderContent = () => {
      switch(this.type) {
        case 'table':
          return (
            <table class="skeleton-table">
              <tbody>
                {rows.map(() => (
                  <tr>
                    {columns.map(() => (
                      <td>
                        <div class={itemClass('skeleton-table-cell')}></div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          );
        case 'button':
          return (
            <div class="skeleton-buttons-container">
              {rows.map(() => <div class={itemClass('skeleton-button')}></div>)}
            </div>
          );
        case 'gallary':
          return (
            <div class="skeleton-gallary-container">
              {rows.map(() => (
                <div class="skeleton-gallary-row">
                  {Array.from({ length: gallaryPerRow }).map(() => (
                    <div class={itemClass('skeleton-gallary-item')}></div>
                  ))}
                </div>
              ))}
            </div>
          );
        case 'tree':
          return (
            <div class="skeleton-tree-container">
              {rows.map((index) => {
                const normalizedIndex = index % 10;
                let depth = 0;
                if ([0, 1, 8].includes(normalizedIndex)) depth = 0;
                else if ([2, 6, 7, 9].includes(normalizedIndex)) depth = 1;
                else if (normalizedIndex >= 3 && normalizedIndex <= 5) depth = 2;

                return (
                  <div class="skeleton-tree-item">
                    {Array.from({ length: depth }).map(() => <div class="skeleton-tree-indent"></div>)}
                    <div class="skeleton-tree-content">
                      <div
                        class={itemClass('skeleton-text')}
                        style={{ width: this.treeContentWidth > 0 ? `${this.treeContentWidth}px` : '100%' }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        default: // text, avatar, image
          if (this.rows >= 1 && (this.type === 'avatar' || this.type === 'image')) {
            return [
              <div class={{
                'skeleton-with-avatar': this.type === 'avatar',
                'skeleton-with-image': this.type === 'image',
              }}>
                <div class={itemClass(this.type === 'avatar' ? 'skeleton-avatar' : 'skeleton-image')}></div>
                <div class={{
                  'skeleton-content': true,
                  'vertical-center': this.rows === 1
                }}>
                  {this.rows === 1
                    ? <div class={itemClass('skeleton-text')}></div>
                    : rows.slice(0, 2).map(() => <div class={itemClass('skeleton-text')}></div>)
                  }
                </div>
              </div>,
              ...rows.slice(2).map(() => <div class={itemClass('skeleton-text')}></div>)
            ];
          }
          return rows.map(() => (
            <div class={{
              'skeleton-item': true,
              'skeleton-animated': !this.disabled,
              'skeleton-text': this.type === 'text',
              'skeleton-avatar': this.type === 'avatar',
              'skeleton-image': this.type === 'image',
              'large': this.type === 'image' && this.rows === 0,
            }}></div>
          ));
      }
    };

    return (
      <div
        class={{
          "skeleton-container": true,
          "align-center": this.rows === 0 && (this.type === 'avatar' || this.type === 'image'),
        }}
        style={{ width: this.skeletonWidth }}
        data-animation-key={this.animationKey}
      >
        {renderContent()}
      </div>
    );
  }
}
