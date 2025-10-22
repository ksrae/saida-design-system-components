import type { Meta, StoryObj } from '@storybook/web-components';
import { InputNumberProps, InputNumberRequired } from '../../input-number';
import inputnumberMeta from '../../input-number.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<InputNumberProps> = {
  title: 'InputNumber/Attributes/Required',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return InputNumberRequired(args);
  },
  argTypes: {
    required: inputnumberMeta?.argTypes?.required
  },
  args: {
    required: true
  }
};

export default meta;
type Story = StoryObj<InputNumberProps>;

export const Param: Story = {}
