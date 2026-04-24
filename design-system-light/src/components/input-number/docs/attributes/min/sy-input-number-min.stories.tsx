import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { InputNumberMin } from '../../sy-input-number.main';
import inputNumberMeta from '../../sy-input-number.stories';

const meta: Meta = {
  title: 'InputNumber/Attributes/Min',
  component: 'sy-input-number',
  tags: [],
  render: (args) => InputNumberMin(args as { min: number, value: string | number }),
  argTypes: { min: inputNumberMeta?.argTypes?.min, value: inputNumberMeta?.argTypes?.value },
  args: { min: 0, value: '5' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
