import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { InputNumberDisabled } from '../../sy-input-number.main';
import inputNumberMeta from '../../sy-input-number.stories';

const meta: Meta = {
  title: 'InputNumber/Attributes/Disabled',
  component: 'sy-input-number',
  tags: [],
  render: (args) => InputNumberDisabled(args as { disabled: boolean }),
  argTypes: { disabled: inputNumberMeta?.argTypes?.disabled },
  args: { disabled: true },
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
