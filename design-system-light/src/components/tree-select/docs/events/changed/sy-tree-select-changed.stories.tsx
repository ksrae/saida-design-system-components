import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TreeSelectChanged } from '../../sy-tree-select.main';

const meta: Meta = {
  title: 'TreeSelect/Events/Changed',
  component: 'sy-tree-select',
  tags: [],
  render: () => TreeSelectChanged(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};