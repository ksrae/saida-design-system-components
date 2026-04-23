import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SelectOptionLabel } from '../../sy-select-option.main';
import selectOptionMeta from '../../sy-select-option.stories';

const meta: Meta = {
  title: 'Select/Option Attributes/Label',
  component: 'sy-select-option',
  tags: [],
  render: (args) => SelectOptionLabel(args as { label: string }),
  argTypes: { label: selectOptionMeta?.argTypes?.label },
  args: { label: '' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};