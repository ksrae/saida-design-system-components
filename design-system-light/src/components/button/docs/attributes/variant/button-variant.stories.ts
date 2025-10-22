import type { Meta, StoryObj } from '@storybook/web-components';
import { ButtonProps, ButtonVariant } from '../../button';
import buttonMeta from '../../button.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ButtonProps> = {
  title: 'Button/Attributes/Variant',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ButtonVariant(args);
  },
  argTypes: {
    variant: buttonMeta?.argTypes?.variant
  },
  args: {
    variant: 'default'
  }
};

export default meta;
type Story = StoryObj<ButtonProps>;

export const Param: Story = {}