import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { DrawerOpen } from '../../sy-drawer.main';
import drawerMeta from '../../sy-drawer.stories';

const meta: Meta = {
  title: 'Drawer/Attributes/Open',
  component: 'sy-drawer',
  tags: [],
  render: (args) => DrawerOpen(args as { open: boolean }),
  argTypes: { open: drawerMeta?.argTypes?.open },
  args: { open: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
