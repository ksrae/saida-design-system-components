import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SelectClearValue } from '../../sy-select.main';

const meta: Meta = {
  title: 'Select/Methods/ClearValue',
  component: 'sy-select',
  tags: [],
  render: () => SelectClearValue(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};