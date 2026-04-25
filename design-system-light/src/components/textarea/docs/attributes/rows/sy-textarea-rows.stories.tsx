import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TextareaRows } from '../../sy-textarea.main';
import textareaMeta from '../../sy-textarea.stories';

const meta: Meta = {
  title: 'Textarea/Attributes/Rows',
  component: 'sy-textarea',
  tags: [],
  render: (args) => TextareaRows(args as { rows: number }),
  argTypes: { rows: textareaMeta?.argTypes?.rows },
  args: { rows: 6 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};