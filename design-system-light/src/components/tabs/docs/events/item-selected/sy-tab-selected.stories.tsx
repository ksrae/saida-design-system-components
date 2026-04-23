import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TabSelected } from '../../sy-tab.main';

const meta: Meta = {
  title: 'Tab/Item Events/Selected',
  component: 'sy-tab',
  tags: [],
  render: () => TabSelected(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};