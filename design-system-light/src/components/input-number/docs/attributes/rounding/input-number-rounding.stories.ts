import type { Meta, StoryObj } from '@storybook/web-components';
import { InputNumberProps, InputNumberRounding } from '../../input-number';
import inputnumberMeta from '../../input-number.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<InputNumberProps> = {
  title: 'InputNumber/Attributes/Rounding',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return InputNumberRounding(args);
  },
  argTypes: {
    rounding: inputnumberMeta?.argTypes?.rounding
  },
  args: {
    rounding: ''
  }
};

export default meta;
type Story = StoryObj<InputNumberProps>;

export const Param: Story = {}
