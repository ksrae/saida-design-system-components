import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { InputNumberChanged } from '../../sy-input-number.main';

const meta: Meta = {
  title: 'InputNumber/Events/Changed',
  component: 'sy-input-number',
  tags: [],
  render: () => InputNumberChanged(),
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
