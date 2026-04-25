import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { DrawerPreventClose } from '../../sy-drawer.main';
import drawerMeta from '../../sy-drawer.stories';

const meta: Meta = {
  title: 'Drawer/Attributes/Prevent Close',
  component: 'sy-drawer',
  tags: [],
  render: (args) => DrawerPreventClose(args as { preventClose: boolean }),
  argTypes: { preventClose: drawerMeta?.argTypes?.preventClose },
  args: { preventClose: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
