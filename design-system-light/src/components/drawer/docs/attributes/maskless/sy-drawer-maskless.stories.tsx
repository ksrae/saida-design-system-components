import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { DrawerMaskless } from '../../sy-drawer.main';
import drawerMeta from '../../sy-drawer.stories';

const meta: Meta = {
  title: 'Drawer/Attributes/Maskless',
  component: 'sy-drawer',
  tags: [],
  render: (args) => DrawerMaskless(args as { maskless: boolean }),
  argTypes: { maskless: drawerMeta?.argTypes?.maskless },
  args: { maskless: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
