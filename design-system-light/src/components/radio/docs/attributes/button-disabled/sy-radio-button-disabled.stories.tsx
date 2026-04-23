import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { RadioButtonDisabled } from '../../sy-radio-button.main';
import radioButtonMeta from '../../sy-radio-button.stories';

const meta: Meta = {
  title: 'RadioButton/Attributes/Disabled',
  component: 'sy-radio-button',
  tags: [],
  render: (args) => RadioButtonDisabled(args as { disabled: boolean }),
  argTypes: { disabled: radioButtonMeta?.argTypes?.disabled },
  args: { disabled: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};