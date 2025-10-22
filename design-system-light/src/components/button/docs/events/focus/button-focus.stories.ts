import type { Meta, StoryObj } from '@storybook/web-components';
import { ButtonProps, ButtonFocusBlur } from '../../button';
import buttonMeta from '../../button.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ButtonProps> = {
  title: 'Button/Events/Focus',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return ButtonFocusBlur();
  },
  argTypes: {
    setFocus: buttonMeta?.argTypes?.setFocus,
    setBlur: buttonMeta?.argTypes?.setBlur,
  },
};

export default meta;
type Story = StoryObj<ButtonProps>;


export const Param: Story = {};
