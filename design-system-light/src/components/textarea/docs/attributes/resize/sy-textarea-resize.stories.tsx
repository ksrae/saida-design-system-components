import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TextareaResize } from '../../sy-textarea.main';
import textareaMeta from '../../sy-textarea.stories';

const meta: Meta = {
  title: 'Textarea/Attributes/Resize',
  component: 'sy-textarea',
  tags: [],
  render: (args) => TextareaResize(args as { resize: 'none' | 'horizontal' | 'vertical' | 'both' }),
  argTypes: { resize: textareaMeta?.argTypes?.resize },
  args: { resize: 'both' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};