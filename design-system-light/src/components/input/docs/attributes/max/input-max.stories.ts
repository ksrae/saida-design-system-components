import type { Meta, StoryObj } from '@storybook/web-components';
import { InputProps, InputMax } from '../../input';
import inputMeta from '../../input.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<InputProps> = {
  title: 'Input/Attributes/Max',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return InputMax(args);
  },
  argTypes: {
    max: inputMeta?.argTypes?.max
  },
  args: {
    max: 5
  }
};

export default meta;
type Story = StoryObj<InputProps>;

export const Param: Story = {}
