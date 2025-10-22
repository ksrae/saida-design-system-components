import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TabGroupProps, TabGroupOrdered } from '../../tab-group';
import tabGroupMeta from '../../tab-group.stories';

const meta: Meta<TabGroupProps> = {
  title: 'Tab/Events/Ordered',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return TabGroupOrdered();
  },
  argTypes: {
    ordered: tabGroupMeta?.argTypes?.ordered
  },
};

export default meta;
type Story = StoryObj<TabGroupProps>;

export const Param: Story = {}