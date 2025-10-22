import type { Meta, StoryObj } from '@storybook/web-components';
import { InputProps, InputLabel } from '../../input';
import inputMeta from '../../input.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<InputProps> = {
  title: 'Input/Attributes/Label',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return InputLabel(args);
  },
  argTypes: {
    label: inputMeta?.argTypes?.label
  },
  args: {
    label: 'Label'
  }
};

export default meta;
type Story = StoryObj<InputProps>;

export const Param: Story = {}
