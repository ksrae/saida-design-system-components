import type { Meta, StoryObj } from '@storybook/web-components';
import { ButtonProps, ButtonClick } from '../../button';
import buttonMeta from '../../button.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ButtonProps> = {
  title: 'Button/Events/Click',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return ButtonClick();
  },
  argTypes: {
    click: buttonMeta?.argTypes?.click
  },
};

export default meta;
type Story = StoryObj<ButtonProps>;


export const Param: Story = {};
