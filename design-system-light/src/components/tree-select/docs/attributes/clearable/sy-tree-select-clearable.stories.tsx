import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeSelectClearable } from '../../sy-tree-select.main';
import treeSelectMeta from '../../sy-tree-select.stories';

const meta: Meta = {
  title: 'TreeSelect/Attributes/Clearable',
  component: 'sy-tree-select',
  tags: [],
  render: (args) => TreeSelectClearable(args as { clearable: boolean }),
  argTypes: { clearable: treeSelectMeta?.argTypes?.clearable },
  args: { clearable: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};