import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { MenuItemSelected } from '../../sy-menu.main';

const meta: Meta = {
  title: 'Menu/Events/Item Selected',
  component: 'sy-menu',
  tags: [],
  render: () => MenuItemSelected(),
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
