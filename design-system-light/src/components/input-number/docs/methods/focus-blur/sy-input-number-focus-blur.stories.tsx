import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { InputNumberFocusBlur } from '../../sy-input-number.main';

const meta: Meta = {
  title: 'InputNumber/Methods/Focus Blur',
  component: 'sy-input-number',
  tags: [],
  render: () => InputNumberFocusBlur(),
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
