import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TextareaClearable } from '../../sy-textarea.main';
import textareaMeta from '../../sy-textarea.stories';

const meta: Meta = {
  title: 'Textarea/Attributes/Clearable',
  component: 'sy-textarea',
  tags: [],
  render: (args) => TextareaClearable(args as { clearable: boolean }),
  argTypes: { clearable: textareaMeta?.argTypes?.clearable },
  args: { clearable: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};