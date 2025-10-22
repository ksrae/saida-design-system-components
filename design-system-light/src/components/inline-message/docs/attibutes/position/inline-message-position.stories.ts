import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { InlineMessagePoisition, InlineMessageProps } from '../../inline-message';
import inlineMessageMeta from '../../inline-message.stories';

const meta: Meta<InlineMessageProps> = {
  title: 'InlineMessage/Attributes/Position',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return InlineMessagePoisition(args);
  },
  argTypes: {
    position: inlineMessageMeta?.argTypes?.position
  },
  args: {
    position: 'bottom'
  }
};

export default meta;
type Story = StoryObj<InlineMessageProps>;

export const Param: Story = {}