import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SelectBlured } from '../../sy-select.main';

const meta: Meta = {
  title: 'Select/Events/Blured',
  component: 'sy-select',
  tags: [],
  render: () => SelectBlured(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};