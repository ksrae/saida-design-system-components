import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SelectSetCustomError } from '../../sy-select.main';

const meta: Meta = {
  title: 'Select/Methods/SetCustomError',
  component: 'sy-select',
  tags: [],
  render: () => SelectSetCustomError(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};