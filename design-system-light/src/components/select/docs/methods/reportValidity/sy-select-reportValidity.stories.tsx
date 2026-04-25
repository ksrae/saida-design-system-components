import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SelectReportValidity } from '../../sy-select.main';

const meta: Meta = {
  title: 'Select/Methods/ReportValidity',
  component: 'sy-select',
  tags: [],
  render: () => SelectReportValidity(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};