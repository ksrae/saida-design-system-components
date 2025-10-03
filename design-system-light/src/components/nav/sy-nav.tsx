import { Component, Prop, h, Element, Listen, Watch } from '@stencil/core';
import { HTMLSyNavItemElement } from './sy-nav-item';
import { HTMLSyNavSubElement } from './sy-nav-sub';

export interface SyNavProps {
  disabled?: boolean;
}

export interface SyNavElement extends HTMLElement {
  disabled?: boolean;
}


const SUBNAV = 'SY-NAV-SUB';
const NAVITEM = 'SY-NAV-ITEM';
const GROUPNAV = 'SY-NAV-GROUP';

/**
 * sy-nav (Stencil port, light DOM, scoped)
 * - Renders slotted navigation items
 * - Manages active states and disabled propagation
 */
@Component({
  tag: 'sy-nav',
  styleUrl: 'sy-nav.scss',
  scoped: true,
  shadow: false,
})
export class SyNav {
  @Element() host!: HTMLElement;

  @Prop({ reflect: true }) disabled: boolean = false;

  private currentActiveElement: HTMLSyNavItemElement | HTMLSyNavSubElement | null = null;

  componentDidLoad() {
    this.sendDisabled();
  }

  @Watch('disabled')
  watchDisabled() {
    this.sendDisabled();
  }

  private sendDisabled() {
    const elements = this.host.querySelectorAll('sy-nav-sub, sy-nav-item');
    elements.forEach((element) => {
      const el = element as HTMLSyNavItemElement | HTMLSyNavSubElement;
      el.parentDisabled = this.disabled;
    });
  }

  @Listen('selected')
  async handleSelected(event: CustomEvent) {
    const selectedValue = event.detail;
    
    // slot의 실제 컨텐츠에서 검색 (Light DOM이므로 직접 자식 요소들을 검색)
    const slotChildren = this.host.querySelectorAll('sy-nav-item, sy-nav-sub, sy-nav-group');
    const newActiveElement = this.findElementByValueInNodeList(slotChildren, selectedValue);
    
    // 이전에 active된 요소가 있다면 비활성화
    if (this.currentActiveElement && this.currentActiveElement !== newActiveElement) {
      try {
        const maybeSetActive = (this.currentActiveElement as any).setActive;
        if (typeof maybeSetActive === 'function') {
          // Some Stencil component methods return Promises; await if present
          await maybeSetActive.call(this.currentActiveElement, false);
        } else {
          console.log('Nav handleSelected - setActive is not a function on currentActiveElement');
        }
      } catch (error) {
        console.log('Nav handleSelected - error calling/awaiting setActive:', error);
      }
    }

    // 새로 선택된 요소를 현재 active 요소로 설정
    this.currentActiveElement = newActiveElement;
  }

  private findElementByValueInNodeList(nodeList: NodeListOf<Element>, value: string): HTMLSyNavItemElement | HTMLSyNavSubElement | null {    
    for (const element of Array.from(nodeList)) {
      const tagName = element.tagName.toUpperCase();
      
      if (tagName === NAVITEM) {
        const navItem = element as HTMLSyNavItemElement;
        if (navItem.value === value) {
          return navItem;
        }
      } else if (tagName === SUBNAV) {
        const navSub = element as HTMLSyNavSubElement;
        if (navSub?.value === value) {
          return navSub;
        }
        // if not direct match, search inside this sub's children
        const foundInSub = this.findElementByValueInNodeList((element as Element).querySelectorAll('sy-nav-item, sy-nav-sub, sy-nav-group'), value);
        if (foundInSub) return foundInSub;
      }
      else if (tagName === GROUPNAV) {
        // search inside group
        const foundInGroup = this.findElementByValueInNodeList((element as Element).querySelectorAll('sy-nav-item, sy-nav-sub, sy-nav-group'), value);
        if (foundInGroup) return foundInGroup;
      }
    }

    return null;
  }

  render() {
    return (
      <ul>
        <slot></slot>
      </ul>
    );
  }
}
