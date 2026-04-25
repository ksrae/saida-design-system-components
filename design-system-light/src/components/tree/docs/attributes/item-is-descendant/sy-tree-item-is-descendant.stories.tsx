import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeItemIsDescendant } from '../../sy-tree-item.main';
import treeItemMeta from '../../sy-tree-item.stories';

const meta: Meta = {
  title: 'Tree/Item Attributes/Is Descendant',
  component: 'sy-tree-item',
  tags: [],
  render: (args) => TreeItemIsDescendant(args as { isDescendant: boolean }),
  argTypes: { isDescendant: treeItemMeta?.argTypes?.isDescendant },
  args: { isDescendant: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};