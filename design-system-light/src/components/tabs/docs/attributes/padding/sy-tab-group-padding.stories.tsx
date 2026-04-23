import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TabGroupPadding } from '../../sy-tab-group.main';
import tabGroupMeta from '../../sy-tab-group.stories';

const meta: Meta = {
  title: 'Tab/Attributes/Padding',
  component: 'sy-tab-group',
  tags: [],
  render: (args) => TabGroupPadding(args as { padding: 'small' | 'medium' | 'large' | 'none' }),
  argTypes: { padding: tabGroupMeta?.argTypes?.padding },
  args: { padding: 'none' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};