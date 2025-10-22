import type { Meta, StoryObj } from '@storybook/web-components';
import { InputProps, InputFocusBlur } from '../../input';
import inputMeta from '../../input.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<InputProps> = {
  title: 'Input/Events/Focus',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return InputFocusBlur();
  },
  argTypes: {
    setFocus: inputMeta?.argTypes?.setFocus,
    setBlur: inputMeta?.argTypes?.setBlur,
  },
};

export default meta;
type Story = StoryObj<InputProps>;

export const Param: Story = {}
