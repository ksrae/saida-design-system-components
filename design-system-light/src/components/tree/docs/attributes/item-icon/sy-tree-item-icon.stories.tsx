import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TreeItemIcon } from '../../sy-tree-item.main';
import treeItemMeta from '../../sy-tree-item.stories';

const meta: Meta = {
  title: 'Tree/Item Attributes/Icon',
  component: 'sy-tree-item',
  tags: [],
  render: (args) => TreeItemIcon(args as { icon: string }),
  argTypes: { icon: treeItemMeta?.argTypes?.icon },
  args: { icon: '' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};