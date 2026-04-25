import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeItemRemovable } from '../../sy-tree-item.main';
import treeItemMeta from '../../sy-tree-item.stories';

const meta: Meta = {
  title: 'Tree/Item Attributes/Removable',
  component: 'sy-tree-item',
  tags: [],
  render: (args) => TreeItemRemovable(args as { removable: boolean }),
  argTypes: { removable: treeItemMeta?.argTypes?.removable },
  args: { removable: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};