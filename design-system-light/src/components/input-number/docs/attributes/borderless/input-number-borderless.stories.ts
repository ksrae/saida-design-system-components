import type { Meta, StoryObj } from '@storybook/web-components';
import { InputNumberProps, InputNumberBorderless } from '../../input-number';
import inputnumberMeta from '../../input-number.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<InputNumberProps> = {
  title: 'InputNumber/Attributes/Borderless',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return InputNumberBorderless(args);
  },
  argTypes: {
    borderless: inputnumberMeta?.argTypes?.borderless
  },
  args: {
    borderless: true
  }
};

export default meta;
type Story = StoryObj<InputNumberProps>;

export const Param: Story = {}
