import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SwitchReportValidity } from '../../sy-switch.main';

const meta: Meta = {
  title: 'Switch/Methods/Report Validity',
  component: 'sy-switch',
  tags: [],
  render: () => SwitchReportValidity(),
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};
