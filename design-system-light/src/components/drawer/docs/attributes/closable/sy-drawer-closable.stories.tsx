import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { DrawerClosable } from '../../sy-drawer.main';
import drawerMeta from '../../sy-drawer.stories';

const meta: Meta = {
  title: 'Drawer/Attributes/Closable',
  component: 'sy-drawer',
  tags: [],
  render: (args) => DrawerClosable(args as { closable: boolean }),
  argTypes: { closable: drawerMeta?.argTypes?.closable },
  args: { closable: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
