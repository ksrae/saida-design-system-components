import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { InlineMessageTrigger } from '../../sy-inline-message.main';
import inlineMessageMeta from '../../sy-inline-message.stories';

const meta: Meta = {
  title: 'InlineMessage/Attributes/Trigger',
  component: 'sy-inline-message',
  tags: [],
  render: (args) => InlineMessageTrigger(args as { trigger: 'click' | 'focusout' }),
  argTypes: { trigger: inlineMessageMeta?.argTypes?.trigger },
  args: { trigger: 'click' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};