import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { InputNumberDecimalPlaces } from '../../sy-input-number.main';
import inputNumberMeta from '../../sy-input-number.stories';

const meta: Meta = {
  title: 'InputNumber/Attributes/Decimal Places',
  component: 'sy-input-number',
  tags: [],
  render: (args) => InputNumberDecimalPlaces(args as { decimalPlaces: number | undefined, value: string | number, rounding: 'round' | 'ceil' | 'floor' | '' }),
  argTypes: {
    decimalPlaces: inputNumberMeta?.argTypes?.decimalPlaces,
    rounding: inputNumberMeta?.argTypes?.rounding,
    value: inputNumberMeta?.argTypes?.value,
  },
  args: { decimalPlaces: 2, value: '0.556', rounding: 'round' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
