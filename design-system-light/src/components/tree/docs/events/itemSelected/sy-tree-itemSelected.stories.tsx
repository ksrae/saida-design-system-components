import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeItemSelected } from '../../sy-tree.main';

const meta: Meta = {
  title: 'Tree/Events/ItemSelected',
  component: 'sy-tree',
  tags: [],
  render: () => TreeItemSelected(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};