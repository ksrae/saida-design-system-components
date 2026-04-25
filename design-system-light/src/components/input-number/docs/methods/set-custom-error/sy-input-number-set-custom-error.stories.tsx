import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { InputNumberSetCustomError } from '../../sy-input-number.main';

const meta: Meta = {
  title: 'InputNumber/Methods/setCustomError',
  component: 'sy-input-number',
  tags: [],
  render: () => InputNumberSetCustomError(),
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
