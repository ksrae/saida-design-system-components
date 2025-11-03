import type { Meta, StoryObj } from "@storybook/web-components-vite";
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
    // opendelay: 150,
    // closedelay: 100,
    position: 'bottomLeft',
    trigger: 'hover',
    slot: `
      <sy-menu-sub menuSubTitle="sub menu">
        <sy-menu-group menuGroupTitle="Group">
          <sy-menu-item value="2">Item2</sy-menu-item>
          <sy-menu-item value="3">Item3</sy-menu-item>
        </sy-menu-group>
          <sy-menu-item value="4">Item4</sy-menu-item>
        </sy-menu-sub>
        <sy-menu-sub menuSubTitle='sub menu with icon <sy-icon><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M304 70.1C313.1 61.9 326.9 61.9 336 70.1L568 278.1C577.9 286.9 578.7 302.1 569.8 312C560.9 321.9 545.8 322.7 535.9 313.8L527.9 306.6L527.9 511.9C527.9 547.2 499.2 575.9 463.9 575.9L175.9 575.9C140.6 575.9 111.9 547.2 111.9 511.9L111.9 306.6L103.9 313.8C94 322.6 78.9 321.8 70 312C61.1 302.2 62 287 71.8 278.1L304 70.1zM320 120.2L160 263.7L160 512C160 520.8 167.2 528 176 528L224 528L224 424C224 384.2 256.2 352 296 352L344 352C383.8 352 416 384.2 416 424L416 528L464 528C472.8 528 480 520.8 480 512L480 263.7L320 120.3zM272 528L368 528L368 424C368 410.7 357.3 400 344 400L296 400C282.7 400 272 410.7 272 424L272 528z"></path></svg></sy-icon>'>
          <sy-menu-item value="6">Item6</sy-menu-item>
          <sy-menu-item value="7">Item7</sy-menu-item>
        </sy-menu-sub>
        <sy-menu-item value="1">Item1</sy-menu-item>
        <sy-menu-item value="5">Item5</sy-menu-item>
     `
  },
};
