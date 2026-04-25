import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TextareaSetFocus } from '../../sy-textarea.main';

const meta: Meta = {
  title: 'Textarea/Methods/Set Focus',
  component: 'sy-textarea',
  tags: [],
  render: () => TextareaSetFocus(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};