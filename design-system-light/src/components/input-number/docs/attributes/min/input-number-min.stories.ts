import type { Meta, StoryObj } from '@storybook/web-components';
import { InputNumberProps, InputNumberMin } from '../../input-number';
import inputnumberMeta from '../../input-number.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<InputNumberProps> = {
  title: 'InputNumber/Attributes/Min',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return InputNumberMin(args);
  },
  argTypes: {
    min: inputnumberMeta?.argTypes?.min,
    value: inputnumberMeta?.argTypes?.value
  },
  args: {
    min: 10,
    value: 9
  }
};

export default meta;
type Story = StoryObj<InputNumberProps>;

export const Param: Story = {}
