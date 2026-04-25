import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeItemCheckedEvent } from '../../sy-tree.main';

const meta: Meta = {
  title: 'Tree/Events/ItemChecked',
  component: 'sy-tree',
  tags: [],
  render: () => TreeItemCheckedEvent(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};
