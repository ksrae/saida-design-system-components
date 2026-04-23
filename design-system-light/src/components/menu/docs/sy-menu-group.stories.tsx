import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { MenuGroup, SyMenuGroupProps } from './sy-menu.main';
import { clearElements } from "../../clear-element";


const menuGroupMeta: Meta<SyMenuGroupProps> = {
  title: 'Components/Menu Group/Overview',
  component: 'sy-menu-group',
   render: (args) => {
    clearElements(menuGroupMeta.title);
    return MenuGroup(args);
  },
  argTypes: {
    menuGroupTitle: {
      control: 'text',
      description: 'Title of the menu group',
      table: {
        category: 'Parameter',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    slot: {
      control: false,
      description: 'Menu items in the group',
      table: {
        category: 'Slot',
        type: { summary: 'HTMLElement' },
      },
    },
  },
};

export default menuGroupMeta;

export const Default: StoryObj<SyMenuGroupProps> = {
  args: {
    slot:`
      <sy-menu-item value="1-1">Item 1.1</sy-menu-item>
      <sy-menu-item value="1-2">Item 1.2</sy-menu-item>
      <sy-menu-item value="1-3">Item 1.3</sy-menu-item>
    `,
    menuGroupTitle : 'Group actions'
  }
};


