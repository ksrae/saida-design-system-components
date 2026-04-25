import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeSelectLine } from '../../sy-tree-select.main';
import treeSelectMeta from '../../sy-tree-select.stories';

const meta: Meta = {
  title: 'TreeSelect/Attributes/Line',
  component: 'sy-tree-select',
  tags: [],
  render: (args) => TreeSelectLine(args as { line: boolean }),
  argTypes: { line: treeSelectMeta?.argTypes?.line },
  args: { line: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};