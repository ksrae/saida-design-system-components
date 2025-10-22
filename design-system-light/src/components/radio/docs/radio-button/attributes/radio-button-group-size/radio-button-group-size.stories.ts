import type { Meta, StoryObj } from '@storybook/web-components';
import { RadioButtonGroupSize } from '../../radio-button';
import { clearElements } from '../../../../../clear-element';
import { RadioGroupProps } from '../../../radio/radio';
import radioButtonGroupMeta from '../../radio-button-group.stories';

const meta: Meta<RadioGroupProps> = {
  title: 'RadioButton/Attributes/Group-Size',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return RadioButtonGroupSize(args);
  },
  argTypes: {
    size: radioButtonGroupMeta?.argTypes?.size
  },
  args: {
    size: 'medium'
  }
};

export default meta;
type Story = StoryObj<RadioGroupProps>;

export const Param: Story = {}