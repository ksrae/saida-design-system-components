import type { Meta, StoryObj } from '@storybook/web-components';
import { InputProps, InputRequired } from '../../input';
import inputMeta from '../../input.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<InputProps> = {
  title: 'Input/Attributes/Required',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return InputRequired(args);
  },
  argTypes: {
    required: inputMeta?.argTypes?.required
  },
  args: {
    required: true
  }
};

export default meta;
type Story = StoryObj<InputProps>;

export const Param: Story = {}
