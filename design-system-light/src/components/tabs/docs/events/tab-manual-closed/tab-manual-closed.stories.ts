import type { Meta, StoryObj } from '@storybook/web-components';
import { clearElements } from '../../../../clear-element';
import { TabProps } from '../../tab';
import tabMeta from '../../tab.stories';
import { TabManualClosed } from '../../tab';

const meta: Meta<TabProps> = {
  title: 'Tab/Events/Manual Closed',
  tags: ['false'],
  render: () => {
    clearElements(meta.title);
    return TabManualClosed();
  },
  argTypes: {
    manualClose: tabMeta?.argTypes?.manualClose,
  },
};

export default meta;
type Story = StoryObj<TabProps>;

export const Param: Story = {}