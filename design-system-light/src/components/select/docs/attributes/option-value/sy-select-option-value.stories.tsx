import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SelectOptionValue } from '../../sy-select-option.main';
import selectOptionMeta from '../../sy-select-option.stories';

const meta: Meta = {
  title: 'Select/Option Attributes/Value',
  component: 'sy-select-option',
  tags: [],
  render: (args) => SelectOptionValue(args as { value: string }),
  argTypes: { value: selectOptionMeta?.argTypes?.value },
  args: { value: '' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};