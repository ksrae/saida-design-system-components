import type { Meta, StoryObj } from '@stencil/storybook-plugin';
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
