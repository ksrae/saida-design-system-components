import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeSelectDefaultValue } from '../../sy-tree-select.main';
import treeSelectMeta from '../../sy-tree-select.stories';

const meta: Meta = {
  title: 'TreeSelect/Attributes/Default Value',
  component: 'sy-tree-select',
  tags: [],
  render: (args) => TreeSelectDefaultValue(args as { defaultValue: string }),
  argTypes: { defaultValue: treeSelectMeta?.argTypes?.defaultValue },
  args: { defaultValue: 'apple' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};