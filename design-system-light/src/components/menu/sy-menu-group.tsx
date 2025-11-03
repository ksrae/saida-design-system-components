import { Component, Prop, h, Element } from '@stencil/core';

@Component({
  tag: 'sy-menu-group',
  shadow: false,
  scoped: true,
  styleUrl: 'sy-menu-group.scss',
})
export class SyMenuGroup {
  @Element() host!: HTMLSyMenuGroupElement;

  @Prop({ attribute: 'title'}) menuGroupTitle: string = '';

  private sanitizeHtml(content: string): string {
    if (!content) return '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    return tempDiv.innerText.trim();
  }

  render() {
    return (
      <div>
        <div class="group-title" title={this.sanitizeHtml(this.menuGroupTitle)} innerHTML={this.menuGroupTitle}></div>
        <div class="group-content">
          <slot></slot>
        </div>
      </div>
    );
  }
}
