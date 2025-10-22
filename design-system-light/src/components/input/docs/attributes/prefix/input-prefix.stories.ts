import type { Meta, StoryObj } from '@storybook/web-components';
import { InputProps, InputPrefix } from '../../input';
import inputMeta from '../../input.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<InputProps> = {
  title: 'Input/Attributes/Prefix',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return InputPrefix();
  },
  argTypes: {
    prefix: inputMeta?.argTypes?.prefix
  },
};

export default meta;
type Story = StoryObj<InputProps>;

export const Param: Story = {}
