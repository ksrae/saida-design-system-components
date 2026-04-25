import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { RadioButtonValue } from '../../sy-radio-button.main';
import radioButtonMeta from '../../sy-radio-button.stories';

const meta: Meta = {
  title: 'RadioButton/Attributes/Value',
  component: 'sy-radio-button',
  tags: [],
  render: (args) => RadioButtonValue(args as { value: string }),
  argTypes: { value: radioButtonMeta?.argTypes?.value },
  args: { value: 'a' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};