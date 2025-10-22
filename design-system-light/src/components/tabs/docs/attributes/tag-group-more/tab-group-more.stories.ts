import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TabGroupMore, TabGroupProps } from '../../tab-group';
import tabGroupMeta from '../../tab-group.stories';

const meta: Meta<TabGroupProps> = {
  title: 'Tab/Attributes/Group More',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return TabGroupMore();
  },
  argTypes: {
    // align: tabGroupMeta?.argTypes?.align
  },
};

export default meta;
type Story = StoryObj<TabGroupProps>;

export const Param: Story = {}