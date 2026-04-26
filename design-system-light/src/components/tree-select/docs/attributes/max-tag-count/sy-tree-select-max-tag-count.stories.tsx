import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeSelectMaxTagCount } from '../../sy-tree-select.main';
import treeSelectMeta from '../../sy-tree-select.stories';

const meta: Meta = {
  title: 'TreeSelect/Attributes/Max Tag Count',
  component: 'sy-tree-select',
  tags: [],
  render: (args) => TreeSelectMaxTagCount(args as { maxTagCount: number }),
  argTypes: { maxTagCount: treeSelectMeta?.argTypes?.maxTagCount },
  args: { maxTagCount: 1 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};