import type { Meta, StoryObj } from '@storybook/web-components';
import { RadioButtonDisabled, RadioButtonProps } from '../../radio-button';
import radioButtonMeta from '../../radio-button.stories';
import { clearElements } from '../../../../../clear-element';

const meta: Meta<RadioButtonProps> = {
  title: 'RadioButton/Attributes/Disabled',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return RadioButtonDisabled(args);
  },
  argTypes: {
    disabled: radioButtonMeta?.argTypes?.disabled
  },
  args: {
    disabled: true
  }
};

export default meta;
type Story = StoryObj<RadioButtonProps>;

export const Param: Story = {}