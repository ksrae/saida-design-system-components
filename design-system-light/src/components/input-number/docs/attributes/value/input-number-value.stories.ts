import type { Meta, StoryObj } from '@storybook/web-components';
import { InputNumberProps, InputNumberValue } from '../../input-number';
import inputnumberMeta from '../../input-number.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<InputNumberProps> = {
  title: 'InputNumber/Attributes/Value',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return InputNumberValue(args);
  },
  argTypes: {
    value: inputnumberMeta?.argTypes?.value
  },
  args: {
    value: '0'
  }
};

export default meta;
type Story = StoryObj<InputNumberProps>;

export const Param: Story = {}
