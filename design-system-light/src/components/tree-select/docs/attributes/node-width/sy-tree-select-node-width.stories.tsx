import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TreeSelectNodeWidth } from '../../sy-tree-select.main';
import treeSelectMeta from '../../sy-tree-select.stories';

const meta: Meta = {
  title: 'TreeSelect/Attributes/Node Width',
  component: 'sy-tree-select',
  tags: [],
  render: (args) => TreeSelectNodeWidth(args as { nodeWidth: number }),
  argTypes: { nodeWidth: treeSelectMeta?.argTypes?.nodeWidth },
  args: { nodeWidth: null },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};