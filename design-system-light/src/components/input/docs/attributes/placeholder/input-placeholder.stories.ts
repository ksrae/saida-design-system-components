import type { Meta, StoryObj } from '@storybook/web-components';
import { InputProps, InputPlaceholder } from '../../input';
import inputMeta from '../../input.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<InputProps> = {
  title: 'Input/Attributes/Placeholder',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return InputPlaceholder(args);
  },
  argTypes: {
    placeholder: inputMeta?.argTypes?.placeholder
  },
  args: {
    placeholder: 'Placeholder'
  }
};

export default meta;
type Story = StoryObj<InputProps>;

export const Param: Story = {}
