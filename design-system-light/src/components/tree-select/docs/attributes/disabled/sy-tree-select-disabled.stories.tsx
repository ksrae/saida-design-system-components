import type { Meta, StoryObj } from '@storybook/web-components-vite';
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