import type { Meta, StoryObj } from '@storybook/web-components';
import { ButtonProps, ButtonLoading } from '../../button';
import buttonMeta from '../../button.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<ButtonProps> = {
  title: 'Button/Attributes/Loading',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return ButtonLoading(args);
  },
  argTypes: {
    loading: buttonMeta?.argTypes?.loading
  },
  args: {
    loading: true
  }
};

export default meta;
type Story = StoryObj<ButtonProps>;

export const Param: Story = {}
