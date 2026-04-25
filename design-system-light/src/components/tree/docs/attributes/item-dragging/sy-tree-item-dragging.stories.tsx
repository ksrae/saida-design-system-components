import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeItemDragging } from '../../sy-tree-item.main';
import treeItemMeta from '../../sy-tree-item.stories';

const meta: Meta = {
  title: 'Tree/Item Attributes/Dragging',
  component: 'sy-tree-item',
  tags: [],
  render: (args) => TreeItemDragging(args as { dragging: boolean }),
  argTypes: { dragging: treeItemMeta?.argTypes?.dragging },
  args: { dragging: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};