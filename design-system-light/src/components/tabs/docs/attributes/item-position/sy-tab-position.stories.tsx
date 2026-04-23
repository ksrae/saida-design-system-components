import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TabPosition } from '../../sy-tab.main';
import tabMeta from '../../sy-tab.stories';

const meta: Meta = {
  title: 'Tab/Item Attributes/Position',
  component: 'sy-tab',
  tags: [],
  render: (args) => TabPosition(args as { position: 'top' | 'bottom' | 'left' | 'right' }),
  argTypes: { position: tabMeta?.argTypes?.position },
  args: { position: 'top' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};