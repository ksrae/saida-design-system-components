import type { Meta, StoryObj } from '@storybook/web-components';
import { RadioButtonSelected, RadioGroupProps } from '../../radio-button';
import radioButtonMeta from '../../radio-button.stories';
import { clearElements } from '../../../../../clear-element';

const meta: Meta<RadioGroupProps> = {
  title: 'RadioButton/Events/Selected',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return RadioButtonSelected();
  },
  argTypes: {
    selected: radioButtonMeta?.argTypes?.selected
  },
};

export default meta;
type Story = StoryObj<RadioGroupProps>;

export const Param: Story = {}