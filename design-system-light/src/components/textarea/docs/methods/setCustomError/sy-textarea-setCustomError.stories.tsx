import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TextareaSetCustomError } from '../../sy-textarea.main';

const meta: Meta = {
  title: 'Textarea/Methods/Set Custom Error',
  component: 'sy-textarea',
  tags: [],
  render: () => TextareaSetCustomError(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};