import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { InputSetCustomError } from '../../sy-input.main';

const meta: Meta = {
  title: 'Input/Methods/setCustomError',
  component: 'sy-input',
  tags: [],
  render: () => InputSetCustomError(),
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
