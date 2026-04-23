import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TabClosed } from '../../sy-tab.main';

const meta: Meta = {
  title: 'Tab/Item Events/Closed',
  component: 'sy-tab',
  tags: [],
  render: () => TabClosed(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};