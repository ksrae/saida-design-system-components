import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeSelectNodes } from '../../sy-tree-select.main';
import treeSelectMeta from '../../sy-tree-select.stories';

const meta: Meta = {
  title: 'TreeSelect/Attributes/Nodes',
  component: 'sy-tree-select',
  tags: [],
  render: (args) => TreeSelectNodes(args as { nodes: any[] }),
  argTypes: { nodes: treeSelectMeta?.argTypes?.nodes },
  args: { nodes: [] },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};