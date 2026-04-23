import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SelectOptionEmpty } from '../../sy-select-option.main';
import selectOptionMeta from '../../sy-select-option.stories';

const meta: Meta = {
  title: 'Select/Option Attributes/Empty',
  component: 'sy-select-option',
  tags: [],
  render: (args) => SelectOptionEmpty(args as { empty: boolean }),
  argTypes: { empty: selectOptionMeta?.argTypes?.empty },
  args: { empty: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};