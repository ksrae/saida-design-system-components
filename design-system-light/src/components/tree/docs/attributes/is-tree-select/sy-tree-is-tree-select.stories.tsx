import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeIsTreeSelect } from '../../sy-tree.main';
import treeMeta from '../../sy-tree.stories';

const meta: Meta = {
  title: 'Tree/Attributes/Is Tree Select',
  component: 'sy-tree',
  tags: [],
  render: (args) => TreeIsTreeSelect(args as { isTreeSelect: boolean }),
  argTypes: { isTreeSelect: treeMeta?.argTypes?.isTreeSelect },
  args: { isTreeSelect: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};