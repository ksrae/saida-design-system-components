import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TabCurrentDisabledStatus } from '../../sy-tab.main';
import tabMeta from '../../sy-tab.stories';

const meta: Meta = {
  title: 'Tab/Item Attributes/Current Disabled Status',
  component: 'sy-tab',
  tags: [],
  render: (args) => TabCurrentDisabledStatus(args as { currentDisabledStatus: boolean }),
  argTypes: { currentDisabledStatus: tabMeta?.argTypes?.currentDisabledStatus },
  args: { currentDisabledStatus: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};