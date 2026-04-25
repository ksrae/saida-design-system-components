import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeSelectCheckable } from '../../sy-tree-select.main';
import treeSelectMeta from '../../sy-tree-select.stories';

const meta: Meta = {
  title: 'TreeSelect/Attributes/Checkable',
  component: 'sy-tree-select',
  tags: [],
  render: (args) => TreeSelectCheckable(args as { checkable: boolean }),
  argTypes: { checkable: treeSelectMeta?.argTypes?.checkable },
  args: { checkable: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};