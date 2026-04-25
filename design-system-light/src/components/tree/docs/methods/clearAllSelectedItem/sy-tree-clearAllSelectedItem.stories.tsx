import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeClearAllSelectedItem } from '../../sy-tree.main';

const meta: Meta = {
  title: 'Tree/Methods/ClearAllSelectedItem',
  component: 'sy-tree',
  tags: [],
  render: () => TreeClearAllSelectedItem(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};