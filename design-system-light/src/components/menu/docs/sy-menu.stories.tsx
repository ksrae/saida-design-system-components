import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { Menu, SyMenuProps } from './sy-menu.main';
import { clearElements } from "../../clear-element";

const menuMeta: Meta<SyMenuProps> = {
  title: 'Menu/Overview',
  component: 'sy-menu',
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
    disabled: {
      control: 'boolean',
      description: 'Disables the entire menu interaction.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' },
      },
    },
    direction: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'Direction in which submenus expand from their parent item.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: 'right' },
        type: { summary: 'left | right' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Show a spinner in place of items while they load.',
      table: {
        category: 'Parameter',
        defaultValue: { summary: false as any },
        type: { summary: 'boolean' },
      },
    },
    itemChecked: {
      type: 'function',
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
      description: 'Triggered when menu is opened.',
      table: {
        category: 'Callback',
        type: {
          summary: `.addEventListener('opened', (e) => {})`,
        },
      }
    },
    slot: {
      control: 'text',
      description: 'Values for menu',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ``},
      }
    },
  },
};

export default menuMeta;

export const Default: StoryObj<SyMenuProps> = {
  args: {
    open: false,
    checkable: false,
    disabled: false,
    direction: 'right',
    loading: false,
    // opendelay: 150,
    // closedelay: 100,
    position: 'bottomLeft',
    trigger: 'hover',
    slot: `
      <sy-menu-sub title="sub menu">
        <sy-menu-group title="Group">
          <sy-menu-item value="2">Item2</sy-menu-item>
          <sy-menu-item value="3">Item3</sy-menu-item>
        </sy-menu-group>
          <sy-menu-item value="4">Item4</sy-menu-item>
        </sy-menu-sub>
        <sy-menu-sub title="sub menu with actions">
          <sy-menu-item value="6">Item6</sy-menu-item>
          <sy-menu-item value="7">Item7</sy-menu-item>
        </sy-menu-sub>
        <sy-menu-item value="1">Item1</sy-menu-item>
        <sy-menu-item value="5">Item5</sy-menu-item>
     `
  },
};
