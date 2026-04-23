import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { PopconfirmOpendelay } from '../../sy-popconfirm.main';
import popconfirmMeta from '../../sy-popconfirm.stories';

const meta: Meta = {
  title: 'Popconfirm/Attributes/Opendelay',
  component: 'sy-popconfirm',
  tags: [],
  render: (args) => PopconfirmOpendelay(args as { opendelay: number }),
  argTypes: { opendelay: popconfirmMeta?.argTypes?.opendelay },
  args: { opendelay: 100 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};