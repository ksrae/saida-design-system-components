import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TreeItemTreeChildren } from '../../sy-tree-item.main';
import treeItemMeta from '../../sy-tree-item.stories';

const meta: Meta = {
  title: 'Tree/Item Attributes/Tree Children',
  component: 'sy-tree-item',
  tags: [],
  render: (args) => TreeItemTreeChildren(args as { treeChildren: any[] }),
  argTypes: { treeChildren: treeItemMeta?.argTypes?.treeChildren },
  args: { treeChildren: [] },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};