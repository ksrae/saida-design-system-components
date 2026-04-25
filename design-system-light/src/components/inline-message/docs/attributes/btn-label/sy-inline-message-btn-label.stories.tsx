import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { InlineMessageBtnLabel } from '../../sy-inline-message.main';
import inlineMessageMeta from '../../sy-inline-message.stories';

const meta: Meta = {
  title: 'InlineMessage/Attributes/Btn Label',
  component: 'sy-inline-message',
  tags: [],
  render: (args) => InlineMessageBtnLabel(args as { btnLabel: string }),
  argTypes: { btnLabel: inlineMessageMeta?.argTypes?.btnLabel },
  args: { btnLabel: 'Action' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};