import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TextareaNoNativeValidity } from '../../sy-textarea.main';
import textareaMeta from '../../sy-textarea.stories';

const meta: Meta = {
  title: 'Textarea/Attributes/No Native Validity',
  component: 'sy-textarea',
  tags: [],
  render: (args) => TextareaNoNativeValidity(args as { noNativeValidity: boolean }),
  argTypes: { noNativeValidity: textareaMeta?.argTypes?.noNativeValidity },
  args: { noNativeValidity: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};