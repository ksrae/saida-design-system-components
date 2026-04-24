import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { InputNumberCheckValidity } from '../../sy-input-number.main';

const meta: Meta = {
  title: 'InputNumber/Methods/checkValidity',
  component: 'sy-input-number',
  tags: [],
  render: () => InputNumberCheckValidity(),
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
