import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TextareaName } from '../../sy-textarea.main';
import textareaMeta from '../../sy-textarea.stories';

const meta: Meta = {
  title: 'Textarea/Attributes/Name',
  component: 'sy-textarea',
  tags: [],
  render: (args) => TextareaName(args as { name: string }),
  argTypes: { name: textareaMeta?.argTypes?.name },
  args: { name: 'myTextarea' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};