import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { InputFocusBlur } from '../../sy-input.main';

const meta: Meta = {
  title: 'Input/Methods/Focus Blur',
  component: 'sy-input',
  tags: [],
  render: () => InputFocusBlur(),
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
