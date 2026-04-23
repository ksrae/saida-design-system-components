import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SelectInputChanged } from '../../sy-select.main';

const meta: Meta = {
  title: 'Select/Events/InputChanged',
  component: 'sy-select',
  tags: [],
  render: () => SelectInputChanged(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};