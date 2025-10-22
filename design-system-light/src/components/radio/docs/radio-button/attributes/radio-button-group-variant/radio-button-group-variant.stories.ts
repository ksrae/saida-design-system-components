import type { Meta, StoryObj } from '@storybook/web-components';
import { RadioButtonGroupVariant } from '../../radio-button';
import { clearElements } from '../../../../../clear-element';
import { RadioGroupProps } from '../../../radio/radio';
import radioButtonGroupMeta from '../../radio-button-group.stories';

const meta: Meta<RadioGroupProps> = {
  title: 'RadioButton/Attributes/Group-Variant',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return RadioButtonGroupVariant(args);
  },
  argTypes: {
    variant: radioButtonGroupMeta?.argTypes?.variant
  },
  args: {
    variant: 'outlined'
  }
};

export default meta;
type Story = StoryObj<RadioGroupProps>;

export const Param: Story = {}