import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TreeItemAppendPlaceholder } from '../../sy-tree-item.main';
import treeItemMeta from '../../sy-tree-item.stories';

const meta: Meta = {
  title: 'Tree/Item Attributes/Append Placeholder',
  component: 'sy-tree-item',
  tags: [],
  render: (args) => TreeItemAppendPlaceholder(args as { appendPlaceholder: string }),
  argTypes: { appendPlaceholder: treeItemMeta?.argTypes?.appendPlaceholder },
  args: { appendPlaceholder: 'New item' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};