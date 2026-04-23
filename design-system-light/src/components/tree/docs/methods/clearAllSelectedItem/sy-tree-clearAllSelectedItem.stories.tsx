import type { Meta, StoryObj } from '@storybook/web-components-vite';
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