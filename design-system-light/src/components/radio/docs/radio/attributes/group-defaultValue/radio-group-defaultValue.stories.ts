import type { Meta, StoryObj } from '@storybook/web-components';
import { RadioGroupDefaultValue, RadioGroupProps } from '../../radio';
import radioMeta from '../../radio-group.stories';
import { clearElements } from '../../../../../clear-element';

const meta: Meta<RadioGroupProps> = {
  title: 'Radio/Attributes/Group-DefaultValue',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return RadioGroupDefaultValue(args);
  },
  argTypes: {
    defaultValue: radioMeta?.argTypes?.defaultValue
  },
  args: {
    defaultValue: '1'
  }
};

export default meta;
type Story = StoryObj<RadioGroupProps>;

export const Param: Story = {}