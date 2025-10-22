import type { Meta, StoryObj } from '@storybook/web-components';
import { InputProps, InputClearable } from '../../input';
import inputMeta from '../../input.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<InputProps> = {
  title: 'Input/Attributes/Clearable',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return InputClearable(args);
  },
  argTypes: {
    clearable: inputMeta?.argTypes?.clearable
  },
  args: {
    clearable: true
  }
};

export default meta;
type Story = StoryObj<InputProps>;

export const Param: Story = {}
