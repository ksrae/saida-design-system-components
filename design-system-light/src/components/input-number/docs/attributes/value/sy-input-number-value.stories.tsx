import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { InputNumberValue } from '../../sy-input-number.main';
import inputNumberMeta from '../../sy-input-number.stories';

const meta: Meta = {
  title: 'InputNumber/Attributes/Value',
  component: 'sy-input-number',
  tags: [],
  render: (args) => InputNumberValue(args as { value: string | number }),
  argTypes: { value: inputNumberMeta?.argTypes?.value },
  args: { value: '42' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
