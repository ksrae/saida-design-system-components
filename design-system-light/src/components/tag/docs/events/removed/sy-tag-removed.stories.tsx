import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TagRemoved } from '../../sy-tag.main';

const meta: Meta = {
  title: 'Tag/Events/Removed',
  component: 'sy-tag',
  tags: [],
  render: () => TagRemoved(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};