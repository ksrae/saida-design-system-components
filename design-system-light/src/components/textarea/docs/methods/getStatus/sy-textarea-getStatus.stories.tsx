import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TextareaGetStatus } from '../../sy-textarea.main';

const meta: Meta = {
  title: 'Textarea/Methods/Get Status',
  component: 'sy-textarea',
  tags: [],
  render: () => TextareaGetStatus(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};