import type { Meta, StoryObj } from '@storybook/web-components';
import { DrawerClosed, DrawerProps } from '../../drawer';
import { clearElements } from '../../../../clear-element';

const meta: Meta<DrawerProps> = {
  title: 'Drawer/Events/Closed',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return DrawerClosed();
  },
  argTypes: {
    
  },
};

export default meta;
type Story = StoryObj<DrawerProps>;

export const Param: Story = {}
