import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import inlineMessageMeta from '../../inline-message.stories';
import { InlineMessageOpen, InlineMessageProps } from '../../inline-message';

const meta: Meta<InlineMessageProps> = {
  title: 'InlineMessage/Attributes/Open',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return InlineMessageOpen(args);
  },
  argTypes: {
    open: inlineMessageMeta?.argTypes?.open
  },
  args: {
    open: true
  }
};

export default meta;
type Story = StoryObj<InlineMessageProps>;

export const Param: Story = {}