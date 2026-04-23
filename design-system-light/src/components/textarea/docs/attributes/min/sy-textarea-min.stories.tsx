import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TextareaMin } from '../../sy-textarea.main';
import textareaMeta from '../../sy-textarea.stories';

const meta: Meta = {
  title: 'Textarea/Attributes/Min',
  component: 'sy-textarea',
  tags: [],
  render: (args) => TextareaMin(args as { min: number }),
  argTypes: { min: textareaMeta?.argTypes?.min },
  args: { min: 10 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};