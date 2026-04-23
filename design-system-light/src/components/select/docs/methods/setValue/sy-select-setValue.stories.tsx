import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SelectSetValue } from '../../sy-select.main';

const meta: Meta = {
  title: 'Select/Methods/SetValue',
  component: 'sy-select',
  tags: [],
  render: () => SelectSetValue(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};