import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TabGroupAlign } from '../../sy-tab-group.main';
import tabGroupMeta from '../../sy-tab-group.stories';

const meta: Meta = {
  title: 'Tab/Attributes/Align',
  component: 'sy-tab-group',
  tags: [],
  render: (args) => TabGroupAlign(args as { align: 'center' | 'left' }),
  argTypes: { align: tabGroupMeta?.argTypes?.align },
  args: { align: 'left' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};