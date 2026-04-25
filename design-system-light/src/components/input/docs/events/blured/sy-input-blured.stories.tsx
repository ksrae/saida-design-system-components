import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { InputBlured } from '../../sy-input.main';

const meta: Meta = {
  title: 'Input/Events/Blured',
  component: 'sy-input',
  tags: [],
  render: () => InputBlured(),
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
