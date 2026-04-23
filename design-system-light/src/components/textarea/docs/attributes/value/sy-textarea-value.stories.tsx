import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TextareaValue } from '../../sy-textarea.main';
import textareaMeta from '../../sy-textarea.stories';

const meta: Meta = {
  title: 'Textarea/Attributes/Value',
  component: 'sy-textarea',
  tags: [],
  render: (args) => TextareaValue(args as { value: string }),
  argTypes: { value: textareaMeta?.argTypes?.value },
  args: { value: 'Sample' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};