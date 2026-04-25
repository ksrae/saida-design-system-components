import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeSelectNoNativeValidity } from '../../sy-tree-select.main';
import treeSelectMeta from '../../sy-tree-select.stories';

const meta: Meta = {
  title: 'TreeSelect/Attributes/No Native Validity',
  component: 'sy-tree-select',
  tags: [],
  render: (args) => TreeSelectNoNativeValidity(args as { noNativeValidity: boolean }),
  argTypes: { noNativeValidity: treeSelectMeta?.argTypes?.noNativeValidity },
  args: { noNativeValidity: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};