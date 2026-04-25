import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { InputNumberStatus } from '../../sy-input-number.main';
import inputNumberMeta from '../../sy-input-number.stories';

const meta: Meta = {
  title: 'InputNumber/Attributes/Status',
  component: 'sy-input-number',
  tags: [],
  render: (args) => InputNumberStatus(args as { status: 'default' | 'warning' | 'error' | 'success' }),
  argTypes: { status: inputNumberMeta?.argTypes?.status },
  args: { status: 'error' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
