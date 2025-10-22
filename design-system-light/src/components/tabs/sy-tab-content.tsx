import { Component, Prop, h, Element } from '@stencil/core';

@Component({
  tag: 'sy-tab-content',
  styleUrl: 'sy-tab-content.scss',
  shadow: false,
  scoped: true
})
export class SyTabContent {
  @Element() host!: HTMLSyTabContentElement;

  @Prop({ reflect: true }) active = false;
  @Prop({ reflect: true }) disabled = false;
  @Prop({ reflect: true }) name!: string;

  render() {
    return <slot></slot>;
  }
}
