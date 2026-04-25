import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeSelectDisabled } from '../../sy-tree-select.main';
import treeSelectMeta from '../../sy-tree-select.stories';

const meta: Meta = {
  title: 'TreeSelect/Attributes/Disabled',
  component: 'sy-tree-select',
  tags: [],
  render: (args) => TreeSelectDisabled(args as { disabled: boolean }),
  argTypes: { disabled: treeSelectMeta?.argTypes?.disabled },
  args: { disabled: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};