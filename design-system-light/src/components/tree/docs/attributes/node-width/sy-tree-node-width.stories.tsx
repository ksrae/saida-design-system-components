import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeNodeWidth } from '../../sy-tree.main';
import treeMeta from '../../sy-tree.stories';

const meta: Meta = {
  title: 'Tree/Attributes/Node Width',
  component: 'sy-tree',
  tags: [],
  render: (args) => TreeNodeWidth(args as { nodeWidth: number }),
  argTypes: { nodeWidth: treeMeta?.argTypes?.nodeWidth },
  args: { nodeWidth: null },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};