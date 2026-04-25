import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { InputNumberBlured } from '../../sy-input-number.main';

const meta: Meta = {
  title: 'InputNumber/Events/Blured',
  component: 'sy-input-number',
  tags: [],
  render: () => InputNumberBlured(),
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
