import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SelectClearable } from '../../sy-select.main';
import selectMeta from '../../sy-select.stories';

const meta: Meta = {
  title: 'Select/Attributes/Clearable',
  component: 'sy-select',
  tags: [],
  render: (args) => SelectClearable(args as { clearable: boolean }),
  argTypes: { clearable: selectMeta?.argTypes?.clearable },
  args: { clearable: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};