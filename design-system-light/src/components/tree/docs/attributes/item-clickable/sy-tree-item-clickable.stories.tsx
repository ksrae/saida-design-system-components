import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeItemClickable } from '../../sy-tree-item.main';
import treeItemMeta from '../../sy-tree-item.stories';

const meta: Meta = {
  title: 'Tree/Item Attributes/Clickable',
  component: 'sy-tree-item',
  tags: [],
  render: (args) => TreeItemClickable(args as { clickable: boolean }),
  argTypes: { clickable: treeItemMeta?.argTypes?.clickable },
  args: { clickable: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};