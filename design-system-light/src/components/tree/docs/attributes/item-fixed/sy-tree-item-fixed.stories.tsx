import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeItemFixed } from '../../sy-tree-item.main';
import treeItemMeta from '../../sy-tree-item.stories';

const meta: Meta = {
  title: 'Tree/Item Attributes/Fixed',
  component: 'sy-tree-item',
  tags: [],
  render: (args) => TreeItemFixed(args as { fixed: boolean }),
  argTypes: { fixed: treeItemMeta?.argTypes?.fixed },
  args: { fixed: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};