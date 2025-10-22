import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TabGroupProps, TabGroupSelected } from '../../tab-group';
import tabGroupMeta from '../../tab-group.stories';

const meta: Meta<TabGroupProps> = {
  title: 'Tab/Events/Selected',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return TabGroupSelected();
  },
  argTypes: {
    selected: tabGroupMeta?.argTypes?.selected
  },
};

export default meta;
type Story = StoryObj<TabGroupProps>;

export const Param: Story = {}