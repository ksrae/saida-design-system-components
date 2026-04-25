import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { InputNumberName } from '../../sy-input-number.main';
import inputNumberMeta from '../../sy-input-number.stories';

const meta: Meta = {
  title: 'InputNumber/Attributes/Name',
  component: 'sy-input-number',
  tags: [],
  render: (args) => InputNumberName(args as { name: string }),
  argTypes: { name: inputNumberMeta?.argTypes?.name },
  args: { name: 'quantity' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
