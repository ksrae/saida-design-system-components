import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { DrawerSize } from '../../sy-drawer.main';
import drawerMeta from '../../sy-drawer.stories';

const meta: Meta = {
  title: 'Drawer/Attributes/Size',
  component: 'sy-drawer',
  tags: [],
  render: (args) => DrawerSize(args as { size: 'small'|'medium'|'large'|'custom'; customSize: number }),
  argTypes: {
    size: drawerMeta?.argTypes?.size,
    customSize: drawerMeta?.argTypes?.customSize,
  },
  args: { size: 'medium', customSize: 480 },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
