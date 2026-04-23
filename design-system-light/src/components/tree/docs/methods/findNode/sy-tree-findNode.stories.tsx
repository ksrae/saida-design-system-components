import type { Meta, StoryObj } from '@storybook/web-components-vite';
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