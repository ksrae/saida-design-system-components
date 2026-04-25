import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { MenuItemSelected } from '../../sy-menu.main';
import { clearElements } from '../../../../clear-element';

const meta: Meta = {
  title: 'Menu/Events/Item Selected',
  component: 'sy-menu',
  tags: [],
  render: () => {
    clearElements(meta.title);
    return MenuItemSelected();
  },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
