import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { InlineMessageBtnClick } from '../../sy-inline-message.main';

const meta: Meta = {
  title: 'InlineMessage/Events/Btn Click',
  component: 'sy-inline-message',
  tags: [],
  render: () => InlineMessageBtnClick(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};