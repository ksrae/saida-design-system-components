import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { DrawerPosition } from '../../sy-drawer.main';
import drawerMeta from '../../sy-drawer.stories';

const meta: Meta = {
  title: 'Drawer/Attributes/Position',
  component: 'sy-drawer',
  tags: [],
  render: (args) => DrawerPosition(args as { position: 'top'|'left'|'right'|'bottom' }),
  argTypes: { position: drawerMeta?.argTypes?.position },
  args: { position: 'right' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
