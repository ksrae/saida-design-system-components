import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TabGroupDisabled, TabGroupProps } from '../../tab-group';
import tabGroupMeta from '../../tab-group.stories';

const meta: Meta<TabGroupProps> = {
  title: 'Tab/Attributes/Group Disabled',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TabGroupDisabled(args);
  },
  argTypes: {
    disabled: tabGroupMeta?.argTypes?.disabled
  },
  args: {
    disabled: true
  }
};

export default meta;
type Story = StoryObj<TabGroupProps>;

export const Param: Story = {}