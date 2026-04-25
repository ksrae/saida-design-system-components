import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { DrawerCustomSize } from '../../sy-drawer.main';
import drawerMeta from '../../sy-drawer.stories';

const meta: Meta = {
  title: 'Drawer/Attributes/Custom Size',
  component: 'sy-drawer',
  tags: [],
  render: (args) => DrawerCustomSize(args as { customSize: number }),
  argTypes: { customSize: drawerMeta?.argTypes?.customSize },
  args: { customSize: 480 },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
