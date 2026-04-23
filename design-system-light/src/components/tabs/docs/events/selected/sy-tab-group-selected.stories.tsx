import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TabGroupSelected } from '../../sy-tab-group.main';

const meta: Meta = {
  title: 'Tab/Events/Selected',
  component: 'sy-tab-group',
  tags: [],
  render: () => TabGroupSelected(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};