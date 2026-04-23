import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TreeSelectCheckValidity } from '../../sy-tree-select.main';

const meta: Meta = {
  title: 'TreeSelect/Methods/CheckValidity',
  component: 'sy-tree-select',
  tags: [],
  render: () => TreeSelectCheckValidity(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};