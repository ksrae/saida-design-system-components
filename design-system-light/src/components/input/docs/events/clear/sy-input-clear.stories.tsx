import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { InputClear } from '../../sy-input.main';

const meta: Meta = {
  title: 'Input/Events/Clear',
  component: 'sy-input',
  tags: [],
  render: () => InputClear(),
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
