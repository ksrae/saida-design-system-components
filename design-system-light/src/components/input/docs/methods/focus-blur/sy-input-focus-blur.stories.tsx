import type { Meta, StoryObj } from '@stencil/storybook-plugin';
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
