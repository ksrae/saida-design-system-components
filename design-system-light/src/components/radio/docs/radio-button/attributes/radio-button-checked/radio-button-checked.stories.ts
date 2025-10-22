import type { Meta, StoryObj } from '@storybook/web-components';
import { RadioButtonChecked, RadioButtonProps } from '../../radio-button';
import { clearElements } from '../../../../../clear-element';
import radioButtonMeta from '../../radio-button.stories';

const meta: Meta<RadioButtonProps> = {
  title: 'RadioButton/Attributes/Checked',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return RadioButtonChecked(args);
  },
  argTypes: {
    checked: radioButtonMeta?.argTypes?.checked
  },
  args: {
    checked: true,
  }
};

export default meta;
type Story = StoryObj<RadioButtonProps>;

export const Param: Story = {}