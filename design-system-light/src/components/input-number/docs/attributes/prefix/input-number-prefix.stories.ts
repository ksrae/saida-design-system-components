import type { Meta, StoryObj } from '@storybook/web-components';
import { InputNumberProps, InputNumberPrefix } from '../../input-number';
import inputnumberMeta from '../../input-number.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<InputNumberProps> = {
  title: 'InputNumber/Attributes/Prefix',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return InputNumberPrefix(args);
  },
  argTypes: {
    prefix: inputnumberMeta?.argTypes?.prefix
  },
  args: {
    prefix: '$',
  }
};

export default meta;
type Story = StoryObj<InputNumberProps>;

export const Param: Story = {}
