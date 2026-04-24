import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { InputNumberSetClear } from '../../sy-input-number.main';

const meta: Meta = {
  title: 'InputNumber/Methods/setClear',
  component: 'sy-input-number',
  tags: [],
  render: () => InputNumberSetClear(),
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
