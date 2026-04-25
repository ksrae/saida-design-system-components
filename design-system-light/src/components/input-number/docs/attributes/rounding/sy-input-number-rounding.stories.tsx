import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { InputNumberRounding } from '../../sy-input-number.main';
import inputNumberMeta from '../../sy-input-number.stories';

const meta: Meta = {
  title: 'InputNumber/Attributes/Rounding',
  component: 'sy-input-number',
  tags: [],
  render: (args) => InputNumberRounding(args as { rounding: 'round' | 'ceil' | 'floor' | '' }),
  argTypes: { rounding: inputNumberMeta?.argTypes?.rounding },
  args: { rounding: 'round' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
