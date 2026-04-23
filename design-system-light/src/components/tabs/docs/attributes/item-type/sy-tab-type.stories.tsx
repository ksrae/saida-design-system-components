import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TabType } from '../../sy-tab.main';
import tabMeta from '../../sy-tab.stories';

const meta: Meta = {
  title: 'Tab/Item Attributes/Type',
  component: 'sy-tab',
  tags: [],
  render: (args) => TabType(args as { type: 'card' | 'line' }),
  argTypes: { type: tabMeta?.argTypes?.type },
  args: { type: 'line' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};