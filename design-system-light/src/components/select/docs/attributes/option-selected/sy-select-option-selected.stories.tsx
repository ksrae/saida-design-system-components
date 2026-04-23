import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SelectOptionSelected } from '../../sy-select-option.main';
import selectOptionMeta from '../../sy-select-option.stories';

const meta: Meta = {
  title: 'Select/Option Attributes/Selected',
  component: 'sy-select-option',
  tags: [],
  render: (args) => SelectOptionSelected(args as { selected: boolean }),
  argTypes: { selected: selectOptionMeta?.argTypes?.selected },
  args: { selected: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};