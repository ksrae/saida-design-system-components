import type { Meta, StoryObj } from '@storybook/web-components';
import { DrawerClosable, DrawerProps } from '../../drawer';
import { clearElements } from '../../../../clear-element';
import drawerMeta from '../../drawer.stories';

const meta: Meta<DrawerProps> = {
  title: 'Drawer/Attributes/Closable',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return DrawerClosable(args);
  },
  argTypes: {
    closable: drawerMeta?.argTypes?.closable
  },
  args: {
    closable: true
  }
};

export default meta;
type Story = StoryObj<DrawerProps>;

export const Param: Story = {}
