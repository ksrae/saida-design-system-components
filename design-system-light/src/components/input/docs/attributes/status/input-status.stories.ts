import type { Meta, StoryObj } from '@storybook/web-components';
import { InputProps, InputStatus } from '../../input';
import inputMeta from '../../input.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<InputProps> = {
  title: 'Input/Attributes/Status',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return InputStatus(args);
  },
  argTypes: {
    status: inputMeta?.argTypes?.status
  },
  args: {
    status: 'default'
  }
};

export default meta;
type Story = StoryObj<InputProps>;

export const Param: Story = {}
