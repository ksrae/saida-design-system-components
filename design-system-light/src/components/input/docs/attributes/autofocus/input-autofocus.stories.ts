import type { Meta, StoryObj } from '@storybook/web-components';
import { InputProps, InputAutofocus } from '../../input';
import inputMeta from '../../input.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<InputProps> = {
  title: 'Input/Attributes/Autofocus',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return InputAutofocus(args);
  },
  argTypes: {
    autofocus: inputMeta?.argTypes?.autofocus
  },
  args: {
    autofocus: true
  }
};

export default meta;
type Story = StoryObj<InputProps>;

export const Param: Story = {}
