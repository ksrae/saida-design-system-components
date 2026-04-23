import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TextareaStatus } from '../../sy-textarea.main';
import textareaMeta from '../../sy-textarea.stories';

const meta: Meta = {
  title: 'Textarea/Attributes/Status',
  component: 'sy-textarea',
  tags: [],
  render: (args) => TextareaStatus(args as { status: 'default' | 'warning' | 'error' | 'success' }),
  argTypes: { status: textareaMeta?.argTypes?.status },
  args: { status: 'error' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};