import type { Meta, StoryObj } from '@storybook/web-components';
import { InputProps, InputReadonly } from '../../input';
import inputMeta from '../../input.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<InputProps> = {
  title: 'Input/Attributes/Readonly',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return InputReadonly(args);
  },
  argTypes: {
    readonly: inputMeta?.argTypes?.readonly
  },
  args: {
    readonly: true
  }
};

export default meta;
type Story = StoryObj<InputProps>;

export const Param: Story = {}
