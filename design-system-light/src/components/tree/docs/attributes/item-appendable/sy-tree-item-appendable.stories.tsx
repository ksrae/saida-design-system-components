import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TreeItemAppendable } from '../../sy-tree-item.main';
import treeItemMeta from '../../sy-tree-item.stories';

const meta: Meta = {
  title: 'Tree/Item Attributes/Appendable',
  component: 'sy-tree-item',
  tags: [],
  render: (args) => TreeItemAppendable(args as { appendable: boolean }),
  argTypes: { appendable: treeItemMeta?.argTypes?.appendable },
  args: { appendable: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};