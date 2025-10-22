import type { Meta, StoryObj } from '@storybook/web-components';
import { ButtonProps, ButtonJustified } from '../../button';
import buttonMeta from '../../button.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ButtonProps> = {
  title: 'Button/Attributes/Justified',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ButtonJustified(args);
  },
  argTypes: {
    justified: buttonMeta?.argTypes?.justified
  },
  args: {
    justified: true
  }
};

export default meta;
type Story = StoryObj<ButtonProps>;

export const Param: Story = {}
