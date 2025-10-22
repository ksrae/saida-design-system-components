import type { Meta, StoryObj } from '@storybook/web-components';
import { MenuItemDisabled, MenuItemProps } from '../../menu';
import { clearElements } from '../../../../clear-element';
import menuItemMeta from '../../menu-item.stories';

const meta: Meta<MenuItemProps> = {
  title: 'Menu/Attributes/Menu-Item Disabled',
  tags: ['false'],
  render: (args) => {
    clearElements(meta.title);
    return MenuItemDisabled(args);
  },
  argTypes: {
    disabled: menuItemMeta?.argTypes?.disabled
  },
  args: {
    disabled: true
  }
};

export default meta;
type Story = StoryObj<MenuItemProps>;

export const Param: Story = {}
