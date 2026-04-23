import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { InlineMessageOpen } from '../../sy-inline-message.main';
import inlineMessageMeta from '../../sy-inline-message.stories';

const meta: Meta = {
  title: 'InlineMessage/Attributes/Open',
  component: 'sy-inline-message',
  tags: [],
  render: (args) => InlineMessageOpen(args as { open: boolean }),
  argTypes: { open: inlineMessageMeta?.argTypes?.open },
  args: { open: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};