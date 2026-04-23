import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SelectFocused } from '../../sy-select.main';

const meta: Meta = {
  title: 'Select/Events/Focused',
  component: 'sy-select',
  tags: [],
  render: () => SelectFocused(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};