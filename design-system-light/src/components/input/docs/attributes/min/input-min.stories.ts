import type { Meta, StoryObj } from '@storybook/web-components';
import { InputProps, InputMin } from '../../input';
import inputMeta from '../../input.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<InputProps> = {
  title: 'Input/Attributes/Min',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return InputMin(args);
  },
  argTypes: {
    min: inputMeta?.argTypes?.min
  },
  args: {
    min: 1
  }
};

export default meta;
type Story = StoryObj<InputProps>;

export const Param: Story = {}
