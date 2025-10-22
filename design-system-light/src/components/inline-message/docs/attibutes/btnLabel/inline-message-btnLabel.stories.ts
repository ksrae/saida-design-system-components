import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import inlineMessageMeta from '../../inline-message.stories';
import { InlineMessageBtnLabel, InlineMessageProps } from '../../inline-message';

const meta: Meta<InlineMessageProps> = {
  title: 'InlineMessage/Attributes/btnLabel',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return InlineMessageBtnLabel(args);
  },
  argTypes: {
    btnLabel: inlineMessageMeta?.argTypes?.btnLabel
  },
  args: {
    btnLabel: 'Button'
  }
};

export default meta;
type Story = StoryObj<InlineMessageProps>;

export const Param: Story = {}