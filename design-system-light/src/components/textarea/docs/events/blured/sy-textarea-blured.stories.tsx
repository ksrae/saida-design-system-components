import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TextareaBlured } from '../../sy-textarea.main';

const meta: Meta = {
  title: 'Textarea/Events/Blured',
  component: 'sy-textarea',
  tags: [],
  render: () => TextareaBlured(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};