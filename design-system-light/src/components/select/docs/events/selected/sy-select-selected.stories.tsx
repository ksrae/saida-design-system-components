import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SelectSelected } from '../../sy-select.main';

const meta: Meta = {
  title: 'Select/Events/Selected',
  component: 'sy-select',
  tags: [],
  render: () => SelectSelected(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};