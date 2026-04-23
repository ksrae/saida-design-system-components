import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TabGroupIsdraggable } from '../../sy-tab-group.main';
import tabGroupMeta from '../../sy-tab-group.stories';

const meta: Meta = {
  title: 'Tab/Attributes/Isdraggable',
  component: 'sy-tab-group',
  tags: [],
  render: (args) => TabGroupIsdraggable(args as { isdraggable: boolean }),
  argTypes: { isdraggable: tabGroupMeta?.argTypes?.isdraggable },
  args: { isdraggable: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};