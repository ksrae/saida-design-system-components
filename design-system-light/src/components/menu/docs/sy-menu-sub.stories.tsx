import type { Meta, StoryObj } from "@storybook/web-components";
import { MenuSub, SyMenuSubProps } from './sy-menu.main';
import { clearElements } from "../../clear-element";

const menuSubMeta: Meta<SyMenuSubProps> = {
  title: 'Menu Sub/Overview',
  component: 'sy-menu-sub',
  render: (args) => {
    clearElements(menuSubMeta.title);
    return MenuSub(args);
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
    open: {
      control: 'boolean',
      description: 'Opens menu-sub if true',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    menuSubTitle: {
      control: 'text',
      description: 'Title for menu-sub',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ``},
        type: { summary: 'string' }
      }
    },
    slot: {
      control: 'text',
      description: 'Value for menu-sub',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ``},
      }
    },
  },
};

export default menuSubMeta;

export const Default: StoryObj<SyMenuSubProps> = {
  args: {
    disabled: false,
    open: false,
    menuSubTitle: 'Menu sub',
    slot: `
      <sy-menu-item value="2-1">Submenu Item 1</sy-menu-item>
      <sy-menu-item value="2-2">Submenu Item 2</sy-menu-item>
      <sy-menu-item value="2-3">Submenu Item 3</sy-menu-item>
    `
  }
};

