import { Component, Prop, h, Element, Listen, Watch } from '@stencil/core';

export interface SyNavProps {
  disabled?: boolean;
}

const SUBNAV = 'SY-NAV-SUB';
const NAVITEM = 'SY-NAV-ITEM';
const GROUPNAV = 'SY-NAV-GROUP';

/**
 * sy-nav — vertical navigation list. Hosts sy-nav-item / sy-nav-sub / sy-nav-group children.
 *
 * Spec: design-system-specs/components/nav.yaml
 *
 * Props: `disabled` (propagates to all children via invokeChildMethod).
 * Events: bubbles `selected` from children and updates the current active item.
 */
@Component({
  tag: 'sy-nav',
  styleUrl: 'sy-nav.scss',
  scoped: true,
  shadow: false,
})
export class SyNav {
  @Element() host!: HTMLSyNavElement;

  @Prop({ reflect: true }) disabled: boolean = false;

  private currentActiveElement: HTMLSyNavItemElement | HTMLSyNavSubElement | null = null;

  // helper to safely invoke methods on child components that may not be present
  private invokeChildMethod(element: Element, methodName: string, ...args: any[]) {
    const fn = (element as any)[methodName];
    if (typeof fn === 'function') {
      return fn.apply(element, args);
    }
    return undefined;
  }

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
      // Safely call parentDisabled if the child component exposes it.
      this.invokeChildMethod(element, 'parentDisabled', this.disabled);
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
        // Prefer using the safe invoker to call setActive if present. It may
        // return a Promise or void depending on the implementation.
        const result = this.invokeChildMethod(this.currentActiveElement as Element, 'setActive', false);
        if (result && typeof (result as Promise<any>).then === 'function') {
          await result;
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
