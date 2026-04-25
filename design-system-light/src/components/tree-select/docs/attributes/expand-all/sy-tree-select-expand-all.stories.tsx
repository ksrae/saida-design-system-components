import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeSelectExpandAll } from '../../sy-tree-select.main';
import treeSelectMeta from '../../sy-tree-select.stories';

const meta: Meta = {
  title: 'TreeSelect/Attributes/Expand All',
  component: 'sy-tree-select',
  tags: [],
  render: (args) => TreeSelectExpandAll(args as { expandAll: boolean }),
  argTypes: { expandAll: treeSelectMeta?.argTypes?.expandAll },
  args: { expandAll: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};