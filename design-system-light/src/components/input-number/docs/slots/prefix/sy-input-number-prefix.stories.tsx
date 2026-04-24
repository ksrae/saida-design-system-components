import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { InputNumberPrefix } from '../../sy-input-number.main';

const meta: Meta = {
  title: 'InputNumber/Slots/Prefix',
  component: 'sy-input-number',
  tags: [],
  render: (args) => InputNumberPrefix(args as { prefix: string }),
  args: { prefix: '$' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
