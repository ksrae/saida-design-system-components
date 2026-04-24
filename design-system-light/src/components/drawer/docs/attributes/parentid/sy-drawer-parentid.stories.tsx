import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { DrawerParentId } from '../../sy-drawer.main';

const meta: Meta = {
  title: 'Drawer/Attributes/ParentId',
  component: 'sy-drawer',
  tags: [],
  render: () => DrawerParentId(),
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};
