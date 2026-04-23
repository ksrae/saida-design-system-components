import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { RadioButtonSize } from '../../sy-radio-button.main';
import radioButtonMeta from '../../sy-radio-button.stories';

const meta: Meta = {
  title: 'RadioButton/Attributes/Size',
  component: 'sy-radio-button',
  tags: [],
  render: (args) => RadioButtonSize(args as { size: 'small' | 'medium' | 'large' }),
  argTypes: { size: radioButtonMeta?.argTypes?.size },
  args: { size: 'large' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};