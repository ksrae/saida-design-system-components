import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TextareaCheckValidity } from '../../sy-textarea.main';

const meta: Meta = {
  title: 'Textarea/Methods/Check Validity',
  component: 'sy-textarea',
  tags: [],
  render: () => TextareaCheckValidity(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};