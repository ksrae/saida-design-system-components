import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeItemHasChild } from '../../sy-tree-item.main';
import treeItemMeta from '../../sy-tree-item.stories';

const meta: Meta = {
  title: 'Tree/Item Attributes/Has Child',
  component: 'sy-tree-item',
  tags: [],
  render: (args) => TreeItemHasChild(args as { hasChild: boolean }),
  argTypes: { hasChild: treeItemMeta?.argTypes?.hasChild },
  args: { hasChild: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};