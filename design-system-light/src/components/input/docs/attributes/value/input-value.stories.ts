import type { Meta, StoryObj } from '@storybook/web-components';
import { InputProps, InputValue } from '../../input';
import inputMeta from '../../input.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<InputProps> = {
  title: 'Input/Attributes/Value',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return InputValue(args);
  },
  argTypes: {
    value: inputMeta?.argTypes?.value
  },
  args: {
    value: 'Default Value'
  }
};

export default meta;
type Story = StoryObj<InputProps>;

export const Param: Story = {}
