import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SelectOptionDisabled } from '../../sy-select-option.main';
import selectOptionMeta from '../../sy-select-option.stories';

const meta: Meta = {
  title: 'Select/Option Attributes/Disabled',
  component: 'sy-select-option',
  tags: [],
  render: (args) => SelectOptionDisabled(args as { disabled: boolean }),
  argTypes: { disabled: selectOptionMeta?.argTypes?.disabled },
  args: { disabled: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};