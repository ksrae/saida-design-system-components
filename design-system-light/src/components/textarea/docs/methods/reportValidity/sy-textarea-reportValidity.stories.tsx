import type { Meta, StoryObj } from '@storybook/web-components-vite';
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