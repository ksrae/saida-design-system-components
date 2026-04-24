import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { MenuOpened } from '../../sy-menu.main';

const meta: Meta = {
  title: 'Menu/Events/Opened',
  component: 'sy-menu',
  tags: [],
  render: () => MenuOpened(),
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
