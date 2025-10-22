import type { Meta, StoryObj } from '@storybook/web-components';
import { InputNumberProps, InputNumberSuffix } from '../../input-number';
import inputnumberMeta from '../../input-number.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<InputNumberProps> = {
  title: 'InputNumber/Attributes/Suffix',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return InputNumberSuffix(args);
  },
  argTypes: {
    suffix: inputnumberMeta?.argTypes?.suffix
  },
  args: {
    suffix: '%'
  }
};

export default meta;
type Story = StoryObj<InputNumberProps>;

export const Param: Story = {}
