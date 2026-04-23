import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TreeItemTagVariant } from '../../sy-tree-item.main';
import treeItemMeta from '../../sy-tree-item.stories';

const meta: Meta = {
  title: 'Tree/Item Attributes/Tag Variant',
  component: 'sy-tree-item',
  tags: [],
  render: (args) => TreeItemTagVariant(args as { tagVariant: string }),
  argTypes: { tagVariant: treeItemMeta?.argTypes?.tagVariant },
  args: { tagVariant: 'blue' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};