import type { Meta, StoryObj } from '@storybook/web-components';
import { InputNumberProps, InputNumberMax } from '../../input-number';
import inputnumberMeta from '../../input-number.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<InputNumberProps> = {
  title: 'InputNumber/Attributes/Max',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return InputNumberMax(args);
  },
  argTypes: {
    max: inputnumberMeta?.argTypes?.max,
    value: inputnumberMeta?.argTypes?.value
  },
  args: {
    max: 10,
    value: 11
  }
};

export default meta;
type Story = StoryObj<InputNumberProps>;

export const Param: Story = {}
