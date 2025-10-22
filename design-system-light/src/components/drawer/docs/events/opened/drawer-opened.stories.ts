import type { Meta, StoryObj } from '@storybook/web-components';
import { DrawerOpened, DrawerProps } from '../../drawer';
import { clearElements } from '../../../../clear-element';
import drawerMeta from '../../drawer.stories';

const meta: Meta<DrawerProps> = {
  title: 'Drawer/Events/Opened',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return DrawerOpened();
  },
  argTypes: {

  },
};

export default meta;
type Story = StoryObj<DrawerProps>;

export const Param: Story = {}
