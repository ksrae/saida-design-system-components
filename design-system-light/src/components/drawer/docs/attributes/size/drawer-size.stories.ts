import type { Meta, StoryObj } from '@storybook/web-components';
import { DrawerProps, DrawerSize } from '../../drawer';
import { clearElements } from '../../../../clear-element';
import drawerMeta from '../../drawer.stories';

const meta: Meta<DrawerProps> = {
  title: 'Drawer/Attributes/Size',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return DrawerSize(args);
  },
  argTypes: {
    size: drawerMeta?.argTypes?.size,
    customSize: drawerMeta?.argTypes?.customSize
  },
  args: {
    size: 'medium',
    customSize: 200
  }
};

export default meta;
type Story = StoryObj<DrawerProps>;

export const Param: Story = {}
