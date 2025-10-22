import type { Meta, StoryObj } from '@storybook/web-components';
import { DrawerOpen, DrawerProps } from '../../drawer';
import { clearElements } from '../../../../clear-element';
import drawerMeta from '../../drawer.stories';

const meta: Meta<DrawerProps> = {
  title: 'Drawer/Attributes/Open',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return DrawerOpen(args);
  },
  argTypes: {
    open: drawerMeta?.argTypes?.open
  },
  args: {
    open: true
  }
};

export default meta;
type Story = StoryObj<DrawerProps>;

export const Param: Story = {}
