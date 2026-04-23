import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TreeItemLevel } from '../../sy-tree-item.main';
import treeItemMeta from '../../sy-tree-item.stories';

const meta: Meta = {
  title: 'Tree/Item Attributes/Level',
  component: 'sy-tree-item',
  tags: [],
  render: (args) => TreeItemLevel(args as { level: number }),
  argTypes: { level: treeItemMeta?.argTypes?.level },
  args: { level: 0 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};