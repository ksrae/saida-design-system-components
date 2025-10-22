import type { Meta, StoryObj } from '@storybook/web-components';
import { ButtonProps, ButtonType } from '../../button';
import buttonMeta from '../../button.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ButtonProps> = {
  title: 'Button/Attributes/Type',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ButtonType(args);
  },
  argTypes: {
    type: buttonMeta?.argTypes?.type
  },
  args: {
    type: 'button'
  }
};

export default meta;
type Story = StoryObj<ButtonProps>;

export const Param: Story = {}
