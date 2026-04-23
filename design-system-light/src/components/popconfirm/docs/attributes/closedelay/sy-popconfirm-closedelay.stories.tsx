import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { PopconfirmClosedelay } from '../../sy-popconfirm.main';
import popconfirmMeta from '../../sy-popconfirm.stories';

const meta: Meta = {
  title: 'Popconfirm/Attributes/Closedelay',
  component: 'sy-popconfirm',
  tags: [],
  render: (args) => PopconfirmClosedelay(args as { closedelay: number }),
  argTypes: { closedelay: popconfirmMeta?.argTypes?.closedelay },
  args: { closedelay: 1000 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};