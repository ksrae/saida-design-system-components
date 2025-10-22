import type { Meta, StoryObj } from '@storybook/web-components';
import { InputNumberProps, InputNumberLabel } from '../../input-number';
import inputnumberMeta from '../../input-number.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<InputNumberProps> = {
  title: 'InputNumber/Attributes/Label',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return InputNumberLabel(args);
  },
  argTypes: {
    label: inputnumberMeta?.argTypes?.label
  },
  args: {
    label: 'Input number label'
  }
};

export default meta;
type Story = StoryObj<InputNumberProps>;

export const Param: Story = {}
