import type { Meta, StoryObj } from '@storybook/web-components';
import { DrawerMaskless, DrawerProps } from '../../drawer';
import { clearElements } from '../../../../clear-element';
import drawerMeta from '../../drawer.stories';

const meta: Meta<DrawerProps> = {
  title: 'Drawer/Attributes/Maskless',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return DrawerMaskless(args);
  },
  argTypes: {
    maskless: drawerMeta?.argTypes?.maskless
  },
  args: {
    maskless: true
  }
};

export default meta;
type Story = StoryObj<DrawerProps>;

export const Param: Story = {}
