import type { Meta, StoryObj } from '@storybook/web-components';
import { InputNumberProps, InputNumberStep } from '../../input-number';
import inputnumberMeta from '../../input-number.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<InputNumberProps> = {
  title: 'InputNumber/Attributes/Step',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return InputNumberStep(args);
  },
  argTypes: {
    step: inputnumberMeta?.argTypes?.step
  },
  args: {
    step: 1
  }
};

export default meta;
type Story = StoryObj<InputNumberProps>;

export const Param: Story = {}
