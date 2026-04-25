import type { Meta, StoryObj } from '@stencil/storybook-plugin';
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