import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { InputMessage } from '../../sy-input.main';
import inputMeta from '../../sy-input.stories';

const meta: Meta = {
  title: 'Input/Attributes/Message',
  component: 'sy-input',
  tags: [],
  render: (args) => InputMessage(args as { message: string }),
  argTypes: { message: inputMeta?.argTypes?.message },
  args: { message: 'Help text below the input' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
