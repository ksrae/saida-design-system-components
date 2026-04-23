import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TextareaBorderless } from '../../sy-textarea.main';
import textareaMeta from '../../sy-textarea.stories';

const meta: Meta = {
  title: 'Textarea/Attributes/Borderless',
  component: 'sy-textarea',
  tags: [],
  render: (args) => TextareaBorderless(args as { borderless: boolean }),
  argTypes: { borderless: textareaMeta?.argTypes?.borderless },
  args: { borderless: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};