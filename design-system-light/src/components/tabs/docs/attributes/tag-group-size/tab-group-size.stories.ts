import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TabGroupProps, TabGroupSize } from '../../tab-group';
import tabGroupMeta from '../../tab-group.stories';

const meta: Meta<TabGroupProps> = {
  title: 'Tab/Attributes/Group Size',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TabGroupSize(args);
  },
  argTypes: {
    size: tabGroupMeta?.argTypes?.size
  },
  args: {
    size: 'medium'
  }
};

export default meta;
type Story = StoryObj<TabGroupProps>;

export const Param: Story = {}