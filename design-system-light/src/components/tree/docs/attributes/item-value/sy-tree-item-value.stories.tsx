import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TreeItemValue } from '../../sy-tree-item.main';
import treeItemMeta from '../../sy-tree-item.stories';

const meta: Meta = {
  title: 'Tree/Item Attributes/Value',
  component: 'sy-tree-item',
  tags: [],
  render: (args) => TreeItemValue(args as { value: string }),
  argTypes: { value: treeItemMeta?.argTypes?.value },
  args: { value: 'x' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};