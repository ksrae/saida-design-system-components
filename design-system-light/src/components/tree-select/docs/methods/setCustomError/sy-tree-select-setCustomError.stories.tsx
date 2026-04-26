import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeSelectSetCustomError } from '../../sy-tree-select.main';

const meta: Meta = {
  title: 'TreeSelect/Methods/SetCustomError',
  component: 'sy-tree-select',
  tags: [],
  render: () => TreeSelectSetCustomError(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};
