import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TabGroupAlign, TabGroupProps } from '../../tab-group';
import tabGroupMeta from '../../tab-group.stories';

const meta: Meta<TabGroupProps> = {
  title: 'Tab/Attributes/Group Align',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TabGroupAlign(args);
  },
  argTypes: {
    align: tabGroupMeta?.argTypes?.align
  },
  args: {
    align: 'left'
  }
};

export default meta;
type Story = StoryObj<TabGroupProps>;

export const Param: Story = {}