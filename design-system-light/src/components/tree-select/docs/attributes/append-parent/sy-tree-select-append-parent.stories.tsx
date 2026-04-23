import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TreeSelectAppendParent } from '../../sy-tree-select.main';
import treeSelectMeta from '../../sy-tree-select.stories';

const meta: Meta = {
  title: 'TreeSelect/Attributes/Append Parent',
  component: 'sy-tree-select',
  tags: [],
  render: (args) => TreeSelectAppendParent(args as { appendParent: boolean }),
  argTypes: { appendParent: treeSelectMeta?.argTypes?.appendParent },
  args: { appendParent: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};