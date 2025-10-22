import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TabGroupActive, TabGroupProps } from '../../tab-group';
import tabGroupMeta from '../../tab-group.stories';

const meta: Meta<TabGroupProps> = {
  title: 'Tab/Attributes/Active',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TabGroupActive(args);
  },
  argTypes: {
    active: tabGroupMeta?.argTypes?.active
  },
  args: {
    active: 1
  }
};

export default meta;
type Story = StoryObj<TabGroupProps>;

export const Param: Story = {}