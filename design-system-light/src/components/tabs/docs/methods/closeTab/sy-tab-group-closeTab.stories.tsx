import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TabGroupCloseTab } from '../../sy-tab-group.main';

const meta: Meta = {
  title: 'Tab/Methods/CloseTab',
  component: 'sy-tab-group',
  tags: [],
  render: () => TabGroupCloseTab(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};