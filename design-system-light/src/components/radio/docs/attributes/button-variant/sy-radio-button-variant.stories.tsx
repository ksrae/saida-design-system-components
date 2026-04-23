import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { RadioButtonVariant } from '../../sy-radio-button.main';
import radioButtonMeta from '../../sy-radio-button.stories';

const meta: Meta = {
  title: 'RadioButton/Attributes/Variant',
  component: 'sy-radio-button',
  tags: [],
  render: (args) => RadioButtonVariant(args as { variant: 'outlined' | 'solid' }),
  argTypes: { variant: radioButtonMeta?.argTypes?.variant },
  args: { variant: 'solid' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};