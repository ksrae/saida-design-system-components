import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeSelectRequired } from '../../sy-tree-select.main';
import treeSelectMeta from '../../sy-tree-select.stories';

const meta: Meta = {
  title: 'TreeSelect/Attributes/Required',
  component: 'sy-tree-select',
  tags: [],
  render: (args) => TreeSelectRequired(args as { required: boolean }),
  argTypes: { required: treeSelectMeta?.argTypes?.required },
  args: { required: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};