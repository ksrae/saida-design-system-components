import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TextareaLabel } from '../../sy-textarea.main';
import textareaMeta from '../../sy-textarea.stories';

const meta: Meta = {
  title: 'Textarea/Attributes/Label',
  component: 'sy-textarea',
  tags: [],
  render: (args) => TextareaLabel(args as { label: string }),
  argTypes: { label: textareaMeta?.argTypes?.label },
  args: { label: 'My Label' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};