import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TabGroupOrdered } from '../../sy-tab-group.main';

const meta: Meta = {
  title: 'Tab/Events/Ordered',
  component: 'sy-tab-group',
  tags: [],
  render: () => TabGroupOrdered(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};