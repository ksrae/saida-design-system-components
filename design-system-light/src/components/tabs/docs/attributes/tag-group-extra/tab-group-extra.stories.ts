import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TabGroupExtra, TabGroupProps } from '../../tab-group';
import tabGroupMeta from '../../tab-group.stories';

const meta: Meta<TabGroupProps> = {
  title: 'Tab/Attributes/Group Extra',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return TabGroupExtra();
  },
  argTypes: {
    // align: tabGroupMeta?.argTypes?.align
  },
};

export default meta;
type Story = StoryObj<TabGroupProps>;

export const Param: Story = {}