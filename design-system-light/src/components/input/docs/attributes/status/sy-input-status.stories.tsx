import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { InputStatus } from '../../sy-input.main';
import inputMeta from '../../sy-input.stories';

const meta: Meta = {
  title: 'Input/Attributes/Status',
  component: 'sy-input',
  tags: [],
  render: (args) => InputStatus(args as { status: 'default' | 'warning' | 'error' | 'success' }),
  argTypes: { status: inputMeta?.argTypes?.status },
  args: { status: 'error' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
