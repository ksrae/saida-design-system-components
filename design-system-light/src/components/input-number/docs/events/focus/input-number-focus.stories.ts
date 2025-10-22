import type { Meta, StoryObj } from '@storybook/web-components';
import { InputNumberProps, InputNumberFocusBlur } from '../../input-number';
import inputnumberMeta from '../../input-number.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<InputNumberProps> = {
  title: 'InputNumber/Events/Focus',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return InputNumberFocusBlur();
  },
  argTypes: {
    setFocus: inputnumberMeta?.argTypes?.setFocus,
    setBlur: inputnumberMeta?.argTypes?.setBlur,
  },
};

export default meta;
type Story = StoryObj<InputNumberProps>;

export const Param: Story = {}
