import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import tabMeta from '../../tab.stories';
import { TabManualClose, TabProps } from '../../tab';

const meta: Meta<TabProps> = {
  title: 'Tab/Attributes/ManualClose',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return TabManualClose(args);
  },
  argTypes: {
    manualClose: tabMeta?.argTypes?.manualClose
  },
  args: {
    manualClose: true
  }
};

export default meta;
type Story = StoryObj<TabProps>;

export const Param: Story = {}