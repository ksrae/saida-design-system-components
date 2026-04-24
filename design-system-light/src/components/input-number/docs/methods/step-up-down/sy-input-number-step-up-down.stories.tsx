import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { InputNumberStepUpDown } from '../../sy-input-number.main';

const meta: Meta = {
  title: 'InputNumber/Methods/stepUp stepDown',
  component: 'sy-input-number',
  tags: [],
  render: () => InputNumberStepUpDown(),
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
