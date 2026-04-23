import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { NavItemSetActive } from '../../sy-nav-item.main';

const meta: Meta = {
  title: 'Nav/Item Methods/SetActive',
  component: 'sy-nav-item',
  tags: [],
  render: () => NavItemSetActive(),
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};