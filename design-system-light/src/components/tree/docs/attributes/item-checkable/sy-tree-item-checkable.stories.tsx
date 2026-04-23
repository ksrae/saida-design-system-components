import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TreeItemCheckable } from '../../sy-tree-item.main';
import treeItemMeta from '../../sy-tree-item.stories';

const meta: Meta = {
  title: 'Tree/Item Attributes/Checkable',
  component: 'sy-tree-item',
  tags: [],
  render: (args) => TreeItemCheckable(args as { checkable: boolean }),
  argTypes: { checkable: treeItemMeta?.argTypes?.checkable },
  args: { checkable: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};