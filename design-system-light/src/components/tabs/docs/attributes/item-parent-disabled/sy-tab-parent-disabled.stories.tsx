import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TabParentDisabled } from '../../sy-tab.main';
import tabMeta from '../../sy-tab.stories';

const meta: Meta = {
  title: 'Tab/Item Attributes/Parent Disabled',
  component: 'sy-tab',
  tags: [],
  render: (args) => TabParentDisabled(args as { parentDisabled: boolean }),
  argTypes: { parentDisabled: tabMeta?.argTypes?.parentDisabled },
  args: { parentDisabled: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};