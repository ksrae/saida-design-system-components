import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeItemIndeterminate } from '../../sy-tree-item.main';
import treeItemMeta from '../../sy-tree-item.stories';

const meta: Meta = {
  title: 'Tree/Item Attributes/Indeterminate',
  component: 'sy-tree-item',
  tags: [],
  render: (args) => TreeItemIndeterminate(args as { indeterminate: boolean }),
  argTypes: { indeterminate: treeItemMeta?.argTypes?.indeterminate },
  args: { indeterminate: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};