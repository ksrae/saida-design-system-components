import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { DrawerOpened } from '../../sy-drawer.main';

const meta: Meta = {
  title: 'Drawer/Events/Opened',
  component: 'sy-drawer',
  tags: [],
  render: () => DrawerOpened(),
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
