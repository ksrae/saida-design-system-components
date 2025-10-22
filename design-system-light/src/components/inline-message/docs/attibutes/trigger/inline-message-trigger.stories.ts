import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import inlineMessageMeta from '../../inline-message.stories';
import { InlineMessageProps, InlineMessageTrigger } from '../../inline-message';

const meta: Meta<InlineMessageProps> = {
  title: 'InlineMessage/Attributes/Trigger',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return InlineMessageTrigger(args);
  },
  argTypes: {
    trigger: inlineMessageMeta?.argTypes?.trigger
  },
  args: {
    trigger: 'click'
  }
};

export default meta;
type Story = StoryObj<InlineMessageProps>;

export const Param : Story = {}