import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { InputNumberGetStatus } from '../../sy-input-number.main';

const meta: Meta = {
  title: 'InputNumber/Methods/getStatus',
  component: 'sy-input-number',
  tags: [],
  render: () => InputNumberGetStatus(),
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
