import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { NavItemDisabled } from '../../sy-nav-item.main';
import navItemMeta from '../../sy-nav-item.stories';

const meta: Meta = {
  title: 'Nav/Item Attributes/Disabled',
  component: 'sy-nav-item',
  tags: [],
  render: (args) => NavItemDisabled(args as { disabled: boolean }),
  argTypes: { disabled: navItemMeta?.argTypes?.disabled },
  args: { disabled: false },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};