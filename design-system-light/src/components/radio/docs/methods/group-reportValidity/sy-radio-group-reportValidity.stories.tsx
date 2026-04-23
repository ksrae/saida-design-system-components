import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { RadioGroupReportValidity } from '../../sy-radio-group.main';

const meta: Meta = {
  title: 'Radio/Group Methods/Report Validity',
  component: 'sy-radio-group',
  tags: [],
  render: () => RadioGroupReportValidity(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};