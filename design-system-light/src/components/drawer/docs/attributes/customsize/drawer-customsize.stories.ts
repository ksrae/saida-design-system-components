import type { Meta, StoryObj } from '@storybook/web-components';
import { DrawerCustomSize, DrawerProps } from '../../drawer';
import { clearElements } from '../../../../clear-element';
import drawerMeta from '../../drawer.stories';

const meta: Meta<DrawerProps> = {
  title: 'Drawer/Attributes/CustomSize',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return DrawerCustomSize(args);
  },
  argTypes: {
    customSize: drawerMeta?.argTypes?.customSize
  },
  args: {
    customSize: 500
  }
};

export default meta;
type Story = StoryObj<DrawerProps>;

export const Param: Story = {}
