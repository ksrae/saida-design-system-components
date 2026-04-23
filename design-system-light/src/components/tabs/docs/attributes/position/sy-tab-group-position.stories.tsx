import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TabGroupPosition } from '../../sy-tab-group.main';
import tabGroupMeta from '../../sy-tab-group.stories';

const meta: Meta = {
  title: 'Tab/Attributes/Position',
  component: 'sy-tab-group',
  tags: [],
  render: (args) => TabGroupPosition(args as { position: 'top' | 'bottom' | 'left' | 'right' }),
  argTypes: { position: tabGroupMeta?.argTypes?.position },
  args: { position: 'top' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};