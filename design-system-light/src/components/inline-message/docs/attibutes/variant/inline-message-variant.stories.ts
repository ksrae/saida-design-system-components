import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import inlineMessageMeta from '../../inline-message.stories';
import { InlineMessageProps, InlineMessageVariant } from '../../inline-message';

const meta: Meta<InlineMessageProps> = {
  title: 'InlineMessage/Attributes/Variant',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return  InlineMessageVariant(args);
  },
  argTypes: {
    variant: inlineMessageMeta?.argTypes?.variant
  },
  args: {
    variant: 'info'
  }
};

export default meta;
type Story = StoryObj<InlineMessageProps>;

export const Param: Story = {}