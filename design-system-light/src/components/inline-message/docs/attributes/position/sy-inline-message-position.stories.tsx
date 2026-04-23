import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { InlineMessagePosition } from '../../sy-inline-message.main';
import inlineMessageMeta from '../../sy-inline-message.stories';

const meta: Meta = {
  title: 'InlineMessage/Attributes/Position',
  component: 'sy-inline-message',
  tags: [],
  render: (args) => InlineMessagePosition(args as { position: 'top' | 'bottom' | 'left' | 'right' }),
  argTypes: { position: inlineMessageMeta?.argTypes?.position },
  args: { position: 'bottom' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};