import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TreeItemSearchTerm } from '../../sy-tree-item.main';
import treeItemMeta from '../../sy-tree-item.stories';

const meta: Meta = {
  title: 'Tree/Item Attributes/Search Term',
  component: 'sy-tree-item',
  tags: [],
  render: (args) => TreeItemSearchTerm(args as { searchTerm: string }),
  argTypes: { searchTerm: treeItemMeta?.argTypes?.searchTerm },
  args: { searchTerm: '' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};