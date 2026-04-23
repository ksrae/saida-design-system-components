import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TreeSelectSetCustomValidity } from '../../sy-tree-select.main';

const meta: Meta = {
  title: 'TreeSelect/Methods/SetCustomValidity',
  component: 'sy-tree-select',
  tags: [],
  render: () => TreeSelectSetCustomValidity(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};