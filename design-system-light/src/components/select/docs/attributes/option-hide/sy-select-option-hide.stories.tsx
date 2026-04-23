import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SelectOptionHide } from '../../sy-select-option.main';
import selectOptionMeta from '../../sy-select-option.stories';

const meta: Meta = {
  title: 'Select/Option Attributes/Hide',
  component: 'sy-select-option',
  tags: [],
  render: (args) => SelectOptionHide(args as { hide: boolean }),
  argTypes: { hide: selectOptionMeta?.argTypes?.hide },
  args: { hide: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};