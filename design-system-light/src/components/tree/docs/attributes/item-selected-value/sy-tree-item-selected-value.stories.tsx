import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeItemSelectedValue } from '../../sy-tree-item.main';
import treeItemMeta from '../../sy-tree-item.stories';

const meta: Meta = {
  title: 'Tree/Item Attributes/Selected Value',
  component: 'sy-tree-item',
  tags: [],
  render: (args) => TreeItemSelectedValue(args as { selectedValue: string }),
  argTypes: { selectedValue: treeItemMeta?.argTypes?.selectedValue },
  args: { selectedValue: '' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};