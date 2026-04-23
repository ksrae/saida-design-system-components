import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TabGroupType } from '../../sy-tab-group.main';
import tabGroupMeta from '../../sy-tab-group.stories';

const meta: Meta = {
  title: 'Tab/Attributes/Type',
  component: 'sy-tab-group',
  tags: [],
  render: (args) => TabGroupType(args as { type: 'card' | 'line' }),
  argTypes: { type: tabGroupMeta?.argTypes?.type },
  args: { type: 'line' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};