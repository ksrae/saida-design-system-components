import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { NavItemValue } from '../../sy-nav-item.main';
import navItemMeta from '../../sy-nav-item.stories';

const meta: Meta = {
  title: 'Nav/Item Attributes/Value',
  component: 'sy-nav-item',
  tags: [],
  render: (args) => NavItemValue(args as { value: string }),
  argTypes: { value: navItemMeta?.argTypes?.value },
  args: { value: '' },
};

export default meta;
type Story = StoryObj;
export const Default: Story = {};