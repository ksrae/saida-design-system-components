import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { InputChanged } from '../../sy-input.main';

const meta: Meta = {
  title: 'Input/Events/Changed',
  component: 'sy-input',
  tags: [],
  render: () => InputChanged(),
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
