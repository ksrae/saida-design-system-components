import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { NavItemGroupItem } from '../../sy-nav-item.main';

const meta: Meta = {
  title: 'Nav/Item Methods/GroupItem',
  component: 'sy-nav-item',
  tags: [],
  render: () => NavItemGroupItem(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};