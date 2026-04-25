import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeSelectPlaceholder } from '../../sy-tree-select.main';
import treeSelectMeta from '../../sy-tree-select.stories';

const meta: Meta = {
  title: 'TreeSelect/Attributes/Placeholder',
  component: 'sy-tree-select',
  tags: [],
  render: (args) => TreeSelectPlaceholder(args as { placeholder: string }),
  argTypes: { placeholder: treeSelectMeta?.argTypes?.placeholder },
  args: { placeholder: '' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};