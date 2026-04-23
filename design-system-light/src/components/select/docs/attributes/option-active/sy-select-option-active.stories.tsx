import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { SelectOptionActive } from '../../sy-select-option.main';
import selectOptionMeta from '../../sy-select-option.stories';

const meta: Meta = {
  title: 'Select/Option Attributes/Active',
  component: 'sy-select-option',
  tags: [],
  render: (args) => SelectOptionActive(args as { active: boolean }),
  argTypes: { active: selectOptionMeta?.argTypes?.active },
  args: { active: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};