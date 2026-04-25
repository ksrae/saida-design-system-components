import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { MenuItem, SyMenuItemProps } from './sy-menu.main';
import { clearElements } from "../../clear-element";

const menuItemMeta: Meta<SyMenuItemProps> = {
  title: 'Components/Menu Item/Overview',
  component: 'sy-menu-item',
   render: (args) => {
    clearElements(menuItemMeta.title);
    return MenuItem(args);
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Whether the menu item is disabled',
      table: {
        category: 'Parameter',
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' },
      },
    },
    value: {
      control: 'text',
      description: 'Value of the menu item',
      table: {
        category: 'Parameter',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    select: {
      control: 'boolean',
      description: 'Whether the menu item is selected',
      table: {
        category: 'Parameter',
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' },
      },
    },
    selectable: {
      control: 'boolean',
      description: 'Whether the menu item is selectable',
      table: {
        category: 'Parameter',
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' },
      },
    },
    checkable: {
      control: 'boolean',
      description: 'Whether the menu item can be checked',
      table: {
        category: 'Parameter',
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' },
      },
    },
    slot: {
      control: false,
      description: 'Content to display in the menu item',
      table: {
        category: 'Slot',
        type: { summary: 'HTMLElement' },
      },
    }
  },
};

export default menuItemMeta;

export const Default: StoryObj<SyMenuItemProps> = {
  args: {
    value: '1',
    slot: 'Menu Item',
    select: false,
    disabled: false,
    selectable: false,
    checkable: false
  },
}
