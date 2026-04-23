import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { RadioButtonSelected } from '../../sy-radio-button.main';

const meta: Meta = {
  title: 'RadioButton/Events/Selected',
  component: 'sy-radio-button',
  tags: [],
  render: () => RadioButtonSelected(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};