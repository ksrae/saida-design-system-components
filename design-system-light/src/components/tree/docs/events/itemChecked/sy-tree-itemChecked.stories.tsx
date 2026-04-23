import type { Meta, StoryObj } from '@storybook/web-components-vite';
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
