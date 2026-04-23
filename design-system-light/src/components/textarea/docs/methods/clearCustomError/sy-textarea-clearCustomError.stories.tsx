import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TextareaClearCustomError } from '../../sy-textarea.main';

const meta: Meta = {
  title: 'Textarea/Methods/Clear Custom Error',
  component: 'sy-textarea',
  tags: [],
  render: () => TextareaClearCustomError(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};