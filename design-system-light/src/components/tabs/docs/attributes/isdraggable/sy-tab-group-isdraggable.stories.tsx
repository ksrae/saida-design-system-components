import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TabGroupDraggable } from '../../sy-tab-group.main';
import tabGroupMeta from '../../sy-tab-group.stories';

const meta: Meta = {
  title: 'Tab/Attributes/Draggable',
  component: 'sy-tab-group',
  tags: [],
  render: (args) => TabGroupDraggable(args as { draggable: boolean }),
  argTypes: { draggable: tabGroupMeta?.argTypes?.draggable },
  args: { draggable: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};
