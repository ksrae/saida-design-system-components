import type { Meta, StoryObj } from '@storybook/web-components-vite';
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