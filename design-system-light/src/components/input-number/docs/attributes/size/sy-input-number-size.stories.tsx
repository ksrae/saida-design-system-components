import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { InputNumberSize } from '../../sy-input-number.main';
import inputNumberMeta from '../../sy-input-number.stories';

const meta: Meta = {
  title: 'InputNumber/Attributes/Size',
  component: 'sy-input-number',
  tags: [],
  render: (args) => InputNumberSize(args as { size: 'small' | 'medium' | 'large' }),
  argTypes: { size: inputNumberMeta?.argTypes?.size },
  args: { size: 'medium' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
