import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeFindNode } from '../../sy-tree.main';

const meta: Meta = {
  title: 'Tree/Methods/FindNode',
  component: 'sy-tree',
  tags: [],
  render: () => TreeFindNode(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};