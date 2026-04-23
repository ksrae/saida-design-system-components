import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SelectOptionIsCustomTag } from '../../sy-select-option.main';
import selectOptionMeta from '../../sy-select-option.stories';

const meta: Meta = {
  title: 'Select/Option Attributes/Is Custom Tag',
  component: 'sy-select-option',
  tags: [],
  render: (args) => SelectOptionIsCustomTag(args as { isCustomTag: boolean }),
  argTypes: { isCustomTag: selectOptionMeta?.argTypes?.isCustomTag },
  args: { isCustomTag: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};