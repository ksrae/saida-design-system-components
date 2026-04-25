import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TextareaAutofocus } from '../../sy-textarea.main';
import textareaMeta from '../../sy-textarea.stories';

const meta: Meta = {
  title: 'Textarea/Attributes/Autofocus',
  component: 'sy-textarea',
  tags: [],
  render: (args) => TextareaAutofocus(args as { autofocus: boolean }),
  argTypes: { autofocus: textareaMeta?.argTypes?.autofocus },
  args: { autofocus: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};