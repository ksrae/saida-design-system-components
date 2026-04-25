import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TextareaPlaceholder } from '../../sy-textarea.main';
import textareaMeta from '../../sy-textarea.stories';

const meta: Meta = {
  title: 'Textarea/Attributes/Placeholder',
  component: 'sy-textarea',
  tags: [],
  render: (args) => TextareaPlaceholder(args as { placeholder: string }),
  argTypes: { placeholder: textareaMeta?.argTypes?.placeholder },
  args: { placeholder: 'Enter here' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};