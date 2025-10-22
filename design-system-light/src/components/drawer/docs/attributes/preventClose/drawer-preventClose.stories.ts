import type { Meta, StoryObj } from '@storybook/web-components';
import { DrawerPreventClose, DrawerProps } from '../../drawer';
import { clearElements } from '../../../../clear-element';
import drawerMeta from '../../drawer.stories';

const meta: Meta<DrawerProps> = {
  title: 'Drawer/Attributes/PreventClose',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return DrawerPreventClose(args);
  },
  argTypes: {
    preventClose: drawerMeta?.argTypes?.preventClose
  },
  args: {
    preventClose: true
  }
};

export default meta;
type Story = StoryObj<DrawerProps>;

export const Param: Story = {}
