import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeItemSetOverflow } from '../../sy-tree-item.main';

const meta: Meta = {
  title: 'Tree/Item Methods/SetOverflow',
  component: 'sy-tree-item',
  tags: [],
  render: () => TreeItemSetOverflow(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};