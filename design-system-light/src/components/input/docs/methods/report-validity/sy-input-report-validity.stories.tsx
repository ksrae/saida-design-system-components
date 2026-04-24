import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { InputReportValidity } from '../../sy-input.main';

const meta: Meta = {
  title: 'Input/Methods/reportValidity',
  component: 'sy-input',
  tags: [],
  render: () => InputReportValidity(),
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
