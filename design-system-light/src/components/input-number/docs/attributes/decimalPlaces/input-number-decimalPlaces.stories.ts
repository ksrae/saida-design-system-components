import type { Meta, StoryObj } from '@storybook/web-components';
import { InputNumberProps, InputNumberDecimalPlaces } from '../../input-number';
import inputnumberMeta from '../../input-number.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<InputNumberProps> = {
  title: 'InputNumber/Attributes/DecimalPlaces',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return InputNumberDecimalPlaces(args);
  },
  argTypes: {
    decimalPlaces: inputnumberMeta?.argTypes?.decimalPlaces,
    value: inputnumberMeta?.argTypes?.value,
    rounding: inputnumberMeta?.argTypes?.rounding
  },
  args: {
    decimalPlaces: 2,
    value: 10.556,
    rounding: 'floor'
  }
};

export default meta;
type Story = StoryObj<InputNumberProps>;

export const Param: Story = {}
