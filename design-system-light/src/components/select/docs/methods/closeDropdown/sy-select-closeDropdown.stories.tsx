import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SelectCloseDropdown } from '../../sy-select.main';

const meta: Meta = {
  title: 'Select/Methods/CloseDropdown',
  component: 'sy-select',
  tags: [],
  render: () => SelectCloseDropdown(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};