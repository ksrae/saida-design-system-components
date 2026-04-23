import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TreeSearchTerm } from '../../sy-tree.main';
import treeMeta from '../../sy-tree.stories';

const meta: Meta = {
  title: 'Tree/Attributes/Search Term',
  component: 'sy-tree',
  tags: [],
  render: (args) => TreeSearchTerm(args as { searchTerm: string }),
  argTypes: { searchTerm: treeMeta?.argTypes?.searchTerm },
  args: { searchTerm: '' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};