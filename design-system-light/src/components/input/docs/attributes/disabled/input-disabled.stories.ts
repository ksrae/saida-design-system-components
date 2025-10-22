import type { Meta, StoryObj } from '@storybook/web-components';
import { InputProps, InputDisabled } from '../../input';
import inputMeta from '../../input.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<InputProps> = {
  title: 'Input/Attributes/Disabled',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return InputDisabled(args);
  },
  argTypes: {
    disabled: inputMeta?.argTypes?.disabled
  },
  args: {
    disabled: true
  }
};

export default meta;
type Story = StoryObj<InputProps>;

export const Param: Story = {}
