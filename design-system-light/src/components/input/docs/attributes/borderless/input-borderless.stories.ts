import type { Meta, StoryObj } from '@storybook/web-components';
import { InputProps, InputBorderless } from '../../input';
import inputMeta from '../../input.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<InputProps> = {
  title: 'Input/Attributes/Borderless',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return InputBorderless(args);
  },
  argTypes: {
    borderless: inputMeta?.argTypes?.borderless
  },
  args: {
    borderless: true
  }
};

export default meta;
type Story = StoryObj<InputProps>;

export const Param: Story = {}
