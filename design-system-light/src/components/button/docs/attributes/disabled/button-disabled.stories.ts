import type { Meta, StoryObj } from '@storybook/web-components';
import { ButtonProps, ButtonDisabled } from '../../button';
import { clearElements } from '../../../../clear-element';
import buttonMeta from '../../button.stories';

const meta: Meta<ButtonProps> = {
  title: 'Button/Attributes/Disabled',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ButtonDisabled(args);
  },
  argTypes: {
    disabled: buttonMeta?.argTypes?.disabled
  },
  args: {
    disabled: true
  }
};

export default meta;
type Story = StoryObj<ButtonProps>;

export const Param: Story = {}
