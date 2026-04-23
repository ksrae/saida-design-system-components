import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TreeItemTreeitemDraggable } from '../../sy-tree-item.main';
import treeItemMeta from '../../sy-tree-item.stories';

const meta: Meta = {
  title: 'Tree/Item Attributes/Treeitem Draggable',
  component: 'sy-tree-item',
  tags: [],
  render: (args) => TreeItemTreeitemDraggable(args as { treeitemDraggable: boolean }),
  argTypes: { treeitemDraggable: treeItemMeta?.argTypes?.treeitemDraggable },
  args: { treeitemDraggable: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};