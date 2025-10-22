import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TabGroupDraggable, TabGroupProps } from '../../tab-group';
import tabGroupMeta from '../../tab-group.stories';

const meta: Meta<TabGroupProps> = {
  title: 'Tab/Attributes/Group Draggable',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TabGroupDraggable(args);
  },
  argTypes: {
    draggable: tabGroupMeta?.argTypes?.draggable
  },
  args: {
    draggable: true
  }
};

export default meta;
type Story = StoryObj<TabGroupProps>;

export const Param: Story = {}