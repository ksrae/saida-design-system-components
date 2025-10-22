import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TabGroupPosition, TabGroupProps } from '../../tab-group';
import tabGroupMeta from '../../tab-group.stories';

const meta: Meta<TabGroupProps> = {
  title: 'Tab/Attributes/Group Position',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TabGroupPosition(args);
  },
  argTypes: {
    position: tabGroupMeta?.argTypes?.position
  },
  args: {
    position: 'top'
  }
};

export default meta;
type Story = StoryObj<TabGroupProps>;

export const Param: Story = {}