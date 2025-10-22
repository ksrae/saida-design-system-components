import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TabGroupProps, TabGroupPadding } from '../../tab-group';
import tabGroupMeta from '../../tab-group.stories';

const meta: Meta<TabGroupProps> = {
  title: 'Tab/Attributes/Group Padding',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TabGroupPadding(args);
  },
  argTypes: {
    padding: tabGroupMeta?.argTypes?.padding
  },
  args: {
    padding: 'none'
  }
};

export default meta;
type Story = StoryObj<TabGroupProps>;

export const Param: Story = {}