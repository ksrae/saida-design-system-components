import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TextareaDisabled } from '../../sy-textarea.main';
import textareaMeta from '../../sy-textarea.stories';

const meta: Meta = {
  title: 'Textarea/Attributes/Disabled',
  component: 'sy-textarea',
  tags: [],
  render: (args) => TextareaDisabled(args as { disabled: boolean }),
  argTypes: { disabled: textareaMeta?.argTypes?.disabled },
  args: { disabled: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};