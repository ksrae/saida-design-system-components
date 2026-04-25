import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeManualAddChildNode } from '../../sy-tree.main';

const meta: Meta = {
  title: 'Tree/Methods/ManualAddChildNode',
  component: 'sy-tree',
  tags: [],
  render: () => TreeManualAddChildNode(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};