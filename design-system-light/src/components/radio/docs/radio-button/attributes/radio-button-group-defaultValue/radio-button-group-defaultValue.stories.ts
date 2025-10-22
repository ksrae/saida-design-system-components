import type { Meta, StoryObj } from '@storybook/web-components';
import { RadioButtonGroupDefaultValue } from '../../radio-button';
import { clearElements } from '../../../../../clear-element';
import { RadioGroupProps } from '../../../radio/radio';
import radioButtonGroupMeta from '../../radio-button-group.stories';

const meta: Meta<RadioGroupProps> = {
  title: 'RadioButton/Attributes/Group-DefaultValue',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return RadioButtonGroupDefaultValue(args);
  },
  argTypes: {
    defaultValue: radioButtonGroupMeta?.argTypes?.defaultValue
  },
  args: {
    defaultValue: '1'
  }
};

export default meta;
type Story = StoryObj<RadioGroupProps>;

export const Param: Story = {}