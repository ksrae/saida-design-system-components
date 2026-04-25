import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SelectRemoved } from '../../sy-select.main';

const meta: Meta = {
  title: 'Select/Events/Removed',
  component: 'sy-select',
  tags: [],
  render: () => SelectRemoved(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};