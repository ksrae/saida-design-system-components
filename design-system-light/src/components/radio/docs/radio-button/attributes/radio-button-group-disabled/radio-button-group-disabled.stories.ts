import type { Meta, StoryObj } from '@storybook/web-components';
import { RadioButtonGroupDisabled } from '../../radio-button';
import { clearElements } from '../../../../../clear-element';
import { RadioGroupProps } from '../../../radio/radio';
import radioButtonGroupMeta from '../../radio-button-group.stories';

const meta: Meta<RadioGroupProps> = {
  title: 'RadioButton/Attributes/Group-Disabled',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return RadioButtonGroupDisabled(args);
  },
  argTypes: {
    disabled: radioButtonGroupMeta?.argTypes?.disabled
  },
  args: {
    disabled: true
  }
};

export default meta;
type Story = StoryObj<RadioGroupProps>;

export const Param: Story = {}