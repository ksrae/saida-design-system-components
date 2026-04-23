import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { DrawerClosed } from '../../sy-drawer.main';

const meta: Meta = {
  title: 'Drawer/Events/Closed',
  component: 'sy-drawer',
  tags: [],
  render: () => DrawerClosed(),
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
