import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TreeItemItemAdded } from '../../sy-tree-item.main';

const meta: Meta = {
  title: 'Tree/Item Events/ItemAdded',
  component: 'sy-tree-item',
  tags: [],
  render: () => TreeItemItemAdded(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};