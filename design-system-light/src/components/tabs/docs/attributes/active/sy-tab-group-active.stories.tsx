import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TabGroupActive } from '../../sy-tab-group.main';
import tabGroupMeta from '../../sy-tab-group.stories';

const meta: Meta = {
  title: 'Tab/Attributes/Active',
  component: 'sy-tab-group',
  tags: [],
  render: (args) => TabGroupActive(args as { active: number }),
  argTypes: { active: tabGroupMeta?.argTypes?.active },
  args: { active: 0 },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};