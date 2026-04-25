import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TextareaCounter } from '../../sy-textarea.main';
import textareaMeta from '../../sy-textarea.stories';

const meta: Meta = {
  title: 'Textarea/Attributes/Counter',
  component: 'sy-textarea',
  tags: [],
  render: (args) => TextareaCounter(args as { counter: boolean }),
  argTypes: { counter: textareaMeta?.argTypes?.counter },
  args: { counter: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};