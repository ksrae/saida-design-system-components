import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeNodesChanged } from '../../sy-tree.main';

const meta: Meta = {
  title: 'Tree/Events/NodesChanged',
  component: 'sy-tree',
  tags: [],
  render: () => TreeNodesChanged(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};