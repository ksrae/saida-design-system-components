import type { Meta, StoryObj } from '@storybook/web-components';
import { MenuItem, MenuItemProps, MenuProps } from './menu';
import { clearElements } from '../../clear-element';

const menuItemMeta: Meta<MenuItemProps> = {
  title: 'Menu Item/Overview',
  tags: ['false'],
  render: (args) => {
    clearElements('Menu/Overview');
    return MenuItem(args);
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disables menu-item if true',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }      
    },
    select: {
      control: 'boolean',
      description: 'Select the menu-item if true',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }      
    },
    value: {
      control: 'text',
      description: 'Values for menu-item',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ``},
        type: { summary: 'string' }
      }
    },
    slotContent: {
      control: 'text',
      description: 'Values for menu-item',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ``},
        type: { summary: 'string' }
      }
    },
  },
};

export default menuItemMeta;
type Story = StoryObj<MenuItemProps>;

export const Default: Story = {
  args: {
    disabled: false,
    select: false,
    value: '',
    slotContent: ``
  },

}
