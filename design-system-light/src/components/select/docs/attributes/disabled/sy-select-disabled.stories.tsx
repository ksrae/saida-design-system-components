import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SelectDisabled } from '../../sy-select.main';
import selectMeta from '../../sy-select.stories';

const meta: Meta = {
  title: 'Select/Attributes/Disabled',
  component: 'sy-select',
  tags: [],
  render: (args) => SelectDisabled(args as { disabled: boolean }),
  argTypes: { disabled: selectMeta?.argTypes?.disabled },
  args: { disabled: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};