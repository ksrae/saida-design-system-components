import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { InputNumberSuffix } from '../../sy-input-number.main';

const meta: Meta = {
  title: 'InputNumber/Slots/Suffix',
  component: 'sy-input-number',
  tags: [],
  render: (args) => InputNumberSuffix(args as { suffix: string }),
  args: { suffix: 'kg' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
