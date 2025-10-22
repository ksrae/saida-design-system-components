import type { Meta, StoryObj } from '@storybook/web-components';
import { Menu, MenuProps } from './menu';
import { clearElements } from '../../clear-element';

const menuMeta: Meta<MenuProps> = {
  title: 'Menu/Overview',
  tags: ['false'],
  render: (args) => {
    clearElements(menuMeta.title);
    return Menu(args);
  },
  argTypes: {
    checkable: {
      control: 'boolean',
      description: 'Adds checkbox menu if true, menu does not closed when select or check any item',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }      
    },
    open: {
      control: 'boolean',
      description: 'Opens menu if true',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }      
    },
    position: {
      control: 'select',
      options: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
      description: 'Visible position of menu', 
      table: {
        category: 'Parameter',
        defaultValue: { summary: 'bottomLeft' }, 
        type: { summary: 'topLeft | topRight | bottomLeft | bottomRight' },
      },
    },
    trigger: {
      control: 'select',
      options: ['hover', 'click', 'contextmenu'],
      description: 'Sets event to open menu',
      table: {
        category: 'Parameter',
        defaultValue: { summary: 'hover' }, 
        type: { summary: 'hover | click | contextmenu' },
      },
    },
    itemChecked: {
      type: 'function',
      action: 'checked', 
      description: 'Triggered when any item is checked.',
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('itemChecked', (e) => {})`,
        },
      }
    },
    itemSelected: {
      type: 'function',
      action: 'itemSelected', 
      description: 'Triggered when any item is selected.',
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('itemSelected', (e) => {})`,
        },
      }
    },
    opened: {
      type: 'function',
      action: 'itemSelected', 
      description: 'Triggered when menu is opened.',
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('opened', (e) => {})`,
        },
      }
    },
    slotContent: {
      control: false,
      description: 'Values for menu',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ``},
      }
    },
  },
};

export default menuMeta;
type Story = StoryObj<MenuProps>;

export const Default: Story = {
  args: {
    checkable: false,
    open: false,
    // opendelay: 150,
    // closedelay: 100,
    position: 'bottomLeft',
    trigger: 'hover',
    slotContent: ``
  },

}
