import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { InlineMessageShowIcon } from '../../sy-inline-message.main';
import inlineMessageMeta from '../../sy-inline-message.stories';

const meta: Meta = {
  title: 'InlineMessage/Attributes/Show Icon',
  component: 'sy-inline-message',
  tags: [],
  render: (args) => InlineMessageShowIcon(args as { showIcon: boolean }),
  argTypes: { showIcon: inlineMessageMeta?.argTypes?.showIcon },
  args: { showIcon: true },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};