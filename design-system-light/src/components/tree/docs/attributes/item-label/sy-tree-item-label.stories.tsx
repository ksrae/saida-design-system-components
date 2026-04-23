import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TreeItemLabel } from '../../sy-tree-item.main';
import treeItemMeta from '../../sy-tree-item.stories';

const meta: Meta = {
  title: 'Tree/Item Attributes/Label',
  component: 'sy-tree-item',
  tags: [],
  render: (args) => TreeItemLabel(args as { label: string }),
  argTypes: { label: treeItemMeta?.argTypes?.label },
  args: { label: 'Item' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};