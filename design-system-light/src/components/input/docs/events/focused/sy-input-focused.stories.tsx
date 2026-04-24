import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { InputFocused } from '../../sy-input.main';

const meta: Meta = {
  title: 'Input/Events/Focused',
  component: 'sy-input',
  tags: [],
  render: () => InputFocused(),
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
