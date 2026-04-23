import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TextareaSetBlur } from '../../sy-textarea.main';

const meta: Meta = {
  title: 'Textarea/Methods/Set Blur',
  component: 'sy-textarea',
  tags: [],
  render: () => TextareaSetBlur(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};