import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { InputNumberRequired } from '../../sy-input-number.main';
import inputNumberMeta from '../../sy-input-number.stories';

const meta: Meta = {
  title: 'InputNumber/Attributes/Required',
  component: 'sy-input-number',
  tags: [],
  render: (args) => InputNumberRequired(args as { required: boolean }),
  argTypes: { required: inputNumberMeta?.argTypes?.required },
  args: { required: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
