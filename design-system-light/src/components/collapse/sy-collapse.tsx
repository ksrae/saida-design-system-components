import { Component, Prop, Element, h, Host, Watch, Method } from '@stencil/core';
import { CollapsePanelChangeDetail } from './sy-collapse-panel';

@Component({
  tag: 'sy-collapse',
  styleUrl: 'sy-collapse.scss',
  shadow: false,
  scoped: true
})
export class SyCollapse {
  @Element() host: HTMLSyCollapseElement;

  @Prop({ reflect: true }) accordion: boolean = false;
  @Prop() borderless: boolean = false;
  @Prop() disabled: boolean = false;
  @Prop({ reflect: true }) fullheight: boolean = false;
  @Prop() ghost: boolean = false;

  // Effective fullheight only applies when accordion is true — stretching a
  // single active panel to fill the remaining space only makes sense when
  // exactly one panel can be open at a time.
  private get effectiveFullheight(): boolean {
    return this.fullheight && this.accordion;
  }

  componentDidLoad() {
    this.setupPanels();

    if (this.accordion) {
      this.initializeAccordion();
    }
    this.applyHostStyle();
  }

  componentDidRender() {
    // Reapply host inline style after every render so `effectiveFullheight`
    // changes flip the flex chain immediately. Done via direct style
    // manipulation (not <Host style={...}>) to guarantee the styles land on
    // the element even if Stencil's Host prop wiring misbehaves.
    this.applyHostStyle();
  }

  private applyHostStyle() {
    const s = this.host.style;
    if (this.effectiveFullheight) {
      s.display = 'flex';
      s.flexDirection = 'column';
      s.height = '100%';
      s.minHeight = '0';
    } else {
      s.display = '';
      s.flexDirection = '';
      s.height = '';
      s.minHeight = '';
    }
  }

  @Watch('accordion')
  watchAccordion(newValue: boolean) {
    if (newValue) {
      this.initializeAccordion();
    }
    // Accordion toggles also flip effective fullheight.
    this.updatePanelProp('fullheight');
  }

  @Watch('disabled')
  watchDisabled() {
    this.updatePanelProp('disabled');
  }

  @Watch('borderless')
  watchBorderless() {
    this.updatePanelProp('borderless');
  }

  @Watch('fullheight')
  watchFullheight() {
    this.updatePanelProp('fullheight');
  }

  @Watch('ghost')
  watchGhost() {
    this.updatePanelProp('ghost');
  }

  private updatePanelProp(prop: string) {
    const panels = this.host.querySelectorAll('sy-collapse-panel');
    panels.forEach((panel: any) => {
      if (prop === 'disabled') {
        panel.disabled = panel.hasAttribute('disabled') ? true : this.disabled;
      } else if (prop === 'fullheight') {
        panel.fullheight = this.effectiveFullheight;
      } else {
        panel[prop] = (this as any)[prop];
      }
    });
  }

  @Method()
  async openAll() {
    if (this.accordion) return;
    const panels = this.host.querySelectorAll('sy-collapse-panel');
    panels.forEach((panel: any) => {
      if (!panel.disabled) {
        panel.active = true;
      }
    });
  }

  @Method()
  async closeAll() {
    const panels = this.host.querySelectorAll('sy-collapse-panel');
    panels.forEach((panel: any) => {
      panel.active = false;
    });
  }

  @Method()
  async openPanel(index: number) {
    const panels = this.host.querySelectorAll('sy-collapse-panel');
    const panel = panels[index] as any;
    if (panel && !panel.disabled) {
      panel.active = true;
    }
  }

  @Method()
  async closePanel(index: number) {
    const panels = this.host.querySelectorAll('sy-collapse-panel');
    const panel = panels[index] as any;
    if (panel) {
      panel.active = false;
    }
  }

  render() {
    const classes = {
      'collapse--panel': true,
      'disabled': this.disabled,
      'borderless': this.borderless,
      'ghost': this.ghost
    };

    // When effectiveFullheight, the inner panel div becomes a flex column
    // that takes all remaining space. Host-level flex is set in
    // applyHostStyle() (called from componentDidRender) to survive
    // Stencil's scoped-CSS transforms.
    const panelStyle: { [k: string]: string } = this.effectiveFullheight
      ? { display: 'flex', flexDirection: 'column', flex: '1', minHeight: '0' }
      : {};

    return (
      <Host>
        <div
          class={Object.keys(classes).filter(key => classes[key]).join(' ')}
          style={panelStyle}
        >
          <slot></slot>
        </div>
      </Host>
    );
  }

  private setupPanels() {
    const panels = this.host.querySelectorAll('sy-collapse-panel');

    panels.forEach((panel: any) => {
      // 프로퍼티 설정
      panel.borderless = this.borderless;
      panel.ghost = this.ghost;
      panel.disabled = panel.hasAttribute('disabled') ? true : this.disabled;
      panel.fullheight = this.effectiveFullheight;

      // 이벤트 리스너 등록 (한 번만)
      if (!panel._hasCollapseListener) {
        panel._hasCollapseListener = true;
        panel.addEventListener('changed', (e: CustomEvent<CollapsePanelChangeDetail>) => {
          this.handlePanelChange(e.detail);
        });
      }
    });
  }

  private initializeAccordion() {
    const panels = this.host.querySelectorAll('sy-collapse-panel');
    const activePanels = Array.from(panels).filter((p: any) => p.active);

    // accordion 모드에서는 첫 번째 활성 패널만 유지
    if (activePanels.length > 1) {
      activePanels.forEach((panel: any, index) => {
        if (index > 0) {
          panel.active = false;
        }
      });
    }
  }

  private handlePanelChange(detail: CollapsePanelChangeDetail) {
    if (detail.disabled || detail.index === -1) {
      return;
    }

    if (this.accordion && detail.active) {
      // Accordion 모드: 다른 모든 패널 닫기
      const panels = this.host.querySelectorAll('sy-collapse-panel');

      panels.forEach((panel: any, idx) => {
        if (idx !== detail.index && panel.active) {
          panel.active = false;
        }
      });
    }
  }
}
