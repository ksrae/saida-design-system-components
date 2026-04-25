import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeExpandable } from '../../sy-tree.main';
import treeMeta from '../../sy-tree.stories';

const meta: Meta = {
  title: 'Tree/Attributes/Expandable',
  component: 'sy-tree',
  tags: [],
  render: (args) => TreeExpandable(args as { expandable: boolean }),
  argTypes: { expandable: treeMeta?.argTypes?.expandable },
  args: { expandable: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};