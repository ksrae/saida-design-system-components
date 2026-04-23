import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TabClosable } from '../../sy-tab.main';
import tabMeta from '../../sy-tab.stories';

const meta: Meta = {
  title: 'Tab/Item Attributes/Closable',
  component: 'sy-tab',
  tags: [],
  render: (args) => TabClosable(args as { closable: boolean }),
  argTypes: { closable: tabMeta?.argTypes?.closable },
  args: { closable: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};