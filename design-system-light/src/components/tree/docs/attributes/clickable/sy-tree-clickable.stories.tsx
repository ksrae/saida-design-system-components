import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeClickable } from '../../sy-tree.main';
import treeMeta from '../../sy-tree.stories';

const meta: Meta = {
  title: 'Tree/Attributes/Clickable',
  component: 'sy-tree',
  tags: [],
  render: (args) => TreeClickable(args as { clickable: boolean }),
  argTypes: { clickable: treeMeta?.argTypes?.clickable },
  args: { clickable: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};