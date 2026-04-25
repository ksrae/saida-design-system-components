import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TabManualClose } from '../../sy-tab.main';
import tabMeta from '../../sy-tab.stories';

const meta: Meta = {
  title: 'Tab/Item Attributes/Manual Close',
  component: 'sy-tab',
  tags: [],
  render: (args) => TabManualClose(args as { manualClose: boolean }),
  argTypes: { manualClose: tabMeta?.argTypes?.manualClose },
  args: { manualClose: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};