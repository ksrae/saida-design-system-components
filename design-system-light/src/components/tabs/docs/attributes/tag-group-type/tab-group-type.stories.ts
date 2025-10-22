import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TabGroupProps, TabGroupType } from '../../tab-group';
import tabGroupMeta from '../../tab-group.stories';

const meta: Meta<TabGroupProps> = {
  title: 'Tab/Attributes/Group Type',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TabGroupType(args);
  },
  argTypes: {
    type: tabGroupMeta?.argTypes?.type
  },
  args: {
    type: 'line'
  }
};

export default meta;
type Story = StoryObj<TabGroupProps>;

export const Param: Story = {}