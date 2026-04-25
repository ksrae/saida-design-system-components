import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TabTabkey } from '../../sy-tab.main';
import tabMeta from '../../sy-tab.stories';

const meta: Meta = {
  title: 'Tab/Item Attributes/Tabkey',
  component: 'sy-tab',
  tags: [],
  render: (args) => TabTabkey(args as { tabkey: string }),
  argTypes: { tabkey: tabMeta?.argTypes?.tabkey },
  args: { tabkey: 'x' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};