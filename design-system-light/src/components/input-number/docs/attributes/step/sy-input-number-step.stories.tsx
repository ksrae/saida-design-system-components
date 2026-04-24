import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { InputNumberStep } from '../../sy-input-number.main';
import inputNumberMeta from '../../sy-input-number.stories';

const meta: Meta = {
  title: 'InputNumber/Attributes/Step',
  component: 'sy-input-number',
  tags: [],
  render: (args) => InputNumberStep(args as { step: number }),
  argTypes: { step: inputNumberMeta?.argTypes?.step },
  args: { step: 0.5 },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
