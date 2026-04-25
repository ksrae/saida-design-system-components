import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { InputNumberBorderless } from '../../sy-input-number.main';
import inputNumberMeta from '../../sy-input-number.stories';

const meta: Meta = {
  title: 'InputNumber/Attributes/Borderless',
  component: 'sy-input-number',
  tags: [],
  render: (args) => InputNumberBorderless(args as { borderless: boolean }),
  argTypes: { borderless: inputNumberMeta?.argTypes?.borderless },
  args: { borderless: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
