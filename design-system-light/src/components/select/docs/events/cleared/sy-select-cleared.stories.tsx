import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SelectCleared } from '../../sy-select.main';

const meta: Meta = {
  title: 'Select/Events/Cleared',
  component: 'sy-select',
  tags: [],
  render: () => SelectCleared(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};