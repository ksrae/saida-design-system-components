import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeManualRemoveNode } from '../../sy-tree.main';

const meta: Meta = {
  title: 'Tree/Methods/ManualRemoveNode',
  component: 'sy-tree',
  tags: [],
  render: () => TreeManualRemoveNode(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};