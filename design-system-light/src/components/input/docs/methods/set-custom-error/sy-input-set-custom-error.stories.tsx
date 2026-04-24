import type { Meta, StoryObj } from '@storybook/web-components-vite';
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
