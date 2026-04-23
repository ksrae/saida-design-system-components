import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TreeItemDisabled } from '../../sy-tree-item.main';
import treeItemMeta from '../../sy-tree-item.stories';

const meta: Meta = {
  title: 'Tree/Item Attributes/Disabled',
  component: 'sy-tree-item',
  tags: [],
  render: (args) => TreeItemDisabled(args as { disabled: boolean }),
  argTypes: { disabled: treeItemMeta?.argTypes?.disabled },
  args: { disabled: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};