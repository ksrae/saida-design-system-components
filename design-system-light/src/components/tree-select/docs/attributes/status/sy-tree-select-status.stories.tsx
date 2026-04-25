import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeSelectStatus } from '../../sy-tree-select.main';
import treeSelectMeta from '../../sy-tree-select.stories';

const meta: Meta = {
  title: 'TreeSelect/Attributes/Status',
  component: 'sy-tree-select',
  tags: [],
  render: (args) => TreeSelectStatus(args as { status: 'error' | 'default' }),
  argTypes: { status: treeSelectMeta?.argTypes?.status },
  args: { status: 'default' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};