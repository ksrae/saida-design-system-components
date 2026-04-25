import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeSelectLoading } from '../../sy-tree-select.main';
import treeSelectMeta from '../../sy-tree-select.stories';

const meta: Meta = {
  title: 'TreeSelect/Attributes/Loading',
  component: 'sy-tree-select',
  tags: [],
  render: (args) => TreeSelectLoading(args as { loading: boolean }),
  argTypes: { loading: treeSelectMeta?.argTypes?.loading },
  args: { loading: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};