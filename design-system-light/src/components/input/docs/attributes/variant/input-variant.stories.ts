import type { Meta, StoryObj } from '@storybook/web-components';
import { InputProps, InputVariant } from '../../input';
import inputMeta from '../../input.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<InputProps> = {
  title: 'Input/Attributes/Variant',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return InputVariant(args);
  },
  argTypes: {
    variant: inputMeta?.argTypes?.variant
  },
  args: {
    variant: 'text'
  }
};

export default meta;
type Story = StoryObj<InputProps>;

export const Param: Story = {}
