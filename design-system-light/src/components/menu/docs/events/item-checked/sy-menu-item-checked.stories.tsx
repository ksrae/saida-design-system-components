import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { MenuItemChecked } from '../../sy-menu.main';
import { clearElements } from '../../../../clear-element';

const meta: Meta = {
  title: 'Menu/Events/Item Checked',
  component: 'sy-menu',
  tags: [],
  render: () => {
    clearElements(meta.title);
    return MenuItemChecked();
  },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
