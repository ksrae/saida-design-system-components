import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { InlineMessageVariant } from '../../sy-inline-message.main';
import inlineMessageMeta from '../../sy-inline-message.stories';

const meta: Meta = {
  title: 'InlineMessage/Attributes/Variant',
  component: 'sy-inline-message',
  tags: [],
  render: (args) => InlineMessageVariant(args as { variant: 'info' | 'success' | 'warning' | 'error' }),
  argTypes: { variant: inlineMessageMeta?.argTypes?.variant },
  args: { variant: 'success' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};