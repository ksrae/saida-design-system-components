import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeCheckable } from '../../sy-tree.main';
import treeMeta from '../../sy-tree.stories';

const meta: Meta = {
  title: 'Tree/Attributes/Checkable',
  component: 'sy-tree',
  tags: [],
  render: (args) => TreeCheckable(args as { checkable: boolean }),
  argTypes: { checkable: treeMeta?.argTypes?.checkable },
  args: { checkable: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};