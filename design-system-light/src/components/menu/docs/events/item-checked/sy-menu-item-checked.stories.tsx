import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { MenuItemChecked } from '../../sy-menu.main';

const meta: Meta = {
  title: 'Menu/Events/Item Checked',
  component: 'sy-menu',
  tags: [],
  render: () => MenuItemChecked(),
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
