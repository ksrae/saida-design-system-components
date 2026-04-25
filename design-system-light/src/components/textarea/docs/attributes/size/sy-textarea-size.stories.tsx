import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TextareaSize } from '../../sy-textarea.main';
import textareaMeta from '../../sy-textarea.stories';

const meta: Meta = {
  title: 'Textarea/Attributes/Size',
  component: 'sy-textarea',
  tags: [],
  render: (args) => TextareaSize(args as { size: 'small' | 'medium' | 'large' }),
  argTypes: { size: textareaMeta?.argTypes?.size },
  args: { size: 'large' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};