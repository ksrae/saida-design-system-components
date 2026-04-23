import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TreeItemExpandable } from '../../sy-tree-item.main';
import treeItemMeta from '../../sy-tree-item.stories';

const meta: Meta = {
  title: 'Tree/Item Attributes/Expandable',
  component: 'sy-tree-item',
  tags: [],
  render: (args) => TreeItemExpandable(args as { expandable: boolean }),
  argTypes: { expandable: treeItemMeta?.argTypes?.expandable },
  args: { expandable: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};