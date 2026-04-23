import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TreeItemExpanded } from '../../sy-tree-item.main';
import treeItemMeta from '../../sy-tree-item.stories';

const meta: Meta = {
  title: 'Tree/Item Attributes/Expanded',
  component: 'sy-tree-item',
  tags: [],
  render: (args) => TreeItemExpanded(args as { expanded: boolean }),
  argTypes: { expanded: treeItemMeta?.argTypes?.expanded },
  args: { expanded: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};