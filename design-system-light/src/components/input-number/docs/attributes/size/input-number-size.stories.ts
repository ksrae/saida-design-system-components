import type { Meta, StoryObj } from '@storybook/web-components';
import { InputNumberProps, InputNumberSize } from '../../input-number';
import inputnumberMeta from '../../input-number.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<InputNumberProps> = {
  title: 'InputNumber/Attributes/Size',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return InputNumberSize(args);
  },
  argTypes: {
    size: inputnumberMeta?.argTypes?.size
  },
  args: {
    size: 'medium'
  }
};

export default meta;
type Story = StoryObj<InputNumberProps>;

export const Param: Story = {}
