import type { Meta, StoryObj } from '@storybook/web-components';
import { InputNumberProps, InputNumberDisabled } from '../../input-number';
import inputnumberMeta from '../../input-number.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<InputNumberProps> = {
  title: 'InputNumber/Attributes/Disabled',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return InputNumberDisabled(args);
  },
  argTypes: {
    disabled: inputnumberMeta?.argTypes?.disabled
  },
  args: {
    disabled: true
  }
};

export default meta;
type Story = StoryObj<InputNumberProps>;

export const Param: Story = {}
