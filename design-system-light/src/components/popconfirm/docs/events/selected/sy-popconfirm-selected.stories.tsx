import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { PopconfirmSelected } from '../../sy-popconfirm.main';

const meta: Meta = {
  title: 'Popconfirm/Events/Selected',
  component: 'sy-popconfirm',
  tags: [],
  render: () => PopconfirmSelected(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};