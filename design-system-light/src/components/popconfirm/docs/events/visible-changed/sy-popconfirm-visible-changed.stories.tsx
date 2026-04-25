import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { PopconfirmVisibleChanged } from '../../sy-popconfirm.main';

const meta: Meta = {
  title: 'Popconfirm/Events/Visible Changed',
  component: 'sy-popconfirm',
  tags: [],
  render: () => PopconfirmVisibleChanged(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};