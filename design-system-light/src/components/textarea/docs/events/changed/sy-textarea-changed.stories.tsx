import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TextareaChanged } from '../../sy-textarea.main';

const meta: Meta = {
  title: 'Textarea/Events/Changed',
  component: 'sy-textarea',
  tags: [],
  render: () => TextareaChanged(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};