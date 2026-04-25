import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { InputNumberReportValidity } from '../../sy-input-number.main';

const meta: Meta = {
  title: 'InputNumber/Methods/reportValidity',
  component: 'sy-input-number',
  tags: [],
  render: () => InputNumberReportValidity(),
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
