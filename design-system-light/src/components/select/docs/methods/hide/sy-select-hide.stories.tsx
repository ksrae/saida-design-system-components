import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SelectHideMethod } from '../../sy-select.main';

const meta: Meta = {
  title: 'Select/Methods/Hide',
  component: 'sy-select',
  tags: [],
  render: () => SelectHideMethod(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};
