import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { InlineMessageMessage } from '../../sy-inline-message.main';
import inlineMessageMeta from '../../sy-inline-message.stories';

const meta: Meta = {
  title: 'InlineMessage/Attributes/Message',
  component: 'sy-inline-message',
  tags: [],
  render: (args) => InlineMessageMessage(args as { message: string }),
  argTypes: { message: inlineMessageMeta?.argTypes?.message },
  args: { message: 'Inline message' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};