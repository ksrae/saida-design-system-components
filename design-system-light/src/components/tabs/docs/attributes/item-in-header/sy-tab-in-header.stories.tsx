import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TabInHeader } from '../../sy-tab.main';
import tabMeta from '../../sy-tab.stories';

const meta: Meta = {
  title: 'Tab/Item Attributes/In Header',
  component: 'sy-tab',
  tags: [],
  render: (args) => TabInHeader(args as { inHeader: boolean }),
  argTypes: { inHeader: tabMeta?.argTypes?.inHeader },
  args: { inHeader: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};