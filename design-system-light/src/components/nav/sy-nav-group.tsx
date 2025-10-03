import { Component, Prop, h, Element } from '@stencil/core';
import { HTMLSyNavItemElement } from './sy-nav-item';
import { HTMLSyNavSubElement } from './sy-nav-sub';

export interface SyNavGroupProps {
  title?: string;
  depth?: number;
}

export interface HTMLSyNavGroupElement extends HTMLElement {
  depth?: number;
  parentDisabled?: boolean;
  groupItem?: boolean;
}


/**
 * sy-nav-group (Stencil port, light DOM, scoped)
 * - Navigation group component that organizes nav items and sub-navs
 * - Automatically sets groupItem flag on child nav components
 */
@Component({
  tag: 'sy-nav-group',
  styleUrl: 'sy-nav-group.scss',
  scoped: true,
  shadow: false,
})
export class SyNavGroup {
  @Element() host!: HTMLElement;

  @Prop() title: string = '';
  @Prop({ reflect: true, mutable: true }) depth: number = 0;

  connectedCallback() {
    this.calculateDepth();
  }

  componentDidLoad() {
    this.updateChildComponents();
  }

  private calculateDepth() {
    const parent = this.host.parentElement;
    if (!parent) return;
    
    const parentTagName = parent.tagName.toLowerCase();
    
    if (parentTagName === 'sy-nav') {
      this.depth = 0;
    } else if (parentTagName === 'sy-nav-sub') {
      const parentSub = parent as HTMLSyNavSubElement;
      this.depth = (parentSub.depth || 0) + 1;
    } else if (parentTagName === 'sy-nav-group') {
      const parentGroup = parent as HTMLSyNavGroupElement;
      this.depth = (parentGroup.depth || 0) + 1;
    }
  }

  private updateChildComponents() {
    const navItems = this.host.querySelectorAll('sy-nav-item') as NodeListOf<HTMLSyNavItemElement>;
    if (navItems.length > 0) {
      navItems.forEach((item: HTMLSyNavItemElement) => {
        item.groupItem = true;
      });
    }

    const navSubs = this.host.querySelectorAll('sy-nav-sub') as NodeListOf<HTMLSyNavSubElement>;
    if (navSubs.length > 0) {
      navSubs.forEach((sub: HTMLSyNavSubElement) => {
        sub.groupItem = true;
      });
    }
  }
  
  private sanitizeHtml(content: string): string {
    if (!content) return '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    return tempDiv.innerText.trim();
  }

  render() {
    return (
      <div>
        <div 
          class="group-title"
          title={this.sanitizeHtml(this.title)}
        >
          <span innerHTML={this.title}></span>
        </div>
        <div class="group-content">
          <slot></slot>
        </div>
      </div>
    );
  }
}
