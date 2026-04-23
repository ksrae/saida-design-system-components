import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SelectCheckValidity } from '../../sy-select.main';

const meta: Meta = {
  title: 'Select/Methods/CheckValidity',
  component: 'sy-select',
  tags: [],
  render: () => SelectCheckValidity(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};