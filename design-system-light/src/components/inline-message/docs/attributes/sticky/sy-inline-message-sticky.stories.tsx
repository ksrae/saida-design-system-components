import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { InlineMessageSticky } from '../../sy-inline-message.main';
import inlineMessageMeta from '../../sy-inline-message.stories';

const meta: Meta = {
  title: 'InlineMessage/Attributes/Sticky',
  component: 'sy-inline-message',
  tags: [],
  render: (args) => InlineMessageSticky(args as { sticky: boolean }),
  argTypes: { sticky: inlineMessageMeta?.argTypes?.sticky },
  args: { sticky: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};