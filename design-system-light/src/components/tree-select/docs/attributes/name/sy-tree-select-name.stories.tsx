import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeSelectName } from '../../sy-tree-select.main';
import treeSelectMeta from '../../sy-tree-select.stories';

const meta: Meta = {
  title: 'TreeSelect/Attributes/Name',
  component: 'sy-tree-select',
  tags: [],
  render: (args) => TreeSelectName(args as { name: string }),
  argTypes: { name: treeSelectMeta?.argTypes?.name },
  args: { name: '' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};