import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeLine } from '../../sy-tree.main';
import treeMeta from '../../sy-tree.stories';

const meta: Meta = {
  title: 'Tree/Attributes/Line',
  component: 'sy-tree',
  tags: [],
  render: (args) => TreeLine(args as { line: boolean }),
  argTypes: { line: treeMeta?.argTypes?.line },
  args: { line: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};