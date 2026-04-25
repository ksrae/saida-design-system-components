import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TextareaMax } from '../../sy-textarea.main';
import textareaMeta from '../../sy-textarea.stories';

const meta: Meta = {
  title: 'Textarea/Attributes/Max',
  component: 'sy-textarea',
  tags: [],
  render: (args) => TextareaMax(args as { max: number }),
  argTypes: { max: textareaMeta?.argTypes?.max },
  args: { max: 200 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};