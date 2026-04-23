import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TextareaFocused } from '../../sy-textarea.main';

const meta: Meta = {
  title: 'Textarea/Events/Focused',
  component: 'sy-textarea',
  tags: [],
  render: () => TextareaFocused(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};