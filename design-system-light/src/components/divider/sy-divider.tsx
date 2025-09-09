// src/components/sy-divider/sy-divider.tsx

import { Component, h, Prop, Element } from '@stencil/core';

export interface HTMLSyDividerElement extends HTMLElement {
  type: 'horizontal' | 'vertical';
}

@Component({
  tag: 'sy-divider',
  styleUrl: 'sy-divider.scss',
  shadow: false,
  scoped: true,
})
export class SyDivider {
  @Element() host: HTMLSyDividerElement;

  @Prop() type: 'horizontal' | 'vertical' = 'horizontal';

  connectedCallback() {
    this.host.setAttribute('role', 'separator');
  }

  render() {
    // 원본 Lit 코드의 classMap 로직을 1:1로 재현
    const dividerClasses = {
      horizontal: this.type === 'horizontal',
      vertical: this.type === 'vertical',
      'divider--small': true,
    };

    // 원본 Lit 코드와 100% 동일하게, 내부에 div를 렌더링합니다.
    return (
      <div class={Object.keys(dividerClasses).filter(key => dividerClasses[key]).join(' ')}></div>
    );
  }
}
