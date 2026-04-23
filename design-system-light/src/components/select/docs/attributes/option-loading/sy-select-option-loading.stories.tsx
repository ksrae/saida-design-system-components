import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SelectOptionLoading } from '../../sy-select-option.main';
import selectOptionMeta from '../../sy-select-option.stories';

const meta: Meta = {
  title: 'Select/Option Attributes/Loading',
  component: 'sy-select-option',
  tags: [],
  render: (args) => SelectOptionLoading(args as { loading: boolean }),
  argTypes: { loading: selectOptionMeta?.argTypes?.loading },
  args: { loading: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};