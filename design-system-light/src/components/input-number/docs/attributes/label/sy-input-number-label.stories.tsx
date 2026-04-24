import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { InputNumberLabel } from '../../sy-input-number.main';
import inputNumberMeta from '../../sy-input-number.stories';

const meta: Meta = {
  title: 'InputNumber/Attributes/Label',
  component: 'sy-input-number',
  tags: [],
  render: (args) => InputNumberLabel(args as { label: string }),
  argTypes: { label: inputNumberMeta?.argTypes?.label },
  args: { label: 'Quantity' },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
