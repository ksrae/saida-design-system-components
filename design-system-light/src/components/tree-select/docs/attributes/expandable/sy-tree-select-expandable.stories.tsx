import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TreeSelectExpandable } from '../../sy-tree-select.main';
import treeSelectMeta from '../../sy-tree-select.stories';

const meta: Meta = {
  title: 'TreeSelect/Attributes/Expandable',
  component: 'sy-tree-select',
  tags: [],
  render: (args) => TreeSelectExpandable(args as { expandable: boolean }),
  argTypes: { expandable: treeSelectMeta?.argTypes?.expandable },
  args: { expandable: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};