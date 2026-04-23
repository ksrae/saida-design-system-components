import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { PopconfirmTrigger } from '../../sy-popconfirm.main';
import popconfirmMeta from '../../sy-popconfirm.stories';

const meta: Meta = {
  title: 'Popconfirm/Attributes/Trigger',
  component: 'sy-popconfirm',
  tags: [],
  render: (args) => PopconfirmTrigger(args as { trigger: 'click' | 'none' }),
  argTypes: { trigger: popconfirmMeta?.argTypes?.trigger },
  args: { trigger: 'click' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};