import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import inlineMessageMeta from '../../inline-message.stories';
import { InlineMessageShowIcon, InlineMessageProps } from '../../inline-message';

const meta: Meta<InlineMessageProps> = {
  title: 'InlineMessage/Attributes/Icon',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return InlineMessageShowIcon(args);
  },
  argTypes: {
    showIcon: inlineMessageMeta?.argTypes?.showIcon,
    variant: inlineMessageMeta?.argTypes?.variant
  },
  args: {
    showIcon: true,
    variant: 'info'
  }
};

export default meta;
type Story = StoryObj<InlineMessageProps>;

export const Param: Story = {}