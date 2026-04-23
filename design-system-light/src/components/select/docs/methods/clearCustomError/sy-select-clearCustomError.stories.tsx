import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SelectClearCustomError } from '../../sy-select.main';

const meta: Meta = {
  title: 'Select/Methods/ClearCustomError',
  component: 'sy-select',
  tags: [],
  render: () => SelectClearCustomError(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};