import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import inlineMessageMeta from '../../inline-message.stories';
import { InlineMessageMsg, InlineMessageProps } from '../../inline-message';

const meta: Meta<InlineMessageProps> = {
  title: 'InlineMessage/Attributes/Message',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return InlineMessageMsg(args);
  },
  argTypes: {
    message: inlineMessageMeta?.argTypes?.message
  },
  args: {
    message: 'This is an inline message'
  }
};

export default meta;
type Story = StoryObj<InlineMessageProps>;

export const Param: Story = {}