import type { Meta, StoryObj } from '@storybook/web-components';
import { InputProps, InputSize } from '../../input';
import inputMeta from '../../input.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<InputProps> = {
  title: 'Input/Attributes/Size',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return InputSize(args);
  },
  argTypes: {
    size: inputMeta?.argTypes?.size
  },
  args: {
    size: 'medium'
  }
};

export default meta;
type Story = StoryObj<InputProps>;

export const Param: Story = {}
