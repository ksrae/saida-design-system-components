import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TreeSelectReportValidity } from '../../sy-tree-select.main';

const meta: Meta = {
  title: 'TreeSelect/Methods/ReportValidity',
  component: 'sy-tree-select',
  tags: [],
  render: () => TreeSelectReportValidity(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};