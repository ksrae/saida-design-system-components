import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import inlineMessageMeta from '../../inline-message.stories';
import { InlineMessageBtnClick, InlineMessageProps } from '../../inline-message';

const meta: Meta<InlineMessageProps> = {
  title: 'InlineMessage/Events/BtnClick',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return InlineMessageBtnClick();
  },
  argTypes: {
    
  },
};

export default meta;
type Story = StoryObj<InlineMessageProps>;

export const Param: Story = {}