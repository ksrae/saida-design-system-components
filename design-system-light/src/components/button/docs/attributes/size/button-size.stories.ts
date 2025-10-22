import type { Meta, StoryObj } from '@storybook/web-components';
import { ButtonProps, ButtonSize } from '../../button';
import buttonMeta from '../../button.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ButtonProps> = {
  title: 'Button/Attributes/Size',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ButtonSize(args);
  },
  argTypes: {
    size: buttonMeta?.argTypes?.size
  },
  args: {
    size: 'medium'
  }
};

export default meta;
type Story = StoryObj<ButtonProps>;

export const Param: Story = {}
