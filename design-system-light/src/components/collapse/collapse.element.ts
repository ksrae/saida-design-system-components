import { LitElement, html, CSSResultGroup, css, unsafeCSS } from 'lit';
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from 'lit/directives/class-map.js';
import globalCSS from './styles/collapse.scss?inline';

@customElement('sy-collapse')
export class CollapseElement extends LitElement {
  static styles: CSSResultGroup = css`${unsafeCSS(globalCSS)};`

  @property({ type: Boolean, reflect: true }) accordion: boolean = false;
  @property({ type: Boolean }) borderless: boolean = false;
  @property({ type: Boolean }) disabled: boolean = false;
  @property({ type: Boolean, reflect: true }) fullheight: boolean = false;
  @property({ type: Boolean }) ghost: boolean = false;
  @query('slot') slotElement: any;
  @state() private panelList: any[] = [];
  @state() private activePanelList: any[] = [];

  async firstUpdated() {
    await this.updateComplete;
    this.panelList = this.slotElement.assignedElements().filter((el: any) => el.tagName.toLowerCase() === 'sy-collapse-panel'); 
    this.setAccordion();

    if(this.accordion) {
      this.openPanelAccordion();
    }
  }
  
  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if(changedProperties.has('accordion')) {
      if(this.accordion) {
        this.openPanelAccordion();
      }
    } else if(changedProperties.has('disabled')) {
      this.updatePanel('disabled');
    } else if(changedProperties.has('borderless')) {
      this.updatePanel('borderless');
    } else if(changedProperties.has('fullheight')) {
      this.updatePanel('fullheight');
    } else if(changedProperties.has('ghost')) {
      this.updatePanel('ghost');
    } 
  }

  render() {
    return html` 
    <div class=${classMap({
      'collapse--panel' : true,
      'disabled': this.disabled,
      'borderless': this.borderless,
      'ghost': this.ghost
    })}>
      <slot></slot>
    </div>
    `;
  }

  private get enabledPanelList() {
    return this.panelList.filter((el: any) => !el.disabled);    
  }
  private get filteredActivePanelList() {
    return this.enabledPanelList?.filter((el: any) => el.active);
  }

  private openPanelAccordion() {
    if(this.disabled) { return; }

    this.activePanelList = this.filteredActivePanelList;
    
    let latestActivePanel = this.activePanelList.length > 0 ? this.activePanelList[this.activePanelList.length -1] : [];

    if(latestActivePanel) {
      setTimeout(() => {
        latestActivePanel.active = true;
        this.setActivePanel(latestActivePanel);  
      }, 0);
    }
  }

  private updatePanel(item: string) {
    this.panelList.forEach((el: any) => {
      el[item] = (this as any)[item];
    });
  }

  private setAccordion() {
    this.panelList.forEach((el: any, idx: number) => {
      el.addEventListener('changed', (e: any) => {
        this.setActivePanel(e.detail);
      })

      el.index = idx;
      el.borderless = this.borderless;
      el.ghost = this.ghost;
      el.disabled = el.disabled ? el.disabled : this.disabled;
      el.fullheight = this.fullheight;
    });
  }

  private setActivePanel(panel: any) {
    if(panel.disabled) { return ; }

    // if accordion, set only one panel to activePanelList
    if(panel.active) {
      if(this.accordion) {
        this.activePanelList = [panel];
      } else {
        this.activePanelList.push(panel);
      }
    } else {
      this.activePanelList = !this.accordion ? this.activePanelList.filter((el: any) => el.index !== panel.index) : [];      
    }
    
    // active only one
    if(this.accordion) {
      let activePanel = this.activePanelList?.length ? this.activePanelList[0]: [];
        
        
      if(activePanel) {
        // activePanel = this.enabledPanelList?.length ? this.enabledPanelList[0] : undefined;

        this.enabledPanelList.forEach(panel => {          
          panel.active = activePanel.index === panel.index && !panel.disabled ? true : false;
        });        
      }
    }  
  }
}
