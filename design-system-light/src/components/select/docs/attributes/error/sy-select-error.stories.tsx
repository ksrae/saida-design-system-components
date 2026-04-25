import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SelectError } from '../../sy-select.main';
import selectMeta from '../../sy-select.stories';

const meta: Meta = {
  title: 'Select/Attributes/Error',
  component: 'sy-select',
  tags: [],
  render: (args) => SelectError(args as { error: boolean }),
  argTypes: { error: selectMeta?.argTypes?.error },
  args: { error: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};