import type { Meta, StoryObj } from '@storybook/web-components';
import { InputNumberProps, InputNumberChanged } from '../../input-number';
import inputnumberMeta from '../../input-number.stories';
import { clearElements } from '../../../../clear-element';

const meta: Meta<InputNumberProps> = {
  title: 'InputNumber/Events/Changed',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return InputNumberChanged();
  },
  argTypes: {
    changed: inputnumberMeta?.argTypes?.changed
  },
};

export default meta;
type Story = StoryObj<InputNumberProps>;

export const Param: Story = {}
