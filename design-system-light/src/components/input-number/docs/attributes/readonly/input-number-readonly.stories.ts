import type { Meta, StoryObj } from '@storybook/web-components';
import { InputNumberProps, InputNumberReadonly } from '../../input-number';
import inputnumberMeta from '../../input-number.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<InputNumberProps> = {
  title: 'InputNumber/Attributes/Readonly',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return InputNumberReadonly(args);
  },
  argTypes: {
    readonly: inputnumberMeta?.argTypes?.readonly
  },
  args: {
    readonly: true
  }
};

export default meta;
type Story = StoryObj<InputNumberProps>;

export const Param: Story = {}
