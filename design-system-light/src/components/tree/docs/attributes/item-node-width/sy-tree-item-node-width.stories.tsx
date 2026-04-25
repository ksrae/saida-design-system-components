import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeItemNodeWidth } from '../../sy-tree-item.main';
import treeItemMeta from '../../sy-tree-item.stories';

const meta: Meta = {
  title: 'Tree/Item Attributes/Node Width',
  component: 'sy-tree-item',
  tags: [],
  render: (args) => TreeItemNodeWidth(args as { nodeWidth: number }),
  argTypes: { nodeWidth: treeItemMeta?.argTypes?.nodeWidth },
  args: { nodeWidth: null },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};