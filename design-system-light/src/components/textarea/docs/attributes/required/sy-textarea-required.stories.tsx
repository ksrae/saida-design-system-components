import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TextareaRequired } from '../../sy-textarea.main';
import textareaMeta from '../../sy-textarea.stories';

const meta: Meta = {
  title: 'Textarea/Attributes/Required',
  component: 'sy-textarea',
  tags: [],
  render: (args) => TextareaRequired(args as { required: boolean }),
  argTypes: { required: textareaMeta?.argTypes?.required },
  args: { required: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};