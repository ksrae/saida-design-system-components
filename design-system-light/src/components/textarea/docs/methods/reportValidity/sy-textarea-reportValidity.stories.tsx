import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TextareaReportValidity } from '../../sy-textarea.main';

const meta: Meta = {
  title: 'Textarea/Methods/Report Validity',
  component: 'sy-textarea',
  tags: [],
  render: () => TextareaReportValidity(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};