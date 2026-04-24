import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { InputNumberFocused } from '../../sy-input-number.main';

const meta: Meta = {
  title: 'InputNumber/Events/Focused',
  component: 'sy-input-number',
  tags: [],
  render: () => InputNumberFocused(),
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
