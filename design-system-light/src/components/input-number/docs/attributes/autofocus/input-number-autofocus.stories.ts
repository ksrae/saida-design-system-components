import type { Meta, StoryObj } from '@storybook/web-components';
import { InputNumberProps, InputNumberAutofocus } from '../../input-number';
import inputnumberMeta from '../../input-number.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<InputNumberProps> = {
  title: 'InputNumber/Attributes/Autofocus',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return InputNumberAutofocus(args);
  },
  argTypes: {
    autofocus: inputnumberMeta?.argTypes?.autofocus
  },
  args: {
    autofocus: true
  }
};

export default meta;
type Story = StoryObj<InputNumberProps>;

export const Param: Story = {}
