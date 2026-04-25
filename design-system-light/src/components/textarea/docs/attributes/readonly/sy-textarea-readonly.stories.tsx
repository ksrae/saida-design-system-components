import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TextareaReadonly } from '../../sy-textarea.main';
import textareaMeta from '../../sy-textarea.stories';

const meta: Meta = {
  title: 'Textarea/Attributes/Readonly',
  component: 'sy-textarea',
  tags: [],
  render: (args) => TextareaReadonly(args as { readonly: boolean }),
  argTypes: { readonly: textareaMeta?.argTypes?.readonly },
  args: { readonly: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};