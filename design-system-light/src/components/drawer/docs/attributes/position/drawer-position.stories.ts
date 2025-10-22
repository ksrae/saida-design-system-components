import type { Meta, StoryObj } from '@storybook/web-components';
import { DrawerPosition, DrawerProps } from '../../drawer';
import { clearElements } from '../../../../clear-element';
import drawerMeta from '../../drawer.stories';

const meta: Meta<DrawerProps> = {
  title: 'Drawer/Attributes/Position',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return DrawerPosition(args);
  },
  argTypes: {
    position: drawerMeta?.argTypes?.position
  },
  args: {
    position: 'right'
  }
};

export default meta;
type Story = StoryObj<DrawerProps>;

export const Param: Story = {}
