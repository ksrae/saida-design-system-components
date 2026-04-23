import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TextareaChanged } from '../../sy-textarea.main';

const meta: Meta = {
  title: 'Textarea/Events/Changed',
  component: 'sy-textarea',
  tags: [],
  render: () => TextareaChanged(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};