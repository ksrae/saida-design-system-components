import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { InputNumberMax } from '../../sy-input-number.main';
import inputNumberMeta from '../../sy-input-number.stories';

const meta: Meta = {
  title: 'InputNumber/Attributes/Max',
  component: 'sy-input-number',
  tags: [],
  render: (args) => InputNumberMax(args as { max: number, value: string | number }),
  argTypes: { max: inputNumberMeta?.argTypes?.max, value: inputNumberMeta?.argTypes?.value },
  args: { max: 10, value: '0' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
