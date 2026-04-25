import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeItemItemDrop } from '../../sy-tree-item.main';

const meta: Meta = {
  title: 'Tree/Item Events/ItemDrop',
  component: 'sy-tree-item',
  tags: [],
  render: () => TreeItemItemDrop(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};