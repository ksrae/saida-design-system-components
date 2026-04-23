import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SelectOptionShowTooltip } from '../../sy-select-option.main';
import selectOptionMeta from '../../sy-select-option.stories';

const meta: Meta = {
  title: 'Select/Option Attributes/Show Tooltip',
  component: 'sy-select-option',
  tags: [],
  render: (args) => SelectOptionShowTooltip(args as { showTooltip: boolean }),
  argTypes: { showTooltip: selectOptionMeta?.argTypes?.showTooltip },
  args: { showTooltip: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};